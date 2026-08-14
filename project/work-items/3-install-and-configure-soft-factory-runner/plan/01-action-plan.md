# Action Plan: Correct Soft Factory Runner operation

## Feature

- **ID:** 3
- **Research Brief:** `project/work-items/3-install-and-configure-soft-factory-runner/research/00-research.md`
- **Return Reason:** The user rejected commit `5f704997` because it added repository-specific orchestration, adapters, canaries, and `operational Just wrapper` wrappers. Runner must deliver issues through its official direct CLI and own RPIV integration without Sparkta-specific execution layers.

## Architecture

- Restore `.github/agents/rpiv*.agent.md` to the official Runner-compatible baseline at `e67a2ac` semantics.
- Delete the Sparkta Operator, integration adapter, synthetic canary, and rejected retro.
- Use direct `soft-factory` commands for every Runner discovery, preflight, and lifecycle operation.
- Keep the root `justfile` authoritative for Sparkta setup, run, and focused/full project verification without any Soft Factory-specific check or Runner execution.
- Preserve `.soft-factory/config.yml` with final validation `just verify`; Runner/RPIV invokes that project validation command directly.
- Preserve official Runner assets and `.agents/manifest.json` byte-for-byte.
- Use direct `soft-factory doctor --json` as the sole Runner compatibility and readiness authority.

## Acceptance Criteria

- **AC-1:** The ambient `soft-factory-runner` package and `soft-factory` CLI remain available.
- **AC-2:** Protocol 1, safe Runner roots, final `just verify`, and concurrency 1 remain configured.
- **AC-3:** Official Operator, Assessor, skill, and manifest bytes remain unchanged.
- **AC-4:** Direct `soft-factory doctor --json` reports complete readiness and remediation behavior.
- **AC-5:** Live guidance uses direct `soft-factory` commands for every operator workflow and contains no `operational Just wrapper` invocation.
- **AC-6:** Direct instructions/Doctor and Sparkta focused/full validation pass without selecting or mutating an issue.

## Acceptance Coverage

| AC ID | Tasks | Validation | Expected evidence |
| --- | --- | --- | --- |
| AC-1 | T-2, T-4 | V-2, V-4 | Direct CLI help/instructions and ambient package identity |
| AC-2 | T-1, T-3, T-4 | V-1, V-3, V-4 | Exact committed config plus direct Doctor evidence |
| AC-3 | T-1, T-3, T-4 | V-1, V-3, V-4 | Unchanged official and manifest SHA-256 values |
| AC-4 | T-2, T-4 | V-2, V-4 | Direct Doctor schema 1 with 24/24 checks ready |
| AC-5 | T-2, T-3 | V-3 | Direct command matrix and zero `operational Just wrapper` references in live surfaces |
| AC-6 | T-1, T-3, T-4 | V-2, V-3, V-4 | No adapters/canaries/wrappers, direct preflight, and passing project gates |

## Implementation Tasks

1. **T-1 - Reverse rejected orchestration:** Restore official RPIV agent semantics and remove repository-owned Operator, adapter, canary, retro, and related claims.
2. **T-2 - Establish direct Runner operation:** Remove every operational Soft Factory recipe and update operator guidance to direct CLI commands with explicit issue numbers.
3. **T-3 - Remove repository-owned Runner validation:** Delete the repository-specific checker and remove it from project recipes, documentation, architecture, plans, and evidence.
4. **T-4 - Validate and record correction:** Run direct instructions and Doctor, run focused/full Sparkta gates, update evidence, and commit without pushing.
