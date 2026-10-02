# Task Breakdown: Establish the Sparkta development baseline

## Task T-1: Authenticate the immutable source and capture preservation baselines

- **Status:** Pending
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-1, AC-5
- **Related ADRs:** `ADR-260906-foreman-control-plane`
- **Related Core-Components:** `CORE-COMPONENT-260906-foreman-orchestration`, `CORE-COMPONENT-260906-rpiv-observability`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`
- **Documentation Impact:** None; record evidence in the implementation note.
- **Assignment-Authorized Paths:** Read only: `/workspaces/sparkta/.foreman/contracts/issue-1-revision-5.json`, `/workspaces/sparkta/.foreman/context/bootstrap-baseline-r2.tar.gz`, `/workspaces/sparkta/.foreman/context/bootstrap-baseline-r2-manifest.json`, `/workspaces/sparkta` Git diff state, and this work item's Plan/Research artifacts. Write only `project/work-items/1-establish-the-sparkta-development-baseline/implementation/00-implementation.md` and task status in this file during Implement.

### Description

Before importing anything, Implement must recompute the assignment, archive,
and manifest SHA-256 values and require the exact revision-5 values. Parse the
manifest as data, require revision 2, source commit
`335cf60c06c840885c8783643140a7321d3c838a`, exactly 39 unique relative paths,
and no path traversal or path outside assignment write scope. Capture the
controller's staged and unstaged diff SHA-256 fingerprints and require
`d1af92b1611c71e29a5a4fe3e6cab9a6fe8ba13c64f6d3a6179ca575f6ec04e7`
and `223ecd8f9cb8c4016871257ad0f9d770216220aaabcae761abb34a01c46fcb61`.
Capture the exact managed tmux worker-window inventory for later comparison.
Do not extract, import, adapt, or recreate archive files until all gates pass.

### Acceptance Criteria

- **AC-1:** Establish immutable provenance for the approved staged customizations and prepared foundation before import.
- **AC-5:** Establish controller Git-index and managed-worker fingerprints without changing either source.

### Test Coverage

- **V-1:** Validate immutable hashes, manifest metadata, uniqueness, traversal rejection, file count, and assignment-authorized path membership.
- **V-5:** Compare initial controller staged/unstaged fingerprints with assignment revision 5 and save the initial managed-worker inventory.

### Expected Evidence

- Exact assignment, archive, and manifest hash output.
- Parsed manifest report containing revision, source commit, 39 unique paths,
  and zero unauthorized or unsafe entries.
- Exact controller staged and unstaged fingerprints and initial worker-window
  inventory, recorded without a controller write.

## Task T-2: Import the approved baseline into assignment-authorized paths

- **Status:** Pending
- **Complexity:** High
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-8
- **Related ADRs:** `ADR-260906-foreman-control-plane`, approved source-handoff `ADR-261002-node-react-vite-toolchain`
- **Related Core-Components:** `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260906-foreman-orchestration`, approved source-handoff `CORE-COMPONENT-261002-development-standards`, `CORE-COMPONENT-261002-explicit-errors`, `CORE-COMPONENT-261002-local-persistence`, `CORE-COMPONENT-261002-process-ownership-cleanup`
- **Documentation Impact:** Imports approved README, repository guidance, Foreman guidance, and architecture indexes/records for later accuracy review.
- **Assignment-Authorized Paths:** `.devcontainer/devcontainer-lock.json`, `.devcontainer/devcontainer.json`, `.devcontainer/post-start.sh`, `.devcontainer/tmux-attach.sh`, `.foreman/project.json`, `.github/agents/harness-cli-it.agent.md`, `.gitignore`, `.prettierignore`, `.prettierrc.json`, `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `docs/foreman.md`, `eslint.config.js`, `index.html`, `justfile`, `package.json`, `pnpm-lock.yaml`, `project/architecture/ADR/ADR-261002-node-react-vite-toolchain.md`, `project/architecture/ADR/DECISION-LOG.md`, `project/architecture/README.md`, `project/architecture/core-components/CORE-COMPONENT-261002-development-standards.md`, `project/architecture/core-components/CORE-COMPONENT-261002-explicit-errors.md`, `project/architecture/core-components/CORE-COMPONENT-261002-local-persistence.md`, `project/architecture/core-components/CORE-COMPONENT-261002-process-ownership-cleanup.md`, `project/architecture/core-components/README.md`, `project/work-items/42-feat-foreman-bound-managed-rpiv-workers-and-verify-integrated-delivery/research/00-research.md`, `project/work-items/42-feat-foreman-bound-managed-rpiv-workers-and-verify-integrated-delivery/verify/summary.md`, `src/App.test.tsx`, `src/App.tsx`, `src/index.css`, `src/main.tsx`, `src/test/setup.ts`, `tests/foreman-contract.sh`, `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`, and `vite.config.ts`.

