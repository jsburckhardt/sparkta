# Decision Log

This file is the single registry of all architectural decisions and core-components in the project. Every new or modified ADR or core-component **must** be recorded here.

## ADRs

| ID                                   | Title                     | Status   | Date       |
| ------------------------------------ | ------------------------- | -------- | ---------- |
| ADR-260812-foundation-stack          | Sparkta Foundation Stack  | Accepted | 2026-08-12 |
| ADR-260812-filesystem-state-boundary | Filesystem State Boundary | Accepted | 2026-08-12 |

## Core-Components

| ID                                                         | Title                                  | Status  | Date       |
| ---------------------------------------------------------- | -------------------------------------- | ------- | ---------- |
| CORE-COMPONENT-260505-commit-standards                     | Commit Standards                       | Adopted | 2026-05-05 |
| CORE-COMPONENT-260806-rpiv-stage-contract                  | RPIV Stage Contract                    | Adopted | 2026-08-06 |
| CORE-COMPONENT-260806-project-command-interface            | Project Command Interface              | Adopted | 2026-08-06 |
| CORE-COMPONENT-260806-agent-executable-acceptance-criteria | Agent-Executable Acceptance Criteria   | Adopted | 2026-08-06 |
| CORE-COMPONENT-260806-architecture-artifact-naming         | Architecture Artifact Naming           | Adopted | 2026-08-06 |
| CORE-COMPONENT-260812-development-standards                | TypeScript Development Standards       | Adopted | 2026-08-12 |
| CORE-COMPONENT-260812-error-handling                       | Application Error Handling             | Adopted | 2026-08-12 |
| CORE-COMPONENT-260812-observability                        | Structured Observability               | Adopted | 2026-08-12 |
| CORE-COMPONENT-260812-state-lifecycle                      | Durable and Runtime State Lifecycle    | Adopted | 2026-08-12 |
| CORE-COMPONENT-260813-engineering-harness-operation        | Engineering Harness Operating Contract | Adopted | 2026-08-13 |
| CORE-COMPONENT-260813-soft-factory-runner-operation        | Soft Factory Runner Operating Contract  | Adopted | 2026-08-13 |

## Decisions

Short, actionable statements derived from ADRs and core-components. More than one decision can originate from a single source.

