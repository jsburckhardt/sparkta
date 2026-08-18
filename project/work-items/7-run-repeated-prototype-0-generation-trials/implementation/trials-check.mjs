import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { adoptedTrialIds, trailingWhitespaceLines } from "./trial-records.mjs";

const root = path.join(
  process.cwd(),
  "project/work-items/7-run-repeated-prototype-0-generation-trials/implementation/trials",
);
const starter = path.join(process.cwd(), "templates/default");
const catalog = [
  [
    "01-engineering-productivity",
    "Create an executive dashboard showing engineering productivity across repositories.",
  ],
  [
    "02-autonomous-delivery",
    "Build a dashboard for monitoring autonomous software delivery. Show active agents, their current task, repository, elapsed time, token consumption and recent activity.",
  ],
  [
    "03-customer-management",
    "Build a customer management system. Include customers, orders, invoices, search, filters, create customer, edit customer, customer details, and activity history.",
  ],
];
const errors = [];
const sha = (value) => createHash("sha256").update(value).digest("hex");
const text = (file) => readFileSync(file, "utf8");
const requireFile = (file) => {
  if (!existsSync(file)) errors.push("Missing file: " + path.relative(process.cwd(), file));
  return existsSync(file);
};
const requireMatch = (value, expression, label) => {
  if (!expression.test(value)) errors.push("Missing or invalid " + label);
};
const walk = (directory, relative = "") =>
  readdirSync(path.join(directory, relative), { withFileTypes: true })
    .flatMap((entry) => {
      if (["node_modules", "dist"].includes(entry.name) || entry.name.endsWith(".tsbuildinfo"))
        return [];
      const child = path.join(relative, entry.name);
      return entry.isDirectory() ? walk(directory, child) : [child.replaceAll(path.sep, "/")];
    })
    .sort();
const inventory = (directory) =>
  sha(
    walk(directory)
      .map((file) => file + "\0" + sha(readFileSync(path.join(directory, file))))
      .join("\n"),
  );
const sourceChanged = (app) => {
  const before = path.join(starter, "src");
  const after = path.join(app, "src");
  const names = new Set([...walk(before), ...walk(after)]);
  return [...names].some(
    (name) =>
      !existsSync(path.join(before, name)) ||
      !existsSync(path.join(after, name)) ||
      sha(readFileSync(path.join(before, name))) !== sha(readFileSync(path.join(after, name))),
  );
};

if (!existsSync(root)) errors.push("Trial evidence root is missing");
else {
  const actual = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const expected = catalog.map(([id]) => id);
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    errors.push("Trial directory set must be exactly: " + expected.join(", "));
}

const findingsFile = path.join(root, "00-findings.md");
const findings = requireFile(findingsFile) ? text(findingsFile) : "";
const adoptedTrials = adoptedTrialIds(findings);
const knownTrials = new Set(catalog.map(([trial]) => trial));
for (const trial of adoptedTrials) {
  if (!knownTrials.has(trial)) errors.push("Adopted finding names unknown trial: " + trial);
}

