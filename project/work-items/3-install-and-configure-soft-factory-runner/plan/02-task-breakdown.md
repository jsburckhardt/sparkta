# Task Breakdown: Install and configure Soft Factory Runner

## Task T-1: Preserve and govern the installed official assets

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-3, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-project-command-interface`

### Description
Before editing implementation surfaces, record SHA-256 and Git-status baselines for `.agents/manifest.json`, all three official assets, `.harness/reports/harnessability/003-sparkta/`, and `.harness/reports/harnessability/latest.json`/`latest.md`. Keep every user-installed asset byte unchanged, retain the strict manifest, and bring the assets into repository ownership. Preserve all assessment artifacts exactly. Update skill inventory validation and discovery only to authorize the union of the three engineering-harness skills and the separately governed official `soft-factory` skill; do not authorize any other skill or use the broad harness installer.

### Acceptance Criteria
- **AC-3:** Preserve and register the official Operator, Assessor, Soft Factory skill, and valid manifest at their existing destinations.
- **AC-6:** Make no issue selection and preserve unrelated user assets and assessment evidence throughout convergence.

### Test Coverage
- Execute V-1 to compare before/after status and hashes for protected paths.
- Execute V-3 to validate manifest schema, catalog identities, destinations, protocol, digests, exact governed skill inventory, and idempotent recommended installation.
- Require a regression guard in the root verification path that rejects missing, extra, or digest-invalid governed assets without broad reinstallation.

### Expected Evidence
- Before/after SHA-256 table showing unchanged official asset and assessment bytes.
- `.agents/manifest.json` parse output showing schema version 1 and exactly three valid entries.
- Catalog digest comparison and `ASSETS_UP_TO_DATE`/`Changed: no` result.
- Git diff/status proof that assessment `003` and `latest` paths were neither edited nor staged by implementation.

## Task T-2: Add safe Runner configuration and canonical RPIV integration

- **Status:** Complete
- **Complexity:** High
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-2, AC-4, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260812-state-lifecycle`

### Description
Create `.soft-factory/config.yml` with protocol 1, worktree root `.trees`, state root `.soft-factory`, `rpiv.final_validation: just verify`, and `execution.max_concurrent_runs: 1`. Add ignore rules that cover all Runner worktree/runtime descendants while explicitly retaining the config file. Add `runner_protocol: 1` and `result_contract: agent-result-v1` to canonical RPIV frontmatter. Update coordinator and verifier contracts to consume Runner-injected helpers for ordered progress, terminal failure, immutable final result, and final validation only when a Runner launch binding is present; never read/write operational state directly or weaken normal non-Runner RPIV behavior.

### Acceptance Criteria
- **AC-2:** Commit strict safe configuration with positive concurrency and non-overlapping repository-relative roots.
- **AC-4:** Satisfy every repository-owned Doctor prerequisite and preserve Doctor as the sole readiness authority.
- **AC-6:** Integration changes must not create state, launch an issue, or mutate an unrelated issue.

### Test Coverage
- Execute V-2 for strict config values, path safety, ignore coverage, config tracking, canonical metadata, and static RPIV helper ownership assertions.
- Execute V-4 for the complete final Doctor result.
- Include negative static checks against package/lockfile/devcontainer installation and direct Runner-state manipulation guidance.

### Expected Evidence
- Parsed config value report and `git check-ignore` results for representative descendants plus non-ignored config proof.
- Canonical RPIV frontmatter and instruction excerpts showing injected-helper ownership and final `just verify` binding.
- Complete Doctor JSON showing configuration, roots, ignore checks, result contract, and runtime checks passed.
- Diff proof that `.sparkta/`, `.harness/temp/boot/`, package manifests, lockfile, and devcontainer provisioning remain outside Runner configuration changes.

