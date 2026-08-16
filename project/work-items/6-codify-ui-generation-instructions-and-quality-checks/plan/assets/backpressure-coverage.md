# Backpressure Coverage — Codify UI-generation instructions and quality checks

**Plan**: [01-action-plan.md](../01-action-plan.md)
**Basis (plan SHA-256)**: `397605fb444089d87a84810805b94576590a2582cb474cc9ff80968edb30c716`
**Generated**: 2026-08-16
**Certainty**: Partial

> Advisory only. This survey selects proof; it does not gate work or execute the
> selected commands.

## Existing Sensors

| Sensor                 | Paved command         | Dimension                   | Found in                                                                     | Current proof                                                                          |
| ---------------------- | --------------------- | --------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Starter contract check | `just starter-check`  | behaviour                   | repository root, exercising `templates/default`                              | Locked clean copy, build, assigned-port startup, HTTP response, cleanup, and isolation |
| Focused verification   | `just verify-focused` | maintainability / behaviour | repository root, covering `apps/server`, `apps/web`, and `templates/default` | Targeted configured checks                                                             |
| Full verification      | `just verify`         | maintainability / behaviour | repository root, covering `apps/server`, `apps/web`, and `templates/default` | Authoritative full repository validation                                               |

Surveyed roots: repository root, `apps/server`, `apps/web`, and
`templates/default`.

## Coverage Matrix

| Criterion / failure mode                                                                                                                                                                                                | Selected proof                                                                                                                           | Status | Tier                          | Probe trail                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing starter copy/build/runtime/isolation guarantees remain intact                                                                                                                                                  | RUN: `just starter-check`                                                                                                                | EXISTS | computational                 | Existing starter-check already exercises locked clean copy, build, assigned-port startup, HTTP response, cleanup, and isolation.                                                                                                                                                                                                      |
| AC-1 — frontend-only, simulated domain-specific data, and independently runnable output are complete in both instructions and checklist                                                                                 | EXTEND→RUN: add instruction/checklist completeness assertions to starter-check, then `just starter-check`                                | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| AC-2 — navigation, filters, search, sorting, tabs, dialogs, forms, and state changes have a relevance-qualified interaction catalogue                                                                                   | EXTEND→RUN: add exact interaction-catalogue assertions to starter-check, then `just starter-check`                                       | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| AC-3 — loading, empty, error, success, disabled, hover, and selected states have an applicability-qualified state catalogue                                                                                             | EXTEND→RUN: add exact state-catalogue assertions to starter-check, then `just starter-check`                                             | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| AC-4 — backend services, databases, Docker, authentication infrastructure, and external API requirements are explicitly prohibited                                                                                      | EXTEND→RUN: add exact prohibition and malformed-copy assertions to starter-check, then `just starter-check`                              | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| AC-5 — prohibited AI-interface stereotypes and the required hierarchy, density, spacing, typography, responsiveness, and realistic-content vocabulary are complete                                                      | EXTEND→RUN: add exact visual-vocabulary assertions to starter-check, then `just starter-check`                                           | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| AC-6 — the checklist contains exactly design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup, with direct evidence requirements, and malformed copies are rejected | EXTEND→RUN: add exact six-category/evidence-schema and negative-fixture rejection assertions to starter-check, then `just starter-check` | EXTEND | computational                 | —                                                                                                                                                                                                                                                                                                                                     |
| Contextual visual quality — whether a rendered prototype applies the vocabulary coherently and looks appropriate for its domain                                                                                         | —                                                                                                                                        | ABSENT | inferential / human-judgement | Searched browser E2E, component DOM, and screenshot/visual-regression sensor signatures across repository root, `apps/server`, `apps/web`, and `templates/default`; no Playwright, Cypress, browser-component, DOM-render, screenshot, or visual-diff sensor exists. Static vocabulary checks cannot judge contextual visual quality. |

## Proof Plan (Selected)

1. Preserve the existing operational proof: RUN `just starter-check`.
2. Extend starter-check with static contract assertions for AC-1 through AC-6,
   including complete instruction/checklist catalogues, exact prohibitions and
   visual vocabulary, exactly six checklist categories with evidence fields,
   and rejection of malformed starter copies.
3. Run the strengthened proof: EXTEND→RUN `just starter-check`.
4. Run authoritative repository validation: `just verify`.
5. Record contextual visual-quality judgment as review evidence; no command is
   selected for that inferential determination.

Selected commands are `just starter-check` and `just verify`.

## Certainty: Partial

Counts (behaviour/architecture rows): **1 RUN · 6 EXTEND · 0 BUILD · 1 ABSENT**

The existing starter sensor proves the operational baseline, and all six
acceptance criteria become deterministic through extensions to that same paved
sensor. Contextual visual quality remains an explicit inferential judgment.

Recommended next move: extend the existing sensor before feature work, then use
the same command and the authoritative full verification command.

## Recommended Phase 0: Establish Backpressure

| Sensor to extend       | Proves                                                               | Suggested form                                                                                                                                                               | Paved command strengthened |
| ---------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Starter contract check | AC-1 through AC-6 contract completeness and malformed-copy rejection | Extend the existing starter-check with exact positive catalogue/schema assertions and bounded negative fixtures while preserving its clean-copy build/start/isolation checks | `just starter-check`       |

No new command surface is needed. Phase 0 should make the existing
starter-check reject omissions, category drift, prohibited requirements, and
malformed copied guidance/checklists before implementation proceeds.

## Closing Verdict

The existing starter check already proves that a locked clean copy builds,
starts on its assigned port, responds over HTTP, cleans up, and remains
isolated. Extend that same check first so the six instruction and checklist
promises become machine-checked, then use full repository verification; whether
the rendered result is contextually coherent and visually appropriate still
requires human judgment.

In summary: `just starter-check` and `just verify` will prove the operational and codified-contract requirements after the Phase 0 extension, while contextual visual quality remains inferential; approve extending starter-check before feature implementation.