### Description

Only Implement may import the approved archive. Import each of the 39 declared
manifest files into the corresponding assignment-authorized worktree path.
Verify each imported byte sequence against its manifest hash before any
necessary adaptation. Preserve the approved architecture records as existing
source material and preserve the approved issue-42/harness history exactly;
do not reinterpret either as authorization for unrelated changes. Adapt only
where needed to make this issue's exact delivered baseline coherent, and
record every adapted path and reason. Never read application content from the
writable controller checkout, rerun bootstrap, or synthesize a missing archive
file from this Plan.

### Acceptance Criteria

- **AC-1:** Import the complete approved Sparkta foundation and customizations.
- **AC-2:** Import the selected stack, lockfile, configs, source, and root command interface.
- **AC-3:** Import the approved committed Foreman project profile and host contract.
- **AC-8:** Import the approved Node.js 24 development-container configuration.

### Test Coverage

- **V-1:** Compare all imported pre-adaptation files to the manifest SHA-256 values and report all adaptations.
- **V-2:** Inspect the imported identity, stack, profile, architecture, command, and devcontainer surfaces.
- **V-8:** Compare the final changed-path set with assignment write scope and the approved manifest/history allowance.

### Expected Evidence

- A 39-row import/hash report with no missing, extra, unsafe, or unauthorized
  archive entries and a finite list of justified adaptations.
- Final-path inspection showing the approved application, profile,
  architecture, documentation, and test surfaces in the issue worktree.
- No controller, assignment, registry, mission, graph, inbox, review, context,
  or other out-of-scope write.

## Task T-3: Reconcile identity, stack, profile, documentation, and devcontainer contracts

- **Status:** Pending
- **Complexity:** Medium
- **Dependencies:** T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-8
- **Related ADRs:** approved source-handoff `ADR-261002-node-react-vite-toolchain`
- **Related Core-Components:** `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-rpiv-stage-contract`, approved source-handoff `CORE-COMPONENT-261002-development-standards`, `CORE-COMPONENT-261002-explicit-errors`, `CORE-COMPONENT-261002-local-persistence`
- **Documentation Impact:** Maintain `README.md`, `docs/README.md`, `docs/foreman.md`, `AGENTS.md`, `LLM.txt`, and architecture indexes/records so identity, commands, limitations, container status, and source-handoff architecture are accurate. Record no-impact rationales for API, migration, deployment, and persistence documentation because the baseline exposes no API, migration, deployment, or persistence behavior.
- **Assignment-Authorized Paths:** `README.md`, `docs/README.md`, `docs/foreman.md`, `AGENTS.md`, `LLM.txt`, `.foreman/project.json`, `.devcontainer/devcontainer.json`, `.devcontainer/devcontainer-lock.json`, `package.json`, `pnpm-lock.yaml`, `justfile`, `src/App.tsx`, `src/App.test.tsx`, imported source-handoff architecture paths listed in T-2, and this work item's implementation artifacts.

### Description

