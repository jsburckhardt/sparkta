# Contributing to This Project

This project uses a staged pipeline to move from idea to production code. Every contribution follows the same flow.

## Pipeline Overview (RPIV)

```
Research → Plan → Implement → Verify
```

Each stage has clear inputs, outputs, and artifact locations. No stage may be skipped.

## Engineering Harness Front Door

The configured development environment provides ambient `harness` 0.13.0; repository npm setup does not install it. Start with `harness instructions` and `harness doctor --json`. Use `harness checks focused [target] --json` during implementation, `harness checks full --json` before handoff, and `harness boot` / `readiness` / `stop` for the owned local foundation lifecycle. Harness checks delegate to the authoritative root `just verify-focused` and `just verify` recipes.

RPIV fires the `eng-harness-flow` skill at pre-flight, pre-coding, coding, post-coding, and post-flight seams. See [`.harness/engineering-harness.md`](.harness/engineering-harness.md) for exact calls and evidence paths.

## Soft Factory Runner

The configured environment, not repository npm or devcontainer state, provides `soft-factory-runner` 0.1.0. Start with `just runner-readiness`. Runner Doctor is separate from harness Doctor. A caller must explicitly select one positive `<ISSUE_NUMBER>`; never queue, rank, infer, or select an issue. Use only `just runner` delegation for run, list/status, reconcile, resume, stop, clean, attach, and logs, and leave worktrees, locks, processes, state, recovery, and cleanup to Runner. See [the operator guide](docs/README.md#soft-factory-runner-operation).

Repository-specific operation uses the Sparkta Operator outside the locked official manifest. Bound RPIV runs validate and execute injected helpers through root adapter recipes; unbound RPIV remains unchanged. Use `just runner-canary` for safe integration proof. It is synthetic and must never be replaced with a real issue run.

## How to Start Work on an Issue

1. **Create a GitHub Issue** describing the work to be done.
2. **Run the `rpiv` pipeline** — the full-pipeline coordinator handles each stage in order, starting from the issue number. Research creates `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/`, and later stages preserve that path. Use individual stage workflows as needed: `rpiv-research`, `rpiv-planner`, `rpiv-implementer`, and `rpiv-verifier`.

## Stage 1 — Research

- The `rpiv-research` workflow fetches the GitHub Issue via `gh issue view`
- Produces `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md`
- Classifies `scope_type` as one of: `issue`, `architecture_decision`, `core_component`
- Identifies whether ADRs or core-components are needed
- References existing ADRs and core-components

## Stage 2 — Plan

- The `rpiv-planner` workflow reads the research brief before creating any architectural artifacts
- Creates ADRs in `project/architecture/ADR/` using the ADR template **when the research brief identifies them as needed**
- Creates core-components in `project/architecture/core-components/` using the core-component template **when the research brief identifies them as needed**
- Updates `project/architecture/ADR/DECISION-LOG.md` with every new ADR or core-component
- Produces `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/01-action-plan.md` with the chosen approach
- Produces `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/02-task-breakdown.md` with acceptance criteria for every task
- Produces `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/03-test-plan.md` with full test coverage requirements
- References relevant ADRs and core-components in every task

## Stage 3 — Implement

- The `rpiv-implementer` workflow executes tasks from the task breakdown
- Writes tests as specified in the test plan
- Updates affected README, API, configuration, usage, migration, architecture, operational, and deployment documentation
- Documents implementation notes in `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/implementation/00-implementation.md`
- Deviations from ADRs or core-components require returning to the Plan stage

## Stage 4 — Verify

- The `rpiv-verifier` workflow runs the full test suite and confirms all tests pass
- Independently verifies affected application documentation matches the committed behavior
- Creates logical, atomic commits following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) through the explicit-pathspec `harness commit` guidance when supported
- Pushes to a feature branch (`<type>/<ISSUE_NUMBER>-<short-slug>`)
- Opens a pull request with `Closes #<ISSUE_NUMBER>` in the body

## Where Artifacts Belong

| Artifact | Location |
|----------|----------|
| Research briefs | `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md` |
| Action plans | `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/01-action-plan.md` |
| Task breakdowns | `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/02-task-breakdown.md` |
| Test plans | `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/03-test-plan.md` |
| Implementation notes | `project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/implementation/00-implementation.md` |
| ADRs | `project/architecture/ADR/` (global, not issue-scoped) |
| Core-Components | `project/architecture/core-components/` (global, not issue-scoped) |
| Decision log | `project/architecture/ADR/DECISION-LOG.md` |

## How to Propose ADRs and Core-Components

- **ADRs** capture architectural decisions. Copy `project/architecture/ADR/ADR-260101-template.md` and name the new file `ADR-yymmdd-short-slug.md` using its UTC creation date.
- **Core-Components** capture reusable cross-cutting behavior. Copy `project/architecture/core-components/CORE-COMPONENT-260101-template.md` and name the new file `CORE-COMPONENT-yymmdd-short-slug.md` using its UTC creation date.
- ADRs and core-components are **global** — never scoped to a single work item.
- The full date-and-slug basename is the artifact ID; keep the creation date unchanged after later edits.
- Always update `project/architecture/ADR/DECISION-LOG.md` when adding or modifying an ADR or core-component.

## PR Expectations

- Every PR must reference the GitHub Issue it addresses (`Closes #<ISSUE_NUMBER>`)
- PR titles must follow Conventional Commits format
- ADRs and core-components must be reviewed before implementation begins
- All tests from the test plan must pass
- Implementation must not deviate from approved ADRs or core-components without going back through the Plan stage
