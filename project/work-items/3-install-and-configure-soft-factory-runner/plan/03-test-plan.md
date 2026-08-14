# Test Plan: Restore Soft Factory Doctor authority

## Test V-1: Engineering-harness-only skill validation

- **Type:** Integration and static boundary
- **Task:** T-1, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup

Create one uniquely named temporary sibling directory under `.agents/skills/` with a sentinel file and register cleanup with a shell trap. Do not alter any official Soft Factory asset.

### Steps

1. Inspect `just --show verify-harness-skills` and require the three engineering-harness names.
2. Require that recipe body to contain no `soft-factory`, `.soft-factory`, `.agents/manifest.json`, official asset path, Runner CLI, asset hash, or whole-directory equality logic.
3. Run `just verify-harness-skills` while the unrelated temporary sibling exists.
4. Assert the sibling directory and sentinel are byte-identical after the recipe returns, then remove only the temporary fixture.

### Expected Result

Engineering-harness validation succeeds by checking its three governed skills and neither enumerates, rejects, requires, nor modifies unrelated siblings.

### Expected Evidence

- Captured recipe body, successful exit, and before/after sentinel digest.

## Test V-2: Duplicate authority and reference elimination

- **Type:** Static repository contract
- **Task:** T-2, T-4, T-5
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Inspect tracked files plus the complete `origin/main...HEAD` branch diff. Exclude Git object history as historical immutable data, but include plans, implementation evidence, verification evidence, live docs, scripts, root recipes, and PR description text.

### Steps

1. Require `scripts/verify-soft-factory.mjs` and every other repository-owned Runner checker to be absent.
2. Require zero live invocations or affirmative evidence references to the deleted checker, `verify-soft-factory-contract`, static Runner contracts, static asset hashes, or manifest/config compatibility parsing.
3. Require `justfile` to contain no Soft Factory CLI, name, path, configuration, manifest, skill, hash, compatibility, or readiness check.
4. Require no Sparkta script or test to inspect `.soft-factory/config.yml`, `.agents/manifest.json`, or official Soft Factory assets for a verdict.

### Expected Result

Sparkta contains no duplicate Runner authority, and prior evidence cannot be mistaken for current acceptance proof.

### Expected Evidence

- Zero-match scan output, branch-diff inspection, and PR body inspection.

## Test V-3: Direct Runner authority

- **Type:** Official CLI integration
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-6
- **Priority:** Critical

### Setup

Operate from the primary worktree without supplying an issue number. Do not run, reconcile, resume, stop, clean, attach, or inspect logs for any issue.

### Steps

1. Run `soft-factory --help` directly.
2. Run `soft-factory instructions --json` directly and require schema 1 plus effective final validation `just verify`.
3. Run the official recommended asset installation command directly; require success without manual asset replacement.
4. Run `soft-factory doctor --json` directly and require its structured readiness verdict. For any failed check, require the Doctor-provided remediation and fail acceptance until Doctor reports ready.
5. Do not independently hash, parse, enumerate, or validate official assets or Runner configuration.

### Expected Result

Official commands succeed without selecting or mutating an issue, and Doctor is the sole compatibility, readiness, configuration, and asset verdict.

### Expected Evidence

- Direct help result, instructions envelope, installation result, and complete Doctor envelope.

## Test V-4: Direct operator documentation

- **Type:** Documentation contract
- **Task:** T-4, T-5
- **Acceptance Criteria:** AC-5, AC-6
- **Priority:** High

### Setup

Inspect README, detailed operations documentation, agent guidance, harness discovery, skills index, architecture summary, implementation evidence, verification summary, and PR description.

### Steps

1. Require direct documented commands for run, list/status, reconcile, resume, stop, clean, attach, and logs.
2. Require one caller-supplied positive issue number wherever the command requires issue identity.
3. Require Doctor-only compatibility/readiness/asset language and no project-check, wrapper, static-contract, or hash authority.
4. Require harness documentation to name only the three engineering-harness skills as its validation scope and state that unrelated sibling skills are ignored and preserved.

### Expected Result

A cold operator can use Runner directly, while no document assigns Runner authority to Sparkta validation.

### Expected Evidence

- File-and-line command matrix and zero stale-boundary findings.

## Test V-5: Authoritative Sparkta project gates

- **Type:** Focused and full regression
- **Task:** T-1, T-3, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-6
- **Priority:** Critical

### Setup

Use the root project recipes through the harness check wrappers after V-1 through V-4 pass.

### Steps

1. Run `harness checks focused --json` and confirm delegation to `just verify-focused`.
2. Run `harness checks full --json` and confirm delegation to `just verify`.
3. Confirm neither project recipe invokes Runner or inspects Soft Factory configuration/assets.
4. Re-run `soft-factory instructions --json` and confirm Runner still resolves final validation to `just verify`.
5. Confirm the implementation handoff names the exact commit and a clean working tree.

### Expected Result

Sparkta plus the three engineering-harness skills pass focused/full validation with no Soft Factory knowledge, while Runner independently retains `just verify` as final validation.

### Expected Evidence

- Focused/full harness envelopes, delegated command output, final-validation instructions envelope, commit SHA, and clean-tree proof.