let passCount = 0;
for (const [trial, prompt] of catalog) {
  const trialRoot = path.join(root, trial);
  const trialFile = path.join(trialRoot, "trial.md");
  if (!requireFile(trialFile)) continue;
  const trialText = text(trialFile);
  const latest = /Latest Required Attempt: `([^`]+)`/.exec(trialText)?.[1];
  const expectedLatest = adoptedTrials.has(trial) ? "02-rerun" : "01-initial";
  if (latest !== expectedLatest)
    errors.push(`Latest attempt for ${trial} must be ${expectedLatest}`);
  const attemptsRoot = path.join(trialRoot, "attempts");
  const attemptIds = existsSync(attemptsRoot)
    ? readdirSync(attemptsRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
    : [];
  const expectedAttempts = adoptedTrials.has(trial) ? ["01-initial", "02-rerun"] : ["01-initial"];
  if (JSON.stringify(attemptIds) !== JSON.stringify(expectedAttempts))
    errors.push(`Attempt set for ${trial} must be exactly: ${expectedAttempts.join(", ")}`);
  for (const attemptId of expectedAttempts) {
    const attemptPath = path.join(attemptsRoot, attemptId);
    for (const record of [
      "prompt.md",
      "agent-result.md",
      "evidence.md",
      "app/AGENTS.md",
      "app/QUALITY-CHECKLIST.md",
      "app/package-lock.json",
      "app/src/App.tsx",
    ])
      requireFile(path.join(attemptPath, record));
    if (!existsSync(attemptPath)) continue;
    const attemptPrompt = text(path.join(attemptPath, "prompt.md"));
    if (!attemptPrompt.endsWith(prompt + "\n"))
      errors.push(`Fixed prompt text changed for ${trial}/${attemptId}`);
    if (!attemptPrompt.includes(sha(prompt)))
      errors.push(`Prompt hash mismatch for ${trial}/${attemptId}`);
    const attemptAgent = text(path.join(attemptPath, "agent-result.md"));
    const whitespaceLines = trailingWhitespaceLines(attemptAgent);
    if (whitespaceLines.length)
      errors.push(
        `Durable agent result has trailing whitespace for ${trial}/${attemptId} on line(s): ${whitespaceLines.join(", ")}`,
      );
    if (attemptId === "02-rerun") {
      const attemptEvidence = text(path.join(attemptPath, "evidence.md"));
      requireMatch(
        attemptEvidence,
        new RegExp(`Starter Inventory SHA-256: \`${inventory(starter)}\``),
        `fresh canonical starter inventory for ${trial}/${attemptId}`,
      );
      if (text(path.join(attemptPath, "app/AGENTS.md")) !== text(path.join(starter, "AGENTS.md")))
        errors.push(`Rerun copied guidance differs from canonical guidance for ${trial}`);
    }
  }
  const attempt = path.join(trialRoot, "attempts", latest ?? "missing");
  if (!existsSync(attempt)) {
    errors.push("Latest attempt path is missing for " + trial);
    continue;
  }
  const promptText = text(path.join(attempt, "prompt.md"));
  if (!promptText.endsWith(prompt + "\n")) errors.push("Fixed prompt text changed for " + trial);
  if (!promptText.includes(sha(prompt))) errors.push("Prompt hash mismatch for " + trial);
  const agent = text(path.join(attempt, "agent-result.md"));
  const outcome = /Outcome: (SUCCESS|UNAVAILABLE|AUTH_FAILURE|TIMEOUT|ERROR|NO_SOURCE_DIFF)/.exec(
    agent,
  )?.[1];
  if (!outcome) errors.push("Agent outcome is not finite for " + trial);
  requireMatch(agent, /Timeout Seconds: 600/, "generation timeout for " + trial);
  requireMatch(agent, /App-only Boundary: PASS/, "app-only proof for " + trial);
  if (outcome === "SUCCESS") {
    requireMatch(
      agent,
      /Generated Source Diff: `(?!NONE)[a-f0-9]{64}`/,
      "source diff hash for " + trial,
    );
    if (!sourceChanged(path.join(attempt, "app")))
      errors.push("Successful generation has no source diff for " + trial);
  }
  const evidence = text(path.join(attempt, "evidence.md"));
  for (const heading of [
    "Dependency installation",
    "Frontend-only audit",
    "Build result",
    "Runtime port",
    "Browser-load result",
    "Owned cleanup",
    "Prompt-major controls",
    "Unmet checks",
    "Attempt verdict",
  ])
    requireMatch(evidence, new RegExp("## " + heading), heading + " heading for " + trial);
  if (evidence.includes("PENDING")) errors.push("Pending attempt evidence remains for " + trial);
  requireMatch(evidence, /Assigned Port: (?!3000|5173)\d+/, "nondefault runtime port for " + trial);
  requireMatch(evidence, /HTTP 200: (PASS|FAIL)/, "HTTP verdict for " + trial);
  requireMatch(evidence, /Released Port: (PASS|FAIL)/, "released-port verdict for " + trial);
  const checklist = text(path.join(attempt, "app/QUALITY-CHECKLIST.md"));
  if (checklist.includes("PASS / FAIL") || checklist.includes("PASS / FAIL / N/A"))
    errors.push("Incomplete checklist outcomes for " + trial);
  const completedRows = checklist
    .split("\n")
    .filter((line) => line.startsWith("|") && /\| (PASS|FAIL|N\/A —)/.test(line)).length;
  if (completedRows !== 12)
    errors.push(
      "Checklist must contain 12 completed checks for " + trial + "; found " + completedRows,
    );
  const attemptVerdict = /Attempt Verdict: (PASS|FAIL)/.exec(evidence)?.[1];
  const qualityBar = /Product Quality Bar: (PASS|FAIL)/.exec(evidence)?.[1];
  const trialVerdict = /Trial Verdict: (PASS|FAIL)/.exec(trialText)?.[1];
  if (
    !attemptVerdict ||
    !qualityBar ||
    !trialVerdict ||
    attemptVerdict !== qualityBar ||
    trialVerdict !== attemptVerdict
  )
    errors.push("Verdict chain mismatch for " + trial);
  if (trialVerdict === "PASS") {
    passCount += 1;
    for (const item of [
      "Build",
      "Start",
      "Visually represents request",
      "Major controls plausible",
      "Story-supporting data",
      "Not unfinished scaffold",
    ])
      requireMatch(
        evidence,
        new RegExp("- " + item + ": PASS"),
        item + " quality-bar item for " + trial,
      );
  }
  if (trialVerdict === "FAIL")
    requireMatch(trialText, /Blocker: (?!None|PENDING).+/, "trial blocker for " + trial);
  if (
    existsSync(path.join(attempt, "app/node_modules")) ||
    existsSync(path.join(attempt, "app/dist"))
  )
    errors.push("Non-durable runtime artifacts remain for " + trial);
}

if (findings) {
  if (findings.includes("PENDING")) errors.push("Pending findings remain");
  requireMatch(findings, /Disposition: (PROPOSED|ADOPTED|DEFERRED)/, "finding disposition");
  requireMatch(findings, /Adoption Batch: (NONE|ONE)/, "adoption batch");
  const batch = /Adoption Batch: (NONE|ONE)/.exec(findings)?.[1];
  const expectedBatch = adoptedTrials.size ? "ONE" : "NONE";
  if (batch !== expectedBatch) errors.push(`Adoption batch must be ${expectedBatch}`);
  for (const [trial] of catalog) {
    const rerun = existsSync(path.join(root, trial, "attempts/02-rerun"));
    if (rerun !== adoptedTrials.has(trial))
      errors.push(`Rerun/adopted finding mismatch for ${trial}`);
  }
  const overall = /Overall Prototype 0 Verdict: (PASS|FAIL)/.exec(findings)?.[1];
  const expected = passCount === 3 ? "PASS" : "FAIL";
  if (overall !== expected)
    errors.push("Overall verdict must be " + expected + " from three trial verdicts");
  if (overall === "FAIL") requireMatch(findings, /Overall Blocker: (?!None).+/, "overall blocker");
}

if (errors.length) {
  console.error("trials-check: FAIL");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log(
  "trials-check: PASS — three fixed prompts, complete attempts, findings graph, and verdict arithmetic are consistent",
);
