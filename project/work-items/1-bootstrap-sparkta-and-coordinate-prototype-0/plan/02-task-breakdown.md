# Task Breakdown: Bootstrap Sparkta and coordinate Prototype 0

## Task T-1: Preserve the approved baseline and provision Node.js

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract

### Description
Preserve the complete user-approved dirty baseline: Sparkta names in `.devcontainer/devcontainer.json`, `.devcontainer/post-start.sh`, and `.devcontainer/tmux-attach.sh`; deletion of the obsolete repo-local harness bootstrap agent; addition of `.github/agents/prd-to-gh-issues.agent.md`; and addition of `PRD.md`. Enable the official Node devcontainer feature at Node.js 24, update its lock record, keep the `just` feature, and keep the approved `sparkta` container and tmux names. Do not restore, rewrite, or omit pre-existing changes merely because they predate Implement.

### Acceptance Criteria
- AC-3: A rebuilt development environment provides Node.js 24, npm, and `just` for root commands.
- AC-4: A cold agent can obtain every required tool from repository-owned devcontainer configuration.
- AC-6: The provisioned environment can execute the resulting command interface.
- The implementation commit contains every approved pre-existing deletion, addition, and identity change.

### Test Coverage
- Run V-2 to audit approved paths and prohibited scope.
- Run V-3 to rebuild or open the configured devcontainer and capture `node`, `npm`, and `just` versions.
- Parse and inspect `devcontainer.json` and `devcontainer-lock.json` to confirm the Node feature and locked resolution agree.

### Expected Evidence
- `git diff --name-status` and final commit statistics list every approved path.
- Devcontainer feature and lock entries identify Node.js 24.
- Version output from inside the rebuilt environment proves `node`, `npm`, and `just` resolve.

## Task T-2: Create the minimal npm-workspace foundation

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-2
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-observability

### Description
Create a private root package with npm workspaces for a minimal `apps/web` React/Vite package and `apps/server` Fastify package. Pin the Node engine, add strict shared and workspace TypeScript configuration, create only the bootstrap entry points needed for development and builds, and generate one root `package-lock.json`. The web entry may expose a neutral Sparkta foundation placeholder but must not implement screens, prompt input, previews, generated-app behavior, or polished product UI. The server may start Fastify but must not implement product APIs, application lifecycle, agent orchestration, or Prototype 0.

### Acceptance Criteria
- AC-1: Package names, metadata, and minimal entry points identify Sparkta and use the approved Node.js/TypeScript, React/Vite, and Fastify direction.
- AC-2: npm workspaces and Vitest-compatible package boundaries match the accepted stack ADR.
- Both workspaces type-check and build from the root lockfile.
- No blessed generated-app starter, generated demo, controller feature, or Prototype 0 behavior is introduced.

### Test Coverage
- Run V-2 for the no-feature scope audit.
- Run V-4 from a clean dependency state to prove the root lockfile installs all workspaces.
- Run V-5 for workspace unit tests, type checking, linting, formatting, and builds.
- Run V-9 for a bounded startup smoke check of both workspace entry points.
- Include minimal Vitest tests for exported bootstrap behavior rather than testing framework internals.

### Expected Evidence
- Root and workspace package manifests, lockfile, TypeScript configuration, and source tree.
- Passing package graph, type-check, test, and build output.
- Diff inspection showing only foundation entry points and no child-issue feature surface.

## Task T-3: Configure standards and cross-cutting primitives

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-2
- **Acceptance Criteria:** AC-2, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-observability, CORE-COMPONENT-260812-state-lifecycle

### Description
Add shared ESLint and Prettier configuration, strict workspace checks, and Vitest test configuration. Make the minimal server bootstrap comply with the typed-error and structured-observability contracts: normalize unknown failures, preserve causes, expose only safe boundary messages, use Fastify/Pino structured records, and configure sensitive-field redaction. Record `.sparkta/apps` as durable and `.sparkta/runtime` as disposable in architecture and operating documentation, but do not create repositories, persistence services, runtime managers, schemas, or lifecycle features.

### Acceptance Criteria
- AC-2: Development standards, error handling, observability, and durable/runtime state contracts are globally recorded and reflected by foundation configuration.
- AC-6: Automated checks exercise the configured foundation through root recipes.
- Server foundation tests cover known-error translation, unknown-error redaction, error causes, structured event fields, and sensitive logging redaction where those primitives are introduced.
- State-boundary work remains contract and documentation only in this issue.

### Test Coverage
- Run V-1 to validate all architecture documents and decision-log records.
- Run V-5 to execute Vitest and all static checks.
- Add focused unit tests for error and logger behavior introduced by the scaffold.
- Run V-2 to verify that no persistence or application-lifecycle implementation has appeared.

### Expected Evidence
- Accepted ADRs, adopted core-components, and decision-log rows 26 through 42.
- ESLint, Prettier, TypeScript, and Vitest configuration files.
- Passing focused tests demonstrating error safety and log redaction, plus scope-audit output.

## Task T-4: Regenerate the root project command interface

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-3, AC-6
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260806-rpiv-stage-contract

### Description
Use the explicit user approval to replace the inherited two-recipe `justfile`. Expose setup, run, test, lint, format-check, type-check, build, verify-focused, and verify. Recipes delegate to root package scripts; documentation names recipes rather than duplicating raw package commands. `setup` performs a clean lockfile install. `verify-focused` accepts a Vitest target and remains narrower than `verify`; `verify` runs the complete static, test, build, and diff-integrity suite. Do not add a standalone verification configuration.

