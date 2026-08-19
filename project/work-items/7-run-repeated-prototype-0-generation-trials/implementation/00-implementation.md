# Implementation: Run repeated Prototype 0 generation trials

## Correction scope and completed tasks

- T-1/T-2 remain complete. The correction preserves all three `01-initial` app copies and does not rerun trials 1 or 2. The only initial-artifact change removes two trailing horizontal-space sequences from customer-management `agent-result.md` without changing its text.
- T-3 correction complete. Customer-management `02-rerun` passed locked install, frontend-only/dependency audits, strict build, standard assigned-port runtime, HTTP proof, owned cleanup, source-backed control review, and its completed checklist.
- T-4 correction complete. F-1 is ADOPTED in the single allowed adoption batch; canonical direct-generation guidance was copied into exactly one fresh affected rerun using the identical prompt. No second adoption cycle exists.
- T-5 correction complete. Findings, trial/overall verdicts, durable-output checks/tests, application documentation, validation, and handoff evidence are current.

## Acceptance evidence

### AC-1 — Three clean fixed-prompt copies

- The three preserved initial paths remain under `implementation/trials/{01-engineering-productivity,02-autonomous-delivery,03-customer-management}/attempts/01-initial/` with their exact prompts and complete starter copies.
- The only additional copy is the plan-required affected `03-customer-management/attempts/02-rerun/`, initialized once through `just trial-init` from canonical inventory `22603a301228e0979c8395b7186e72b4b03d0098771b184de30c0f2a7f492eb5` with no `node_modules` or `dist`.
- Initial and rerun customer prompt hashes are identical: `5f5788d94f27a613a25d61c836b399e537137c7b5f3a073acf652134cfd97083`. Rerun generation returned SUCCESS with non-empty source-diff hash `f30b3b2d5735926a3ff5f07c1eefb7605a7c3c96c4d3c69cfd8539e09e59dd0d`.

### AC-2 — Comparable complete records

- Every initial attempt and the one rerun contain `prompt.md`, `agent-result.md`, `evidence.md`, full `app/`, and a twelve-row completed `app/QUALITY-CHECKLIST.md`.
- Customer rerun `agent-result.md` records CLI version, app-only permissions, timestamps, 600-second bound, exit 0, prompt/source hashes, changed files, and normalized bounded output. `evidence.md` records clean-copy hashes, install, audit, build, runtime, HTTP, cleanup, controls, unmet checks, quality bar, and verdict.
- Durable writes now remove trailing horizontal whitespace after output bounding. `trials-check.mjs` rejects any durable agent result with exact offending line numbers; `trial-records.test.mjs` covers semantic preservation, truncation normalization, adopted-finding scoping, and negative line detection.

### AC-3 — Simulated frontend-only build and runtime contract

- Customer rerun locked install: PASS with `npm ci --include=dev`, exit 0, unchanged lock `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`, and canonical dependency allowlist PASS.
- Frontend-only audit: PASS. Local source contains realistic customer/order/invoice data and no backend, database, Docker, authentication, external API/data, or runtime-fetch requirement.
- Strict build: PASS with `npm run build`, exit 0, 1,579 transformed modules, and proved `dist/index.html` before cleanup.
- Standard runtime: PASS using `npm run dev -- --host 0.0.0.0 --port 33709`; HTTP 200, `text/html`, customer marker, owned process cleanup, released port, and removal of `node_modules`/`dist` all PASS.
- Engineering-productivity and autonomous-delivery latest attempts retain their earlier passing AC-3 evidence.

### AC-4 — Plausible controls and explicit unmet checks

- Customer rerun `evidence.md` traces seven fixed-prompt major capabilities from rendered control through handler/state to visible effect: search, status/tier filters, create customer, customer details, edit customer, orders/invoices tabs, and activity history. Every trace is PASS and is paired with successful HTTP load.
- The completed checklist records realistic local data and applicable empty, success, disabled, hover, selected, responsive, and recovery states. Loading/remote-error states are explicitly inapplicable to synchronous local data.
- Honest unmet quality evidence remains: secondary sidebar/global/help/edit-note/new-order/new-invoice/record-chevron controls are inert, so the broad interaction checklist row is FAIL. They are not fixed-prompt major controls; no claim of DOM-event, screenshot, console, viewport, or real-browser automation is made.
- The fixed Product Quality Bar is PASS for the rerun because build/start, visual representation, all fixed-prompt major controls, story-supporting data, and complete primary workflows pass; the secondary limitations remain visible and non-blocking in the evidence.

