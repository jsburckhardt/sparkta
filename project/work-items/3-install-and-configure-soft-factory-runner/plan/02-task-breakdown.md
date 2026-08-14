# Task Breakdown: Restore Soft Factory Doctor authority

## Task T-1: Scope engineering-harness validation

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-2, AC-6
- **Related ADRs:** None
- **Related Core-Components:** `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260813-engineering-harness-operation`

### Description

Change `justfile#verify-harness-skills` so it validates presence of only `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`. Preserve the stale-lock and excluded engineering-harness discovery guards. Remove whole-directory equality, the `soft-factory` name/path, and every requirement or enumeration of unrelated sibling skills. The recipe must not delete or modify any sibling directory.

### Acceptance Criteria

- AC-2 remains reachable through Runner Doctor rather than project validation.
- AC-6 project validation succeeds while unrelated cross-cutting skills coexist under `.agents/skills/`.

### Test Coverage

- V-1 inspects the recipe boundary and exercises it with an unrelated temporary sibling skill.
- V-5 runs the focused and full delegated project gates.

### Expected Evidence

- `just --show verify-harness-skills` names only the three engineering-harness skills and contains no Soft Factory path, manifest, hash, configuration, or CLI reference.
- The temporary unrelated sibling exists unchanged after `just verify-harness-skills` succeeds.

## Task T-2: Establish sole Soft Factory authority

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`

### Description

Assign Runner compatibility, readiness, configuration, and official-asset verdicts exclusively to direct `soft-factory doctor --json`. Keep shell, JavaScript, Just, tests, documentation, and evidence free of competing Runner validation logic.

### Acceptance Criteria

- AC-2, AC-3, and AC-4 are proved through Runner-owned commands rather than Sparkta project validation.
- AC-5 and AC-6 guidance and evidence assign Runner authority only to Doctor.

### Test Coverage

- V-2 searches the repository and branch diff for any Runner-specific validation logic or competing compatibility, readiness, configuration, and asset verdicts.
- V-3 runs direct Runner commands and treats Doctor as the sole compatibility/readiness/asset verdict.

### Expected Evidence

- Tracked files contain no repository-owned Runner validation implementation or evidence that assigns Runner verdicts to Sparkta.
- No root recipe or Sparkta script inspects `.soft-factory/config.yml`, `.agents/manifest.json`, or official Soft Factory asset paths.
- Direct Doctor JSON is the cited readiness and compatibility evidence.

## Task T-3: Preserve direct Runner ownership

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`

### Description

Preserve direct official CLI operation, package-owned asset installation, protocol-1 integration, Runner-owned state, and caller-supplied positive issue numbers. Keep `.soft-factory/config.yml` final validation exactly `just verify`. Do not add operational wrappers, adapters, synthetic canaries, or Runner execution to root project recipes.

### Acceptance Criteria

- AC-1 through AC-4 and AC-6 remain satisfied by official Runner surfaces.

### Test Coverage

- V-3 exercises help, instructions, recommended installation, and Doctor directly without selecting an issue.
- V-5 proves Runner still resolves final validation to the Sparkta `just verify` gate.

### Expected Evidence

- Direct commands succeed with no issue lifecycle mutation.
- Instructions report effective final validation `just verify`; Doctor reports readiness from the current repository state.

## Task T-4: Reconcile documentation and evidence

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3
- **Acceptance Criteria:** AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** None
- **Related Core-Components:** `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`

### Description

Update live harness discovery and skills documentation to describe only the three engineering-harness skills and to ignore/preserve unrelated siblings. Keep Runner operations documented through direct CLI commands. Reconcile implementation notes, verification summary, and PR text so acceptance evidence cites only current Doctor output and Runner-independent Sparkta validation.

### Acceptance Criteria

- AC-3 and AC-4 evidence points only to Runner-owned installation/Doctor behavior.
- AC-5 retains all required direct explicit-issue lifecycle operations.
- AC-6 records only the corrected validation path.

### Test Coverage

- V-2 rejects stale authority claims and references.
- V-4 checks the complete required command matrix and boundary language.

### Expected Evidence

- Live docs state that harness validation checks three engineering-harness skills and ignores unrelated siblings.
- Runner docs state that Doctor alone decides compatibility/readiness/assets.
- Implementation, verification, and PR evidence cite only current authoritative verdicts.

## Task T-5: Prove the boundary

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** None
- **Related Core-Components:** `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260813-soft-factory-runner-operation`

### Description

Execute the test plan in order, capture AC-indexed evidence, and commit the implementation with a clean tree for independent Verify. Do not start an issue run or mutate an unrelated issue.

### Acceptance Criteria

- Every AC has direct, bounded evidence from V-1 through V-5.

### Test Coverage

- V-1 through V-5 are required.

### Expected Evidence

- Direct Doctor and instructions envelopes, unrelated-sibling preservation proof, zero-reference scans, documentation command coverage, focused/full project-gate results, implementation commit SHA, and clean-tree proof.
