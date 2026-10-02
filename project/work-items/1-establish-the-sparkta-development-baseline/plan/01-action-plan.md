# Action Plan: Establish the Sparkta development baseline

## Feature
- **ID:** GitHub Issue #1
- **Scope Type:** issue
- **Research Brief:** `project/work-items/1-establish-the-sparkta-development-baseline/research/00-research.md`
- **Assignment:** revision 5, SHA-256 `4ddcd1c23e0928bdca1a8f0471941808b36bba776372b9546ba606f3c4999dd5`
- **Branch:** `feat/1-establish-sparkta-development-baseline`
- **External Dependencies:** None

## Stage and Source-Handoff Boundaries

Plan creates only the three files under this work item's `plan/` directory. The
approved archive and manifest remain read-only during Plan. Implement must
first verify their assignment-recorded hashes, then and only then import or
adapt the approved files inside this issue worktree. Implement must not rerun
bootstrap, reconstruct archive contents from this plan, or use the controller
checkout as a writable source.

The approved source-handoff architecture records are existing authorized source
material. They are not new Plan decisions:

- `ADR-261002-node-react-vite-toolchain`
- `CORE-COMPONENT-261002-development-standards`
- `CORE-COMPONENT-261002-explicit-errors`
- `CORE-COMPONENT-261002-local-persistence`
- `CORE-COMPONENT-261002-process-ownership-cleanup`

No ADR, core-component, or decision-log file is created or edited during Plan.
Implement may import the exact approved architecture records and corresponding
decision-log content because assignment revision 5 explicitly authorizes those
paths. Any architecture change beyond that source handoff requires a revised
assignment and return to Plan.

## Relevant Architecture

| Record | Boundary applied by this plan |
|---|---|
| `ADR-260906-foreman-control-plane` | Keep Foreman above RPIV; preserve isolated worktree/tmux ownership, managed `--yolo`, and no automatic merge. |
| `CORE-COMPONENT-260806-rpiv-stage-contract` | Implement owns code, tests, documentation, evidence, validation, and commit; Verify independently decides acceptance. |
| `CORE-COMPONENT-260806-project-command-interface` | Put raw project operations in the root `justfile`; expose every required stable recipe. |
| `CORE-COMPONENT-260806-agent-executable-acceptance-criteria` | Use bounded, safe, repeatable validation with concrete evidence and explicit external limitations. |
| `CORE-COMPONENT-260906-foreman-orchestration` | Obey the immutable assignment, exact worker ownership, scope gates, and exact-head review. |
| `CORE-COMPONENT-260906-rpiv-observability` | Preserve assignment identity and report typed pending evidence until Implement and Verify execute validation. |
| `ADR-261002-node-react-vite-toolchain` (approved source handoff) | Use the approved Node.js 24, pnpm, strict TypeScript, React, Vite, Tailwind CSS, Vitest, ESLint, and Prettier foundation without claiming product behavior. |
| `CORE-COMPONENT-261002-development-standards` (approved source handoff) | Apply strict typing, deterministic tests, configured lint/format checks, root-justfile commands, and documentation maintenance. |
| `CORE-COMPONENT-261002-explicit-errors` (approved source handoff) | Preserve nonzero dependency/setup failures; do not return success-shaped fallbacks. |
| `CORE-COMPONENT-261002-local-persistence` (approved source handoff) | Document the future persistence boundary; do not implement persistence in this baseline. |
| `CORE-COMPONENT-261002-process-ownership-cleanup` (approved source handoff) | Prove exact process ownership and safe cleanup for the development server; do not implement a session manager or scheduler. |

## ADRs Created

None. Assignment revision 5 authorizes import of the approved source-handoff
ADR during Implement, not creation of a new Plan decision.

## Core-Components Created

None. Assignment revision 5 authorizes import of approved source-handoff
core-components during Implement, not creation of new Plan contracts.

## Acceptance Criteria

