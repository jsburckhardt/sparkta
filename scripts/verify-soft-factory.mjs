import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const read = (file) => readFileSync(file, "utf8");
const sha = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const globalRoot = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
const packageRoot = path.join(globalRoot, "soft-factory-runner");
const expectedAssets = [
  ["agent", "soft-factory", ".agents/agents/soft-factory.agent.md", "assets/official/soft-factory.agent.md", "46b96e18bbf06178c8163d34bd0698ec82c80015af782c22ce6bc44527ced760"],
  ["agent", "soft-factory-assessor", ".agents/agents/soft-factory-assessor.agent.md", "assets/official/soft-factory-assessor.agent.md", "40054f0959a92710cdaed42b8bb870867faae29d5e3c1acf6087349762b7ed3d"],
  ["skill", "soft-factory", ".agents/skills/soft-factory/SKILL.md", "assets/official/soft-factory/SKILL.md", "07d0c15bb765281f7d47cb0d8e1784b70cb5d2ec06f3943880420f8c579d3b6f"],
];

function frontmatter(source) {
  assert.ok(source.startsWith("---\n"), "Agent frontmatter must start at byte zero");
  const end = source.indexOf("\n---\n", 4);
  assert.ok(end > 0, "Agent frontmatter must close");
  const yaml = source.slice(4, end);
  const tools = [...yaml.matchAll(/^  - ([^\n]+)$/gm)].map((match) => match[1]);
  return { yaml, tools };
}

function sections(source) {
  const names = [...source.matchAll(/^<(instructions|constants|formats|runtime|triggers|processes|input)>$/gm)].map((match) => match[1]);
  assert.deepEqual(names, ["instructions", "constants", "formats", "runtime", "triggers", "processes", "input"], "APS sections must appear once in canonical order");
}

function processes(source) {
  const map = new Map();
  for (const match of source.matchAll(/<process id="([a-z][a-z0-9_-]{1,63})"[^>]*>\n([\s\S]*?)\n<\/process>/g)) {
    assert.ok(!map.has(match[1]), `Duplicate process ${match[1]}`);
    map.set(match[1], match[2]);
  }
  assert.ok(map.size > 0, "APS agent must define executable processes");
  return map;
}

const toolMap = new Map([
  ["agent", "agent"],
  ["create_file", "edit/createFile"],
  ["file_search", "search/fileSearch"],
  ["read_file", "read/readFile"],
  ["run_in_terminal", "execute/runInTerminal"],
  ["skill", "skill"],
]);

