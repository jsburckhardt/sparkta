# Implementation: Codify UI-generation instructions and quality checks

## Status

Implementation tasks T-1 through T-4 are complete. This record supplies implementation evidence for independent Verify review and does not claim final acceptance. The committed SHA is supplied in the Implement handoff because a commit cannot self-reference its resulting SHA.

## Completed tasks

- [x] **T-1:** Expanded `templates/default/AGENTS.md` with the standalone frontend, interaction, state, simulated-data, prohibition, and visual-quality contracts.
- [x] **T-2:** Added `templates/default/QUALITY-CHECKLIST.md` with exactly six evaluation categories and direct outcomes/evidence.
- [x] **T-3:** Strengthened root `justfile` `starter-check` assertions for canonical/copied documents and controlled malformed copies while retaining clean-copy build/runtime/cleanup/lock proofs; added issue 6 to root formatting scope in `justfile` and `package.json`.
- [x] **T-4:** Updated discovery and operating documentation and completed focused/full root validation.

## Acceptance evidence

- **AC-1:** `templates/default/AGENTS.md` requires a frontend-only prototype, domain-specific simulated data, and the direct `npm run build` and assigned-port `npm run dev` contracts. `templates/default/QUALITY-CHECKLIST.md` maps these requirements to instruction, stack, mock-data, build, and runtime evidence. Final `just starter-check` proved a locked clean copy built and started independently.
- **AC-2:** `templates/default/AGENTS.md` names navigation, filters, search, sorting, tabs, dialogs, forms, and state changes with the qualifier `requested or contextually relevant`. The checklist requires rendered/source evidence or a request-specific N/A rationale. Root document assertions reject a missing interaction-contract token.
- **AC-3:** `templates/default/AGENTS.md` names loading, empty, error, success, disabled, hover, and selected states with the qualifier `where each is applicable`. The checklist limits N/A to conditional interaction/state rows and requires rationale; root assertions enforce the state catalogue.
- **AC-4:** `templates/default/AGENTS.md` explicitly prohibits backend services, databases, Docker, authentication infrastructure, external infrastructure/data, runtime fetches, and external APIs. The mandatory stack-adherence rows and retained prohibited source/dependency scan provide inspectable isolation evidence.
- **AC-5:** `templates/default/AGENTS.md` contains all eight prohibited patterns and all eight positive quality traits from `CORE-COMPONENT-260816-generated-frontend-quality.md`. The design-quality checklist maps each vocabulary set to finite pass/fail rendered evidence and states that static vocabulary assertions do not establish contextual visual quality.
- **AC-6:** `templates/default/QUALITY-CHECKLIST.md` has exactly the six direct headings Design quality, Instruction quality, Stack adherence, Mock-data quality, Build success, and Runtime startup. Every category has check/outcome/evidence columns; build and runtime name direct commands and assigned-port HTTP/HTML/cleanup evidence. `just starter-check` validated canonical and copied documents and rejected copies missing `frontend-only` and `Runtime startup`.

## Validation evidence

### Focused validation

- T-1: `just verify-focused` — passed; 6 test files and 13 tests passed, harness governance and `git diff --check` passed.
- T-2: `just verify-focused` — passed; 6 test files and 13 tests passed, harness governance and `git diff --check` passed.
- T-3: `just starter-check` — passed with canonical/copied document checks, both malformed-copy rejections, clean install/build, assigned-port HTTP 200 HTML marker, owned cleanup, released ports, and unchanged lockfiles. `just verify-focused` also passed with 13 tests.
- T-4: `just verify-focused` — passed with 13 tests and diff integrity.

### Full validation

- Final `just verify` — passed on 2026-08-16. It completed harness governance, 13 tests, lint, format check, type checking, both workspace builds, strengthened starter validation, and merge-base diff integrity.
- The final starter run reported complete canonical/copied document contracts, rejected both controlled malformed copies, built `dist/index.html`, served HTTP 200 `text/html` with the expected marker on an assigned port, stopped owned runtimes, released ports, removed the temporary directory, and preserved copied/root lockfiles.

## Documentation evidence

- `README.md` now discovers the copied guidance and checklist, names all six categories, explains bounded N/A, and distinguishes deterministic checks from contextual visual review.
- `docs/README.md` documents frontend-only generation, direct commands, checklist evidence, malformed-copy/root validation, explicit service prohibitions, and the reviewer-owned visual judgment boundary.
- `project/architecture/README.md` links the generated frontend quality contract and explains its relationship to the blessed frontend boundary and checklist.
- `LLM.txt` indexes `QUALITY-CHECKLIST.md` and `CORE-COMPONENT-260816-generated-frontend-quality.md` for agent discovery.
- `project/architecture/ADR/DECISION-LOG.md` registers the adopted quality contract and decisions 65 through 68.
- No API reference changed: this issue adds no product API or response behavior.
- No configuration, migration, deployment, or operational service procedure changed: the copied starter remains local, assigned-port, frontend-only, and free of external services. Existing usage documentation now covers the new guidance/checklist workflow.

## Harness evidence

The coding hook routed to concrete `harness observe` captures. After full validation, the post-coding retro drain was saved at `.harness/records/retro/2026-08-16/001-6-codify-ui-generation-instructions-and-quality-checks.md`, and the transient observation buffer was cleared.
