# Implementation Notes: Adopt the AI-Substrate engineering harness

## Scope and stage boundary

- **Issue:** #2
- **Branch:** `issue-2-adopt-engineering-harness`
- **Work item:** `project/work-items/2-adopt-the-ai-substrate-engineering-harness`
- **Configured environment:** Linux devcontainer, Node.js `v24.19.0`, ambient harness `0.13.0`
- **Architecture:** implementation remains within ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary, and CORE-COMPONENT-260813-engineering-harness-operation.
- **Verify boundary:** these notes record Implement evidence only. Final verification and acceptance remain owned by Verify.

The ambient harness installation was not changed. `ai-substrate-engineering-harness-0.13.0.tgz` remained absent, and neither `package.json` nor `package-lock.json` gained `@ai-substrate/engineering-harness`. The transient root `skills-lock.json` is absent. `.harness/skills.lock.json` records packaged-source provenance only and does not authorize skill names.

## Corrective implementation addendum — 2026-08-13

This addendum supersedes every final-state statement below that describes nine committed engineering-harness skills, a complete packaged inventory, or the canonical lock as skill-name authority. Those statements and command results are retained only as truthful history of the earlier implementation. The corrected final allowlist is exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`.

- **AC-2:** Removed the tracked `builder`, `eng-harness-in-a-box`, `plan-0-v2-constitution`, `plan-v2-extract-domain`, `the-flow`, and `validate-v2` trees. The three allowed trees and the unrelated `.github/skills/agnostic-prompt-standard/` tree retained their aggregate SHA-256 `8630cfcd80750dbee16c39586d73d3aee3411578d329ea78615dbf57dadd0fb6`. The root guard accepts the exact set and rejects disposable missing/extra fixtures with actionable inventory output.
- **AC-2 / AC-5:** Updated `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, `.harness/engineering-harness.md`, and `project/architecture/README.md` to name only the three allowed skills, describe `.harness/skills.lock.json` as provenance, and prohibit broad restoration. Cold entry points and all three indexed `SKILL.md` paths resolve.
- **AC-4:** Added root recipe `verify-harness-skills` and composed it into both authoritative `verify-focused` and `verify` recipes without changing harness wrapper delegation.
- **Architecture:** Retained the in-place `CORE-COMPONENT-260813-engineering-harness-operation` update and Decision 46/48 records. No ADR or replacement core-component was created.
- **Preservation baseline:** The modified `latest.json` and `latest.md` hashes were `84ea1893ec1cf31718e9799ff26d2d3aa6e2bc678f137d2aa2da703be7d9369a` and `a1f7dcc754e4d2ca0ec17387ab571ad8d4d78e42be3d37dd01beb55d5b5871b1`; all four untracked `002-sparkta` file hashes are recorded in the corrective handoff and must remain byte-identical. Generated report observations are historical evidence, not the live allowlist oracle.
- **Verify handoff:** Verify must independently replace or explicitly supersede stale nine-skill final-state claims in `verify/summary.md` and PR #10 metadata, inspect the exact inventory and preservation hashes, rerun authoritative validation, and retain ownership of acceptance and GitHub updates. Implement does not alter those Verify-owned surfaces.


### Corrective acceptance evidence

| AC | Current Implement evidence |
| --- | --- |
| AC-1 | `harness --version` returned exactly `0.13.0`; `harness instructions` returned `status: ok`; `harness doctor --json` parsed and returned the documented environment-only `degraded` findings while both extensions, quality gate, and commit guidance remained loaded. No install, package dependency, lockfile dependency, or tarball was added. |
| AC-2 | The sorted `.agents/skills/` inventory is exactly `eng-harness-0-harnessability-assessment`, `eng-harness-flow`, and `grill-agent-done`. All required `SKILL.md` entry points resolve. The root guard passed and disposable missing/extra controls both failed with expected/actual inventory output. Live normative discovery search returned no excluded names. |
| AC-3 | `harness boot --json` delegated to `just run`, proved web HTTP 200 and the exact server readiness verdict, composed successful full checks, and named bounded evidence paths. `harness readiness --json` passed. Final `harness stop --json` matched complete ownership, sent only `SIGTERM`, released ports 3000/5173, and removed ownership; independent probes found both ports closed. |
| AC-4 | `verify-harness-skills` is composed by both root recipes. `harness checks focused --json` delegated to exact `just verify-focused` and passed 13 tests; boot-composed `harness checks full --json` delegated to exact `just verify`. Existing delegation-only wrappers were unchanged. |
| AC-5 | Updated all affected cold-agent, README, usage, operational, lock-boundary, and architecture-overview documentation. Each names the exact allowlist, root `justfile` authority, provenance-only lock role, and broad-install prohibition. Verify-owned `verify/summary.md` and PR #10 are explicitly handed back for independent correction. |
| AC-6 | Corrective focused runs passed after T-1 through T-4; T-5 delegated focused checks passed 13 tests; boot-composed full checks passed; final root `just verify` passed 13 tests, lint, formatting, strict type checks, both builds, allowlist validation, and merge-base diff integrity. Runtime cleanup and report preservation checks passed. |

