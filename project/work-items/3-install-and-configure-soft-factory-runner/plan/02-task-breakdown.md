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

## Task T-3: Retain static repository validation

- **Status:** Completed
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-2, AC-3, AC-5, AC-6

### Description
Keep one root static contract recipe that executes only `scripts/verify-soft-factory.mjs` and Git ignore probes. The script validates committed config, official assets, integration metadata, direct-CLI documentation, absence of wrappers/adapters, and absence of repository installation dependencies without executing Runner.

### Test Coverage
V-3 runs the static contract through focused/full project gates.

## Task T-4: Validate and record correction

- **Status:** Completed
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

### Description
Run direct `soft-factory instructions --json` and `soft-factory doctor --json`, then `just verify-focused` and `just verify`. Record exact evidence, official hashes, correction commit, clean-tree proof, and unchanged remote PR facts without pushing or editing GitHub.

### Test Coverage
V-4 is the authoritative correction sequence.
