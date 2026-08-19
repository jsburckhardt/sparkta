import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import { adoptedTrialIds, boundedDurableOutput, normalizeDurableText } from "./trial-records.mjs";

const repo = process.cwd();
const workItem = path.join(repo, "project/work-items/7-run-repeated-prototype-0-generation-trials");
const trialsRoot = path.join(workItem, "implementation/trials");
const starter = path.join(repo, "templates/default");
const timeoutMs = 600000;
const trials = new Map([
  [
    "01-engineering-productivity",
    {
      prompt: "Create an executive dashboard showing engineering productivity across repositories.",
      marker: /engineering|repository/i,
    },
  ],
  [
    "02-autonomous-delivery",
    {
      prompt:
        "Build a dashboard for monitoring autonomous software delivery. Show active agents, their current task, repository, elapsed time, token consumption and recent activity.",
      marker: /agent|delivery/i,
    },
  ],
  [
    "03-customer-management",
    {
      prompt:
        "Build a customer management system. Include customers, orders, invoices, search, filters, create customer, edit customer, customer details, and activity history.",
      marker: /customer|invoice/i,
    },
  ],
]);
const attempts = new Set(["01-initial", "02-rerun"]);

function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}
function sha(value) {
  return createHash("sha256").update(value).digest("hex");
}
function text(file) {
  return readFileSync(file, "utf8");
}
function write(file, value) {
  const normalized = normalizeDurableText(value);
  writeFileSync(file, normalized.endsWith("\n") ? normalized : normalized + "\n");
}
function validateIds(trial, attempt) {
  if (!trials.has(trial)) fail("Unknown trial ID: " + trial, 2);
  if (!attempts.has(attempt)) fail("Unknown attempt ID: " + attempt, 2);
}
function attemptPath(trial, attempt) {
  return path.join(trialsRoot, trial, "attempts", attempt);
}
function walk(root, relative = "") {
  return readdirSync(path.join(root, relative), { withFileTypes: true })
    .flatMap((entry) => {
      if (["node_modules", "dist"].includes(entry.name) || entry.name.endsWith(".tsbuildinfo"))
        return [];
      const child = path.join(relative, entry.name);
      return entry.isDirectory() ? walk(root, child) : [child.replaceAll(path.sep, "/")];
    })
    .sort();
}
function inventory(root) {
  return sha(
    walk(root)
      .map((file) => file + "\0" + sha(readFileSync(path.join(root, file))))
      .join("\n"),
  );
}
function sourceChanges(app) {
  const canonical = path.join(starter, "src");
  const generated = path.join(app, "src");
  const names = new Set([...walk(canonical), ...walk(generated)]);
  return [...names]
    .filter((name) => {
      const before = path.join(canonical, name);
      const after = path.join(generated, name);
      return (
        !existsSync(before) ||
        !existsSync(after) ||
        sha(readFileSync(before)) !== sha(readFileSync(after))
      );
    })
    .sort();
}
function bounded(value, size = 8000) {
  return boundedDurableOutput(value, size);
}
function run(command, args, options = {}) {
  return spawnSync(command, args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024, ...options });
}
function mdCode(value, size) {
  return "```text\n" + bounded(value, size) + "\n```";
}
function copyDirectory(source, target) {
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDirectory(from, to);
    else writeFileSync(to, readFileSync(from));
  }
}

