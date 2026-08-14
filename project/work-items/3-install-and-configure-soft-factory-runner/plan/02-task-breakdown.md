# Task Breakdown: Replace official assets with a Runner dispatcher

## Task T-1: Remove official asset ownership

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-2, AC-5
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260813-soft-factory-runner-operation`

### Description

Delete `.agents/agents/`, `.agents/manifest.json`, and `.agents/skills/soft-factory/SKILL.md`. Preserve the three engineering-harness skills, Runner config, ignores, and RPIV metadata. Do not install package assets.

### Acceptance Criteria

- AC-2 retains protocol, roots, final validation, concurrency, and RPIV metadata.
- AC-5 removes unwanted assets while preserving the three engineering-harness skills.

### Test Coverage

- V-1 checks absence, retained inventory, configuration, ignores, and RPIV metadata.
- V-5 assigns readiness only to Doctor.

### Expected Evidence

- Exact absent-path assertions, sorted skill inventory, and integration file evidence.

## Task T-2: Author the APS Runner dispatcher

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`, `CORE-COMPONENT-260813-soft-factory-runner-operation`

### Description

Create the dispatcher from APS v1.0, framework revision 1.2.2, the VS Code adapter, and subagent guide. Use only `execute/runInTerminal` and `execute/getTerminalOutput`. Put static rules in `<instructions>` and workflows in `<processes>`.

### Acceptance Criteria

- AC-3 maps to exact frontmatter, APS structure, input, commands, and typed outputs.
- AC-4 maps to invalid-input and Doctor gates plus non-orchestrating refusal behavior.
- AC-6 maps to clean APS lint and no positive launch.

### Test Coverage

- V-2 applies APS/adapter lint.
- V-3 proves exact commands and negative branches.

### Expected Evidence

- Clean lint, leaf checklist, tool proof, branch matrix, and typed formats.

## Task T-3: Reconcile repository references

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** None
- **Related Core-Components:** `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260813-soft-factory-runner-operation`

### Description

Replace official asset and `soft-factory install --recommended` claims in README, operations docs, agent guidance, indexes, harness governance, architecture README, `003-sparkta` and `latest` assessments, and current Issue #3 evidence. Preserve the Research brief as historical evidence; Verify owns GitHub updates.

### Acceptance Criteria

- AC-3 and AC-4 docs describe dispatcher discovery, direct commands, Doctor gate, and Runner ownership.
- AC-5 has no stale live/current-evidence references.
- AC-6 states no real issue run occurred.

### Test Coverage

- V-4 scans exact stale paths/phrases and all documentation categories.
- V-5 confirms Runner-independent project validation.

### Expected Evidence

- Documentation matrix, zero-match scans, valid assessment JSON, and corrected evidence.

## Task T-4: Prove the replacement without a run

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260813-soft-factory-runner-operation`

### Description

Run V-1 through V-5, record AC evidence, and commit through the harness. Never invoke `soft-factory run` or an issue lifecycle command during validation.

### Acceptance Criteria

- Every AC has bounded evidence.
- No validation starts or mutates a Runner issue.

### Test Coverage

- V-1 through V-5 are required.

### Expected Evidence

- Inventory, lint, negative controls, scans, preflight, project gates, commit SHA, and clean tree.