## Task T-3: Add root Runner delegation and validation recipes

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-1, AC-3, AC-4, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-rpiv-stage-contract`

### Description
Add discoverable root `justfile` delegation for Runner arguments and a deterministic Runner readiness recipe. The readiness recipe must validate executable/package identity, help, structured instructions, governed official assets, and complete Doctor output without running an issue. Update the existing skill guard to distinguish exactly three engineering-harness skills from the separately governed official skill. Compose Runner readiness into both `verify-focused` and `verify`; do not replace either gate, duplicate npm validation elsewhere, or add Runner installation to setup/package/devcontainer state.

### Acceptance Criteria
- **AC-1:** Expose and validate the configured environment-owned CLI through the root command interface.
- **AC-3:** Validate converged official assets and governed skill inventory.
- **AC-4:** Make complete repository Doctor readiness part of authoritative validation.
- **AC-6:** Execute only non-run discovery, installation-convergence, diagnostic, and validation commands.

### Test Coverage
- Execute V-1 for CLI/package/help discovery.
- Execute V-3 and V-4 through root recipes rather than duplicated shell instructions.
- Execute V-6 to prove `verify-focused` and `verify` still run their existing application checks and the additive Runner checks.
- Test recipe listing and argument forwarding without supplying an issue to any mutating verb.

### Expected Evidence
- `just --list` excerpt containing Runner and unchanged focused/full entry points.
- Successful root recipe transcripts for help, instructions, idempotent asset convergence, and Doctor.
- Focused/full transcripts showing existing test/lint/format/type/build/diff behavior remains authoritative.
- Repository dependency diff proving no `soft-factory-runner` package, lockfile, setup, or devcontainer installation addition.

## Task T-4: Publish explicit-issue Runner operating guidance

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-5
- **Related ADRs:** `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-rpiv-stage-contract`

### Description
Update `README.md`, `docs/README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `LLM.txt`, `.github/skills/README.md`, `.harness/engineering-harness.md`, and `project/architecture/README.md` as applicable. Explain the ambient ownership boundary, configuration/roots, official assets, Doctor versus harness Doctor, and root-recipe workflows for run, list/status inspection, reconcile, resume, stop, clean, attach, and logs. Every issue-specific example must use an explicit caller-supplied issue placeholder. Remove stale statements that the Runner or official skill is excluded while retaining harness and product-state boundaries. Do not duplicate raw `soft-factory` command bodies outside the root `justfile`.

### Acceptance Criteria
- **AC-5:** Provide discoverable and accurate instructions for every required operation on one explicitly selected issue.

### Test Coverage
- Execute V-5 to check every required verb, explicit issue placeholder, authority warning, Doctor distinction, state boundaries, and root recipe references.
- Run formatting/link-oriented checks through V-6.
- Review documentation categories for setup, configuration, usage, operations, cleanup, architecture, migration/no-migration, API/no-API, and local deployment ownership.

### Expected Evidence
- Documentation coverage matrix mapping each required operation to an authoritative section.
- Search output showing explicit issue placeholders and no queue/rank/infer/select workflow.
- Search output showing obsolete Runner-excluded and exact-three-total-skill claims removed from live guidance.
- Passing format and full root validation results.

## Task T-5: Execute non-mutating acceptance validation and record evidence

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`

### Description
Run V-1 through V-6 in order and record AC-indexed evidence in `implementation/00-implementation.md`. Use only root recipes for project operations. Do not invoke `run`, reconcile/resume/stop/clean/attach/logs against any issue during acceptance; those lifecycle verbs are documentation/static-interface checks only. Compare final protected-path hashes and Git status to the T-1 baseline, retain all pre-existing assessment modifications/untracked paths, and hand off the exact root validation results.

### Acceptance Criteria
- **AC-1:** Prove the configured ambient package and CLI are usable.
- **AC-2:** Prove strict configuration, root safety, positive concurrency, and ignore coverage.
- **AC-3:** Prove official asset integrity and idempotent installation convergence.
- **AC-4:** Prove complete actionable Doctor output and final readiness.
- **AC-5:** Prove complete explicit-issue operating documentation.
- **AC-6:** Prove all required non-run commands and root gates succeed without unrelated mutation.

### Test Coverage
- Execute every test entry V-1 through V-6 and attach each result to its mapped AC IDs.
- Require `just verify-focused` during implementation and `just verify` before handoff.
- Record any environment-owned failure as a blocker with the complete Doctor remediation; do not add installation dependencies as a workaround.

### Expected Evidence
- One implementation evidence section per AC ID with command/result/artifact references.
- Successful `just verify-focused` and `just verify` transcripts from the configured environment.
- Complete final Doctor JSON and official-asset convergence output.
- Final before/after preservation report and scoped Git diff proving no issue run, unrelated issue mutation, assessment rewrite, or asset-byte replacement.