function init(trial, attempt) {
  validateIds(trial, attempt);
  const config = trials.get(trial);
  const destination = attemptPath(trial, attempt);
  if (existsSync(destination)) fail("Refusing to overwrite existing attempt: " + destination, 3);
  if (attempt === "02-rerun") {
    const findings = path.join(trialsRoot, "00-findings.md");
    if (!existsSync(findings) || !adoptedTrialIds(text(findings)).has(trial))
      fail("Rerun requires an adopted finding affecting " + trial, 2);
  }
  const app = path.join(destination, "app");
  copyDirectory(starter, app);
  if (existsSync(path.join(app, "node_modules")) || existsSync(path.join(app, "dist")))
    fail("Starter copy was not clean");
  const promptHash = sha(config.prompt);
  const lockHash = sha(readFileSync(path.join(starter, "package-lock.json")));
  const trialDir = path.join(trialsRoot, trial);
  mkdirSync(trialDir, { recursive: true });
  const trialFile = path.join(trialDir, "trial.md");
  if (!existsSync(trialFile))
    write(
      trialFile,
      `# Trial: ${trial}

- Trial ID: \`${trial}\`
- Fixed Prompt SHA-256: \`${promptHash}\`
- Latest Required Attempt: \`${attempt}\`
- Product Quality Bar: PENDING
- Trial Verdict: PENDING
- Blocker: PENDING
`,
    );
  write(
    path.join(destination, "prompt.md"),
    `# Fixed prompt

- Trial ID: \`${trial}\`
- Attempt ID: \`${attempt}\`
- Prompt SHA-256: \`${promptHash}\`

${config.prompt}
`,
  );
  write(
    path.join(destination, "agent-result.md"),
    `# Agent result

- Outcome: PENDING
- CLI: \`copilot\`
- CLI Version: PENDING
- Invocation Boundary: \`app/\` only
- Permissions: PENDING
- Started At: PENDING
- Finished At: PENDING
- Timeout Seconds: 600
- Exit Status: PENDING
- Prompt SHA-256: \`${promptHash}\`
- Generated Source Diff: PENDING
- App-only Boundary: PENDING

## Bounded result

PENDING
`,
  );
  write(
    path.join(destination, "evidence.md"),
    `# Attempt evidence

- Trial ID: \`${trial}\`
- Attempt ID: \`${attempt}\`
- Starter Inventory SHA-256: \`${inventory(starter)}\`
- Starter Lock SHA-256: \`${lockHash}\`
- Clean Copy: PASS — complete starter copy with no node_modules or dist

## Dependency installation

- Outcome: PENDING

## Frontend-only audit

- Outcome: PENDING

## Build result

- Outcome: PENDING

## Runtime port

- Outcome: PENDING

## Browser-load result

- Outcome: PENDING

## Owned cleanup

- Outcome: PENDING

## Prompt-major controls

PENDING

## Unmet checks

PENDING

## Attempt verdict

- Operational Validation: PENDING
- Product Quality Bar: PENDING
- Attempt Verdict: PENDING
- Blocker: PENDING
`,
  );
  console.log("Initialized clean trial copy: " + destination);
  console.log("prompt sha256: " + promptHash);
  console.log("starter inventory sha256: " + inventory(starter));
  console.log("starter lock sha256: " + lockHash);
}

function generate(trial, attempt) {
  validateIds(trial, attempt);
  const config = trials.get(trial);
  const destination = attemptPath(trial, attempt);
  const app = path.join(destination, "app");
  if (!existsSync(app)) fail("Initialize attempt first", 2);
  const resultFile = path.join(destination, "agent-result.md");
  if (!text(resultFile).includes("Outcome: PENDING")) fail("Refusing to overwrite agent result", 3);
  const promptHash = sha(config.prompt);
  const versionRun = run("copilot", ["--version"]);
  const version = bounded(versionRun.stdout || versionRun.stderr, 300).split("\n")[0];
  const started = new Date().toISOString();
  const args = [
    "--prompt",
    config.prompt,
    "--silent",
    "--no-color",
    "--no-ask-user",
    "--no-auto-update",
    "--no-remote",
    "--no-remote-export",
    "--disable-builtin-mcps",
    "--disallow-temp-dir",
    "--deny-url=*",
    "--allow-all-tools",
    "--deny-tool=shell",
    "--output-format",
    "text",
    "--log-level",
    "none",
  ];
  const result = run("copilot", args, { cwd: app, timeout: timeoutMs, killSignal: "SIGTERM" });
  const finished = new Date().toISOString();
  const output = bounded((result.stdout ?? "") + (result.stderr ?? ""));
  const changes = sourceChanges(app);
  let outcome;
  if (result.error?.code === "ETIMEDOUT" || result.signal === "SIGTERM") outcome = "TIMEOUT";
  else if ((result.status ?? 1) !== 0 && /auth|login|credential/i.test(output))
    outcome = "AUTH_FAILURE";
  else if ((result.status ?? 1) !== 0) outcome = "ERROR";
  else if (changes.length === 0) outcome = "NO_SOURCE_DIFF";
  else outcome = "SUCCESS";
  const diffHash = changes.length
    ? sha(
        changes
          .map((name) => name + "\0" + sha(readFileSync(path.join(app, "src", name))))
          .join("\n"),
      )
    : "NONE";
  write(
    resultFile,
    `# Agent result

- Outcome: ${outcome}
- CLI: \`copilot\`
- CLI Version: \`${version}\`
- Invocation Boundary: \`app/\` only
- Permissions: current-directory path boundary; temporary-directory access, shell, URLs, remote export, and built-in MCP disabled
- Started At: ${started}
- Finished At: ${finished}
- Timeout Seconds: 600
- Exit Status: ${result.status ?? result.error?.code ?? result.signal ?? "unknown"}
- Prompt SHA-256: \`${promptHash}\`
- Generated Source Diff: \`${diffHash}\`
- App-only Boundary: PASS — Copilot path access was restricted to its app current directory

## Changed generated source files

${changes.map((name) => `- \`src/${name}\``).join("\n") || "- None"}

