# Action Plan: Bootstrap Sparkta and coordinate Prototype 0

## Feature
- **ID:** 1
- **Research Brief:** `project/work-items/1-bootstrap-sparkta-and-coordinate-prototype-0/research/00-research.md`

## ADRs Created
- [`ADR-260812-foundation-stack`](../../../architecture/ADR/ADR-260812-foundation-stack.md) — adopts Node.js 24 LTS, strict TypeScript, npm workspaces, React/Vite, Fastify, Vitest, ESLint, and Prettier while excluding Prototype 0 behavior.
- [`ADR-260812-filesystem-state-boundary`](../../../architecture/ADR/ADR-260812-filesystem-state-boundary.md) — separates durable application files from disposable runtime coordination state.

## Core-Components Created
- [`CORE-COMPONENT-260812-development-standards`](../../../architecture/core-components/CORE-COMPONENT-260812-development-standards.md)
- [`CORE-COMPONENT-260812-error-handling`](../../../architecture/core-components/CORE-COMPONENT-260812-error-handling.md)
- [`CORE-COMPONENT-260812-observability`](../../../architecture/core-components/CORE-COMPONENT-260812-observability.md)
- [`CORE-COMPONENT-260812-state-lifecycle`](../../../architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md)

## Acceptance Criteria
- **AC-1:** The bootstrap agent initializes Sparkta with its product identity, rapid UI-prototyping goal, and PRD-defined Node.js/TypeScript direction.
- **AC-2:** The selected framework, package manager, test runner, development standards, and cross-cutting concerns are recorded through the bootstrap architecture artifacts.
- **AC-3:** The repository exposes documented root operating commands, including focused and full verification, and supports them from a clean checkout.
- **AC-4:** Repository and development-environment documentation enables a cold agent session to install dependencies and use the project command interface.
- **AC-5:** This issue links the harness, Soft Factory Runner, and Prototype 0 feasibility features in delivery order.
- **AC-6:** Bootstrap validation succeeds using the repository's resulting command interface.

## Acceptance Coverage
| Acceptance Criterion | Implementation Tasks | Tests or Validation | Expected Evidence |
|---|---|---|---|
| AC-1 | T-2, T-5 | V-2, V-5, V-7, V-9 | Sparkta package metadata and application entry points; README and docs state the product identity and rapid UI-prototyping goal; workspace build and tests pass without a feature UI |
| AC-2 | T-2, T-3 | V-1, V-5 | Two accepted ADRs, four adopted core-components, decision-log entries 26-42, strict tool configuration, and passing architecture and quality checks |
| AC-3 | T-1, T-4, T-7 | V-3, V-4, V-6, V-9 | Node.js/npm/just version output from the rebuilt devcontainer; clean `npm ci`; `just --list`; passing focused and full verification logs |
| AC-4 | T-1, T-5, T-7 | V-3, V-4, V-7 | Rebuilt devcontainer proof plus a cold-session walkthrough that follows repository documentation without undeclared commands |
| AC-5 | T-6 | V-2, V-8 | GitHub issue body showing ordered links `#2`, `#3`, `#4`; scope audit showing no child-issue feature implementation and preservation of approved worktree changes |
| AC-6 | T-3, T-4, T-7 | V-3, V-4, V-5, V-6, V-9 | Successful root-recipe output, including `just verify-focused` and `just verify`, from a clean dependency state in a Node-provisioned environment |

Coverage is complete: every AC ID maps to at least one implementation task, one repository-executable validation, and concrete expected evidence.

## Implementation Tasks
1. **T-1 — Preserve the approved baseline and provision Node.js:** retain every approved pre-existing deletion, addition, devcontainer identity change, and tmux change; enable and lock Node.js 24 in the devcontainer while preserving `just`.
2. **T-2 — Create the minimal npm-workspace foundation:** add only buildable React/Vite web and Fastify server package boundaries, strict TypeScript configuration, root metadata, and a root npm lockfile. Do not implement the Sparkta control UI, Prototype 0, agent invocation, generated apps, or a blessed starter.
3. **T-3 — Configure foundational standards and cross-cutting primitives:** wire ESLint, Prettier, Vitest, safe typed server errors, and structured Pino logging; document the durable/runtime boundary without implementing persistence or lifecycle features.
4. **T-4 — Regenerate the root command interface:** replace the inherited `justfile` under the explicit approval with setup, run, test, lint, format-check, type-check, build, verify-focused, and verify recipes.
5. **T-5 — Replace template documentation with Sparkta operating guidance:** update README, application docs, AGENTS, and LLM maps for product identity, cold setup, project commands, architecture, scope, and all approved additions.
6. **T-6 — Preserve parent coordination and feature boundaries:** verify the issue orders #2, #3, and #4 and keep harness adoption, Soft Factory Runner installation, Prototype 0 behavior, and the blessed generated-app starter in those child issues.
7. **T-7 — Validate, record evidence, and hand off Implement:** validate in a Node-provisioned rebuilt devcontainer from a clean dependency state, write per-AC and documentation evidence, include all approved worktree changes in the implementation commit, and provide the branch, SHA, clean-tree proof, and command results to Verify.
