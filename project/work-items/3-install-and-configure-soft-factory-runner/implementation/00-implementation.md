# Implementation Evidence: Issue #3

## Completed tasks

- T-1: Preserved and governed the installed official assets.
- T-2: Added strict safe Runner configuration and canonical RPIV integration.
- T-3: Added root Runner delegation, integrity checks, and readiness gate composition.
- T-4: Published explicit-issue setup, usage, architecture, and operational guidance.
- T-5: Executed the planned non-run acceptance sequence and preservation comparison.

## Acceptance evidence

### AC-1

- `just runner-identity` resolved the executable at `/usr/local/share/nvm/versions/node/v24.19.0/bin/soft-factory` and asserted package `soft-factory-runner` version `0.1.0` with bin `dist/index.js`.
- `just runner-help`, `just verify-focused`, and `just verify` exited 0.
- `scripts/verify-soft-factory.mjs` asserts the package, lockfile, devcontainer, and post-create setup do not install the Runner.

### AC-2

- `.soft-factory/config.yml` is exactly protocol 1, worktree root `.trees`, state root `.soft-factory`, final validation `just verify`, and positive concurrency 1.
- `just runner-contract` passed exact config checks and Git ignore probes for both roots while proving the config remains unignored.
- Canonical RPIV frontmatter declares `runner_protocol: 1` and `result_contract: agent-result-v1`; coordinator and verifier instructions bind injected progress, failure, immutable result, and validator helpers without direct Runner-state ownership.

### AC-3

- The strict schema-v1 manifest contains exactly the official Operator, Assessor, and Soft Factory skill in catalog order at version 0.1.0 and Runner protocol 1.
- Final official hashes equal the initial baseline: Operator `46b96e18...ed760`, Assessor `40054f09...7ed3d`, skill `07d0c15b...d3b6f`, manifest `e57667a0...a857`.
- `just runner-install-assets` reported `ASSETS_UP_TO_DATE` and `Changed: no`; the exact three engineering-harness skills plus separately governed `soft-factory` inventory passed.

### AC-4

- `just runner-doctor` exited 0 with schema version 1, `ready: true`, and all 24 unique ordered blocking checks passed.
- The root recipe preserves complete Doctor output and rejects failed checks without message/remediation. There were no environment-only Runner Doctor findings in the final result.

### AC-5

- `README.md` and `docs/README.md` map run, list/status, reconcile, resume, stop, clean, attach, and logs to root recipes using explicit positive `<ISSUE_NUMBER>` placeholders.
- `AGENTS.md`, `CONTRIBUTING.md`, `LLM.txt`, `.github/skills/README.md`, `.harness/engineering-harness.md`, and `project/architecture/README.md` document ambient ownership, Doctor separation, safe state boundaries, exact skill governance, and Runner-only lifecycle ownership.
- The deterministic contract validator asserts every required operation in both operator guides and rejects repository installation dependencies.

### AC-6

- The ordered root sequence `runner-help`, `runner-instructions`, `runner-install-assets`, `runner-doctor`, `verify-focused`, and `verify` exited 0 without any issue argument.
- Before and after operational inventory contained only `.soft-factory/config.yml`; no worktree, issue snapshot, lock, process, or result was retained.
- Official asset hashes were unchanged. Assessment 003/latest evidence and summary bytes were preserved; report/latest claims were updated in matching pairs only where the new separately governed skill made the previous total-skill wording stale.

## Documentation evidence

- Setup/configuration/usage/operations: `README.md`, `docs/README.md`, `CONTRIBUTING.md`, and `AGENTS.md`.
- Skill and architecture boundaries: `.github/skills/README.md`, `.harness/engineering-harness.md`, `project/architecture/README.md`, `LLM.txt`, the decision log, and both adopted Runner/harness components.
- Assessment consistency: `.harness/reports/harnessability/003-sparkta/report.{json,md}` and `latest.{json,md}` now distinguish the three engineering-harness skills from the separately governed fourth skill.
- API impact: none; no application or network API changed.
- Migration/deployment: documentation records additive configuration convergence, no API/data migration, no repository-owned CLI installation, and no server deployment change.

## Validation results

- Focused validation: `just verify-focused` passed after each T-1 through T-4 change set and in the final V-6 sequence; 6 files and 13 tests passed with Runner readiness included.
- Full validation: initial `just verify` found README Prettier drift; after applying the configured formatter, two subsequent runs passed Runner readiness, 13 tests, lint, format, type-check, build, and diff integrity.
- Runner Doctor environment findings: none; final `ready: true` with 24/24 checks passed.

## Verify-return repair at 6cd034f6e51a25d8ea7c48eb4bcbd88208e4ae22

- Corrected every current assessment 003 skill-inventory claim in `report.md`, `report.json`, `summary.md`, and `evidence.jsonl` to distinguish the governed four-skill committed inventory from the exact three-skill engineering-harness allowlist and separately governed `soft-factory`.
- Re-mirrored `latest.md` and `latest.json` byte-for-byte from assessment 003; assessments 001 and 002 remain unchanged. Report scores, grades, readiness, confidence, and proof level were not changed.
- AC-3 evidence: assessment inventory text now names all four committed directories and preserves the three-name engineering-harness boundary. AC-6 evidence: only assessment 003, root latest mirrors, and this implementation note changed; no historical assessment or issue runtime state changed.
- Consistency/schema evidence: the changed JSON values remain strings accepted by the existing v0.2 schema, JSON/JSONL remain readable, report/latest byte comparisons passed for Markdown and JSON, and the comprehensive stale-claim search found only wording that now states both governance scopes.
- Focused validation: `just verify-focused` passed (6 test files, 13 tests, Runner readiness and diff integrity). Full validation: `just verify` passed (13 tests, lint, format, type-check, build, Runner readiness, and diff integrity).
- Documentation impact: harnessability assessment 003 and its root latest mirrors were corrected; no README, API, configuration, usage, migration, architecture-contract, deployment, or operational guidance change was required because runtime behavior and interfaces did not change.

Final acceptance remains owned by Verify.
