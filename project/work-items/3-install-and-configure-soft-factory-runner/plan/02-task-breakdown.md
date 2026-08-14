# Task Breakdown: Correct Soft Factory Runner operation

## Task T-1: Reverse rejected orchestration

- **Status:** Completed
- **Dependencies:** None
- **Acceptance Criteria:** AC-2, AC-3, AC-6

### Description
Restore the three RPIV agents to `e67a2ac` semantics. Delete the Sparkta Operator, integration adapter, synthetic canary, and rejected retro. Remove executable-APS, adapter, synthetic-proof, and repository-owned orchestration claims from architecture and evidence.

### Test Coverage
V-1 and V-3 prove official integrity, baseline agent restoration, and rejected-file absence.

## Task T-2: Establish direct Runner operation

- **Status:** Completed
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-4, AC-5

### Description
Remove the generic an operational pass-through recipe recipe and every operational operational Runner recipes recipe. Update AGENTS, README, detailed docs, CONTRIBUTING, LLM, harness guidance, and architecture guidance so operators invoke `soft-factory` directly with one explicit positive issue number where required.

### Test Coverage
V-2 executes direct non-issue preflight commands. V-3 rejects any `operational Just wrapper` reference in live surfaces and any `soft-factory` execution in the root justfile.

## Task T-3: Remove repository-owned Runner validation

- **Status:** Completed
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-2, AC-3, AC-5, AC-6

### Description
Delete the repository-specific Runner checker and remove its recipe, project-gate composition, documentation, architecture language, plan language, and evidence. Keep Runner compatibility and readiness under direct Doctor authority, while focused/full project validation remains Runner-independent.

### Test Coverage
V-3 proves the removed checker has no remaining repository references and that project gates contain no Soft Factory-specific validation or execution.

## Task T-4: Validate and record correction

- **Status:** Completed
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

### Description
Run direct `soft-factory doctor --json`, then `just verify-focused` and `just verify`. Record exact evidence, zero-reference proof, correction commit, and clean-tree proof without pushing or editing GitHub.

### Test Coverage
V-4 is the authoritative correction sequence.
