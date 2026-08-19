# Action Plan: Run repeated Prototype 0 generation trials

## Feature

- **ID:** 7
- **Research Brief:** `project/work-items/7-run-repeated-prototype-0-generation-trials/research/00-research.md`

## ADRs Created

- None. Existing starter and filesystem decisions govern this issue; no global architecture choice is added.

## Core-Components Created

- None. Existing generated-frontend contract and quality contract already own reusable behavior. The layout below is issue-local evidence, not a reusable contract.

## Acceptance Criteria

- **AC-1:** Three clean starter copies are generated from PRD examples for engineering-productivity, autonomous-delivery monitoring, and customer-management interfaces.
- **AC-2:** Each trial records prompt, agent result, dependency installation, build result, runtime port, browser-load result, and completed quality checklist.
- **AC-3:** Every generated application uses simulated data, has no required backend, builds successfully, and starts through standard runtime contract.
- **AC-4:** Major controls described by each prompt behave plausibly and evidence identifies unmet quality checks.
- **AC-5:** Findings identify instruction/starter improvements, and any adopted improvement is followed by rerun of affected trial.
- **AC-6:** Final evidence states whether all trials satisfy Prototype 0 exit criterion and identifies blocking gap if not.

## Acceptance Coverage

| AC   | Implementation tasks                                                                                                     | Tests or validation                                                                                               | Expected evidence                                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | T-1 fixes prompts/paths; T-2 creates and generates three initial copies.                                                 | V-1 clean-copy/schema validation; V-2 bounded agent-run and generated-source-diff audit.                          | Initial inventories/checksums, non-empty generated-source diffs, and generated source at the three fixed trial paths, plus exact prompts and agent results. |
| AC-2 | T-1 defines comparable records; T-2 records generation; T-3 records operational and checklist results; T-5 indexes them. | V-1 schema check; V-2 agent audit; V-3 install/build/runtime smoke; V-4 checklist review; V-6 completeness audit. | Per-attempt `prompt.md`, `agent-result.md`, `evidence.md`, and completed `app/QUALITY-CHECKLIST.md`.                                                        |
| AC-3 | T-3 audits isolation/data and runs locked install, build, and assigned-port runtime.                                     | V-3 dependency/source audit, build, HTTP load, owned cleanup, and released-port proof.                            | Lock hashes, audit results, build artifact, exact runtime command/port, HTTP 200 `text/html` marker, cleanup.                                               |
| AC-4 | T-3 maps prompt-major controls to source handlers/state/effects and completes every checklist row.                       | V-4 bounded source-backed behavior and quality review; V-6 cross-trial audit.                                     | Control-to-handler-to-visible-effect tables and explicit PASS/FAIL/N/A rows with every unmet check named.                                                   |
| AC-5 | T-4 records proposed/adopted/deferred findings and clean reruns for adopted changes; T-5 compares outcomes.              | V-5 adoption/rerun traceability; V-6 findings audit.                                                              | `implementation/trials/00-findings.md`, canonical change diff, affected trial list, preserved initial and comparable rerun evidence.                        |
| AC-6 | T-5 applies the fixed per-trial and overall verdict rule.                                                                | V-6 verdict, evidence, documentation, formatting, and full-root validation.                                       | Three trial verdicts and overall PASS/FAIL; any FAIL names the exact blocking trial/check/capability gap.                                                   |

Relevant architecture for all rows: `ADR-260815-blessed-frontend-starter`, `ADR-260812-filesystem-state-boundary`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`, `CORE-COMPONENT-260815-generated-frontend-contract`, and `CORE-COMPONENT-260816-generated-frontend-quality`. AC-5/AC-6 also use `CORE-COMPONENT-260806-rpiv-stage-contract`; Runner isolation uses `CORE-COMPONENT-260813-soft-factory-runner-operation`.

Coverage is complete: every AC has implementation, finite validation, expected evidence, and governing architecture before task planning.

## Implementation Tasks

1. **T-1 — Establish the bounded trial protocol and root recipes (AC-1..AC-6).** Define fixed prompts, issue-local persistent paths, comparable record fields, bounded noninteractive Copilot invocation, and proposed root recipes `trial-init`, `trial-generate`, `trial-validate`, and `trials-check`; include Issue #7 in both formatting scopes.
2. **T-2 — Run three initial generation trials (AC-1, AC-2).** Create full clean copies, run one app-bounded generation invocation per fixed prompt without hand-editing generated output, and prove each successful invocation produced a non-empty app-only source diff.
3. **T-3 — Validate and evaluate every initial attempt (AC-2, AC-3, AC-4).** Run `just trial-validate <trial> <attempt>` for locked install/build/assigned-port HTTP load and isolation audits, then complete source-backed control tables and quality checklists.
4. **T-4 — Classify improvements and rerun adopted changes (AC-5).** Record every finding; after at most one adoption batch, rerun each affected trial once from a new clean copy.
5. **T-5 — Publish final findings, docs, and handoff evidence (AC-2, AC-5, AC-6).** Compare attempts, apply the fixed exit rule, update affected operational docs, run `just trials-check` plus focused/full harness checks, and complete implementation evidence.
