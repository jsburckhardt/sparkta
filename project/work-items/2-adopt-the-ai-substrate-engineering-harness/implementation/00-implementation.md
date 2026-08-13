# Implementation Notes: Adopt the AI-Substrate engineering harness

## Scope and stage boundary

- **Issue:** #2
- **Branch:** `issue-2-adopt-engineering-harness`
- **Work item:** `project/work-items/2-adopt-the-ai-substrate-engineering-harness`
- **Configured environment:** Linux devcontainer, Node.js `v24.19.0`, ambient harness `0.13.0`
- **Architecture:** implementation remains within ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary, and CORE-COMPONENT-260813-engineering-harness-operation.
- **Verify boundary:** these notes record Implement evidence only. Final verification and acceptance remain owned by Verify.

The ambient harness installation was not changed. `ai-substrate-engineering-harness-0.13.0.tgz` remained absent, and neither `package.json` nor `package-lock.json` gained `@ai-substrate/engineering-harness`. The transient root `skills-lock.json` input was preserved locally but is excluded from committed state because the first-class installer records a temporary extraction source; `.harness/skills.lock.json` is the canonical portable lock.

## Completed tasks

| Task | Status | Implementation and evidence |
| --- | --- | --- |
| T-1 | Complete | `harness --version` returned `0.13.0`; `harness instructions` returned `status: ok`; `harness doctor --json` returned a parseable allowed `degraded` envelope. |
| T-2 | Complete | Ran `harness skills install --target github-copilot` from the ambient packaged source. The ambient and committed inventories both contain nine skills, and the canonical lock declares project / github-copilot / packaged. |
| T-3 | Complete | Scaffolded `checks` with `harness new` and implemented bare/full and focused delegation-only wrappers with bounded envelopes. Exact one-call spy controls passed for target, no-target, bare, full, and failure cases. |
| T-4 | Complete | Added `GET /api/readiness` with the exact stable response and a Fastify injection test covering status, body, field closure, and sensitive/internal omissions. |
| T-5 | Complete | Scaffolded `boot` with `harness new` and implemented owned boot, dual readiness, composed full checks, idempotent stop, stale-state reconciliation, unknown-port refusal, failure cleanup, and transient evidence confinement. |
| T-6 | Complete | Populated the BIO governance contract, wired exact RPIV hooks, injected idempotent managed commit guidance, completed and rendered the adoption flow, recorded delivery branch provenance, set L2 after proof, and added one validated `harness-change` record. |
| T-7 | Complete | Updated all required cold-agent, API, configuration, usage, architecture, migration-impact, and operational documentation. |
| T-8 | Complete | Executed V-1 through V-11, focused and full root validation, delegation controls, portability checks, lifecycle controls, and final cleanup. |

## Acceptance evidence

### AC-1 — ambient harness 0.13.0 is usable

- `harness --version` returned exactly `0.13.0` in both initial and final sequences.
- `node --version` returned `v24.19.0`.
- `harness instructions` returned one `status: ok` envelope and listed briefings for `commit`, `boot`, `readiness`, `stop`, and `checks` after adoption.
- `harness doctor --json` returned exit 0 and `status: degraded` with two loaded extensions, zero failures/conflicts, `quality-gate: ok`, and `commit-guidance: ok`.
- Repository-actionable initial findings were resolved: missing extensions/quality gate and missing managed commit guidance. Remaining findings are environment-only: harness telemetry capture is disabled by default, and git-ai is installed at `/home/vscode/.git-ai/bin/git-ai` but not visible as a bare editor-PATH command. Their doctor next actions remain documented in README, docs, and governance.
- Boundary checks proved the harness tarball absent and no harness dependency in repository npm manifests/lock state.

### AC-2 — portable GitHub Copilot skills and cold discovery

- First-class install command: `harness skills install --target github-copilot`; envelope reported `source: packaged`, `targets: [github-copilot]`, and `lock_written: true`.
- Ambient packaged inventory exactly equaled committed inventory:
  `builder`, `eng-harness-0-harnessability-assessment`, `eng-harness-flow`, `eng-harness-in-a-box`, `grill-agent-done`, `plan-0-v2-constitution`, `plan-v2-extract-domain`, `the-flow`, and `validate-v2`.
