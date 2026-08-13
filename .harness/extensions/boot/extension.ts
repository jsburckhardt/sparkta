import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createConnection } from "node:net";
import { join } from "node:path";

import { defineExtension, type V2VerbContext } from "@ai-substrate/engineering-harness/contract";

const WEB_PORT = 5173;
const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_BOOT_TIMEOUT_MS = 60_000;
const STOP_TIMEOUT_MS = 10_000;
const PROBE_TIMEOUT_MS = 2_000;
const OUTPUT_LIMIT = 8_000;

interface BootPaths {
  directory: string;
  evidence: string;
  evidenceRelative: string;
  log: string;
  logRelative: string;
  ownership: string;
  ownershipRelative: string;
}

interface Ownership {
  schema_version: 1;
  ownership_id: string;
  pid: number;
  process_group: number;
  process_start_time: string;
  command: ["just", "run"];
  created_at: string;
  ports: { web: number; server: number };
  urls: { web: string; server: string };
  log_path: string;
}

interface ProbeResult {
  name: "server" | "web";
  url: string;
  ok: boolean;
  status_code: number | null;
  duration_ms: number;
  detail: string;
}

function bootPaths(cwd: string): BootPaths {
  const directory = join(cwd, ".harness", "temp", "boot");
  return {
    directory,
    evidence: join(directory, "evidence.json"),
    evidenceRelative: ".harness/temp/boot/evidence.json",
    log: join(directory, "boot.log"),
    logRelative: ".harness/temp/boot/boot.log",
    ownership: join(directory, "ownership.json"),
    ownershipRelative: ".harness/temp/boot/ownership.json",
  };
}

function serverPort(ctx: V2VerbContext): number | null {
  const raw = ctx.env.get("PORT") ?? String(DEFAULT_SERVER_PORT);
  if (!/^\d+$/.test(raw)) return null;
  const port = Number(raw);
  return Number.isInteger(port) && port > 0 && port <= 65_535 && port !== WEB_PORT
    ? port
    : null;
}

function bounded(value: string): string {
  return value.length <= OUTPUT_LIMIT ? value : value.slice(-OUTPUT_LIMIT);
}

interface LiveProcessIdentity {
  process_group: number;
  process_start_time: string;
}

interface OwnershipValidation {
  matched: boolean;
  process_live: boolean;
  process_start_time_matched: boolean;
  command_matched: boolean;
  process_group_matched: boolean;
}

function liveProcessIdentity(pid: number): LiveProcessIdentity | null {
  try {
    const stat = readFileSync("/proc/" + pid + "/stat", "utf8");
    const afterName = stat.slice(stat.lastIndexOf(")") + 2).trim().split(/\s+/);
    const processGroup = Number(afterName[2]);
    const processStartTime = afterName[19];
    if (!Number.isInteger(processGroup) || processGroup <= 0 || processStartTime === undefined) {
      return null;
    }
    return {
      process_group: processGroup,
      process_start_time: processStartTime,
    };
  } catch {
    return null;
  }
}

function processCommand(pid: number): string | null {
  try {
    return readFileSync("/proc/" + pid + "/cmdline", "utf8").replaceAll("\u0000", " ").trim();
  } catch {
    return null;
  }
}

function ownershipValidation(value: Ownership): OwnershipValidation {
  const identity = liveProcessIdentity(value.pid);
  const command = processCommand(value.pid);
  const processStartTimeMatched = identity?.process_start_time === value.process_start_time;
  const commandMatched =
    command !== null && command.includes("just") && command.includes("run");
  const processGroupMatched = identity?.process_group === value.process_group;
  return {
    matched: processStartTimeMatched && commandMatched && processGroupMatched,
    process_live: identity !== null,
    process_start_time_matched: processStartTimeMatched,
    command_matched: commandMatched,
    process_group_matched: processGroupMatched,
  };
}

function ownershipMatches(value: Ownership): boolean {
  return ownershipValidation(value).matched;
}