| #   | Decision                                                                                              | Source                                                     | Date       |
| --- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------- |
| 1   | Enforce Conventional Commits v1.0.0 on every commit message                                           | CORE-COMPONENT-260505-commit-standards                     | 2026-05-05 |
| 2   | Require Conventional Commits format on PR titles                                                      | CORE-COMPONENT-260505-commit-standards                     | 2026-05-05 |
| 3   | Require the configured Copilot Co-authored-by trailer on AI-authored commits                          | CORE-COMPONENT-260505-commit-standards                     | 2026-05-05 |
| 4   | Require the RPIV implementer to commit implementation before verification                             | CORE-COMPONENT-260505-commit-standards                     | 2026-08-06 |
| 5   | Create the issue feature branch before RPIV Research starts                                           | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 6   | Assign stable AC IDs and prove task, validation, and evidence coverage                                | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 7   | Use root justfile recipes for Implement and Verify validation by default                              | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 8   | Restrict Verify to acceptance decisions, GitHub updates, push, and PR creation                        | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 9   | Route verification defects to Implement or Plan by ownership                                          | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 10  | Define project operating commands as root justfile recipes                                            | CORE-COMPONENT-260806-project-command-interface            | 2026-08-06 |
| 11  | Use the root justfile as the default command interface                                                | CORE-COMPONENT-260806-project-command-interface            | 2026-08-06 |
| 12  | Provide the just command runner in project development environments                                   | CORE-COMPONENT-260806-project-command-interface            | 2026-08-06 |
| 13  | Prohibit standalone verification config that duplicates the root justfile                             | CORE-COMPONENT-260806-project-command-interface            | 2026-08-06 |
| 14  | Require Implement and Verify to run independent stage-boundary validation                             | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 15  | Require verify-focused and verify recipes in bootstrapped projects                                    | CORE-COMPONENT-260806-project-command-interface            | 2026-08-06 |
| 16  | Require acceptance criteria to be bounded, observable, and executable by configured agents            | CORE-COMPONENT-260806-agent-executable-acceptance-criteria | 2026-08-06 |
| 17  | Require acceptance evidence to use safe, repeatable repository capabilities                           | CORE-COMPONENT-260806-agent-executable-acceptance-criteria | 2026-08-06 |
| 18  | Identify unavailable human or external prerequisites instead of encoding impossible agent tasks       | CORE-COMPONENT-260806-agent-executable-acceptance-criteria | 2026-08-06 |
| 19  | Name architecture artifacts with their UTC creation date and descriptive slug                         | CORE-COMPONENT-260806-architecture-artifact-naming         | 2026-08-06 |
| 20  | Use the full date-and-slug basename as the architecture artifact ID                                   | CORE-COMPONENT-260806-architecture-artifact-naming         | 2026-08-06 |
| 21  | Preserve artifact creation dates and distinguish same-day records by slug                             | CORE-COMPONENT-260806-architecture-artifact-naming         | 2026-08-06 |
| 22  | Write implementation evidence to implementation/00-implementation.md                                  | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 23  | Require Implement to update affected application documentation and Verify to inspect it               | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-06 |
| 24  | Store RPIV artifacts under stable `project/work-items/<issue-number>-<short-description>/` paths      | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-07 |
| 25  | Reuse an existing same-issue work-item directory before creating a new artifact path                  | CORE-COMPONENT-260806-rpiv-stage-contract                  | 2026-08-07 |
| 26  | Use Node.js 24 LTS with strict TypeScript for Sparkta application code                                | ADR-260812-foundation-stack                                | 2026-08-12 |
| 27  | Organize React/Vite web and Fastify server packages as npm workspaces                                 | ADR-260812-foundation-stack                                | 2026-08-12 |
| 28  | Use Vitest for unit and integration testing across npm workspaces                                     | ADR-260812-foundation-stack                                | 2026-08-12 |
| 29  | Store durable Sparkta application state on the filesystem under `.sparkta/apps`                       | ADR-260812-filesystem-state-boundary                       | 2026-08-12 |
| 30  | Isolate disposable process, port, and session state under `.sparkta/runtime`                          | ADR-260812-filesystem-state-boundary                       | 2026-08-12 |
| 31  | Enforce strict TypeScript, ESLint, and Prettier across application workspaces                         | CORE-COMPONENT-260812-development-standards                | 2026-08-12 |
| 32  | Prefer named exports and async/await in application source                                            | CORE-COMPONENT-260812-development-standards                | 2026-08-12 |
| 33  | Require Vitest coverage for exported behavior and defect regressions                                  | CORE-COMPONENT-260812-development-standards                | 2026-08-12 |
| 34  | Represent expected application failures with stable typed error codes                                 | CORE-COMPONENT-260812-error-handling                       | 2026-08-12 |
| 35  | Translate errors once at boundaries and redact internal details from clients                          | CORE-COMPONENT-260812-error-handling                       | 2026-08-12 |
| 36  | Preserve error causes and never silently swallow unexpected failures                                  | CORE-COMPONENT-260812-error-handling                       | 2026-08-12 |
| 37  | Emit structured Pino records for server boundaries and lifecycle operations                           | CORE-COMPONENT-260812-observability                        | 2026-08-12 |
| 38  | Include operation, outcome, and correlation context in operational events                             | CORE-COMPONENT-260812-observability                        | 2026-08-12 |
| 39  | Redact secrets, prompts, generated source, and personal data from logs                                | CORE-COMPONENT-260812-observability                        | 2026-08-12 |
| 40  | Treat `.sparkta/apps` content as authoritative across runtime restarts                                | CORE-COMPONENT-260812-state-lifecycle                      | 2026-08-12 |
| 41  | Keep PIDs, ports, process handles, and agent sessions in disposable state                             | CORE-COMPONENT-260812-state-lifecycle                      | 2026-08-12 |
| 42  | Reconstruct runtime state from durable application files after runtime loss                           | CORE-COMPONENT-260812-state-lifecycle                      | 2026-08-12 |
| 43  | Use ambient configured harness v0.13.0 without repository npm dependency or tarball requirements      | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 44  | Delegate harness focused and full checks to authoritative root just recipes                           | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 45  | Require harness boot to prove both services ready and clean only owned processes                      | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 46  | Commit three approved engineering-harness skills alongside separately governed named skills           | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 47  | Use harness commit with explicit pathspecs for AI-authored commits                                    | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 48  | Prohibit broad harness installation from restoring unapproved engineering-harness skills              | CORE-COMPONENT-260813-engineering-harness-operation        | 2026-08-13 |
| 49  | Use configured ambient Soft Factory Runner without repository installation dependencies               | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-13 |
| 50  | Reserve `.trees` and `.soft-factory` for Runner worktrees and operational state                       | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-13 |
| 51  | Require protocol 1, agent-result-v1, and `just verify` for Runner RPIV integration                     | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-13 |
| 52  | Delegate explicitly selected issue lifecycle and cleanup exclusively to Soft Factory Runner            | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-13 |
| 53  | Commit and integrity-check the official Operator, Assessor, skill, and manifest                        | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-13 |
| 54  | Execute injected Runner helpers through reachable APS processes before successful RPIV exit            | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-14 |
| 55  | Invoke every engineering-harness lifecycle seam as an executable APS process step                       | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-14 |
| 56  | Preserve official Runner assets and isolate Sparkta policy in repository-owned adapters                 | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-14 |
| 57  | Prove launch-binding helper semantics with synthetic no-network canaries                                | CORE-COMPONENT-260813-soft-factory-runner-operation        | 2026-08-14 |
