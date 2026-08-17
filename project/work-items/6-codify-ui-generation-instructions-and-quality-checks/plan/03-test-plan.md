# Test Plan: Codify UI-generation instructions and quality checks

## Architecture Baseline

- ADR-260815-blessed-frontend-starter
- CORE-COMPONENT-260806-agent-executable-acceptance-criteria
- CORE-COMPONENT-260806-project-command-interface
- CORE-COMPONENT-260815-generated-frontend-contract
- CORE-COMPONENT-260816-generated-frontend-quality

## Test V-1: Starter-local instruction contract

- **Type:** Automated static contract plus bounded content review
- **Task:** T-1
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5
- **Priority:** Critical

### Setup

Use the implemented `templates/default/AGENTS.md` and root `starter-check` assertions. Resolve expected terms from CORE-COMPONENT-260815-generated-frontend-contract and CORE-COMPONENT-260816-generated-frontend-quality rather than duplicating a separate executable script.

### Steps

1. Run the instruction-contract portion of `just starter-check`.
2. Assert the guidance names frontend-only behavior, domain-specific simulated data, both direct standalone commands, and every AC-4 prohibited dependency.
3. Assert all AC-2 interactions and all AC-3 states are present with relevance/applicability qualifiers.
4. Assert every prohibited and positive AC-5 visual trait from the quality contract is present.
5. Inspect the resulting sections to confirm the requirements are imperative and do not demand irrelevant catalogue items.

### Expected Result

All required terms and direct contracts occur in the starter-local guidance; prohibitions are unambiguous; interactions and states are conditional on the requested experience; the visual review vocabulary is complete and bounded.

### Expected Evidence

- Static assertion output identifying instruction-contract success.
- Line-referenced excerpts for AC-1 through AC-5.
- Review note confirming alignment with both generated-frontend core-components.

## Test V-2: Six-category checklist traceability

- **Type:** Automated document contract plus traceability review
- **Task:** T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Use `templates/default/QUALITY-CHECKLIST.md`, the six category names in AC-6, and CORE-COMPONENT-260816-generated-frontend-quality. Ensure the checklist is inspected in both the canonical starter and a temporary copied starter.

### Steps

1. Assert that design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup each occur exactly once as top-level evaluation categories.
2. Assert every category contains finite checks and an expected-evidence field, with pass/fail outcomes.
3. Trace AC-1 through AC-5 requirements into the appropriate checklist checks.
4. Verify not-applicable requires a written rationale and is limited to conditional interaction/state checks; verify stack, build, and startup are mandatory.
5. Verify build and runtime categories name the direct commands and runtime evidence includes assigned port, browser-loadable response, and cleanup.

### Expected Result

The checklist directly maps all six categories to concrete checks and inspectable evidence without aggregate or subjective-only scoring, and it provides complete AC traceability.

### Expected Evidence

- Category-count assertion output.
- AC-to-check traceability table with source line references.
- Copied-starter path listing showing `AGENTS.md` and `QUALITY-CHECKLIST.md` are present.

## Test V-3: Authoritative starter contract, build, and runtime validation

- **Type:** Integration and runtime smoke test
- **Task:** T-3
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Run from the repository root with Node.js 24, npm, `just`, and an available ephemeral localhost port. Use only the root `justfile` `starter-check` recipe. The temporary copy must begin without `node_modules` or `dist`.

### Steps

1. Run `just starter-check`.
2. Confirm static checks validate guidance catalogues, checklist categories/mappings, blessed dependencies, standalone scripts, and prohibited source/dependency terms.
3. Confirm the recipe copies the complete starter, installs from its lockfile, and runs `npm run build`.
4. Confirm it starts `npm run dev -- --host 0.0.0.0 --port <PORT>` on an assigned port and receives HTTP 200, HTML content, and the expected page marker.
5. Confirm success and deliberate failure paths stop only the owned process, release the port, remove the temporary copy, and leave both lockfiles unchanged.
6. Exercise temporary malformed copies with one required guidance token removed and one checklist category removed; require non-zero contract-check outcomes while preserving canonical files.

### Expected Result

The root recipe rejects malformed guidance/checklist copies and accepts the canonical starter; the canonical copy installs, builds, starts, serves browser-loadable HTML, and cleans up without external services or repository mutation.

### Expected Evidence

- Complete `just starter-check` output, including static contract summaries and negative-case rejection.
- Built artifact listing and lockfile checksums.
- Assigned port, HTTP status/content marker, owned PID cleanup, port-release, and temporary-directory removal records.

## Test V-4: Full repository verification and documentation handoff

- **Type:** Full regression and documentation validation
- **Task:** T-1, T-2, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Complete T-1 through T-4, update formatting scope for issue #6 and the new starter Markdown, and prepare `implementation/00-implementation.md`. Use the root command interface required by CORE-COMPONENT-260806-project-command-interface and the handoff contract in CORE-COMPONENT-260806-rpiv-stage-contract.

### Steps

1. Inspect affected README, detailed docs, architecture discovery, starter guidance, and checklist links for accuracy and stale statements.
2. Run `just verify-focused` during implementation and retain its outcome.
3. Run `just verify` before handoff.
4. Confirm full verification includes tests, lint, formatting, type checking, workspace builds, V-3 starter validation, and diff integrity.
5. Inspect the implementation record for T-1 through T-4 completion, AC-1 through AC-6 evidence, documentation evidence, exact artifact paths, and implementation commit SHA.

### Expected Result

All authoritative repository checks pass; documentation accurately explains the quality contract and checklist without overstating automation; implementation evidence is complete and reproducible for independent Verify review.

### Expected Evidence

- Passing `just verify-focused` and `just verify` output.
- Documentation link/content review notes.
- Completed `implementation/00-implementation.md` mapping every AC to tasks, validation, and evidence.

## Coverage Proof

| AC   | Implementation tasks | Tests              | Evidence focus                                                                     |
| ---- | -------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| AC-1 | T-1, T-2, T-3, T-4   | V-1, V-2, V-3, V-4 | Frontend-only/domain-data instructions, checklist mapping, independent build/start |
| AC-2 | T-1, T-2, T-3        | V-1, V-2, V-3, V-4 | Complete relevant-interaction catalogue and behavioral evidence/rationale          |
| AC-3 | T-1, T-2, T-3        | V-1, V-2, V-3, V-4 | Complete applicable-state catalogue and evidence/rationale                         |
| AC-4 | T-1, T-2, T-3, T-4   | V-1, V-2, V-3, V-4 | Explicit prohibitions, source/dependency audit, isolation documentation            |
| AC-5 | T-1, T-2, T-3        | V-1, V-2, V-3, V-4 | Complete bounded anti-pattern and positive-quality vocabulary                      |
| AC-6 | T-2, T-3, T-4        | V-2, V-3, V-4      | Exact six-category checklist, build and assigned-port startup proof                |

Every acceptance criterion is covered by implementation, validation, and expected evidence.