### Acceptance Criteria
- AC-3: `just --list` exposes all applicable stable root commands, including distinct focused and full verification.
- AC-6: Focused verification accepts a selected test target and full verification executes every configured quality gate successfully.
- The regenerated file retains strict shell behavior and contains all raw operating command bodies.
- No duplicate verification command configuration is introduced.

### Test Coverage
- Run V-6 to inspect recipe discovery, execute a targeted focused check, and execute full verification.
- Run V-9 to prove the run recipe starts both minimal workspace processes and can be stopped cleanly.
- Run V-4 before V-6 to ensure recipes work after a clean lockfile install.
- Inspect repository configuration for duplicate verification command surfaces.

### Expected Evidence
- `just --list` output containing the nine required recipes.
- Successful targeted `just verify-focused` output distinct from successful `just verify` output.
- Root `justfile` diff showing approved regeneration and no standalone verification config.

## Task T-5: Replace template documentation with Sparkta guidance

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-3, AC-4
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-observability, CORE-COMPONENT-260812-state-lifecycle, CORE-COMPONENT-260806-rpiv-stage-contract

### Description
Replace the root README template identity with Sparkta, its local agent-powered rapid UI-prototyping goal, and the explicit bootstrap scope. Document devcontainer rebuild, clean dependency setup, all root recipes, workspace layout, Node.js 24, and troubleshooting for an environment that lacks Node/npm before rebuild. Update `docs/README.md` with project-specific setup and architecture links. Update `AGENTS.md` to register the new global artifacts and bootstrap boundaries. Update `LLM.txt` with `PRD.md`, `.github/agents/prd-to-gh-issues.agent.md`, the application scaffold, tests, and every new architecture artifact. Keep raw operating commands in the `justfile`; docs use recipe names.

### Acceptance Criteria
- AC-1: Documentation names Sparkta and accurately states its rapid UI-prototyping goal and Node.js/TypeScript foundation.
- AC-3: Every applicable root recipe is documented and matches `just --list`.
- AC-4: A cold agent can rebuild the devcontainer, install from the lockfile, run the scaffold, and invoke focused or full validation by following repository docs.
- Documentation clearly excludes Prototype 0 behavior, the Sparkta control UI, and the blessed generated-app starter from this issue.

### Test Coverage
- Run V-7 as a cold-session documentation walkthrough.
- Compare documented recipe names with V-6 `just --list` output.
- Check README, docs, AGENTS, and LLM references for existing paths and architecture IDs.

### Expected Evidence
- Updated README, docs index, AGENTS registry, and LLM repository map.
- A documented walkthrough log showing no undocumented setup or operating command was needed.
- Link and command-name check results.

## Task T-6: Preserve parent coordination and child-issue boundaries

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** T-5
- **Acceptance Criteria:** AC-5
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-agent-executable-acceptance-criteria, CORE-COMPONENT-260505-commit-standards

### Description
Confirm that GitHub issue #1 retains delivery-order checklist links #2, #3, and #4, corresponding to harness adoption, Soft Factory Runner installation, and Prototype 0 feasibility. Do not mark child work complete or implement its behavior. Preserve the approved deletion of the inherited harness agent and approved addition of the PRD issue agent; these do not replace issue #2 ownership. Record the coordination evidence for Verify rather than changing GitHub acceptance status during Implement.

### Acceptance Criteria
- AC-5: Issue #1 visibly links #2, #3, and #4 in that exact order.
- The implementation does not claim completion of any child issue.
- No harness, Soft Factory Runner, Prototype 0 workflow, generated demo, or blessed generated-app starter is implemented.

### Test Coverage
- Run V-8 with `gh issue view` and inspect the delivery-order checklist.
- Run V-2 against the complete branch diff to detect prohibited child-feature files or behavior.

### Expected Evidence
- GitHub issue JSON or body excerpt with ordered checklist entries #2, #3, #4.
- Scope-audit record identifying the approved harness-agent deletion and confirming no replacement harness implementation.

## Task T-7: Validate, record evidence, and hand off Implement

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3, T-4, T-5, T-6
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260505-commit-standards, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-agent-executable-acceptance-criteria, CORE-COMPONENT-260806-architecture-artifact-naming, CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-observability, CORE-COMPONENT-260812-state-lifecycle

### Description
Execute V-1 through V-9 in dependency order. Because the starting environment lacks Node.js and npm, do not claim command validation until the configured devcontainer has been rebuilt or equivalently instantiated from the committed configuration. Validate a clean lockfile installation, focused verification, and full verification. Write `implementation/00-implementation.md` with task completion, documentation impact, command outputs, and evidence grouped by AC-1 through AC-6. Commit the complete worktree, including every approved pre-existing change, with the required Conventional Commit format and AI trailer. Hand Verify the exact branch, commit SHA, clean-tree proof, architecture list, and evidence locations.

### Acceptance Criteria
- AC-1 through AC-6 each have concrete, reproducible implementation evidence.
- AC-6: `just verify-focused` and `just verify` pass in the Node-provisioned environment after a clean dependency install.
- The final implementation commit includes plan, architecture, scaffold, documentation, approved deletions/additions, devcontainer, and tmux changes.
- The handoff identifies branch `feat/1-bootstrap-sparkta`, exact commit SHA, and a clean working tree.

### Test Coverage
- Execute every test in `03-test-plan.md`; no test may be omitted without returning to Plan.
- Repeat V-4 through V-6 from a clean dependency state.
- Capture `git status`, commit metadata, and full changed-path list after committing.

### Expected Evidence
- `implementation/00-implementation.md` with per-task, per-AC, validation, and documentation evidence.
- Passing V-1 through V-9 results and complete `just verify` output.
- Exact implementation commit SHA, required commit format/trailer, changed-path inventory, and clean-tree output for Verify.
