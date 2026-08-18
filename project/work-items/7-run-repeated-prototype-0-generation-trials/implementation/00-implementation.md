# Implementation: Run repeated Prototype 0 generation trials

## Scope and task completion

- T-1 complete — root `trial-init`, `trial-generate`, `trial-validate`, and `trials-check` recipes expose allowlisted, overwrite-safe, bounded trial operation and evidence checks.
- T-2 complete — all three fixed prompts were invoked once in numeric order from full clean `templates/default` copies. Engineering productivity and autonomous delivery returned SUCCESS with non-empty source diffs; customer management returned TIMEOUT at 600 seconds and was not retried or hand-repaired.
- T-3 complete — the two successful attempts passed locked install, dependency and frontend-only audit, strict build, assigned-port HTTP load, owned cleanup, source-backed controls, and complete checklist review. The timed-out attempt records skipped/failed checks and an exact blocker.
- T-4 complete — every finding is dispositioned. No canonical starter or instruction change was adopted, so no fake `02-rerun` exists.
- T-5 complete — findings, three trial verdicts, overall arithmetic, application documentation, focused checks, and full root validation are recorded.

## Acceptance evidence

### AC-1 — Three clean fixed-prompt copies

- `implementation/trials/01-engineering-productivity/attempts/01-initial/`, `02-autonomous-delivery/...`, and `03-customer-management/...` contain complete starter copies, exact `prompt.md` records, and identical baseline inventory `2eb1d7b732b0206585e8a6d2ef2dd91782de084d4d2411d2605ab522b33781f5` and lock hash `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`.
- Prompt hashes are `ab84db6...c02b`, `847a150b...5c2`, and `5f5788d9...083`; `just trials-check` recomputes exact prompt text/hashes.
- Successful generation source-diff hashes are `5334962a...a087` and `12f871f6...386d`. Trial 3 also changed source before timeout, but its finite TIMEOUT outcome prevents it from being represented as successful generation.

### AC-2 — Comparable complete records

- Every initial attempt contains `prompt.md`, `agent-result.md`, `evidence.md`, the full `app/`, and a completed `app/QUALITY-CHECKLIST.md`.
- Agent records include CLI 1.0.81-0, path/permission boundary, timestamps, 600-second timeout, exit metadata, finite outcome, prompt hash, generated-source diff, changed files, and bounded result.
- Evidence records include clean-copy hash, dependency installation, frontend audit, build, assigned runtime port, HTTP load, owned cleanup, control trace, unmet checks, and attempt verdict. `just trials-check` reports PASS for record/schema completeness.

### AC-3 — Simulated frontend-only build and runtime contract

- Engineering productivity: locked install/build PASS; port `36583`; HTTP 200, `text/html`, trial marker, owned cleanup, and released port PASS.
- Autonomous delivery: locked install/build PASS; port `42609`; HTTP 200, `text/html`, trial marker, owned cleanup, and released port PASS.
- Both preserve the lock hash, match canonical dependency allowlists, use local domain data, and pass prohibited backend/database/Docker/auth/external API/runtime-fetch scans.
- Customer management: FAIL because generation timed out; install, build, and runtime were deliberately skipped rather than fabricated. This is the exact AC-3 blocker.

### AC-4 — Plausible controls and explicit gaps

- Engineering productivity `evidence.md` traces team and period filters, repository search/sort, and dashboard navigation from source handlers/state to visible effects; all are PASS with successful HTTP load.
- Autonomous delivery traces search, status filter, elapsed/token sort, overview/activity tabs, pause/resume, and empty-state recovery; all are PASS with successful HTTP load.
- Every checklist has twelve finite row outcomes. Visual/responsive judgments are bounded source/CSS inference only; no screenshot, DOM-event, console, viewport, or real-browser evidence is claimed.
- Customer management controls and all checklist rows are FAIL because the TIMEOUT left completion and runtime behavior inconclusive.

### AC-5 — Findings and rerun discipline

- `implementation/trials/00-findings.md` records category, disposition, observation, proposal, rationale, affected trials, and evidence for each finding.
- The customer timeout and scope-orientation overhead are DEFERRED after one occurrence. Deterministic trial checks remain PROPOSED operational evidence.
- Adoption batch is NONE; canonical `templates/default` was unchanged; no `02-rerun` exists. `just trials-check` enforces the finding/rerun graph.

