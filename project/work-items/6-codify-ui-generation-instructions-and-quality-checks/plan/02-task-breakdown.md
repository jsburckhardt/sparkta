# Task Breakdown: Codify UI-generation instructions and quality checks

## Task T-1: Codify starter-local UI-generation instructions

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Expand `templates/default/AGENTS.md` as the authoritative guidance copied with the standalone starter. Preserve bundled-stack and direct-command rules while adding frontend-only/domain-data requirements, relevance-qualified interactions, applicability-qualified states, explicit prohibited infrastructure, realistic mock-data guidance, the complete PRD anti-pattern list, and the positive visual-quality vocabulary. State that catalogue items are conditional on the requested experience so agents do not add irrelevant controls.

### Acceptance Criteria

- AC-1 is met when guidance requires frontend-only, domain-specific simulated data and preserves independently runnable build/development commands.
- AC-2 is met when guidance names navigation, filters, search, sorting, tabs, dialogs, forms, and state changes and requires plausible behavior where relevant.
- AC-3 is met when guidance names loading, empty, error, success, disabled, hover, and selected states and requires them where applicable.
- AC-4 is met when guidance prohibits backend services, databases, Docker, authentication infrastructure, external infrastructure/data, and runtime external API requirements.
- AC-5 is met when guidance contains every named prohibited AI-interface pattern and requires hierarchy, purposeful density, coherent spacing, strong typography, responsive layout, realistic content, and the related positive traits from the global quality contract.

### Test Coverage

- Implement V-1 as deterministic text assertions in the root `starter-check` recipe for every required catalogue and retained standalone contract.
- Exercise the updated guidance through V-3 and V-4 so static assertions run in focused starter and full repository validation.
- Review conditional language against CORE-COMPONENT-260816-generated-frontend-quality to ensure irrelevant interactions/states are not made mandatory.

### Expected Evidence

- Diff of `templates/default/AGENTS.md` showing all required sections and exact catalogues.
- V-1 assertion output identifying a complete guidance contract.
- Traceability notes from each of AC-1 through AC-5 to guidance lines.

## Task T-2: Add the repository-local generated-frontend quality checklist

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Create `templates/default/QUALITY-CHECKLIST.md` so the evaluation artifact is repository-local and travels with a copied starter. Define exactly six top-level evaluation categories: design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup. Under those categories map guidance and architecture requirements to finite pass/fail checks, an evidence field, and a narrowly allowed not-applicable rationale for conditional interactions/states. Keep stack, build, and startup mandatory. Include direct evidence expectations for source paths, rendered behavior, build output, assigned port, HTTP response, and cleanup.

### Acceptance Criteria

- AC-1 through AC-5 are each directly referenced by checklist checks that evaluate the corresponding instruction outcome.
- AC-2 and AC-3 checks allow omission only when a concrete requested-interface applicability rationale is recorded.
- AC-6 is met when all six named categories appear exactly once as direct evaluation headings and each maps checks to expected evidence.
- Build success maps to `npm run build`; runtime startup maps to `npm run dev -- --host 0.0.0.0 --port <PORT>`, browser-loadable HTML evidence, and owned cleanup.

### Test Coverage

- Implement V-2 as deterministic assertions for the exact six-category set, AC references, pass/fail and evidence fields, applicability rationale, and direct build/runtime commands.
- Use a bounded reviewer inspection to confirm each category maps directly to concrete checks rather than an aggregate score.
- Exercise checklist assertions through V-3 and V-4.

### Expected Evidence

- New `templates/default/QUALITY-CHECKLIST.md` with six category headings and AC traceability.
- V-2 output confirming category uniqueness, required evidence fields, and command mappings.
- Review table linking every category to its checks and inspectable evidence.

## Task T-3: Encode instruction and checklist checks in the root validation surface

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Extend the root `justfile` `starter-check` recipe with deterministic guidance/checklist assertions. Verify the copied temporary starter contains both files, the required instruction and design catalogues, all six unique checklist categories, AC mapping, and mandatory command evidence. Retain the existing package allowlist, prohibited-source scan, clean-copy install/build, assigned-port startup, HTTP/HTML marker, failure cleanup, lockfile, and port-release proofs. Keep raw validation bodies only in the root justfile and update root formatting scopes to include issue #6 and new Markdown artifacts without introducing a competing script or wrapper.

### Acceptance Criteria

- Static root checks fail on omission of any AC-1 through AC-5 instruction catalogue or any AC-6 category/evidence mapping.
- The temporary copy proves the guidance and checklist travel with the standalone output.
- Existing stack, prohibited-dependency, build, startup, browser response, cleanup, and lockfile proofs remain intact.
- No standalone command body duplicates root justfile validation.

### Test Coverage

- V-3 runs `just starter-check` and inspects explicit static-contract, build, runtime, and cleanup evidence.
- Add a controlled negative assertion or fixture-level mutation check for at least one missing guidance token and one missing checklist category without modifying the canonical starter after the test.
- V-4 runs `just verify` to cover formatting, static analysis, workspace tests/builds, starter validation, and diff integrity.

### Expected Evidence

- Root `justfile` diff showing delegation authority is unchanged and checks are added to `starter-check`.
- Passing V-3 output for guidance/checklist integrity, clean install, build artifacts, assigned port, HTTP 200/HTML marker, cleanup, and unchanged lockfiles.
- Negative-check output proving malformed guidance/checklist content is rejected.

## Task T-4: Align operating documentation and complete implementation handoff

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** T-1, T-2, T-3
- **Acceptance Criteria:** AC-1, AC-4, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260806-rpiv-stage-contract; CORE-COMPONENT-260806-project-command-interface; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Update affected application and architecture discovery documentation to identify starter-local generation guidance, the six-category checklist, frontend-only isolation, and root validation usage. Do not claim that contextual visual quality is fully automated. Run focused and full authoritative validation, then record documentation impact, task completion, AC evidence, commands, outcomes, and artifact paths in `implementation/00-implementation.md` for Verify.

### Acceptance Criteria

- AC-1 and AC-4 contracts remain accurately described as standalone frontend-only behavior with no external service requirement.
- AC-6 checklist location, six categories, evidence model, and root validation entry point are discoverable.
- Implementation evidence maps every AC ID to completed tasks and reproducible evidence and includes documentation evidence or a concrete no-impact rationale.

### Test Coverage

- V-4 inspects documentation links/content and runs `just verify`.
- Validate links to both generated-frontend core-components and starter-local artifacts.
- Review `implementation/00-implementation.md` for complete T-1 through T-4 and AC-1 through AC-6 evidence before handoff.

### Expected Evidence

- Documentation diffs with valid repository-relative links and no stale foundation-scope claims.
- Passing `just verify` output.
- Completed implementation record containing task status, AC evidence, documentation evidence, validation results, and exact implementation commit SHA.
