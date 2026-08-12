# Test Plan: Bootstrap Sparkta and coordinate Prototype 0

## Test V-1: Architecture artifacts and decision registry are complete

- **Type:** Static architecture validation
- **Task:** T-3
- **Acceptance Criteria:** AC-2
- **Priority:** Critical

### Setup
Use the complete branch from the repository root. Templates and all pre-existing architecture artifacts remain available for comparison.

### Steps
1. Confirm both `ADR-260812-*` documents and all four `CORE-COMPONENT-260812-*` documents exist at global architecture paths.
2. Compare each document heading sequence with its embedded template and confirm no template file changed.
3. Confirm IDs equal full basenames, dates are 2026-08-12, statuses are Accepted or Adopted, and same-day slugs are distinct.
4. Confirm `DECISION-LOG.md` contains one registry row for each artifact and decision records 26 through 42.
5. Confirm every new decision starts with an imperative verb, names its source ID, is actionable, and can be understood without opening the source.
6. Confirm the stack ADR records TypeScript, Node.js 24, npm workspaces, React/Vite, Fastify, Vitest, and the feature-scope exclusions.
7. Confirm the four core-components record development standards, error handling, observability, and durable versus runtime state behavior.

### Expected Result
All six artifacts conform to their templates and naming contract, all are registered exactly once, all decision records are concrete, and templates are byte-for-byte unchanged.

### Expected Evidence
- Architecture path listing and heading/status audit.
- `git diff` proving both template paths are unchanged.
- Decision-log excerpt containing artifact rows and decisions 26-42.

## Test V-2: Approved baseline is preserved and child features are absent

- **Type:** Diff and scope inspection
- **Task:** T-1, T-2, T-3, T-6
- **Acceptance Criteria:** AC-1, AC-5
- **Priority:** Critical

### Setup
Use the full branch diff from the merge base with `origin/main` after implementation is complete.

### Steps
1. Confirm the diff retains Sparkta identity changes in `.devcontainer/devcontainer.json`, `.devcontainer/post-start.sh`, and `.devcontainer/tmux-attach.sh`.
2. Confirm `.github/agents/harness-cli-it.agent.md` remains deleted.
3. Confirm `.github/agents/prd-to-gh-issues.agent.md` and `PRD.md` are added without being discarded or replaced.
4. Inspect application source and configuration for only minimal web/server bootstrap boundaries.
5. Confirm there is no harness implementation, Soft Factory Runner installation, agent invocation, prompt-to-UI workflow, generated demo, generated-app lifecycle, control UI, or blessed starter under `templates/default`.
6. Confirm state work is limited to architecture/configuration/documentation and does not add persistence repositories or runtime managers.

### Expected Result
Every user-approved pre-existing change remains in the branch and no behavior owned by issues #2, #3, #4, or the generated-app starter children is implemented.

### Expected Evidence
- Full `git diff --name-status` and `git diff --stat` from the merge base.
- Scope-audit checklist naming present foundation paths and absent prohibited feature paths.
- Source review note describing the minimal entry points.

## Test V-3: Devcontainer provisions the required toolchain

- **Type:** Environment integration
- **Task:** T-1, T-7
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Priority:** Critical

### Setup
Docker is available. Use a Dev Containers CLI supplied by the host or run the CLI from a disposable Node.js 24 container; do not depend on Node/npm from the starting workspace. Instantiate the completed repository configuration in a fresh devcontainer.

### Steps
1. Build and start a fresh devcontainer from `.devcontainer/devcontainer.json` and its feature lock.
2. Inside that environment, capture Node.js, npm, and `just` versions.
3. Confirm Node.js reports major version 24 and both npm and `just` resolve from `PATH`.
4. Confirm the container and shared tmux session use the approved `sparkta` identity.
5. Confirm Node and `just` feature entries in `devcontainer-lock.json` match the configured features.

### Expected Result
A fresh configured development environment supplies Node.js 24, npm, and `just` without relying on tools absent from the starting environment, while preserving the approved Sparkta/tmux changes.

### Expected Evidence
- Devcontainer build/start result.
- In-container version output for Node.js, npm, and `just`.
- Configuration and lock excerpts for Node and `just` features.
- Sparkta container/tmux identity check.

## Test V-4: Clean checkout installs deterministically

- **Type:** Clean-install integration
- **Task:** T-2, T-4, T-7
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Priority:** Critical

### Setup
From the exact implementation commit, create a temporary clean checkout inside the Node-provisioned environment. Do not copy `node_modules`, build output, caches, `.sparkta/runtime`, or untracked files.

### Steps
1. Confirm the checkout contains the root `package.json`, `package-lock.json`, workspace manifests, and `justfile` but no installed dependencies.
2. Run `just setup` exactly as documented.
3. Confirm npm performs a lockfile-respecting clean install without modifying `package-lock.json`.
4. Inspect npm workspace discovery and confirm both web and server packages are present.
5. Confirm the clean checkout remains free of unexpected source or lockfile changes.

### Expected Result
The documented setup recipe installs the complete npm workspace graph deterministically from the committed lockfile in a clean checkout.

### Expected Evidence
- Before/after clean-checkout status.
- Successful `just setup` output.
- Workspace discovery output and unchanged lockfile proof.

## Test V-5: Foundation quality gates pass

- **Type:** Automated unit and static validation
- **Task:** T-2, T-3, T-7
- **Acceptance Criteria:** AC-1, AC-2, AC-6
- **Priority:** Critical

