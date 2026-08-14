# Test Plan: Correct Soft Factory Runner operation

## V-1: Reversal and integrity

- **Tasks:** T-1, T-4
- **Acceptance Criteria:** AC-2, AC-3, AC-6

### Steps
1. Confirm the Sparkta Operator, adapter, canary, and rejected retro are absent.
2. Compare the three RPIV agents with their `e67a2ac` bytes.
3. Compare official asset and manifest hashes with the locked values.
4. Confirm `.soft-factory/config.yml` remains protocol 1 with final `just verify`.

### Expected Result
Rejected orchestration is fully removed while official integration and configuration remain unchanged.

## V-2: Direct Runner preflight

- **Tasks:** T-2, T-4
- **Acceptance Criteria:** AC-1, AC-4, AC-6

### Steps
1. Run `soft-factory --help` and `soft-factory instructions --json` directly.
2. Run `soft-factory doctor --json` directly without an issue.
3. Require instructions schema 1, effective final validation `just verify`, and Doctor readiness with 24/24 checks.

### Expected Result
Direct CLI preflight succeeds without wrappers, issue selection, or Runner mutation.

## V-3: Repository validation boundary

- **Tasks:** T-1, T-2, T-3
- **Acceptance Criteria:** AC-2, AC-3, AC-5, AC-6

### Steps
1. Search all repository files for the two rejected checker identifiers and require zero matches.
2. Search live documentation, governance, plans, evidence, reports, scripts, and the root command interface for stale prose describing repository-owned Runner validation.
3. Assert every required direct lifecycle command appears in README and detailed docs.
4. Assert the justfile contains no `soft-factory` execution, Soft Factory-specific check, or operational Runner recipe.

### Expected Result
The repository delegates Runner compatibility and readiness exclusively to direct Doctor operation and does not execute or reimplement Runner through project validation.

## V-4: Authoritative project gates

- **Tasks:** T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

### Steps
1. Run `just verify-focused`.
2. Run `just verify`.
3. Recheck official hashes, GitHub remote facts, and clean-tree state after commit.

### Expected Result
Sparkta validation passes without a Soft Factory-specific repository check, while all Runner operations remain direct CLI responsibilities.