function ownedGroupIsAlive(value: Ownership): boolean {
  if (!ownershipMatches(value)) return false;
  try {
    process.kill(-value.process_group, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

function signalOwnedGroup(value: Ownership, signal: NodeJS.Signals): boolean {
  if (!ownershipMatches(value)) return false;
  try {
    process.kill(-value.process_group, signal);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}

function removeOwnership(paths: BootPaths): void {
  rmSync(paths.ownership, { force: true });
}

function loadOwnership(paths: BootPaths): Ownership | null {
  try {
    const value = JSON.parse(readFileSync(paths.ownership, "utf8")) as Partial<Ownership>;
    if (
      value.schema_version !== 1 ||
      typeof value.ownership_id !== "string" ||
      typeof value.pid !== "number" ||
      typeof value.process_group !== "number" ||
      typeof value.process_start_time !== "string" ||
      !Array.isArray(value.command) ||
      value.command[0] !== "just" ||
      value.command[1] !== "run" ||
      typeof value.created_at !== "string" ||
      typeof value.ports?.web !== "number" ||
      typeof value.ports?.server !== "number" ||
      typeof value.urls?.web !== "string" ||
      typeof value.urls?.server !== "string" ||
      typeof value.log_path !== "string"
    ) {
      return null;
    }
    return value as Ownership;
  } catch {
    return null;
  }
}

function writeJson(path: string, value: unknown): void {
  const temporary = path + ".tmp";
  writeFileSync(temporary, JSON.stringify(value, null, 2) + "\n", "utf8");
  renameSync(temporary, path);
}

function writeEvidence(paths: BootPaths, value: unknown): void {
  mkdirSync(paths.directory, { recursive: true });
  writeJson(paths.evidence, value);
}

async function isPortOpen(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    let settled = false;
    const finish = (open: boolean) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(open);
    };
    socket.setTimeout(500, () => finish(false));
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
  });
}

async function waitForGroupExit(
  ctx: V2VerbContext,
  ownership: Ownership,
): Promise<boolean> {
  const deadline = Date.now() + STOP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (!ownedGroupIsAlive(ownership)) return true;
    await ctx.clock.sleep(100);
  }
  return !ownedGroupIsAlive(ownership);
}

async function waitForPortRelease(
  ctx: V2VerbContext,
  ports: number[],
): Promise<Record<string, boolean>> {
  const deadline = Date.now() + STOP_TIMEOUT_MS;
  let result: Record<string, boolean> = {};
  while (Date.now() < deadline) {
    const readings = await Promise.all(ports.map(async (port) => [port, !(await isPortOpen(port))] as const));
    result = Object.fromEntries(readings.map(([port, released]) => [String(port), released]));
    if (Object.values(result).every(Boolean)) return result;
    await ctx.clock.sleep(100);
  }
  return result;
}

async function stopOwned(
  ctx: V2VerbContext,
  paths: BootPaths,
  ownership: Ownership,
) {
  const validation = ownershipValidation(ownership);
  const signals: string[] = [];
  if (!validation.matched) {
    removeOwnership(paths);
    return {
      stopped: false,
      stale_state_removed: true,
      identity_matched: false,
      ownership_validation: validation,
      signals,
      ports_released: await waitForPortRelease(ctx, [ownership.ports.web, ownership.ports.server]),
    };
  }

  if (ownedGroupIsAlive(ownership) && signalOwnedGroup(ownership, "SIGTERM")) {
    signals.push("SIGTERM");
  }

  let exited = await waitForGroupExit(ctx, ownership);
  if (!exited && signalOwnedGroup(ownership, "SIGKILL")) {
    signals.push("SIGKILL");
    exited = await waitForGroupExit(ctx, ownership);
  }

  removeOwnership(paths);
  const portsReleased = await waitForPortRelease(ctx, [ownership.ports.web, ownership.ports.server]);
  return {
    stopped: exited,
    stale_state_removed: false,
    identity_matched: true,
    ownership_validation: validation,
    signals,
    ports_released: portsReleased,
  };
}

async function probeWeb(url: string): Promise<ProbeResult> {
  const started = Date.now();
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
    const body = await response.text();
    const ok = response.status === 200 && body.includes("<title>Sparkta Foundation</title>");
    return {
      name: "web",
      url,
      ok,
      status_code: response.status,
      duration_ms: Date.now() - started,
      detail: ok ? "Sparkta Foundation marker present" : "foundation marker missing",
    };
  } catch {
    return {
      name: "web",
      url,
      ok: false,
      status_code: null,
      duration_ms: Date.now() - started,
      detail: "web probe unavailable",
    };
  }
}