### AC-6 — Fixed verdict arithmetic

- `01-engineering-productivity`: PASS.
- `02-autonomous-delivery`: PASS.
- `03-customer-management`: FAIL — `01-initial` Copilot generation TIMEOUT at 600 seconds blocks install, build, runtime, completed visual review, and accepted control behavior.
- Overall Prototype 0 verdict: **FAIL**, because all three trial verdicts are not PASS. The arithmetic and exact blocker are checked by `just trials-check`.

## Controlled negative evidence

- Unknown trial and attempt IDs return exit 2.
- Reinitializing an existing attempt returns exit 3 without overwrite.
- `02-rerun` is rejected without an adopted finding affecting that trial.
- A successful Copilot result without a generated source diff becomes `NO_SOURCE_DIFF`.
- Timeout/auth/unavailable/error outcomes remain finite failures.
- Owned runtime cleanup and port-release checks run on the validator path; canonical `starter-check` also exercises missing-marker failure cleanup.

## Documentation evidence

- `README.md` documents recipe discovery, IDs, evidence paths, app-only/timeout/cleanup boundaries, unavailable browser capability, current trial verdicts, and API/configuration/migration/deployment no-impact.
- `docs/README.md` provides the detailed operational sequence, finite outcome model, retained/removed artifacts, evidence checker semantics, Runner isolation, and current blocker.
- `AGENTS.md`, `LLM.txt`, `CONTRIBUTING.md`, `project/README.md`, and `project/architecture/README.md` update agent discovery, contributor use, evidence indexing, and the explicit issue-local non-architecture boundary.
- `justfile` and `package.json` include Issue 7 in both formatting scopes. `.prettierignore` preserves raw generated app output and bounded trial records from post-generation rewriting while formatting plans, helpers, and implementation notes.
- API impact: none; no endpoint or contract changed. Configuration impact: none; no product option/default changed. Migration impact: none; no data/API/configuration migration. Deployment impact: none; trials are local manual evidence. Architecture impact: explanatory documentation only; no ADR/core-component contract changed.

## Validation evidence

### Focused

`harness checks focused --json` delegated to `just verify-focused` and passed after T-1, T-2, T-3, T-4, and T-5. Each run reported all 6 Vitest files and 13 tests passing, harness skill governance passing, and `git diff --check` passing. Final focused duration was 2293 ms.

### Full

`harness checks full --json` delegated to `just verify` and passed with exit 0 in 38205 ms after all code, trial evidence, verdict, and application-documentation changes. Evidence included 13 workspace tests, lint, formatting, type-check, workspace build, canonical clean-starter install/build/runtime/failure-cleanup proof, `trials-check` PASS, and merge-base diff integrity.

The environment emitted repeated `/etc/bash.bashrc` PS1 warnings and expected controlled-negative starter messages on stderr; the harness envelope and delegated exit status remained `ok`/0. Harness Doctor was degraded only for documented capture/attribution visibility and reported no registered sensors. These limitations are retained in the committed retro.

## Changed path groups

- Trial command/check implementation: `justfile`, `package.json`, `.prettierignore`, `implementation/trial-tool.mjs`, `implementation/trials-check.mjs`.
- Persistent trial evidence: `implementation/trials/**`.
- Plan/task status and existing Plan artifacts: `plan/**`, `research/00-research.md` as supplied by the exact work item.
- Application and operating documentation: `README.md`, `docs/README.md`, `AGENTS.md`, `LLM.txt`, `CONTRIBUTING.md`, `project/README.md`, `project/architecture/README.md`.
- Harness learning record: `.harness/records/retro/2026-08-18/001-issue-7-trials.md`.

## Handoff proof

- Branch: `feat/7-run-repeated-prototype-0-generation-trials`.
- Implementation commit: populated through the managed commit handoff; the final caller handoff carries the exact SHA.
- Clean tree: proved after the final managed commit in the caller handoff.
- Status: implementation and evidence production are complete. Final acceptance remains owned by Verify; this record does not claim final verification.