### AC-5 — Adopted finding and exactly affected rerun

- `implementation/trials/00-findings.md` classifies F-1 ADOPTED and records Adoption Batch ONE. `templates/default/AGENTS.md` now tells app-bounded coding agents to implement the supplied interface prompt directly and forbids parent-repository discovery, GitHub issue workflows, RPIV, engineering-harness, and Runner orchestration.
- Root `starter-check` asserts the new canonical guidance tokens and retains malformed-guidance negative coverage. The rerun copied canonical `AGENTS.md` byte-for-byte.
- Initial versus rerun comparison records identical prompt hash, clean baseline inventories, TIMEOUT versus SUCCESS, skipped versus passing operational proof, and unproved versus seven passing prompt-major control traces.
- Exactly `03-customer-management/attempts/02-rerun` exists. No rerun exists for trials 1 or 2, and `trials-check` enforces exact adopted-trial/attempt sets, one adoption batch, latest-attempt selection, fresh inventory, copied guidance, and prompt identity.

### AC-6 — Fixed verdict arithmetic

- `01-engineering-productivity`: PASS using `01-initial`.
- `02-autonomous-delivery`: PASS using `01-initial`.
- `03-customer-management`: PASS using the required `02-rerun`; its initial timeout remains preserved and compared.
- `00-findings.md` records overall Prototype 0 evidence verdict PASS because all three latest required attempts pass. `just trials-check` recomputes that arithmetic and retains the secondary-control/browser-sensor limitations. Final acceptance remains owned by Verify.

## Documentation evidence

- `README.md` and `docs/README.md` document direct app-bounded generation guidance, the single adopted customer rerun, operational/control evidence, preserved initial timeout, current evidence verdict, and explicit limitations.
- `AGENTS.md`, `LLM.txt`, and `CONTRIBUTING.md` update cold-agent and contributor discovery for the direct-generation boundary without changing Runner ownership.
- `project/architecture/README.md` explains that direct generation is scoped guidance within the existing generated-frontend contracts, not a new product adapter, lifecycle, ADR, or core-component contract.
- API impact: none. Configuration/default impact: none. Migration impact: none. Deployment/operations impact: local Issue 7 trial evidence only; root recipe usage is unchanged. No API reference, configuration migration, deployment procedure, ADR, core-component, or decision-log change is required.

## Validation evidence

### Focused

- Repeated `just verify-focused` runs passed while changing durable capture, rerun checks, evidence, docs, and task status. Final focused result: 7 test files and 17 tests PASS, harness skill governance PASS, and `git diff --check` PASS.
- `harness checks focused --json` delegated exactly to `just verify-focused`, exit 0, with 7 files/17 tests PASS.
- `just trials-check` PASS after the rerun and completed evidence graph.
- `git diff --check $(git merge-base HEAD origin/main)` PASS after mechanical normalization of initial evidence.

### Full

- `harness checks full --json` delegated exactly to `just verify`, status `ok`, exit 0, duration 27,324 ms. It passed workspace tests, lint, formatting, type-check, builds, canonical starter install/build/runtime and controlled-negative cleanup, `trials-check`, and merge-base diff integrity.
- Direct `just verify` also passed with the same authoritative gate composition and `trials-check: PASS`.
- Expected controlled-negative starter messages and ambient `/etc/bash.bashrc` PS1 warnings appeared on stderr without changing the deterministic exit-0 verdict.

## Scope and handoff proof

- Runner-owned state was not inspected or manipulated.
- Application source in all `01-initial` attempts is unchanged; customer rerun source is the one recorded Copilot result and was not hand-repaired.
- Branch: `feat/7-run-repeated-prototype-0-generation-trials`.
- Correction commit and clean-tree proof are supplied in the caller handoff after the managed commit.
- Status: the Implement correction is complete; final verification and acceptance remain owned by Verify.