async function probeServer(url: string): Promise<ProbeResult> {
  const started = Date.now();
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
    const body = (await response.json()) as unknown;
    const ok =
      response.status === 200 &&
      typeof body === "object" &&
      body !== null &&
      (body as Record<string, unknown>).foundation === "sparkta-server" &&
      (body as Record<string, unknown>).status === "ready" &&
      Object.keys(body).length === 2;
    return {
      name: "server",
      url,
      ok,
      status_code: response.status,
      duration_ms: Date.now() - started,
      detail: ok ? "stable readiness verdict received" : "readiness verdict did not match",
    };
  } catch {
    return {
      name: "server",
      url,
      ok: false,
      status_code: null,
      duration_ms: Date.now() - started,
      detail: "server probe unavailable",
    };
  }
}

async function probeServices(ownership: Ownership) {
  const [web, server] = await Promise.all([
    probeWeb(ownership.urls.web),
    probeServer(ownership.urls.server),
  ]);
  return { web, server, ok: web.ok && server.ok };
}

async function pollServices(ctx: V2VerbContext, ownership: Ownership, timeoutMs: number) {
  const started = Date.now();
  let probes = await probeServices(ownership);
  while (!probes.ok && Date.now() - started < timeoutMs && ownedGroupIsAlive(ownership)) {
    await ctx.clock.sleep(250);
    probes = await probeServices(ownership);
  }
  return { ...probes, duration_ms: Date.now() - started };
}

function parseTimeout(ctx: V2VerbContext): number | null {
  const raw = ctx.options.timeoutMs;
  const value = typeof raw === "string" ? Number(raw) : DEFAULT_BOOT_TIMEOUT_MS;
  return Number.isInteger(value) && value >= 1_000 && value <= 120_000 ? value : null;
}

function evidencePaths(paths: BootPaths) {
  return {
    log_path: paths.logRelative,
    ownership_path: paths.ownershipRelative,
    evidence_path: paths.evidenceRelative,
  };
}

