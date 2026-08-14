import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const digest = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const expectedAssets = [
  ["agent", "soft-factory", ".agents/agents/soft-factory.agent.md", "46b96e18bbf06178c8163d34bd0698ec82c80015af782c22ce6bc44527ced760"],
  ["agent", "soft-factory-assessor", ".agents/agents/soft-factory-assessor.agent.md", "40054f0959a92710cdaed42b8bb870867faae29d5e3c1acf6087349762b7ed3d"],
  ["skill", "soft-factory", ".agents/skills/soft-factory/SKILL.md", "07d0c15bb765281f7d47cb0d8e1784b70cb5d2ec06f3943880420f8c579d3b6f"],
];

const manifest = JSON.parse(read(".agents/manifest.json"));
assert.deepEqual(Object.keys(manifest), ["schemaVersion", "assets"]);
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.assets.length, expectedAssets.length);
for (const [index, [type, name, destination, sha256]] of expectedAssets.entries()) {
  assert.deepEqual(manifest.assets[index], { type, name, version: "0.1.0", runnerProtocol: 1, destination, sha256 });
  assert.equal(digest(destination), sha256);
}
assert.equal(digest(".agents/manifest.json"), "e57667a0f61e5025a6022b412744281fe6418f39bebe885e3f6e34b5a1a6a857");
assert.deepEqual(readdirSync(".agents/skills", { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort(), ["eng-harness-0-harnessability-assessment", "eng-harness-flow", "grill-agent-done", "soft-factory"]);
assert.equal(read(".soft-factory/config.yml"), "protocol_version: 1\nrepository:\n  worktree_root: .trees\n  state_root: .soft-factory\nrpiv:\n  final_validation: just verify\nexecution:\n  max_concurrent_runs: 1\n");

const rpiv = read(".github/agents/rpiv.agent.md");
assert.match(rpiv, /^runner_protocol: 1$/m);
assert.match(rpiv, /^result_contract: agent-result-v1$/m);
for (const phrase of ["injected helpers", "terminal failed publication", "injected validator", "MUST NOT read or write Runner operational state directly"]) assert.ok(rpiv.includes(phrase));
const verifier = read(".github/agents/rpiv-verifier.agent.md");
for (const phrase of ["injected no-clobber helper", "snapshotted final validation", "independent confirmation", "MUST NOT replace an existing Runner result"]) assert.ok(verifier.includes(phrase));

const directCommands = [
  "soft-factory --help",
  "soft-factory instructions --json",
  "soft-factory install --recommended",
  "soft-factory doctor --json",
  "soft-factory run --issue <ISSUE_NUMBER> --json",
  "soft-factory list --json",
  "soft-factory status <ISSUE_NUMBER> --json",
  "soft-factory reconcile <ISSUE_NUMBER> --json",
  "soft-factory resume <ISSUE_NUMBER> --json",
  "soft-factory stop <ISSUE_NUMBER> --json",
  "soft-factory clean <ISSUE_NUMBER> --json",
  "soft-factory attach <ISSUE_NUMBER>",
  "soft-factory logs <ISSUE_NUMBER> --json",
];
for (const path of ["README.md", "docs/README.md"]) {
  const content = read(path);
  for (const command of directCommands) assert.ok(content.includes(command), `Missing ${command} in ${path}`);
}

const liveSurfaces = [
  "AGENTS.md", "README.md", "docs/README.md", "LLM.txt", "CONTRIBUTING.md", "justfile",
  ".harness/engineering-harness.md", "project/architecture/README.md",
  "project/architecture/core-components/CORE-COMPONENT-260813-soft-factory-runner-operation.md",
  "project/work-items/3-install-and-configure-soft-factory-runner/plan/01-action-plan.md",
  "project/work-items/3-install-and-configure-soft-factory-runner/plan/02-task-breakdown.md",
  "project/work-items/3-install-and-configure-soft-factory-runner/plan/03-test-plan.md",
  "project/work-items/3-install-and-configure-soft-factory-runner/implementation/00-implementation.md",
  "scripts/verify-soft-factory.mjs",
];
const rejectedWrapperPhrase = ["just", "runner"].join(" ");
for (const path of liveSurfaces) assert.ok(!read(path).includes(rejectedWrapperPhrase), `Rejected wrapper text remains in ${path}`);
const justfile = read("justfile");
assert.ok(!justfile.includes("soft-factory "), "The root justfile must not execute Soft Factory");
assert.ok(!/^runner(?:-|\s)/m.test(justfile), "Operational Runner recipes are forbidden");
for (const path of [".github/agents/sparkta-soft-factory-operator.agent.md", "scripts/runner-integration-adapter.mjs", "scripts/soft-factory-canary.mjs"]) assert.equal(existsSync(path), false, `Rejected adapter remains: ${path}`);
for (const path of ["package.json", "package-lock.json", ".devcontainer/devcontainer.json", ".devcontainer/post-create.sh"]) assert.ok(!read(path).includes("soft-factory-runner"), `Repository must not install Runner through ${path}`);

console.log(JSON.stringify({ status: "SOFT_FACTORY_STATIC_CONTRACT_VALID", runnerExecuted: false, officialAssetHashes: Object.fromEntries(expectedAssets.map(([, , path, sha256]) => [path, sha256])), manifestHash: digest(".agents/manifest.json") }, null, 2));