### Corrective documentation evidence

- **Setup/usage/operations:** `README.md`, `docs/README.md`, `AGENTS.md`, `LLM.txt`, `.harness/engineering-harness.md`, and `.github/skills/README.md` now expose exactly the three supported skills, warn against broad restoration, and retain the deterministic harness/root-recipe workflow.
- **Architecture:** `project/architecture/README.md`, the existing engineering-harness core-component, and Decision 46/48 describe the narrowed contract without a new ADR or component.
- **API/configuration/migration/deployment:** no application API, configuration default, data shape, migration, or deployment procedure changed; existing readiness documentation remains accurate.
- **Preserved evidence:** implementation did not edit generated harnessability reports. Final hashes equal the baseline: `002-sparkta/evidence.jsonl` `682631299a114807ff0eff809480dc5d84a48da344a4b5fb8ca4f6ef0edc8487`, `report.json` `84ea1893ec1cf31718e9799ff26d2d3aa6e2bc678f137d2aa2da703be7d9369a`, `report.md` `a1f7dcc754e4d2ca0ec17387ab571ad8d4d78e42be3d37dd01beb55d5b5871b1`, and `summary.md` `d58229032a261d63f95a5ee182969039a571e3773a09e0adb0f009727ac844a5`; `latest.json` and `latest.md` match the corresponding report hashes.

### Corrective focused validation chronology

- T-1: `just verify-focused` passed 13 tests and diff integrity.
- T-2: exact allowlist positive guard, missing/extra negative controls, and `just verify-focused` passed.
- T-3: cold-entry path and stale-reference audits plus `just verify-focused` passed.
- T-4: corrective evidence audit plus `just verify-focused` passed.
- T-5: ambient CLI, boot/readiness/stop, delegated focused/full checks, final preservation/cleanup audits, and `just verify` passed.

## Verify repair evidence — 2026-08-13

This repair is a new descendant of rejected implementation SHA `20ad230a7db46f1923acb0fcc385338b969db6c0` and stays within the adopted engineering-harness operating contract; no ADR or core-component contract changed.

- **AC-3 ownership safety:** `ownershipMatches()` now requires Linux `/proc` evidence that the live PID start time, `just run` command, and process-group membership all equal recorded ownership. Group liveness checks, `SIGTERM`, and `SIGKILL` each revalidate that identity before using a negative process-group ID. Invalid or mismatched state is removed without a group signal and reports field-level `ownership_validation` evidence.
- **AC-3 automated controls:** `apps/server/src/harness-boot-ownership.test.ts` passed both controls: a live PID paired with another live process group returned `process_group_matched: false`, `signals: []`, left both fixtures alive, and wrote no signal marker; a valid owned group returned `process_group_matched: true`, `signals: ["SIGTERM"]`, and exited cleanly. Both `just verify-focused apps/server/src/harness-boot-ownership.test.ts` and delegated `harness checks focused ... --json` passed 2/2 tests.
- **V-9 controls:** disposable listeners on ports 3000 and 5173 each survived rejected boot with `E_BOOT_PORT_CONFLICT`, `unknown_processes_signalled: false`, and no ownership file. A controlled composed-check exit 7 produced `E_BOOT_CHECKS`; verified cleanup sent `SIGTERM`, reported both ports released, and removed ownership. Repeated stop remained idempotent.
- **AC-5 documentation:** `README.md` and `docs/README.md` now state that the committed devcontainer provides the Sparkta application toolchain but does not provision the separately configured ambient harness. README, docs, the boot briefing, governance, and architecture overview now describe the implemented Linux process-group check exactly.
- **AC-6 diff integrity:** merge-base `git diff --check` is clean after removing four defects from `.agents/skills/builder/references/stages/25-workshop.md`, one extra EOF blank line, and the two other reported trailing spaces. No semantic skill or historical-report content changed.
- **AC-6 current runtime:** `harness boot --json` succeeded with ownership `9e1aad57-73f5-437e-a8bd-e93749c4599f` / PID and group `349287`, both readiness probes passed, and composed full checks delegated to successful `just verify`. `harness readiness --json` and independent HTTP probes passed. Stop revalidated every ownership field, sent only `SIGTERM`, released ports 3000/5173, removed ownership, and repeated stop succeeded.
- **AC-6 validation:** final `just verify-focused` passed 13 tests across six files and diff integrity. Final `just verify` passed 13 tests, ESLint, Prettier, strict TypeScript checks, both builds, and merge-base diff integrity. `harness checks full --json` also delegated to `just verify` and passed.

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