async function boot(ctx: V2VerbContext) {
  const started = Date.now();
  const paths = bootPaths(ctx.cwd);
  mkdirSync(paths.directory, { recursive: true });
  const port = serverPort(ctx);
  const timeoutMs = parseTimeout(ctx);
  if (port === null || timeoutMs === null) {
    return ctx.error("E_BOOT_CONFIG", "Boot configuration is invalid.", {
      details: { port: ctx.env.get("PORT") ?? String(DEFAULT_SERVER_PORT), timeout_ms: ctx.options.timeoutMs },
      next_action: "Use a unique PORT from 1 to 65535 and a timeout from 1000 to 120000 milliseconds.",
    });
  }
  if (!ctx.background) {
    return ctx.unconfigured("Use harness 0.13.0 or newer so detached process ownership is available.");
  }

  let reconciliation: unknown = { state: "none" };
  if (existsSync(paths.ownership)) {
    const previous = loadOwnership(paths);
    if (previous === null) {
      removeOwnership(paths);
      reconciliation = { state: "invalid-stale-removed", signalled: false };
    } else {
      reconciliation = { state: "prior-owned-state", ...(await stopOwned(ctx, paths, previous)) };
    }
  }

  const ports = [WEB_PORT, port];
  const occupied = (await Promise.all(ports.map(async (candidate) => [candidate, await isPortOpen(candidate)] as const)))
    .filter(([, open]) => open)
    .map(([candidate]) => candidate);
  if (occupied.length > 0) {
    const details = {
      delegated_command: "just run",
      occupied_ports: occupied,
      unknown_processes_signalled: false,
      reconciliation,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "boot", status: "error", error: "port-conflict", ...details });
    return ctx.error("E_BOOT_PORT_CONFLICT", "Boot refused occupied fixed ports: " + occupied.join(", "), {
      details,
      next_action: "Stop or reconfigure the unknown listener yourself, then rerun harness boot.",
    });
  }

  writeFileSync(paths.log, "", "utf8");
  let pid: number;
  try {
    pid = ctx.background.spawnDetached({
      command: "just",
      args: ["run"],
      cwd: ctx.cwd,
      logPath: paths.log,
    }).pid;
  } catch (error) {
    const details = {
      delegated_command: "just run",
      message: error instanceof Error ? error.message : "detached spawn failed",
      reconciliation,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "boot", status: "error", error: "spawn-failed", ...details });
    return ctx.error("E_BOOT_SPAWN", "Unable to start just run.", {
      details,
      next_action: "Confirm just run is available, then rerun harness boot.",
    });
  }

  let identity = liveProcessIdentity(pid);
  for (let attempt = 0; identity === null && attempt < 10; attempt += 1) {
    await ctx.clock.sleep(20);
    identity = liveProcessIdentity(pid);
  }

  const ownership: Ownership | null =
    identity !== null && identity.process_group === pid
      ? {
          schema_version: 1,
          ownership_id: randomUUID(),
          pid,
          process_group: identity.process_group,
          process_start_time: identity.process_start_time,
          command: ["just", "run"],
          created_at: ctx.clock.nowIso(),
          ports: { web: WEB_PORT, server: port },
          urls: {
            web: "http://127.0.0.1:" + WEB_PORT + "/",
            server: "http://127.0.0.1:" + port + "/api/readiness",
          },
          log_path: paths.logRelative,
        }
      : null;

  for (let attempt = 0; ownership !== null && !ownershipMatches(ownership) && attempt < 10; attempt += 1) {
    await ctx.clock.sleep(20);
  }
  if (ownership === null || !ownershipMatches(ownership)) {
    const details = {
      delegated_command: "just run",
      owned_pid: pid,
      expected_process_group: pid,
      observed_process_group: identity?.process_group ?? null,
      ownership_validation: ownership === null ? null : ownershipValidation(ownership),
      unknown_processes_signalled: false,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "boot", status: "error", error: "ownership-unavailable", ...details });
    return ctx.error("E_BOOT_OWNERSHIP", "Started process ownership could not be verified.", {
      details,
      next_action: "Inspect the bounded boot log and rerun harness boot.",
    });
  }

  writeJson(paths.ownership, ownership);

  const probes = await pollServices(ctx, ownership, timeoutMs);
  if (!probes.ok) {
    const cleanup = await stopOwned(ctx, paths, ownership);
    const details = {
      delegated_command: "just run",
      ownership: {
        ownership_id: ownership.ownership_id,
        owned_pid: ownership.pid,
        process_group: ownership.process_group,
      },
      probes,
      cleanup,
      reconciliation,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "boot", status: "error", error: "readiness-timeout", ...details });
    return ctx.error("E_BOOT_READINESS", "Foundation readiness did not pass before the bounded timeout.", {
      details,
      next_action: "Inspect the boot log, fix the failed probe, and rerun harness boot.",
    });
  }

  const checksStarted = Date.now();
  const checksResult = await ctx.exec("harness", ["checks", "full", "--json"], {
    timeoutMs: 900_000,
  });
  let checksEnvelope: unknown = null;
  try {
    checksEnvelope = JSON.parse(checksResult.stdout);
  } catch {}
  const checks = {
    delegated_command: "harness checks full --json",
    exit_code: checksResult.code,
    duration_ms: Date.now() - checksStarted,
    envelope: checksEnvelope,
    stdout: bounded(checksResult.stdout),
    stderr: bounded(checksResult.stderr),
  };
  if (!checksResult.ok) {
    const cleanup = await stopOwned(ctx, paths, ownership);
    const details = {
      delegated_command: "just run",
      ownership: {
        ownership_id: ownership.ownership_id,
        owned_pid: ownership.pid,
        process_group: ownership.process_group,
      },
      probes,
      checks,
      cleanup,
      reconciliation,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "boot", status: "error", error: "checks-failed", ...details });
    return ctx.error("E_BOOT_CHECKS", "Foundation started but composed full checks failed.", {
      details,
      next_action: "Fix the authoritative full check failure, then rerun harness boot.",
    });
  }

  const data = {
    delegated_command: "just run",
    ownership: {
      ownership_id: ownership.ownership_id,
      owned_pid: ownership.pid,
      process_group: ownership.process_group,
      created_at: ownership.created_at,
    },
    services: { web: probes.web, server: probes.server },
    checks,
    reconciliation,
    duration_ms: Date.now() - started,
    ...evidencePaths(paths),
  };
  writeEvidence(paths, { operation: "boot", status: "ok", ...data });
  return ctx.ok(data, {
    evidence: [
      { label: "boot evidence", path: paths.evidenceRelative },
      { label: "boot log", path: paths.logRelative },
      { label: "owned runtime state", path: paths.ownershipRelative },
    ],
    next_action: "Use harness readiness before interaction and harness stop when finished.",
  });
}

