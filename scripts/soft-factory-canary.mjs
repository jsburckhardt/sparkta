import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { buildHelperInvocation, executeHelper, parseLaunchBinding } from "./runner-integration-adapter.mjs";

const require = createRequire(import.meta.url);
const globalRoot = process.env.SOFT_FACTORY_GLOBAL_ROOT;
assert.ok(globalRoot, "SOFT_FACTORY_GLOBAL_ROOT is required");
const integration = require(path.join(globalRoot, "soft-factory-runner/dist/integration.js"));

class MemoryFiles {
  constructor() { this.values = new Map(); }
  async readText(filePath) { return this.values.get(filePath) ?? null; }
  async exclusiveCreate(filePath, content) { if (this.values.has(filePath)) return false; this.values.set(filePath, content); return true; }
  async immutableWrite(filePath, content) { return this.exclusiveCreate(filePath, content); }
  async atomicWrite(filePath, content) { this.values.set(filePath, content); }
}
const snapshot = (launch, progress = null, state = "running") => ({ schemaVersion: 4, runId: launch.runId, attempt: launch.attempt, issueNumber: launch.issueNumber, branch: launch.branch, state, updatedAt: launch.startedAt, integrationLaunch: launch, progress, finalization: null });
const progressFact = (launch, sequence, phase, status, updatedAt) => ({ schemaVersion: 1, runId: launch.runId, attempt: launch.attempt, issueNumber: launch.issueNumber, branch: launch.branch, sequence, phase, status, updatedAt });

const tempRoot = await mkdtemp(path.join(tmpdir(), "sparkta-soft-factory-canary-"));
try {
  const launch = integration.integrationLaunch({ runId: "synthetic-run-canary", attempt: 1, issueNumber: 999999, branch: "synthetic/canary", worktreePath: tempRoot, startedAt: "2026-08-14T00:00:00.000Z", requiredFinalValidation: { command: "just verify" } });
  assert.deepEqual(parseLaunchBinding(JSON.stringify(launch)), launch);
  const captured = [];
  const stub = (command, args, options) => { captured.push({ command, args, options }); return { status: 0 }; };
  executeHelper({ operation: "progress", binding: launch, phase: "research", status: "running" }, stub);
  executeHelper({ operation: "publish-result", binding: launch }, stub);
  executeHelper({ operation: "validate-result", binding: launch }, stub);
  assert.deepEqual(captured.map(({ command, args, options }) => ({ command, args, shell: options.shell })), [
    { command: "soft-factory", args: ["internal", "publish-progress", "--issue", "999999", "--phase", "research", "--status", "running"], shell: false },
    { command: "soft-factory", args: ["internal", "publish-result", "--issue", "999999", "--candidate", ".soft-factory/agent-result.candidate.json"], shell: false },
    { command: "soft-factory", args: ["internal", "validate-result", "--issue", "999999"], shell: false },
  ]);
  assert.throws(() => buildHelperInvocation({ operation: "progress", binding: { ...launch, publishProgressCommand: "soft-factory internal publish-progress; gh issue edit 3" }, phase: "research", status: "running" }));

  const files = new MemoryFiles();
  let current = snapshot(launch);
  const transitions = [["research", "running", "2026-08-14T00:00:01.000Z"], ["plan", "running", "2026-08-14T00:00:02.000Z"], ["implement", "running", "2026-08-14T00:00:03.000Z"], ["verify", "running", "2026-08-14T00:00:04.000Z"], ["terminal", "succeeded", "2026-08-14T00:00:05.000Z"]];
  for (const [phase, status, now] of transitions) { const accepted = await integration.publishProgress(files, launch, current, phase, status, now); current = snapshot(launch, accepted); }
  const terminalBytes = await files.readText(launch.progressPath);
  await assert.rejects(() => integration.publishProgress(files, launch, current, "terminal", "succeeded", "2026-08-14T00:00:06.000Z"));
  assert.equal(await files.readText(launch.progressPath), terminalBytes);

  const prior = progressFact(launch, 2, "plan", "running", "2026-08-14T00:00:02.000Z");
  const base = snapshot(launch, prior);
  const cases = [["PROGRESS_CONFLICT", progressFact(launch, 4, "implement", "running", "2026-08-14T00:00:03.000Z")], ["PROGRESS_REGRESSED", progressFact(launch, 1, "research", "running", "2026-08-14T00:00:01.000Z")], ["PROGRESS_STALE", progressFact(launch, 3, "implement", "running", "2026-08-13T23:59:59.000Z")], ["PROGRESS_IDENTITY_MISMATCH", { ...progressFact(launch, 3, "implement", "running", "2026-08-14T00:00:03.000Z"), branch: "wrong" }]];
  for (const [expected, fact] of cases) assert.equal(integration.classifyProgress({ text: JSON.stringify(fact), snapshot: base, observedAt: "2026-08-14T00:00:10.000Z" }).classification, expected);
  assert.equal(integration.classifyProgress({ text: JSON.stringify(prior), snapshot: base, observedAt: "2026-08-14T00:00:10.000Z" }).classification, "PROGRESS_REPEATED");
  assert.equal(integration.classifyProgress({ text: JSON.stringify(progressFact(launch, 3, "implement", "running", "2026-08-14T00:00:03.000Z")), snapshot: snapshot(launch, prior, "completed"), observedAt: "2026-08-14T00:00:10.000Z" }).classification, "PROGRESS_LATE");

  const binding = { issueNumber: launch.issueNumber, branch: launch.branch, headSha: "a".repeat(40), prNumber: 999999, requiredAcceptanceCriteria: [{ id: "AC-1", text: "Synthetic criterion" }], requiredFinalValidation: launch.requiredFinalValidation };
  const result = { schemaVersion: 1, issueNumber: binding.issueNumber, outcome: "succeeded", branch: binding.branch, headSha: binding.headSha, prNumber: binding.prNumber, acceptanceCriteria: [{ id: "AC-1", status: "verified", evidence: ["synthetic:AC-1"] }], validations: [{ command: "just verify", status: "passed" }], requiredFinalValidation: { command: "just verify", status: "passed", evidence: ["synthetic:snapshot"] }, completedAt: "2026-08-14T00:00:06.000Z" };
  const candidate = JSON.stringify(result, null, 2) + "\n";
  assert.deepEqual(integration.validateBoundResult(candidate, binding), result);
  await integration.publishAgentResult(files, launch.resultPath, candidate, binding);
  const resultBytes = await files.readText(launch.resultPath);
  await integration.publishAgentResult(files, launch.resultPath, candidate, binding);
  assert.equal(await files.readText(launch.resultPath), resultBytes);
  await assert.rejects(() => integration.publishAgentResult(files, launch.resultPath, JSON.stringify({ ...result, completedAt: "2026-08-14T00:00:07.000Z" }), binding));
  assert.equal(await files.readText(launch.resultPath), resultBytes);
  for (const invalid of [{ ...result, headSha: "b".repeat(40) }, { ...result, prNumber: 999998 }, { ...result, acceptanceCriteria: [] }, { ...result, requiredFinalValidation: { command: "just other", status: "passed", evidence: ["wrong"] } }]) assert.throws(() => integration.validateBoundResult(JSON.stringify(invalid), binding));
  console.log(JSON.stringify({ schemaVersion: 1, syntheticIssueNumber: launch.issueNumber, networkCalls: 0, realRunnerStateWrites: 0, adapterInvocations: captured.length, progressCases: transitions.length + cases.length + 3, resultCases: 8, noClobberPreserved: true, shellExecution: false }));
} finally { await rm(tempRoot, { recursive: true }); }