- All nine `.agents/skills/<slug>/SKILL.md` entries exist. Forty-six committed skill Markdown files were inspected; all concrete relative references resolve, with authoring-template placeholders explicitly exempt.
- `.harness/skills.lock.json` declares `scope: project`, `target: github-copilot`, and `source: packaged`.
- Scoped searches over canonical lock and discovery documents returned zero temporary extraction, machine-global, or repository npm package-source references. Historical Research findings remain unchanged evidence of the pre-implementation transient root lock defect and are not live lock/discovery state.
- Cold entry points `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, and `project/architecture/README.md` all identify the harness front door and existing paths.

### AC-3 — known-state boot with inspectable evidence

- Final `harness boot --json` returned `status: ok`, `delegated_command: just run`, ownership ID `d31de480-2ea9-4f75-9ca4-90e53b3ccba3`, owned PID/process group `315838`, and repository-relative log, ownership, and evidence paths.
- Both final probes passed: web `http://127.0.0.1:5173/` returned HTTP 200 with the `Sparkta Foundation` marker; server `http://127.0.0.1:3000/api/readiness` returned HTTP 200 with the exact stable verdict.
- Boot composed `harness checks full --json`, whose envelope delegated to `just verify` and returned exit 0.
- `harness readiness --json` repeated both probes successfully for the verified ownership identity.
- `harness stop --json` sent only `SIGTERM` to process group 315838, reported `stopped: true`, and reported ports 3000 and 5173 released. Repeated stop returned `already_stopped: true`. Post-stop readiness returned `E_READINESS_NOT_OWNED` as expected.
- Transient evidence paths are `.harness/temp/boot/evidence.json`, `boot.log`, and live-only `ownership.json`. Final ownership is absent; the latest stop evidence and boot log remain inspectable and gitignored.
- `GET /api/readiness` is covered by `apps/server/src/app.test.ts` and contains only `foundation` and `status`. No product workflow, persistence, external service, or public product API was added.

### AC-4 — harness checks delegate to root recipes

- Controlled `just` spy records showed exactly one call each:
  - focused target: `["verify-focused","apps/server/src/app.test.ts"]`;
  - focused no target: `["verify-focused"]`;
  - bare checks: `["verify"]`;
  - explicit full: `["verify"]`;
  - controlled exit 7 propagated as `E_CHECKS_FAILED` with a next action.
- Actual final focused envelope named `just verify-focused apps/server/src/app.test.ts` and passed three tests plus diff integrity.
- Actual final full envelope named `just verify` and passed tests, lint, format, type-check, build, and diff integrity.
- Static review of `.harness/extensions/checks/extension.ts` found only `ctx.exec("just", args)` delegation and no copied npm, Vitest, lint, format, type-check, build, or diff-integrity bodies.
- Root `justfile` still exposes `verify-focused` and `verify` with their authoritative bodies. Its intentional pre-existing `default` and `setup --include=dev` modifications were preserved.

### AC-5 — repository instructions use the deterministic surface

- `AGENTS.md` starts agents at `harness instructions`, doctor, verb briefings, delegation, owned boot/readiness/stop, skills, evidence, exact RPIV hooks, and managed explicit-pathspec commits.
- `LLM.txt` maps governance, extensions, skills, flows, records, historical/current evidence boundaries, readiness source/test, and architecture.
- `.harness/engineering-harness.md` contains no TODOs and defines Boot, Checks, Health, Interact, Observe, deterministic signals, evidence paths, back-pressure gaps, and current L2 maturity.
- Exact RPIV seams are present in `.github/agents/rpiv.agent.md` and `rpiv-implementer.agent.md`: `/eng-harness-flow --hook pre-flight`, `pre-coding`, `coding`, `post-coding`, and `post-flight`, plus concrete `harness observe` triggers.
- `harness instructions commit --inject` inserted the managed block. A second injection returned `action: unchanged` and byte comparison passed.
- `.harness/flows/adopt.json` reached done for `build-boot` and `bridge`, records `delivery_branch: issue-2-adopt-engineering-harness`, and `harness flow render --check` reported `drift: false` for generated `adopt.md`.
- Validated change record: `.harness/records/harness-change/2026-08-13/001-adopt-sparkta-engineering-harness.md`.

### AC-6 — configured readiness, boot, focused, and full checks succeed

- Final ordered V-11 commands succeeded: version, instructions, help, doctor allowed-degraded diagnostics, skill portability, focused checks, boot, readiness, full checks, stop, port release, and explicit root full validation.
- Final root `just verify` passed 11 tests across five test files, ESLint, Prettier, both strict TypeScript workspaces, both builds, and merge-base diff integrity.
- Final runtime cleanup proved ports 3000 and 5173 released, ownership absent, repeated stop successful, and readiness negative after stop.