### Setup
Use the clean installed checkout produced by V-4 in the Node-provisioned environment.

### Steps
1. Run `just test` and confirm Vitest executes tests from the applicable workspaces.
2. Confirm tests cover exported bootstrap behavior and any typed-error, boundary-redaction, cause-preservation, event-shape, and log-redaction primitives introduced.
3. Run `just lint`, `just format-check`, and `just type-check`.
4. Run `just build` and inspect outputs for both React/Vite web and Fastify server workspaces.
5. Confirm no test requires a network service, database, external API, or pre-existing runtime state.

### Expected Result
All unit, lint, format, type, and build checks pass deterministically for the minimal Sparkta foundation, and tests comply with the adopted cross-cutting standards.

### Expected Evidence
- Passing output from each named `just` recipe.
- Vitest test names/results tied to foundation behavior.
- Build output identifying both workspaces.

## Test V-6: Root focused and full verification are distinct and successful

- **Type:** Command-interface acceptance
- **Task:** T-4, T-7
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup
Use the clean installed checkout from V-4. Select one committed Vitest file as the focused target.

### Steps
1. Run `just --list` and capture all recipes.
2. Confirm setup, run, test, lint, format-check, type-check, build, verify-focused, and verify are listed.
3. Run `just verify-focused <selected-test-path>` and confirm only the selected Vitest target plus intentionally documented focused safeguards execute.
4. Run `just verify` and confirm the complete test, lint, format-check, type-check, build, and diff-integrity suite executes.
5. Search for and reject any standalone verification configuration that duplicates the root `justfile`.

### Expected Result
The root command interface is discoverable; focused and full verification are behaviorally distinct; both pass; and the root `justfile` remains the sole operating-command authority.

### Expected Evidence
- `just --list` output with all nine recipes.
- Focused output naming only the selected test target.
- Full verification output naming every quality gate and ending successfully.
- Duplicate-command-surface inspection result.

## Test V-7: Cold agent documentation walkthrough succeeds

- **Type:** Documentation and usability validation
- **Task:** T-5, T-7
- **Acceptance Criteria:** AC-1, AC-3, AC-4
- **Priority:** High

### Setup
Begin from the root README in a clean checkout and assume the session initially has neither Node.js nor npm. The agent may use the repository-declared devcontainer mechanism and root `just` recipes only.

### Steps
1. Follow README links to project setup and architecture documentation without using prior implementation knowledge.
2. Identify Sparkta, its rapid UI-prototyping goal, Node.js/TypeScript direction, and foundational-only scope.
3. Follow the documented devcontainer rebuild/open procedure and then the documented setup recipe.
4. Discover and execute the documented run, focused-verification, and full-verification recipes.
5. Compare every documented recipe with `just --list` and confirm no raw package command is required from documentation.
6. Confirm AGENTS and LLM maps reference `PRD.md`, the PRD issue agent, application workspaces, tests, and all new architecture artifacts at valid paths.

### Expected Result
A cold agent can provision tools, install dependencies, understand scope, and operate or validate the project using repository documentation and the root command interface alone.

### Expected Evidence
- Step-by-step walkthrough record with referenced document sections.
- Recipe-name comparison against `just --list`.
- Successful link/path check for README, docs, AGENTS, and LLM entries.

## Test V-8: Parent issue links child delivery in order

- **Type:** GitHub metadata validation
- **Task:** T-6, T-7
- **Acceptance Criteria:** AC-5
- **Priority:** Critical

### Setup
Authenticated read access to `jsburckhardt/sparkta` through the configured GitHub CLI. No issue mutation is required during Implement.

### Steps
1. Read GitHub issue #1 body through `gh issue view`.
2. Locate the Delivery Order checklist.
3. Confirm its entries are exactly `#2`, then `#3`, then `#4`.
4. Confirm issue titles identify harness adoption, Soft Factory Runner installation, and Prototype 0 feasibility respectively.
5. Confirm the implementation evidence does not claim child completion; leave acceptance checkbox mutation to Verify.

### Expected Result
Issue #1 remains the ordered parent linking the three feature deliveries, with no premature completion or ownership transfer.

### Expected Evidence
- GitHub issue body or JSON excerpt showing ordered links #2, #3, #4.
- Child title lookup and implementation scope note.


## Test V-9: Minimal run recipe starts and stops cleanly

- **Type:** Runtime smoke integration
- **Task:** T-2, T-4, T-7
- **Acceptance Criteria:** AC-1, AC-3, AC-6
- **Priority:** High

### Setup
Use the clean installed checkout from V-4 in the Node-provisioned environment. Ensure configured development ports are free and use a bounded test timeout with explicit process cleanup.

### Steps
1. Start `just run` in a controlled background session and capture web and server startup output.
2. Confirm the Vite web foundation and Fastify server both become ready within the bounded timeout.
3. Confirm the browser response identifies Sparkta only as a foundation placeholder and exposes no control UI, prompt workflow, generated app, or Prototype 0 behavior.
4. Stop the root run command and confirm both child processes terminate without leaving listeners or runtime files.
5. Confirm startup and shutdown output follows the structured observability and safe error-handling contracts.

### Expected Result
The documented run recipe starts and stops both minimal application workspaces from a clean checkout without implementing child-issue features or leaving disposable processes behind.

### Expected Evidence
- Timestamped bounded startup log for both workspaces.
- Minimal browser response or Vite load proof and Fastify readiness proof.
- Process cleanup and released-port check after stopping the recipe.
