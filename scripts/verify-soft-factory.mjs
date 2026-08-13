import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";

const expectedAssets = [
  ["agent", "soft-factory", ".agents/agents/soft-factory.agent.md", "46b96e18bbf06178c8163d34bd0698ec82c80015af782c22ce6bc44527ced760"],
  ["agent", "soft-factory-assessor", ".agents/agents/soft-factory-assessor.agent.md", "40054f0959a92710cdaed42b8bb870867faae29d5e3c1acf6087349762b7ed3d"],
  ["skill", "soft-factory", ".agents/skills/soft-factory/SKILL.md", "07d0c15bb765281f7d47cb0d8e1784b70cb5d2ec06f3943880420f8c579d3b6f"],
];
const manifest = JSON.parse(readFileSync(".agents/manifest.json", "utf8"));
assert.deepEqual(Object.keys(manifest), ["schemaVersion", "assets"]);
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.assets.length, expectedAssets.length);
for (const [index, [type, name, destination, sha256]] of expectedAssets.entries()) {
  const asset = manifest.assets[index];
  assert.deepEqual(Object.keys(asset), ["type", "name", "version", "runnerProtocol", "destination", "sha256"]);
  assert.deepEqual(asset, { type, name, version: "0.1.0", runnerProtocol: 1, destination, sha256 });
  assert.equal(createHash("sha256").update(readFileSync(destination)).digest("hex"), sha256);
}
assert.deepEqual(readdirSync(".agents/skills", { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort(), ["eng-harness-0-harnessability-assessment", "eng-harness-flow", "grill-agent-done", "soft-factory"]);
assert.equal(readFileSync(".soft-factory/config.yml", "utf8"), "protocol_version: 1\nrepository:\n  worktree_root: .trees\n  state_root: .soft-factory\nrpiv:\n  final_validation: just verify\nexecution:\n  max_concurrent_runs: 1\n");
const rpiv = readFileSync(".github/agents/rpiv.agent.md", "utf8");
assert.match(rpiv, /^runner_protocol: 1$/m);
assert.match(rpiv, /^result_contract: agent-result-v1$/m);
for (const phrase of ["injected helpers", "terminal failed publication", "injected validator", "MUST NOT read or write Runner operational state directly"]) assert.ok(rpiv.includes(phrase));
const verifier = readFileSync(".github/agents/rpiv-verifier.agent.md", "utf8");
for (const phrase of ["injected no-clobber helper", "snapshotted final validation", "independent confirmation", "MUST NOT replace an existing Runner result"]) assert.ok(verifier.includes(phrase));
const operatorDocs = ["README.md", "docs/README.md"];
for (const path of operatorDocs) {
  const content = readFileSync(path, "utf8");
  for (const phrase of ["just runner run --issue <ISSUE_NUMBER> --json", "just runner list --json", "just runner status <ISSUE_NUMBER> --json", "just runner reconcile <ISSUE_NUMBER> --json", "just runner resume <ISSUE_NUMBER> --json", "just runner stop <ISSUE_NUMBER> --json", "just runner clean <ISSUE_NUMBER> --json", "just runner attach <ISSUE_NUMBER>", "just runner logs <ISSUE_NUMBER> --json", "Runner Doctor", "harness Doctor"]) assert.ok(content.includes(phrase), `Missing ${phrase} in ${path}`);
}
for (const path of ["package.json", "package-lock.json", ".devcontainer/devcontainer.json", ".devcontainer/post-create.sh"]) assert.ok(!readFileSync(path, "utf8").includes("soft-factory-runner"), `Repository must not install Runner through ${path}`);
console.log("SOFT_FACTORY_REPOSITORY_CONTRACT_VALID");
