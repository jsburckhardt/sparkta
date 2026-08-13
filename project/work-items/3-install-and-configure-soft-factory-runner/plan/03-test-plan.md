# Test Plan: Install and configure Soft Factory Runner

## Test V-1: Ambient CLI identity and preservation baseline

- **Type:** Environment and preservation validation
- **Task:** T-1, T-3, T-5
- **Acceptance Criteria:** AC-1, AC-6
- **Priority:** Critical

### Setup
Use the configured development environment from the repository root. Capture Git status and SHA-256 values for the three official assets, manifest, assessment `003` files, and `latest.json`/`latest.md` before implementation edits.

### Steps
1. Run the planned root Runner help/identity recipe and resolve the executable through that recipe.
2. Confirm installed package metadata identifies `soft-factory-runner` version `0.1.0` and the `soft-factory` bin.
3. Confirm no repository package, lockfile, setup recipe, devcontainer feature, or post-create script installs the Runner.
4. Save the protected-path status/hash baseline for comparison in V-6.

### Expected Result
The environment-owned CLI is executable and returns help successfully; package identity is correct; repository installation dependencies remain absent; no issue or Runner operational state is created.

### Expected Evidence
- Root recipe transcript with executable path, package name/version, bin, and help exit 0.
- Dependency/provisioning search or diff showing no Runner install declaration.
- Timestamped protected-path Git-status and SHA-256 baseline.

## Test V-2: Strict configuration, root safety, and RPIV metadata

- **Type:** Configuration and contract validation
- **Task:** T-2, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup
T-2 configuration, ignore rules, and canonical RPIV updates are present; no lifecycle command has been invoked.

### Steps
1. Parse `.soft-factory/config.yml` and assert protocol 1, `.trees`, `.soft-factory`, `just verify`, and concurrency integer 1 with no unknown planned keys.
2. Resolve roots relative to the repository and assert they are distinct, non-overlapping, non-traversing, non-symlink escapes, outside the Git common directory, and separate from `.harness/temp/boot/` and `.sparkta/`.
3. Use Git ignore probes to prove representative descendants of both roots are ignored and `.soft-factory/config.yml` remains committable.
4. Parse canonical RPIV frontmatter for `runner_protocol: 1` and `result_contract: agent-result-v1`.
5. Inspect coordinator/verifier instructions for injected-helper-only progress/result publication, failed terminal publication, final-head timing, immutable no-clobber result, final `just verify`, and pre-success validator behavior.

### Expected Result
All strict values and safety checks pass; only runtime descendants are ignored; canonical metadata and Runner handoff duties are present without direct operational-state ownership or issue selection.

### Expected Evidence
- Parsed configuration assertions and normalized root report.
- `git check-ignore -v` output for ignored descendants and non-ignored config.
- RPIV metadata/helper contract excerpts or static-check output.

## Test V-3: Official asset manifest, integrity, and skill governance

- **Type:** Integration and integrity validation
- **Task:** T-1, T-3, T-5
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup
The existing user-installed official assets and manifest have been brought into repository ownership without byte replacement; the root skill guard recognizes both adopted components.

### Steps
1. Parse `.agents/manifest.json` as strict schema version 1 with exactly one Operator, one Assessor, and one Soft Factory skill entry in catalog order.
2. Assert each entry uses version `0.1.0`, Runner protocol 1, its fixed safe destination, and a lowercase SHA-256 matching the destination bytes.
3. Assert `.agents/skills/` contains exactly the three engineering-harness skills plus `soft-factory`, with each governed independently and no fifth directory.
4. Run `just runner install --recommended` after convergence and require a successful no-change/up-to-date result.
5. Compare official asset bytes with the V-1 baseline.

### Expected Result
The strict manifest and all catalog digests are valid, the deliberate four-skill inventory passes, recommended installation is idempotent, and existing asset bytes remain unchanged.