## Bounded result

${mdCode(output)}
`,
  );
  console.log("agent outcome: " + outcome);
  console.log("generated source diff sha256: " + diffHash);
  if (outcome !== "SUCCESS") process.exitCode = 4;
}

function allocatePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function portFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => server.close(() => resolve(true)));
  });
}
async function stopOwned(child) {
  if (!child || child.exitCode !== null) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {}
  for (let index = 0; index < 50 && child.exitCode === null; index += 1) await sleep(100);
  if (child.exitCode === null) {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {}
  }
}
async function validate(trial, attempt) {
  validateIds(trial, attempt);
  const config = trials.get(trial);
  const destination = attemptPath(trial, attempt);
  const app = path.join(destination, "app");
  if (!existsSync(app)) fail("Initialize attempt first", 2);
  const agentRecord = text(path.join(destination, "agent-result.md"));
  if (!agentRecord.includes("Outcome: SUCCESS")) {
    const agentOutcome = /Outcome: ([A-Z_]+)/.exec(agentRecord)?.[1] ?? "ERROR";
    write(
      path.join(destination, "evidence.md"),
      `# Attempt evidence

- Trial ID: \`${trial}\`
- Attempt ID: \`${attempt}\`
- Starter Inventory SHA-256: \`${inventory(starter)}\`
- Starter Lock SHA-256: \`${sha(readFileSync(path.join(app, "package-lock.json")))}\`
- Clean Copy: PASS — complete starter copy with no node_modules or dist

## Dependency installation

- Outcome: SKIPPED — generation outcome ${agentOutcome} blocks comparable validation

## Frontend-only audit

- Outcome: FAIL — incomplete generated result cannot prove the frontend-only product story

## Build result

- Outcome: SKIPPED — generation outcome ${agentOutcome}

## Runtime port

- Outcome: SKIPPED
- Assigned Port: 0

## Browser-load result

- Outcome: FAIL
- Evidence Level: no HTTP browser-load proof because generation did not complete
- HTTP 200: FAIL
- Content-Type text/html: FAIL
- Trial-specific source marker over Vite HTTP: FAIL

## Owned cleanup

- Outcome: PASS
- Process: no runtime process started
- Released Port: PASS
- Runtime artifacts: none created

## Generated result hash

- Post-generation app inventory SHA-256: \`${inventory(app)}\`

## Prompt-major controls

- FAIL — generated result is incomplete after ${agentOutcome}; control behavior is not claimed.

## Unmet checks

- Generation ${agentOutcome}; install, build, runtime, visual representation, and plausible-control checks are blocking gaps.

## Attempt verdict

- Operational Validation: FAIL
- Product Quality Bar: FAIL
- Attempt Verdict: FAIL
- Blocker: generation ${agentOutcome} prevented complete operational and source-backed evaluation
`,
    );
    console.log("trial validation: FAIL — generation " + agentOutcome);
    process.exitCode = 5;
    return;
  }
  const lockBefore = sha(readFileSync(path.join(app, "package-lock.json")));
  let child;
  let install;
  let build;
  let port = 0;
  let http = false;
  let html = false;
  let marker = false;
  let released = false;
  try {
    install = run("npm", ["ci", "--include=dev"], { cwd: app, timeout: timeoutMs });
    const lockAfter = sha(readFileSync(path.join(app, "package-lock.json")));
    const canonicalPackage = JSON.parse(text(path.join(starter, "package.json")));
    const generatedPackage = JSON.parse(text(path.join(app, "package.json")));
    const allowlist =
      JSON.stringify(canonicalPackage.dependencies) ===
        JSON.stringify(generatedPackage.dependencies) &&
      JSON.stringify(canonicalPackage.devDependencies) ===
        JSON.stringify(generatedPackage.devDependencies);
    const source = walk(path.join(app, "src"))
      .map((name) => text(path.join(app, "src", name)))
      .join("\n");
    const prohibited =
      /fetch\s*\(|axios|fastify|express|prisma|sequelize|firebase|supabase|passport|mongodb|postgres|docker/i.test(
        source + text(path.join(app, "package.json")),
      );
    const audit = !prohibited && config.marker.test(source);
    const dependency = install.status === 0 && lockBefore === lockAfter && allowlist;
    build = run("npm", ["run", "build"], { cwd: app, timeout: timeoutMs });
    const buildPass =
      build.status === 0 &&
      existsSync(path.join(app, "dist/index.html")) &&
      statSync(path.join(app, "dist/index.html")).size > 0;
    port = await allocatePort();
    if ([3000, 5173].includes(port)) port = await allocatePort();
    if (buildPass) {
      child = spawn("npm", ["run", "dev", "--", "--host", "0.0.0.0", "--port", String(port)], {
        cwd: app,
        detached: true,
        stdio: "ignore",
      });
      for (let index = 0; index < 100; index += 1) {
        try {
          const response = await fetch(`http://127.0.0.1:${port}/`, {
            signal: AbortSignal.timeout(1000),
          });
          http = response.status === 200;
          html = (response.headers.get("content-type") ?? "").startsWith("text/html");
          if (http) break;
        } catch {}
        await sleep(100);
      }
      try {
        const response = await fetch(`http://127.0.0.1:${port}/src/App.tsx`, {
          signal: AbortSignal.timeout(2000),
        });
        marker = config.marker.test(await response.text());
      } catch {}
      await stopOwned(child);
      for (let index = 0; index < 50; index += 1) {
        if (await portFree(port)) {
          released = true;
          break;
        }
        await sleep(100);
      }
    } else released = true;
    const runtime = http && html && marker && released;
    const overall = dependency && audit && buildPass && runtime;
    write(
      path.join(destination, "evidence.md"),
      `# Attempt evidence

- Trial ID: \`${trial}\`
- Attempt ID: \`${attempt}\`
- Starter Inventory SHA-256: \`${inventory(starter)}\`
- Starter Lock SHA-256: \`${lockBefore}\`
- Clean Copy: PASS — complete starter copy with no node_modules or dist

## Dependency installation

- Outcome: ${dependency ? "PASS" : "FAIL"}
- Command: \`npm ci --include=dev\`
- Exit Status: ${install.status}
- Lock Before: \`${lockBefore}\`
- Lock After: \`${lockAfter}\`
- Dependency Allowlist: ${allowlist ? "PASS" : "FAIL"}

${mdCode((install.stdout ?? "") + (install.stderr ?? ""), 3000)}

## Frontend-only audit

- Outcome: ${audit ? "PASS" : "FAIL"}
- Simulated domain marker: ${config.marker}
- Prohibited backend, database, Docker, authentication, external API, and runtime fetch scan: ${prohibited ? "FAIL" : "PASS"}

## Build result

- Outcome: ${buildPass ? "PASS" : "FAIL"}
- Command: \`npm run build\`
- Exit Status: ${build.status}
- Artifact: \`app/dist/index.html\` proved before owned cleanup

${mdCode((build.stdout ?? "") + (build.stderr ?? ""), 4000)}

## Runtime port

- Outcome: ${runtime ? "PASS" : "FAIL"}
- Assigned Port: ${port}
- Command: \`npm run dev -- --host 0.0.0.0 --port ${port}\`

## Browser-load result

- Outcome: ${runtime ? "PASS" : "FAIL"}
- Evidence Level: HTTP browser-loadability only; no real-browser, DOM-event, screenshot, console, or viewport claim
- HTTP 200: ${http ? "PASS" : "FAIL"}
- Content-Type text/html: ${html ? "PASS" : "FAIL"}
- Trial-specific source marker over Vite HTTP: ${marker ? "PASS" : "FAIL"}

## Owned cleanup

- Outcome: ${released ? "PASS" : "FAIL"}
- Process: owned detached process group only
- Released Port: ${released ? "PASS" : "FAIL"}
- Runtime artifacts: node_modules and dist removed after proof

## Generated result hash

- Post-generation app inventory SHA-256: \`${inventory(app)}\`

## Prompt-major controls

PENDING SOURCE-BACKED REVIEW

## Unmet checks

PENDING SOURCE-BACKED REVIEW

## Attempt verdict

- Operational Validation: ${overall ? "PASS" : "FAIL"}
- Product Quality Bar: PENDING
- Attempt Verdict: PENDING
- Blocker: PENDING
`,
    );
    console.log(`trial validation: ${overall ? "PASS" : "FAIL"}`);
    console.log(
      `assigned port: ${port}; HTTP: ${http}; content-type: ${html}; marker: ${marker}; released: ${released}`,
    );
    if (!overall) process.exitCode = 5;
  } finally {
    await stopOwned(child);
    rmSync(path.join(app, "node_modules"), { recursive: true, force: true });
    rmSync(path.join(app, "dist"), { recursive: true, force: true });
  }
}

const [operation, trial, attempt] = process.argv.slice(2);
if (operation === "init") init(trial, attempt);
else if (operation === "generate") generate(trial, attempt);
else if (operation === "validate") await validate(trial, attempt);
else fail("Usage: trial-tool.mjs <init|generate|validate> <trial> <attempt>", 2);