- Current `harness boot --json` returned `status: ok`, `delegated_command: just run`, ownership ID `9e1aad57-73f5-437e-a8bd-e93749c4599f`, owned PID/process group `349287`, and repository-relative log, ownership, and evidence paths.
- Both final probes passed: web `http://127.0.0.1:5173/` returned HTTP 200 with the `Sparkta Foundation` marker; server `http://127.0.0.1:3000/api/readiness` returned HTTP 200 with the exact stable verdict.
- Boot composed `harness checks full --json`, whose envelope delegated to `just verify` and returned exit 0.
- `harness readiness --json` repeated both probes successfully for the verified ownership identity.
- `harness stop --json` revalidated start time, command, and process-group membership, sent only `SIGTERM` to process group 349287, reported `stopped: true`, and reported ports 3000 and 5173 released. Repeated stop returned `already_stopped: true`; independent socket probes found both ports closed.
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
- Current root `just verify` passed 13 tests across six test files, ESLint, Prettier, both strict TypeScript workspaces, both builds, and merge-base diff integrity.
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
| V-9 ownership controls | Passed process-group mismatch automation (both fixtures alive, no marker, no signal), valid-group clean stop, unknown ports 3000/5173 listener survival, controlled failed-check cleanup with both ports released, and repeated stop. |
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
- T-8: final `harness checks focused apps/server/src/app.test.ts --json` — 3 targeted tests passed; Verify repair `harness checks focused apps/server/src/harness-boot-ownership.test.ts --json` — 2 targeted controls passed; final explicit `just verify-focused` — all 13 tests and diff integrity passed.

## Documentation evidence

| Requirement | Updated paths and observable content |
| --- | --- |
| Cold-agent governance | `AGENTS.md`, `LLM.txt` — ambient boundary, self-briefing, verbs, evidence, skills, RPIV hooks, and commit guidance. |
| Human setup and usage | `README.md`, `docs/README.md`, `CONTRIBUTING.md` — the devcontainer provides Node/npm/`just` but does not provision the separately configured ambient harness 0.13.0; `just setup`, root authority, adoption workflow, cleanup, and scope remain explicit. |
| API contract | `README.md`, `docs/README.md` — exact additive `GET /api/readiness` status/body and non-sensitive boundary. No OpenAPI/Swagger file exists, so no separate API specification required an update. |
| Configuration | `README.md`, `docs/README.md`, boot briefing — `PORT`, `LOG_LEVEL`, fixed 5173, 3000 default, `--timeout-ms` 1000–120000, and unknown-port behavior. |
| Operations | `docs/README.md`, `.harness/engineering-harness.md`, boot briefing — Linux PID/start-time/command/process-group verification before group signalling, evidence paths, failure cleanup, stop, and doctor exception. |
| Skills | `.github/skills/README.md` — links all nine packaged repository-local entries and canonical lock. |
| Architecture | `project/architecture/README.md` — adopted harness contract, just delegation, exact owned process-group validation, RPIV boundaries, and separation from product state. No ADR/core-component contract change was required during Implement or Verify repair. |
| Migration/deployment | `README.md` and `docs/README.md` — readiness and harness adoption are additive; no API/data/config migration and no deployment procedure. |
| Historical evidence | `.harness/reports/harnessability/001-sparkta/` remains static branch-main evidence and is explicitly distinguished from current proof; repair only removed the reported trailing space from its summary. |

## Final cleanup state before commit

- `harness stop --json` is idempotent.
- Ports 3000 and 5173 are released by stop and independently observed closed.
- `.harness/temp/boot/ownership.json` is absent.
- No writes exist under `.sparkta/`.
- The ambient harness tarball remains absent and repository npm state remains unchanged by harness installation.