Reconcile all imported surfaces against the exact issue outcomes. Identify the
project as Sparkta and state that it is only a development foundation. Do not
claim GitHub Copilot generation, persistence engines, session management,
process scheduling, or product lifecycle behavior. Ensure stack declarations,
profile values, command names, UI text, and docs agree. Require the project
profile to record repository `jsburckhardt/sparkta`, base `main`,
`copilot-cli-tmux`, capacity 2, approved managed `yolo`, review limit 3,
automatic merge false, and no worker launch during setup/bootstrap. Require
the devcontainer to select Node.js 24 and delegate restoration to `just setup`.
State that setup requires registry access and that validation in the existing
container is not evidence of an unperformed fresh-container rebuild.

### Acceptance Criteria

- **AC-1:** Sparkta identity and foundation-only limitations are consistent in repository docs, UI, and tests.
- **AC-2:** Every selected technology and required command is recorded consistently.
- **AC-3:** Every required project-profile value is present and correctly typed.
- **AC-4:** Documentation states the registry prerequisite and does not claim a fresh-container rebuild.
- **AC-8:** Devcontainer configuration and documentation accurately distinguish selected configuration from executed evidence.

### Test Coverage

- **V-2:** Parse configuration and inspect docs/UI/tests for exact required and prohibited claims.
- **V-7:** Use the delivered commands to prove configured stack quality gates.
- **V-8:** Inspect every affected documentation category and exact changed paths.

### Expected Evidence

- Parsed stack/profile/devcontainer values, `just --list` output, and matching
  documentation excerpts.
- Positive Sparkta/foundation assertions and negative generation, persistence,
  session, scheduler, process-lifecycle, and fresh-rebuild claim checks.
- Documentation evidence for README/configuration/usage/operations/
  architecture plus explicit API/migration/deployment no-impact rationales.

## Task T-4: Maintain executable commands and deterministic regression coverage