function lintAgent(file) {
  const source = read(file);
  const { tools } = frontmatter(source);
  sections(source);
  assert.ok(!source.includes("\t"), `${file} contains a tab`);
  assert.ok(!/^\s*\/\//m.test(source), `${file} contains an APS comment`);
  const graph = processes(source);
  for (const [id, body] of graph) {
    for (const call of body.matchAll(/RUN `([^`]+)`/g)) assert.ok(graph.has(call[1]), `${id} calls unknown process ${call[1]}`);
    for (const use of body.matchAll(/USE `([^`]+)`/g)) {
      assert.match(use[1], /^[a-z][a-z0-9_-]{1,63}$/, `${id} uses an invalid APS tool id`);
      const frontmatterTool = toolMap.get(use[1]);
      assert.ok(frontmatterTool && tools.includes(frontmatterTool), `${file} does not declare ${use[1]} in frontmatter`);
    }
    for (const where of body.matchAll(/(?:RUN|USE) `[^`]+` where: ([^\n]+)/g)) {
      const keys = [...where[1].matchAll(/(?:^|, )([a-z][a-z0-9_-]*)=/g)].map((match) => match[1]);
      assert.deepEqual(keys, [...keys].sort(), `${id} has non-canonical where key order`);
    }
  }
  const trigger = source.match(/<trigger event="user_message" target="([^"]+)" \/>/);
  assert.ok(trigger && graph.has(trigger[1]), `${file} trigger target is invalid`);
  return { source, graph };
}

function ordered(body, tokens, label) {
  let cursor = -1;
  for (const token of tokens) {
    const next = body.indexOf(token, cursor + 1);
    assert.ok(next > cursor, `${label} is missing or misorders ${token}`);
    cursor = next;
  }
}

function validateCoordinator(source) {
  const graph = processes(source);
  const router = graph.get("rpiv-router");
  ordered(router, [
    "RUN `prepare-feature-branch`",
    'RUN `invoke-harness-hook` where: hook="pre-flight"',
    'RUN `publish-progress` where: phase="research", status="running"',
    "RUN `dispatch-research`",
    'RUN `publish-progress` where: phase="plan", status="running"',
    "RUN `dispatch-plan`",
    "RUN `validate-plan-handoff`",
    'RUN `invoke-harness-hook` where: hook="pre-coding"',
    'RUN `publish-progress` where: phase="implement", status="running"',
    "RUN `dispatch-implement`",
    'RUN `publish-progress` where: phase="verify", status="running"',
    "RUN `dispatch-verify`",
    "RUN `validate-runner-result`",
    'RUN `invoke-harness-hook` where: hook="post-flight"',
    'RUN `publish-progress` where: phase="terminal", status="succeeded"',
    'RETURN: format="COMPLETION_REPORT"',
  ], "Coordinator success path");
  ordered(router, ["RECOVER (err):", "SET PRIMARY_FAILURE := err", "RUN `fail-pipeline`", 'RETURN: format="PIPELINE_ERROR"'], "Coordinator failure funnel");
  const failure = graph.get("fail-pipeline");
  assert.ok(failure.includes('RUN `publish-progress` where: phase="terminal", status="failed"'));
  assert.ok(failure.includes("SECONDARY_FAILURE") && failure.includes("original_error"), "Failure publication must remain secondary");
  assert.ok(graph.get("publish-progress").includes('SET PROGRESS_RESULT := "standalone-noop"'), "Standalone progress must be a no-op");
  assert.ok(graph.get("validate-runner-result").includes('SET VALIDATION_RESULT := "standalone-noop"'), "Standalone validation must be a no-op");
  assert.ok(graph.get("invoke-harness-hook").includes('USE `skill` where: arguments=["--hook", hook], name="eng-harness-flow"'));
  const dispatch = source.match(/<process id="dispatch-verify"[^>]*args="([^"]+)"/)[1];
  assert.equal(dispatch, "implement_handoff: JSON, issue_number: Number, launch_binding: JSON, plan_handoff: JSON, work_item_path: Path");
  assert.ok(graph.get("dispatch-verify").includes('"launch_binding": LAUNCH_BINDING'));
  assert.ok(![...graph.values()].some((body) => /\.soft-factory\/(?:rpiv-status|agent-result)\.json/.test(body)), "Coordinator must not access Runner artifacts directly");
}

function validateVerifier(source) {
  const graph = processes(source);
  const router = graph.get("verify-router");
  ordered(router, ["RUN `decide-acceptance`", "RUN `run-final-validation`", "RUN `create-or-update-pr`", "RUN `write-verify-evidence`", "RUN `confirm-final-head`", "RUN `build-result-candidate`", "RUN `publish-runner-result`", "RUN `verify-clean`"], "Verifier success path");
  const head = graph.get("confirm-final-head");
  for (const fact of ["REMOTE_HEAD = FINAL_HEAD", 'PR_FACTS.state = "OPEN"', "PR_FACTS.baseRefName = BASE_BRANCH", "PR_FACTS.headRefName = BRANCH_NAME", "PR_FACTS.headRefOid = FINAL_HEAD", "PR_FACTS.closingIssuesReferences contains ISSUE_NUMBER"]) assert.ok(head.includes(fact), `Missing final-head assertion: ${fact}`);
  const candidate = graph.get("build-result-candidate");
  assert.ok(candidate.includes("LAUNCH_BINDING.requiredFinalValidation") && candidate.includes("RESULT_CANDIDATE_PATH"));
  const publish = graph.get("publish-runner-result");
  assert.ok(publish.includes("just runner-publish-result") && !publish.includes("resultPath"));
  assert.ok(graph.get("run-final-validation").includes("just runner-final-validation"));
  assert.ok(source.includes("issue_number: Number\nwork_item_path: Path\nplan_handoff: JSON\nimplement_handoff: JSON\nlaunch_binding: JSON or null"));
}

function validateImplementer(source) {
  const graph = processes(source);
  const router = graph.get("implementer-router");
  ordered(router, ["RUN `load-context`", 'RUN `invoke-harness-hook` where: hook="coding"', "RUN `implement-tasks`", "RUN `run-full-validation`", 'RUN `invoke-harness-hook` where: hook="post-coding"', "RUN `write-implementation-notes`"], "Implement harness seams");
  assert.ok(graph.get("invoke-harness-hook").includes("USE `skill`"));
}

function expectMutation(name, source, mutate, validate) {
  const changed = mutate(source);
  assert.notEqual(changed, source, `Mutation ${name} did not alter its fixture`);
  assert.throws(() => validate(changed), `Mutation ${name} escaped structural validation`);
  return name;
}

function snapshotTree(root) {
  if (!existsSync(root)) return [];
  const out = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir).sort()) {
      const full = path.join(dir, entry);
      if (full === path.join(".soft-factory", "config.yml")) continue;
      const stat = statSync(full);
      if (stat.isDirectory()) visit(full);
      else out.push([full, sha(full)]);
    }
  };
  visit(root);
  return out;
}

const manifest = JSON.parse(read(".agents/manifest.json"));
assert.deepEqual(Object.keys(manifest), ["schemaVersion", "assets"]);
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.assets.length, expectedAssets.length);
for (const [index, [type, name, destination, packagePath, digest]] of expectedAssets.entries()) {
  assert.deepEqual(manifest.assets[index], { type, name, version: "0.1.0", runnerProtocol: 1, destination, sha256: digest });
  assert.equal(sha(destination), digest);
  assert.equal(sha(path.join(packageRoot, packagePath)), digest);
}
assert.equal(sha(".agents/manifest.json"), "e57667a0f61e5025a6022b412744281fe6418f39bebe885e3f6e34b5a1a6a857");
assert.deepEqual(readdirSync(".agents/skills", { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort(), ["eng-harness-0-harnessability-assessment", "eng-harness-flow", "grill-agent-done", "soft-factory"]);
assert.equal(read(".soft-factory/config.yml"), "protocol_version: 1\nrepository:\n  worktree_root: .trees\n  state_root: .soft-factory\nrpiv:\n  final_validation: just verify\nexecution:\n  max_concurrent_runs: 1\n");

const coordinator = lintAgent(".github/agents/rpiv.agent.md");
const verifier = lintAgent(".github/agents/rpiv-verifier.agent.md");
const operator = lintAgent(".github/agents/sparkta-soft-factory-operator.agent.md");
validateCoordinator(coordinator.source);
validateVerifier(verifier.source);
validateImplementer(read(".github/agents/rpiv-implementer.agent.md"));
assert.ok(!JSON.stringify(manifest).includes("sparkta-soft-factory-operator"));
for (const command of ["just runner --help", "just runner <OPERATION> --json", "just runner run --issue <ISSUE_NUMBER> --json", "just runner <OPERATION> <ISSUE_NUMBER> --json", "just runner attach <ISSUE_NUMBER>"]) assert.ok(operator.source.includes(command), `Operator is missing ${command}`);
for (const operation of ["run", "status", "reconcile", "resume", "stop", "clean", "attach", "logs"]) assert.ok(operator.source.includes(operation));
assert.ok(operator.source.includes("just runner") && !operator.source.includes("soft-factory internal"));

const mutations = [
  expectMutation("coordinator-pre-flight", coordinator.source, (s) => s.replace('  RUN `invoke-harness-hook` where: hook="pre-flight"\n', ""), validateCoordinator),
  expectMutation("coordinator-pre-coding", coordinator.source, (s) => s.replace('  RUN `invoke-harness-hook` where: hook="pre-coding"\n', ""), validateCoordinator),
  expectMutation("coordinator-post-flight", coordinator.source, (s) => s.replace('  RUN `invoke-harness-hook` where: hook="post-flight"\n', ""), validateCoordinator),
  expectMutation("implementer-coding", read(".github/agents/rpiv-implementer.agent.md"), (s) => s.replace('RUN `invoke-harness-hook` where: hook="coding"\n', ""), validateImplementer),
  expectMutation("implementer-post-coding", read(".github/agents/rpiv-implementer.agent.md"), (s) => s.replace('RUN `invoke-harness-hook` where: hook="post-coding"\n', ""), validateImplementer),
  expectMutation("coordinator-result-validator", coordinator.source, (s) => s.replace("  RUN `validate-runner-result`\n", ""), validateCoordinator),
  expectMutation("coordinator-failure-publication", coordinator.source, (s) => s.replace('    RUN `publish-progress` where: phase="terminal", status="failed"\n', ""), validateCoordinator),
  expectMutation("coordinator-terminal-order", coordinator.source, (s) => s.replace('  RUN `publish-progress` where: phase="terminal", status="succeeded"\n', "").replace("  RUN `validate-runner-result`\n", '  RUN `publish-progress` where: phase="terminal", status="succeeded"\n  RUN `validate-runner-result`\n'), validateCoordinator),
  expectMutation("verifier-final-head", verifier.source, (s) => s.replace("ASSERT PR_FACTS.headRefOid = FINAL_HEAD", "ASSERT PR_FACTS.headRefOid is not empty"), validateVerifier),
  expectMutation("verifier-publication-order", verifier.source, (s) => s.replace("  RUN `build-result-candidate`\n  RUN `publish-runner-result`", "  RUN `publish-runner-result`\n  RUN `build-result-candidate`"), validateVerifier),
];

for (const file of ["README.md", "docs/README.md"]) {
  const content = read(file);
  for (const phrase of ["just runner run --issue <ISSUE_NUMBER> --json", "just runner list --json", "just runner status <ISSUE_NUMBER> --json", "just runner reconcile <ISSUE_NUMBER> --json", "just runner resume <ISSUE_NUMBER> --json", "just runner stop <ISSUE_NUMBER> --json", "just runner clean <ISSUE_NUMBER> --json", "just runner attach <ISSUE_NUMBER>", "just runner logs <ISSUE_NUMBER> --json", "Runner Doctor", "harness Doctor"]) assert.ok(content.includes(phrase), `Missing ${phrase} in ${file}`);
}
for (const file of ["package.json", "package-lock.json", ".devcontainer/devcontainer.json", ".devcontainer/post-create.sh"]) assert.ok(!read(file).includes("soft-factory-runner"), `Repository must not install Runner through ${file}`);
assert.ok(read("README.md").includes("APS-v1.2.2"));

const stateBefore = snapshotTree(".soft-factory");
const canaryText = execFileSync(process.execPath, ["scripts/soft-factory-canary.mjs"], { encoding: "utf8", env: { ...process.env, SOFT_FACTORY_GLOBAL_ROOT: globalRoot } }).trim();
const canary = JSON.parse(canaryText);
assert.deepEqual(snapshotTree(".soft-factory"), stateBefore);
assert.deepEqual({ networkCalls: canary.networkCalls, realRunnerStateWrites: canary.realRunnerStateWrites, noClobberPreserved: canary.noClobberPreserved, shellExecution: canary.shellExecution }, { networkCalls: 0, realRunnerStateWrites: 0, noClobberPreserved: true, shellExecution: false });

console.log(JSON.stringify({
  status: "SOFT_FACTORY_REPOSITORY_CONTRACT_VALID",
  aps: { agents: 3, sections: 7, processCallsResolved: true, toolContractsResolved: true },
  controlFlow: { mutationsRejected: mutations, terminalFailureFunnel: true, standaloneNoop: true },
  canary,
  officialAssetHashes: Object.fromEntries(expectedAssets.map(([, , destination, , digest]) => [destination, digest])),
  manifestHash: sha(".agents/manifest.json"),
}, null, 2));