async function readiness(ctx: V2VerbContext) {
  const started = Date.now();
  const paths = bootPaths(ctx.cwd);
  const ownership = loadOwnership(paths);
  if (ownership === null || !ownershipMatches(ownership)) {
    return ctx.error("E_READINESS_NOT_OWNED", "No live harness-owned foundation is available.", {
      details: {
        ownership_path: paths.ownershipRelative,
        unknown_processes_signalled: false,
        duration_ms: Date.now() - started,
      },
      next_action: "Run harness boot to create a verified owned runtime.",
    });
  }

  const probes = await probeServices(ownership);
  const data = {
    ownership: {
      ownership_id: ownership.ownership_id,
      owned_pid: ownership.pid,
      process_group: ownership.process_group,
    },
    services: { web: probes.web, server: probes.server },
    duration_ms: Date.now() - started,
    ...evidencePaths(paths),
  };
  writeEvidence(paths, { operation: "readiness", status: probes.ok ? "ok" : "error", ...data });
  return probes.ok
    ? ctx.ok(data, { evidence: [{ label: "readiness evidence", path: paths.evidenceRelative }] })
    : ctx.error("E_READINESS_FAILED", "One or more foundation readiness probes failed.", {
        details: data,
        next_action: "Inspect the boot log, then run harness stop before retrying boot.",
      });
}

async function stop(ctx: V2VerbContext) {
  const started = Date.now();
  const paths = bootPaths(ctx.cwd);
  mkdirSync(paths.directory, { recursive: true });
  if (!existsSync(paths.ownership)) {
    const data = {
      stopped: false,
      already_stopped: true,
      signals: [],
      unknown_processes_signalled: false,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "stop", status: "ok", ...data });
    return ctx.ok(data, { evidence: [{ label: "stop evidence", path: paths.evidenceRelative }] });
  }

  const ownership = loadOwnership(paths);
  if (ownership === null) {
    removeOwnership(paths);
    const data = {
      stopped: false,
      already_stopped: true,
      stale_state_removed: true,
      signals: [],
      unknown_processes_signalled: false,
      duration_ms: Date.now() - started,
      ...evidencePaths(paths),
    };
    writeEvidence(paths, { operation: "stop", status: "ok", ...data });
    return ctx.ok(data, { evidence: [{ label: "stop evidence", path: paths.evidenceRelative }] });
  }

  const result = await stopOwned(ctx, paths, ownership);
  const data = {
    ownership_id: ownership.ownership_id,
    owned_pid: ownership.pid,
    process_group: ownership.process_group,
    ...result,
    unknown_processes_signalled: false,
    duration_ms: Date.now() - started,
    ...evidencePaths(paths),
  };
  writeEvidence(paths, { operation: "stop", status: "ok", ...data });
  return ctx.ok(data, { evidence: [{ label: "stop evidence", path: paths.evidenceRelative }] });
}

export default defineExtension({
  name: "boot",
  summary: "Owns bounded Sparkta foundation boot, readiness, and cleanup.",
  verbs: {
    boot: {
      summary: "Starts just run, proves both foundations, and composes full checks.",
      options: [
        {
          flags: "--timeout-ms <milliseconds>",
          description: "Bound readiness polling from 1000 to 120000 milliseconds.",
          defaultValue: String(DEFAULT_BOOT_TIMEOUT_MS),
        },
      ],
      run: boot,
    },
    readiness: {
      summary: "Rechecks both services only for the verified harness-owned runtime.",
      run: readiness,
    },
    stop: {
      summary: "Stops only the verified harness-owned process group and clears ownership state.",
      run: stop,
    },
  },
});