- **Status:** Pending
- **Complexity:** High
- **Dependencies:** T-3
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-5, AC-7
- **Related ADRs:** `ADR-260906-foreman-control-plane`, approved source-handoff `ADR-261002-node-react-vite-toolchain`
- **Related Core-Components:** `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`, approved source-handoff `CORE-COMPONENT-261002-development-standards`, `CORE-COMPONENT-261002-explicit-errors`
- **Documentation Impact:** Update command and operational guidance only if executable behavior changes; otherwise record that imported guidance remains accurate.
- **Assignment-Authorized Paths:** `justfile`, `package.json`, `pnpm-lock.yaml`, `.prettierignore`, `.prettierrc.json`, `eslint.config.js`, `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `src/App.test.tsx`, `src/test/setup.ts`, `tests/foreman-contract.sh`, `.foreman/project.json`, applicable docs listed in T-3, and this work item's implementation artifacts.

### Description

Ensure the root `justfile` exposes and implements `setup`, `run`, `build`,
`test`, `lint`, `format-check`, `type-check`, `verify-focused`, and `verify`.
Setup must invoke frozen pnpm restoration under fail-fast shell behavior and
must not invoke a Foreman/Copilot/tmux worker-launch primitive. Maintain
deterministic application tests and inherited host-contract checks, including
the approved staged customizations. Add or preserve a controlled package-manager
stub test that returns a sentinel nonzero code and proves setup propagates that
failure. Compare managed-worker inventory before/after setup; never launch a
real worker as a test.

### Acceptance Criteria

- **AC-2:** All required recipes exist and delegate to the selected tools.
- **AC-3:** Inherited host checks continue to enforce the approved profile/adapter behavior.
- **AC-4:** Setup preserves nonzero registry/package-manager failures.
- **AC-5:** Setup performs no managed-worker launch.
- **AC-7:** Each delivered quality/build/verification recipe and inherited host check is executable.

### Test Coverage

- **V-3:** Run frozen setup in an isolated checkout with registry access.
- **V-4:** Run setup with an inert failing package-manager substitute and prove exact nonzero propagation and no launch.
- **V-5:** Compare worker inventory around setup without creating a worker.
- **V-7:** Execute every required non-runtime recipe separately and the inherited host-contract suite.

### Expected Evidence

- `just --list` with all ten required recipe names and inspected recipe bodies.
- Successful isolated `just setup` showing frozen-lockfile restoration.
- Sentinel setup failure output and nonzero status, with no success-shaped fallback.
- Identical before/after managed-worker inventory.
- Separate zero-status output for all AC-7 commands and host checks.

## Task T-5: Prove the delivered baseline and prepare the Implement handoff

- **Status:** Pending
- **Complexity:** High
- **Dependencies:** T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8
- **Related ADRs:** `ADR-260906-foreman-control-plane`, approved source-handoff `ADR-261002-node-react-vite-toolchain`
- **Related Core-Components:** `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260906-rpiv-observability`, approved source-handoff `CORE-COMPONENT-261002-development-standards`, `CORE-COMPONENT-261002-explicit-errors`, `CORE-COMPONENT-261002-process-ownership-cleanup`
- **Documentation Impact:** Independently compare delivered behavior with all affected docs; record concrete documentation evidence and no-impact rationales in the implementation note.
- **Assignment-Authorized Paths:** Read all assignment read paths and the isolated checkout of the delivered commit. Write `project/work-items/1-establish-the-sparkta-development-baseline/implementation/00-implementation.md`, task statuses in this file, and implementation commits containing only assignment-authorized paths. Do not write the controller checkout or immutable Foreman paths.

### Description

Run `just verify-focused` while building and `just verify` before handoff.
Create a clean isolated checkout of the candidate delivered commit, run frozen
setup there, start the documented `just run` command on a known available
port, wait boundedly for the Sparkta frontend, and capture HTTP evidence.
Track the exact owned process/process group, stop only that process tree, prove
it is gone, and prove the same port can be bound again. Do not use broad
process-name termination. Re-run all configured checks, inspect documentation,
compare the final diff with assignment scope, and recompute the controller
staged/unstaged fingerprints. Record evidence for all ACs, commit with required
trailers, and hand Verify the exact commit SHA and clean-tree proof. Do not
claim a fresh-container rebuild; a registry outage is an explicit failed or
blocked setup result.

### Acceptance Criteria

- **AC-1 through AC-8:** Every criterion has concrete Implement evidence on the exact candidate commit; no criterion is accepted by Implement.

### Test Coverage

- **V-1 through V-8:** Complete all planned validation and inspection.
- Verify must independently rerun `just verify`, inspect documentation and
  exact scope, and decide each AC on the exact implementation commit.

### Expected Evidence

- Isolated checkout path and exact candidate commit SHA.
- Frozen setup output, frontend HTTP response, exact owned PID/process-group
  cleanup evidence, and same-port reuse success.
- Separate command statuses for all required recipes and host checks.
- Unchanged controller staged/unstaged fingerprints and unchanged setup-time
  managed-worker inventory.
- Exact changed-path scope report, documentation inspection, implementation
  note with AC-1..AC-8 evidence, clean worker tree, and committed head SHA.

## Dependency and Coverage Summary

| AC | Tasks | Tests | Expected evidence class |
|---|---|---|---|
| AC-1 | T-1, T-2, T-3, T-5 | V-1, V-2, V-8 | Provenance, exact import/scope, identity and limitation inspection |
| AC-2 | T-2, T-3, T-4, T-5 | V-2, V-3, V-7 | Stack/config inspection and all command outputs |
| AC-3 | T-2, T-3, T-4, T-5 | V-2, V-7 | Parsed profile and inherited host-contract output |
| AC-4 | T-3, T-4, T-5 | V-4, V-7, V-8 | Sentinel nonzero setup plus registry/fresh-container docs |
| AC-5 | T-1, T-4, T-5 | V-5 | Controller fingerprints and unchanged worker inventory |
| AC-6 | T-4, T-5 | V-3, V-6 | Frozen restoration, HTTP startup, exact stop, port reuse |
| AC-7 | T-4, T-5 | V-7 | Separate successful recipe and host-check results |
| AC-8 | T-2, T-3, T-5 | V-2, V-8 | Node 24/post-create config and accurate limitation docs |
