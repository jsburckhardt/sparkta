# Action Plan: Install and configure Soft Factory Runner

## Feature
- **ID:** 3
- **Research Brief:** `project/work-items/3-install-and-configure-soft-factory-runner/research/00-research.md`

## ADRs Created
- None. Existing `ADR-260812-foundation-stack` and `ADR-260812-filesystem-state-boundary` remain applicable; no new architectural decision is required.

## Core-Components Created
- **Created:** `CORE-COMPONENT-260813-soft-factory-runner-operation` — governs the ambient Runner boundary, fixed safe roots, official assets, injected RPIV handoff, explicit issue operations, root recipe delegation, and preservation rules.
- **Modified (creation date preserved):** `CORE-COMPONENT-260813-engineering-harness-operation` — narrows its exact allowlist to engineering-harness skills and permits additional skills only through a separately adopted component, resolving the official `soft-factory` skill conflict.
- **Registry:** `project/architecture/ADR/DECISION-LOG.md` registers the new component, revises the conflicting harness decisions, and records decisions 49–53.

## Acceptance Criteria
- **AC-1:** The `soft-factory-runner` package is installed and its `soft-factory` CLI is available in the configured development environment.
- **AC-2:** Runner configuration declares protocol 1, safe repository worktree and state roots, and a positive concurrency limit.
- **AC-3:** The recommended official Operator, Assessor, and Soft Factory skill assets are installed with a valid `.agents/manifest.json`.
- **AC-4:** `soft-factory doctor --json` reports every readiness check and provides actionable remediation for any unmet prerequisite.
- **AC-5:** Repository instructions explain how to run, inspect, reconcile, resume, stop, clean, attach to, and read logs for one explicitly selected issue.
- **AC-6:** Runner help, instructions, asset installation, and repository Doctor execute successfully without selecting or mutating an unrelated issue.

## Acceptance Coverage

| AC ID | Implementation tasks | Tests or validation | Expected evidence |
| --- | --- | --- | --- |
| AC-1 | T-3, T-5 | V-1, V-6 | Resolved `soft-factory` executable, installed package metadata/version, successful help output, and passing root gates without repository installation dependencies |
| AC-2 | T-2, T-5 | V-2, V-4, V-6 | Committed strict config, ignore probes for `.trees` and `.soft-factory` descendants, committable config proof, canonical RPIV declarations, and passed Doctor root/config/runtime checks |
| AC-3 | T-1, T-3, T-5 | V-1, V-3, V-6 | Byte-preservation hashes, schema-v1 manifest with three catalog-matching entries, exact governed four-skill inventory, and idempotent `ASSETS_UP_TO_DATE` installation |
| AC-4 | T-2, T-3, T-5 | V-4, V-6 | Complete schema-version-1 Doctor JSON with all 24 ordered checks, `ready: true` after repository fixes, and message/remediation assertions for every failed check if the environment introduces one |
| AC-5 | T-4, T-5 | V-5, V-6 | Reviewed discovery and operator documentation covering run, list/status inspection, reconcile, resume, stop, clean, attach, and logs with explicit issue placeholders and no selection workflow |
| AC-6 | T-1, T-2, T-3, T-5 | V-1, V-3, V-4, V-6 | Successful non-run command transcript plus before/after Git status and SHA-256 inventory proving no unrelated issue state, user-installed asset bytes, or assessment `003`/`latest` artifacts changed |

**Coverage proof:** AC-1 through AC-6 each have one or more dependency-ordered implementation tasks, executable validation entries, and concrete expected evidence. No criterion is unmapped.

## Implementation Tasks
1. **T-1 — Preserve and govern the installed official assets (AC-3, AC-6):** capture preservation baselines, retain the official bytes and manifest, commit those existing assets without reinstalling or replacing them, and align the repository skill inventory with the two adopted components.
2. **T-2 — Add safe Runner configuration and canonical RPIV integration (AC-2, AC-4, AC-6):** add strict protocol/root/concurrency/final-validation configuration, precise ignore coverage, canonical metadata, and injected progress/result/validator duties without implementing a competing control path.
3. **T-3 — Add root Runner delegation and validation recipes (AC-1, AC-3, AC-4, AC-6):** keep every raw Runner command in the root `justfile`, make asset and Doctor checks part of the project gates, and retain `verify-focused`/`verify` authority.
4. **T-4 — Publish explicit-issue Runner operating guidance (AC-5):** update cold-agent, contributor, architecture, skill-index, setup, and detailed operator documentation while removing stale “future/excluded” statements.
5. **T-5 — Execute non-mutating acceptance validation and record evidence (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6):** run the planned root recipes only, inspect complete structured results, prove preservation, and record evidence without running or selecting an issue.
