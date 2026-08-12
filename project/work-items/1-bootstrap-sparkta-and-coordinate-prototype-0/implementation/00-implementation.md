# Implementation Evidence: Issue #1

## Scope

Implemented the Sparkta Node.js and TypeScript foundation only. Harness adoption, Soft Factory Runner installation, agent invocation, Prototype 0, the control UI, generated-app lifecycle, generated demos, persistence services, runtime managers, and `templates/default` remain outside this issue. No ADR or core-component deviation was required.

## Completed tasks

- **T-1:** Preserved the approved Sparkta devcontainer and tmux renames, deleted harness agent, PRD issue agent, PRD, research, plan, and architecture baseline. Enabled `ghcr.io/devcontainers/features/node:1` at Node.js 24 and regenerated the feature lock. A fresh built image reported Node.js `v24.19.0`, npm `11.17.0`, just `1.42.4`, and tmux session `sparkta`.
- **T-2:** Added private root npm workspaces `@sparkta/web` and `@sparkta/server`, one root lockfile, strict shared TypeScript settings, minimal React/Vite and Fastify entry points, and foundation identity tests. No product feature route or workflow was added.
- **T-3:** Added ESLint, Prettier, Vitest, typed `ApplicationError`, unknown-error normalization and response redaction, cause preservation, Pino redaction, structured operational events, and ten deterministic tests across five files. State work is documentation and architecture only.
- **T-4:** Regenerated the root justfile with setup, run, test, lint, format-check, type-check, build, verify-focused, and verify recipes. Focused verification accepts an optional committed test path and includes diff integrity; full verification composes every quality gate.
- **T-5:** Replaced template documentation with Sparkta identity, scope, cold setup, command, configuration, state, architecture, and local-operation guidance. Registered the PRD issue agent, application paths, and all new architecture artifacts in AGENTS and LLM maps.
- **T-6:** Read issue #1 without mutation and confirmed its Delivery Order is #2, #3, then #4. Child titles remain harness adoption, Soft Factory Runner installation, and Prototype 0 feasibility, and all three issues remain open.
- **T-7:** Executed V-1 through V-9, reran focused validation after fixes, and ran the complete root verification suite before handoff.

## Acceptance evidence

### AC-1

- `package.json`, `apps/web/package.json`, and `apps/server/package.json` identify Sparkta and pin Node.js major 24 with strict TypeScript workspace configuration.
- `apps/web/src/App.tsx` is a neutral foundation placeholder; `apps/server/src/app.ts` creates only a Fastify boundary with no product API.
- `apps/web/src/foundation.test.ts` and `apps/server/src/foundation.test.ts` prove exported bootstrap identity. Both workspace builds pass.
- README and docs state the local agent-powered rapid UI-prototyping goal and foundational-only scope.

### AC-2

- Accepted ADRs: `ADR-260812-foundation-stack` and `ADR-260812-filesystem-state-boundary`.
- Adopted contracts: `CORE-COMPONENT-260812-development-standards`, `CORE-COMPONENT-260812-error-handling`, `CORE-COMPONENT-260812-observability`, and `CORE-COMPONENT-260812-state-lifecycle`.
- `DECISION-LOG.md` registers each artifact once and includes decisions 26 through 42.
- ESLint, Prettier, strict TypeScript, and Vitest configuration is executable. Server tests prove known translation, unknown redaction, preserved causes, event shape, and sensitive-field log redaction.

### AC-3

- Fresh devcontainer image evidence: Node.js `v24.19.0`, npm `11.17.0`, just `1.42.4`; configured Node and just features are locked by OCI digest.
- `just --list` exposes exactly the nine planned recipes. `just verify-focused apps/server/src/logger.test.ts` ran only two selected tests plus diff integrity, while `just verify` ran all ten tests, lint, format, type-check, both builds, and diff integrity.
- A clean dependency removal followed by `just setup` installed 216 packages with zero vulnerabilities and left the SHA-256 of `package-lock.json` unchanged at `f6eeba7cb46839e80a3a50cbaf19319884a63b5e98f34a09f228c38fc0bfab6b`.

### AC-4