- **AC-1:** The delivered baseline identifies the project as Sparkta, includes the approved staged customizations and prepared foundation, and describes the repository as foundation-only without claiming generation, persistence, session, or process-lifecycle product behavior.
- **AC-2:** The baseline records Node.js 24, pnpm, strict TypeScript, React, Vite, Tailwind CSS, Vitest, ESLint, and Prettier as the selected stack and exposes setup, run, build, test, lint, format-check, type-check, verify-focused, and verify through the project command interface.
- **AC-3:** The committed project profile records repository `jsburckhardt/sparkta`, base branch `main`, the approved Copilot CLI/tmux host adapter, two-worker capacity, managed `--yolo` approval, a three-round review limit, and no automatic merge.
- **AC-4:** Dependency setup reports registry or package-manager failures as failures, and the documentation states that fresh-container setup requires registry access rather than claiming an unperformed container rebuild.
- **AC-5:** Delivering the baseline leaves the original controller checkout and its staged and unstaged Git-index state unchanged and creates no managed worker during setup.
- **AC-6:** In an isolated checkout of the delivered commit, dependency setup restores the frozen dependency graph; the documented run command serves the startup frontend; stopping that command terminates its process and allows its port to be reused.
- **AC-7:** On the delivered commit, build, test, lint, format-check, type-check, verify-focused, verify, and the inherited host-contract checks each exit successfully.
- **AC-8:** The development-container configuration selects Node.js 24 and delegates dependency setup to the project command interface; documentation distinguishes behavior verified in the existing container from the unperformed fresh-container rebuild.

## Acceptance Coverage

| Criterion | Implementation tasks | Tests or inspection | Expected concrete evidence |
|---|---|---|---|
| AC-1 | T-1, T-2, T-3 | V-1, V-2, V-8 | Matching archive/manifest hashes and 39-file inventory; exact-scope diff; README, UI, and tests identify Sparkta and enumerate the foundation-only limitations. |
| AC-2 | T-2, T-3, T-4, T-5 | V-2, V-3, V-7 | Stack declarations and configs; `just --list`; successful setup/run/build/test/lint/format-check/type-check/verify-focused/verify outputs. |
| AC-3 | T-2, T-3, T-4 | V-2, V-7 | Parsed `.foreman/project.json` values and inherited host-contract success proving the configured adapter contract. |
| AC-4 | T-3, T-4, T-5 | V-4, V-7 | A controlled package-manager failure returns the same nonzero status; docs state registry dependency and explicitly state that no fresh-container rebuild was performed. |
| AC-5 | T-1, T-4, T-5 | V-5 | Controller staged and unstaged SHA-256 fingerprints match assignment values before and after delivery; setup leaves the managed-worker window inventory unchanged. |
| AC-6 | T-4, T-5 | V-3, V-6 | Isolated-checkout frozen setup success; frontend HTTP response; exact owned process termination; no surviving process; successful same-port bind/reuse. |
| AC-7 | T-4, T-5 | V-7 | Separate zero exits for build, test, lint, format-check, type-check, verify-focused, verify, and inherited `tests/foreman-contract.sh`. |
| AC-8 | T-2, T-3, T-5 | V-2, V-8 | Devcontainer selects Node.js 24 and invokes `just setup`; docs separate existing-container evidence from the explicitly unperformed fresh-container rebuild. |

Every AC has at least one dependency-ordered task, configured validation or
bounded inspection, and concrete evidence. Tests V-1 through V-8 are defined in
`03-test-plan.md`; task details and authorized paths are defined in
`02-task-breakdown.md`.

## Implementation Tasks

1. **T-1 — Authenticate the immutable source and capture preservation baselines.** Verify assignment/archive/manifest hashes and file count, record controller staged and unstaged fingerprints, and capture the managed-worker inventory without writing to the controller or archive.
2. **T-2 — Import the approved 39-file baseline into assignment-authorized paths.** Only Implement may perform this import/adaptation. Import the approved application, profile, documentation, host checks, and source-handoff architecture records; reject undeclared archive entries or writes.
3. **T-3 — Reconcile identity, stack, profile, documentation, and devcontainer contracts.** Keep the repository foundation-only, preserve explicit limitations, and ensure all committed configuration agrees with the issue and approved records.
4. **T-4 — Maintain executable commands and regression coverage.** Ensure every required root-justfile recipe and inherited host check is exercised; add deterministic checks for failure propagation and the no-worker-launch setup invariant.
5. **T-5 — Prove the delivered baseline and prepare the Implement handoff.** Run focused/full validation and isolated-checkout setup/runtime/cleanup/port-reuse checks, recheck controller fingerprints and exact scope, record AC evidence/documentation evidence, and commit a clean implementation.

Dependency order is `T-1 -> T-2 -> T-3 -> T-4 -> T-5`. Verify must rerun the
applicable checks independently against the exact committed head. A missing
registry connection blocks the actual frozen install and must be reported as an
external validation prerequisite; it must never be converted into success or a
claim that a fresh-container rebuild occurred.
