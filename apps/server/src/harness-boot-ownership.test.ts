import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const temporaryRoots: string[] = [];
const fixtures: ChildProcess[] = [];

interface ProcessIdentity {
  processGroup: number;
  processStartTime: string;
}

interface StopEnvelope {
  status: string;
  data: {
    identity_matched: boolean;
    ownership_validation: {
      command_matched: boolean;
      process_group_matched: boolean;
      process_start_time_matched: boolean;
    };
    signals: string[];
    stale_state_removed: boolean;
    stopped: boolean;
  };
}

function processIdentity(pid: number): ProcessIdentity | null {
  try {
    const stat = readFileSync("/proc/" + pid + "/stat", "utf8");
    const afterName = stat
      .slice(stat.lastIndexOf(")") + 2)
      .trim()
      .split(/\s+/);
    const processGroup = Number(afterName[2]);
    const processStartTime = afterName[19];
    return Number.isInteger(processGroup) && processStartTime !== undefined
      ? { processGroup, processStartTime }
      : null;
  } catch {
    return null;
  }
}

async function waitForIdentity(pid: number): Promise<ProcessIdentity> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const identity = processIdentity(pid);
    if (identity !== null) return identity;
    await new Promise((resolveWait) => setTimeout(resolveWait, 10));
  }
  throw new Error("Fixture process identity was unavailable.");
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

async function waitForExit(pid: number): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (!processIsAlive(pid)) return;
    await new Promise((resolveWait) => setTimeout(resolveWait, 10));
  }
  throw new Error("Fixture process did not exit.");
}

function createHarnessRoot(): string {
  const root = mkdtempSync(join(tmpdir(), "sparkta-boot-ownership-"));
  temporaryRoots.push(root);
  const extensionDirectory = join(root, ".harness", "extensions", "boot");
  mkdirSync(extensionDirectory, { recursive: true });
  copyFileSync(
    join(repositoryRoot, ".harness", "extensions", "boot", "extension.ts"),
    join(extensionDirectory, "extension.ts"),
  );
  copyFileSync(
    join(repositoryRoot, ".harness", "extensions", "boot", "instructions.md"),
    join(extensionDirectory, "instructions.md"),
  );
  return root;
}

function spawnFixture(root: string, name: string, recordSignal: boolean): ChildProcess {
  const marker = join(root, name + ".signal");
  const signalHandler = recordSignal
    ? 'process.on("SIGTERM",()=>fs.writeFileSync(marker,"SIGTERM"));'
    : "";
  const script =
    'const fs=require("node:fs");const marker=process.argv[1];' +
    signalHandler +
    "setInterval(()=>{},1000);";
  const fixture = spawn(process.execPath, ["-e", script, marker, "just", "run"], {
    detached: true,
    stdio: "ignore",
  });
  fixtures.push(fixture);
  fixture.unref();
  return fixture;
}

function writeOwnership(
  root: string,
  pid: number,
  processGroup: number,
  processStartTime: string,
): void {
  const directory = join(root, ".harness", "temp", "boot");
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    join(directory, "ownership.json"),
    JSON.stringify({
      schema_version: 1,
      ownership_id: "ownership-test",
      pid,
      process_group: processGroup,
      process_start_time: processStartTime,
      command: ["just", "run"],
      created_at: "2026-08-13T00:00:00.000Z",
      ports: { web: 1, server: 2 },
      urls: {
        web: "http://127.0.0.1:1/",
        server: "http://127.0.0.1:2/api/readiness",
      },
      log_path: ".harness/temp/boot/boot.log",
    }),
    "utf8",
  );
}

function runStop(root: string): StopEnvelope {
  return JSON.parse(
    execFileSync("harness", ["stop", "--json"], {
      cwd: root,
      encoding: "utf8",
      timeout: 15_000,
    }),
  ) as StopEnvelope;
}

afterEach(() => {
  for (const fixture of fixtures.splice(0)) {
    if (fixture.pid !== undefined && processIsAlive(fixture.pid)) {
      try {
        process.kill(-fixture.pid, "SIGKILL");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
      }
    }
  }
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe.sequential("harness boot process-group ownership", () => {
  it("never signals a recorded process group that does not own the live PID", async () => {
    const root = createHarnessRoot();
    const recordedProcess = spawnFixture(root, "recorded", false);
    const unknownGroup = spawnFixture(root, "unknown-group", true);
    const recordedPid = recordedProcess.pid;
    const unknownPid = unknownGroup.pid;
    expect(recordedPid).toBeTypeOf("number");
    expect(unknownPid).toBeTypeOf("number");
    const recordedIdentity = await waitForIdentity(recordedPid!);
    const unknownIdentity = await waitForIdentity(unknownPid!);

    writeOwnership(
      root,
      recordedPid!,
      unknownIdentity.processGroup,
      recordedIdentity.processStartTime,
    );
    const envelope = runStop(root);
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));

    expect(envelope.status).toBe("ok");
    expect(envelope.data.identity_matched).toBe(false);
    expect(envelope.data.ownership_validation).toMatchObject({
      command_matched: true,
      process_group_matched: false,
      process_start_time_matched: true,
    });
    expect(envelope.data.signals).toEqual([]);
    expect(envelope.data.stale_state_removed).toBe(true);
    expect(processIsAlive(recordedPid!)).toBe(true);
    expect(processIsAlive(unknownPid!)).toBe(true);
    expect(existsSync(join(root, "unknown-group.signal"))).toBe(false);
    expect(existsSync(join(root, ".harness", "temp", "boot", "ownership.json"))).toBe(false);
  });

  it("stops a live PID whose recorded process group matches", async () => {
    const root = createHarnessRoot();
    const ownedGroup = spawnFixture(root, "owned", false);
    const ownedPid = ownedGroup.pid;
    expect(ownedPid).toBeTypeOf("number");
    const identity = await waitForIdentity(ownedPid!);
    expect(identity.processGroup).toBe(ownedPid);

    writeOwnership(root, ownedPid!, identity.processGroup, identity.processStartTime);
    const envelope = runStop(root);

    expect(envelope.status).toBe("ok");
    expect(envelope.data.identity_matched).toBe(true);
    expect(envelope.data.ownership_validation.process_group_matched).toBe(true);
    expect(envelope.data.signals).toEqual(["SIGTERM"]);
    expect(envelope.data.stopped).toBe(true);
    await waitForExit(ownedPid!);
    expect(processIsAlive(ownedPid!)).toBe(false);
  });
});