- `.devcontainer/devcontainer.json` and `.devcontainer/devcontainer-lock.json` provision every required tool, and the rebuilt image confirms they resolve.
- README cold setup uses the Dev Containers rebuild action, `just setup`, and `just --list`; docs require no undeclared package-manager command.
- README and docs cover all nine recipes, default ports, `PORT`, `LOG_LEVEL`, shutdown, missing-Node recovery, scope, state boundaries, and local-only operation. V-7 path and command checks passed.

### AC-5

- `gh issue view 1 --json body` showed unchecked links #2, #3, and #4 in that order. Child title lookups matched the planned harness, Runner, and Prototype 0 deliveries and showed state OPEN. No GitHub data was mutated.
- V-2 found no `templates/default`, `.sparkta/apps`, `.sparkta/runtime`, harness implementation, Runner integration, agent adapter, prompt workflow, generated demo, control UI, persistence repository, or runtime manager.

### AC-6

- `just verify-focused` passed all five test files and ten tests plus diff integrity after the final task changes.
- `just verify` passed workspace tests, ESLint, Prettier, TypeScript checks, server TypeScript build, Vite production build, and merge-base diff integrity.
- V-9 started both workspaces, served the neutral Sparkta page, produced a Fastify 404 without a product API, emitted structured `server.started` and `server.stopping` events, exited the coordinated run recipe successfully, and left no runtime paths or container process.

## Validation evidence

| ID | Result | Concrete evidence |
|---|---|---|
| V-1 | Passed | Six dated artifacts had matching IDs/statuses and registry rows; decisions 26-42 counted 17; both templates had no diff. |
| V-2 | Passed | Approved baseline paths were present; harness agent remained deleted; the 21-file application tree contained only web/server foundation source and tests; prohibited feature and state paths were absent. |
| V-3 | Passed | Fresh image `sparkta-issue1-validation` was built from the locked config; an isolated instance reported Node `v24.19.0`, npm `11.17.0`, just `1.42.4`, and tmux session `sparkta`. |
| V-4 | Passed | After deleting dependency directories, `just setup` installed the locked graph, created both workspace links, reported zero vulnerabilities, and preserved the lockfile hash. |
| V-5 | Passed | `just test` ran 10 tests in 5 files; lint, format-check, type-check, server build, and web Vite build all completed successfully. |
| V-6 | Passed | `just --list` displayed 9 recipes; selected logger verification ran 2 tests; `just verify` exercised every configured gate; no duplicate verification config exists. |
| V-7 | Passed | Static walkthrough checks found product identity, Node 24, rebuild/setup instructions, all recipe names, valid AGENTS/LLM paths, configuration, migration, deployment, and scope guidance. |
| V-8 | Passed | GitHub read-only checks proved ordered links #2/#3/#4 and matching open child titles; acceptance checkboxes were not changed. |
| V-9 | Passed | Vite and Fastify became ready in a bounded Docker instance; the page title was Sparkta Foundation; server readiness returned expected 404; SIGINT produced structured shutdown and released all processes. |

## Documentation evidence

- `README.md`: product identity, bootstrap exclusions, cold setup, all root recipes, run behavior, configuration defaults, filesystem contract, layout, and explicit local-only/no-migration status.
- `docs/README.md`: development environment, focused/full validation, configuration and logging behavior, durable/runtime contract, architecture links, and explicit API/migration/deployment status.
- `AGENTS.md`: Sparkta foundation registry, architectural paths, issue #1 exclusions, and PRD-to-GitHub-issues agent registration.
- `LLM.txt`: PRD, new agent, workspace source/tests/configuration, all six architecture artifacts, and stable issue artifact paths.
- `project/architecture/README.md`: explanatory foundation stack, state boundary, cross-cutting contracts, future-scope exclusions, and no-deviation statement.
- API documentation: no product API was introduced; docs explicitly identify the Fastify process as foundation-only.
- Migration documentation: no breaking, data, API, or configuration migration exists for this initial foundation; README and docs state this.
- Operational/deployment documentation: local startup, ports, shutdown, and configuration are documented; no deployment procedure applies to this local-only bootstrap.

Implementation evidence is provided for Verify to independently assess. This document does not claim final acceptance.