### Expected Evidence
- Manifest validation and digest table.
- Exact skill inventory output.
- Successful `ASSETS_UP_TO_DATE`/`Changed: no` installation transcript.
- Before/after official-asset hash equality.

## Test V-4: Complete repository Doctor readiness

- **Type:** Repository integration validation
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-2, AC-4, AC-6
- **Priority:** Critical

### Setup
V-2 and V-3 pass in the configured authenticated environment. No issue number is supplied.

### Steps
1. Run `just runner doctor --json` and retain the complete JSON and exit status.
2. Assert schema version 1, repository identity, exactly 24 unique checks in documented order, and a blocking boolean/status for every check.
3. Assert every failed entry, if present, has nonempty `message` and `remediation`; reject omitted or partial checks.
4. For acceptance, require exit 0, top-level `ready: true`, and all 24 checks passed after repository-owned remediation.
5. Confirm Doctor created no retained lock, issue snapshot, worktree, process, or unrelated issue state.

### Expected Result
Doctor reports the complete readiness matrix with actionable failure shape and finishes ready with every check passed, without selecting or mutating an issue.

### Expected Evidence
- Complete Doctor JSON and exit status.
- Machine-checked count/order/field/readiness summary.
- Before/after Runner operational-path inventory showing no retained issue resources.

## Test V-5: Explicit-issue lifecycle documentation coverage

- **Type:** Documentation and static contract validation
- **Task:** T-4, T-5
- **Acceptance Criteria:** AC-5
- **Priority:** High

### Setup
All planned repository guidance and architecture links are updated.

### Steps
1. Map run, list/status inspection, reconcile, resume, stop, clean, attach, and logs to documented root recipe examples.
2. Assert each issue-specific operation uses one explicit positive issue placeholder and no text instructs agents to queue, rank, infer, or select an issue.
3. Assert guidance distinguishes Runner Doctor from harness Doctor, Runner state from harness/product state, and ambient CLI ownership from repository configuration/assets.
4. Assert lifecycle guidance delegates worktree, lock, process, state, recovery, and cleanup behavior exclusively to Runner.
5. Search live guidance for stale Runner-excluded or exact-three-total-skill claims and validate links/format through root gates.

### Expected Result
A cold operator can discover every required operation for one explicitly selected issue, authority boundaries are unambiguous, and stale conflict text is absent.

### Expected Evidence
- Verb-to-document coverage matrix.
- Explicit-issue and prohibited-selection search results.
- Documentation review checklist and passing formatting result.

## Test V-6: Authoritative non-mutating acceptance sequence

- **Type:** End-to-end repository validation
- **Task:** T-3, T-4, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup
V-1 through V-5 pass. Capture a final pre-sequence Git status, protected-path hashes, and Runner operational-resource inventory. Do not supply an issue number to a mutating lifecycle verb.

### Steps
1. Through root recipes, execute Runner help, structured instructions, idempotent recommended-asset installation, and structured Doctor in that order.
2. Validate instructions report schema 1, final validation `just verify`, and Runner-owned progress/result paths.
3. Run `just verify-focused` during implementation.
4. Run `just verify` before handoff and retain the complete result; optionally inspect harness delegation without treating it as a replacement.
5. Compare post-sequence protected hashes, assessment status, and operational-resource inventory with the captured baselines.
6. Inspect the scoped diff to confirm no application feature, Runner installation dependency, issue execution, unrelated issue mutation, assessment rewrite, or official asset-byte replacement occurred.

### Expected Result
All required discovery/readiness commands and both authoritative root gates succeed. The sequence starts no run, mutates no unrelated issue, preserves assessment `003`/`latest` and user-installed asset bytes, and leaves only planned repository configuration/integration/documentation changes.

### Expected Evidence
- Ordered root recipe transcript with exit 0 for help, instructions, asset convergence, Doctor, focused verification, and full verification.
- Instructions schema/final-validation assertion and complete Doctor summary.
- Before/after hash, Git-status, and operational-resource comparison.
- Final AC-1 through AC-6 evidence index in implementation notes.
