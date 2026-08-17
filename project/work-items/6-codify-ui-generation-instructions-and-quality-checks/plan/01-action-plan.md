# Action Plan: Codify UI-generation instructions and quality checks

## Feature

- **ID:** 6
- **Research Brief:** project/work-items/6-codify-ui-generation-instructions-and-quality-checks/research/00-research.md

## ADRs Created

- None. The accepted blessed-starter architecture remains unchanged; this issue adds reusable behavior under a core-component rather than selecting a new architecture.

## Core-Components Created

- [CORE-COMPONENT-260816-generated-frontend-quality](../../../architecture/core-components/CORE-COMPONENT-260816-generated-frontend-quality.md) — adds the global interaction, state, mock-data, visual-quality, and six-category evaluation contract.

## Acceptance Criteria

- **AC-1:** Agent instructions require frontend-only prototypes with simulated domain-specific data and independently runnable output.
- **AC-2:** Instructions require plausible behavior for relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes.
- **AC-3:** Instructions cover appropriate loading, empty, error, success, disabled, hover, and selected states.
- **AC-4:** Instructions prohibit unnecessary backend services, databases, Docker, authentication infrastructure, and external API requirements.
- **AC-5:** Instructions discourage the PRD's listed stereotypical AI-interface patterns and require hierarchy, purposeful density, coherent spacing, typography, responsive layout, and realistic content.
- **AC-6:** A repository-local evaluation checklist maps directly to design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup.

## Acceptance Coverage

| AC   | Implementation tasks                                                                                                                                                                        | Tests or validation                                                                                                                                     | Expected evidence                                                                                                                                                                         | Relevant architecture                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | T-1 codifies standalone frontend and domain-data rules; T-2 maps them into checklist evidence; T-3 enforces their presence and the existing clean-copy contract; T-4 aligns operating docs. | V-1 instruction-contract inspection; V-2 checklist traceability; V-3 root starter check; V-4 full verification.                                         | Instruction excerpts naming frontend-only, domain-specific simulated data, and direct build/runtime contracts; checklist row references; passing clean-copy build/start output.           | ADR-260815-blessed-frontend-starter; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality             |
| AC-2 | T-1 adds the relevance-qualified interaction catalogue; T-2 requires behavior evidence or applicability rationale; T-3 validates required vocabulary.                                       | V-1 interaction-catalogue assertions; V-2 checklist interaction mapping; V-3 root static contract checks; V-4 full verification.                        | Agent-guidance lines for all named interactions; checklist fields citing source/rendered behavior or a rationale; passing validation output.                                              | CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria                                         |
| AC-3 | T-1 adds the applicability-qualified state catalogue; T-2 defines pass/fail/evidence and bounded not-applicable rationale; T-3 validates required vocabulary.                               | V-1 state-catalogue assertions; V-2 checklist state mapping; V-3 root static contract checks; V-4 full verification.                                    | Agent-guidance lines for all named states; checklist applicability and evidence fields; passing validation output.                                                                        | CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria                                         |
| AC-4 | T-1 retains and makes explicit all prohibited services and external requirements; T-2 includes isolation under stack adherence; T-3 preserves prohibited-term source auditing.              | V-1 prohibition assertions; V-2 checklist stack-adherence mapping; V-3 prohibited-source scan and clean-copy check; V-4 full verification.              | Exact prohibition text; checklist stack-adherence row; source audit with no prohibited dependency or runtime fetch requirement.                                                           | ADR-260815-blessed-frontend-starter; CORE-COMPONENT-260815-generated-frontend-contract                                                               |
| AC-5 | T-1 codifies every prohibited pattern and positive visual trait; T-2 turns the vocabulary into finite design checks; T-3 verifies the guidance/checklist catalogue is complete.             | V-1 visual-vocabulary assertions; V-2 bounded design-quality checklist review; V-3 root static contract checks; V-4 full verification.                  | Guidance containing the complete anti-stereotype and positive-quality catalogues; pass/fail checklist evidence fields; passing validation output.                                         | CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria                                         |
| AC-6 | T-2 creates the direct six-category repository-local checklist; T-3 validates all mappings and executes build/start proof through the root justfile; T-4 documents its use.                 | V-2 exact category and evidence-schema inspection; V-3 clean-copy build and assigned-port HTTP startup; V-4 full verification and documentation review. | Checklist with exactly the six named categories and direct checks/evidence; root command output for build artifact, assigned port, HTTP 200/HTML marker, and cleanup; updated usage docs. | CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-project-command-interface |

Every AC ID has at least one implementation task, one finite test or validation, expected inspectable evidence, and relevant architecture; acceptance coverage is complete before task planning.

## Implementation Tasks

1. **T-1 — Codify starter-local UI-generation instructions (AC-1, AC-2, AC-3, AC-4, AC-5).** Expand `templates/default/AGENTS.md` without weakening the blessed stack, package allowlist, or standalone commands.
2. **T-2 — Add the generated-frontend quality checklist (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6).** Add a repository-local checklist under `templates/default/` with direct category-to-check-to-evidence mapping and bounded applicability handling.
3. **T-3 — Encode contract checks in the authoritative root justfile (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6).** Extend `starter-check` to audit guidance and checklist integrity while retaining clean-copy stack, build, startup, and cleanup proof; update formatting scope only as needed.
4. **T-4 — Align documentation and complete validation (AC-1, AC-4, AC-6).** Document the copied guidance/checklist and root validation surface, then run focused and full root validation with a documentation impact record.