## Validation results

| Validation | Result and concrete evidence |
| --- | --- |
| V-1 ambient CLI | Passed: harness 0.13.0, Node v24.19.0, instructions ok, doctor parseable allowed-degraded. |
| V-2 discovery/doctor/commit | Passed: four verbs loaded with instructions, doctor quality gate and commit guidance ok, reinjection unchanged. |
| V-3 skill portability | Passed: ambient packaged inventory equals nine committed skills; canonical packaged lock valid; scoped transient-source search empty; concrete references readable. |
| V-4 readiness route | Passed: `just verify-focused apps/server/src/app.test.ts`, three tests; exact HTTP 200 body and field closure. |
| V-5 positive lifecycle | Passed repeatedly: stop, boot, independent HTTP probes, readiness, composed checks, evidence readability, stop, port release, repeated stop. |
| V-6 focused delegation | Passed target/no-target/failure spy controls and actual harness/root focused runs. |
| V-7 full delegation | Passed bare/full/failure spy controls and actual `harness checks full --json`. |
| V-8 cold discovery | Passed six-entry-point command/path audit, exact hook grep, flow render drift check, governance TODO check, and docs formatting. |
| V-9 ownership controls | Passed unknown port 3000 fixture PID 301776 and port 5173 fixture PID 302213 survival; stale-state unrelated PID 302665 survival; partial-start PID 304145 cleanup; failed-check PID 304634 cleanup; repeated stop. |
| V-10 root validation | Passed focused validation after every T-1 through T-7 task and T-8 acceptance work; explicit `just verify` passed. |
| V-11 final sequence | Passed final version/instructions/help/doctor, skills audit, focused, boot, readiness, full, stop, cleanup, and current root validation. |

### Focused validation chronology

- T-1: `just verify-focused` — 10 tests passed.
- T-2: `just verify-focused` — 10 tests passed after packaged skill install.
- T-3: spy contracts and actual `harness checks focused`; `just verify-focused` — 10 tests passed.
- T-4: `just verify-focused apps/server/src/app.test.ts` — 3 tests passed.
- T-5: positive and negative lifecycle controls; `just verify-focused` — 11 tests passed.
- T-6: help/doctor/instructions/flow/hook audits; `just verify-focused` — 11 tests passed.
- T-7: docs/path/portability/format audits; `just verify-focused` — 11 tests passed.
- T-8: final `harness checks focused apps/server/src/app.test.ts --json` — 3 targeted tests passed; final explicit `just verify-focused` — all 11 tests and diff integrity passed.

## Documentation evidence

| Requirement | Updated paths and observable content |
| --- | --- |
| Cold-agent governance | `AGENTS.md`, `LLM.txt` — ambient boundary, self-briefing, verbs, evidence, skills, RPIV hooks, and commit guidance. |
| Human setup and usage | `README.md`, `CONTRIBUTING.md` — Node 24, ambient harness 0.13.0, `just setup`, root authority, adoption workflow, cleanup, and scope. |
| API contract | `README.md`, `docs/README.md` — exact additive `GET /api/readiness` status/body and non-sensitive boundary. No OpenAPI/Swagger file exists, so no separate API specification required an update. |
| Configuration | `README.md`, `docs/README.md`, boot briefing — `PORT`, `LOG_LEVEL`, fixed 5173, 3000 default, `--timeout-ms` 1000–120000, and unknown-port behavior. |
| Operations | `docs/README.md`, `.harness/engineering-harness.md`, boot briefing — known-state boot, probes, ownership verification, evidence paths, failure cleanup, stop, and doctor exception. |
| Skills | `.github/skills/README.md` — links all nine packaged repository-local entries and canonical lock. |
| Architecture | `project/architecture/README.md` — adopted harness contract, just delegation, RPIV boundaries, and separation from product state. No ADR/core-component contract change was required during Implement. |
| Migration/deployment | `README.md` and `docs/README.md` — readiness and harness adoption are additive; no API/data/config migration and no deployment procedure. |
| Historical evidence | `.harness/reports/harnessability/001-sparkta/` remains unchanged static branch-main evidence and is explicitly distinguished from current proof. |

## Final cleanup state before commit

- `harness stop --json` is idempotent.
- Ports 3000 and 5173 are released.
- `.harness/temp/boot/ownership.json` is absent.
- No writes exist under `.sparkta/`.
- The ambient harness tarball remains absent and repository npm state remains unchanged by harness installation.
