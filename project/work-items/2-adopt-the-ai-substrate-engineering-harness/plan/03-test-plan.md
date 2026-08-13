# Test Plan: Correct the AI-Substrate engineering harness skill allowlist

## Test V-1: Validate the reconciled architecture contract

- **Type:** Architecture / static
- **Task:** T-1
- **Acceptance Criteria:** AC-2, AC-5
- **Priority:** Critical

### Setup

Use the updated core-component and Decision Log; inspect all existing architecture artifacts without creating new ones.

### Steps

1. Confirm the component ID, filename, registry row, and `2026-08-13` creation date are unchanged.
2. Confirm its rules name exactly the three allowed skills, reject extras, and prohibit a broad restoring install.
3. Confirm Decision 46 and Decision 48 are imperative, actionable, dated, and sourced to the component.
4. Confirm no ADR or new core-component exists for this correction.

### Expected Result

The global contract unambiguously governs the three-skill allowlist and no nine-skill architectural prescription remains.

### Expected Evidence

- Architecture audit table and relevant diffs.
- Zero unexpected architecture-artifact paths.

## Test V-2: Prove the exact skill allowlist and validation guard

- **Type:** Static / negative control
- **Task:** T-2
- **Acceptance Criteria:** AC-2, AC-4
- **Priority:** Critical

### Setup

Complete skill pruning and the root validation guard. Use disposable copies for failure fixtures; never mutate preserved report paths.

### Steps

1. Sort top-level `.agents/skills/` directory names and compare byte-for-byte with the ordered expected set: `eng-harness-0-harnessability-assessment`, `eng-harness-flow`, `grill-agent-done`.
2. Confirm each required `SKILL.md` and its referenced files resolve.
3. Confirm all six excluded trees are absent from tracked and working state.
4. Run the root allowlist guard successfully.
5. In disposable copies, remove one required directory and add one extra directory; require non-zero, actionable failures.
6. Confirm root `skills-lock.json` is absent, `.harness/skills.lock.json` does not name excluded skills, and the APS tree is unchanged.

### Expected Result

Only the three required engineering-harness skills exist, and repository validation rejects both missing and additional entries without changing check delegation.

### Expected Evidence

- Expected/actual inventory output, tracked deletion list, path/link audit, and positive/negative guard transcripts.
- Allowed-skill retention diff/hash evidence and APS no-change proof.

## Test V-3: Audit cold-agent discovery and live documentation

- **Type:** Documentation / discovery
- **Task:** T-3
- **Acceptance Criteria:** AC-2, AC-5
- **Priority:** High

### Setup

Read only live normative entry points; exclude generated harnessability reports and explicitly historical evidence from stale-claim enforcement.

### Steps

1. Traverse `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, `.harness/engineering-harness.md`, and `project/architecture/README.md` as a cold agent.
2. Resolve all three allowlist links and harness governance links.
3. Search these files for each excluded skill, nine-skill wording, and complete-packaged-inventory claims.
4. Confirm lock documentation describes provenance only and warns against broad restoration.
5. Confirm deterministic harness commands and root `just` authority remain accurate.

### Expected Result

A cold agent discovers exactly the approved skills and current harness workflow in one hop; no live documentation authorizes or links an excluded skill.

### Expected Evidence

- Entry-point audit matrix, link results, and scoped stale-reference search output.

## Test V-4: Validate ambient CLI usability after correction

- **Type:** Environment / acceptance
- **Task:** T-5
- **Acceptance Criteria:** AC-1, AC-6
- **Priority:** Critical

### Setup

Use the configured Node.js 24 environment. Do not install skills or change npm state.

### Steps

1. Run `harness --version`.
2. Run `harness instructions`.
3. Run and parse `harness doctor --json`.
4. Classify any degraded findings under the existing documented exception.

### Expected Result

Version is exactly `0.13.0`; instructions and doctor remain usable, with no repository-actionable skill-discovery contradiction.

### Expected Evidence

- Exact version output, instruction envelope, doctor JSON, and finding classification.

## Test V-5: Regress boot, readiness, and owned cleanup

- **Type:** Runtime / end-to-end
- **Task:** T-5
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Ensure ports 5173 and 3000 are free and no valid harness-owned process remains.

### Steps

1. Run `harness stop --json` for a known state.
2. Run `harness boot --json`; require `just run`, both probes, and composed full checks to pass.
3. Run `harness readiness --json` and inspect named bounded evidence.
4. Run `harness stop --json`; confirm ownership removal and released ports.

### Expected Result

Skill pruning has no effect on known-state boot, readiness, inspectable evidence, or owned cleanup.

### Expected Evidence

- Boot/readiness/stop envelopes, evidence paths, HTTP probe fields, and closed-port proof.

## Test V-6: Regress focused and full delegation

- **Type:** Contract / regression
- **Task:** T-2, T-5
- **Acceptance Criteria:** AC-4, AC-6
- **Priority:** Critical

### Setup

Use the established disposable `just` spy, then restore the real PATH.

### Steps

1. Prove focused target/no-target calls invoke exactly `just verify-focused [target]` once.
2. Prove bare/full calls invoke exactly `just verify` once.
3. Confirm controlled child failure propagates.
4. Run actual focused and full harness checks and verify the allowlist guard is composed by root recipes.

### Expected Result

Harness wrappers remain delegation-only and authoritative root validation now also enforces the exact allowlist.

### Expected Evidence

- Spy argv/count records, failure envelope, actual focused/full envelopes, and static wrapper review.

## Test V-7: Run authoritative root regression checks

- **Type:** Regression / quality gate
- **Task:** T-5
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Complete T-1 through T-4 and stop runtime processes without cleaning the worktree.

### Steps

1. Run `just verify-focused` during correction.
2. Run formatting and diff-integrity checks over changed architecture, plans, docs, and validation configuration.
3. Run final `just verify`.
4. Confirm no application source, package manifest, or package lock changed.

### Expected Result

All existing application and harness regressions pass, the exact allowlist guard passes, and the corrective diff remains configuration/documentation-only.

### Expected Evidence

- Focused and full root transcripts, component results, diff check, and scoped changed-file list.

## Test V-8: Validate corrected issue evidence and Verify handoff

- **Type:** Evidence / delivery governance
- **Task:** T-4
- **Acceptance Criteria:** AC-2, AC-5
- **Priority:** High

### Setup

Use the corrective implementation addendum and, during Verify, inspect `verify/summary.md` and PR #10 independently.

### Steps

1. Confirm implementation evidence maps the correction to AC-2/AC-5 and clearly supersedes final nine-skill claims.
2. Confirm the Verify handoff names exact inventory, validation, preservation, summary, and PR metadata checks.
3. During Verify, remove or explicitly supersede stale final-state claims in `verify/summary.md` and PR #10 while retaining truthful historical context.
4. Search current issue-owned and GitHub delivery surfaces for unqualified nine-skill acceptance claims.

### Expected Result

Repository and GitHub delivery evidence describe exactly three final engineering-harness skills and preserve RPIV stage ownership.

### Expected Evidence

- Corrective addendum, Verify decision diff, PR metadata output, and zero-result unqualified-claim search.

## Test V-9: Run final acceptance and preservation sequence

- **Type:** Final acceptance / preservation
- **Task:** T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Record `git status` plus hashes for modified `latest.json`, modified `latest.md`, and every file under untracked `.harness/reports/harnessability/002-sparkta/`. Start with no owned runtime.

### Steps

1. Run V-1 through V-8 in order.
2. Re-run the exact inventory, stale-reference, CLI, focused/full checks, boot/readiness/stop, and final root validation.
3. Compare final report hashes and status with the baseline.
4. Confirm no broad installer was invoked, no excluded directory returned, ownership is absent, and ports are closed.
5. Record evidence under AC-1 through AC-6 in the implementation handoff.

### Expected Result

All criteria have current proof for the corrected repository, and preservation-sensitive user report changes are byte-identical to their starting state.

### Expected Evidence

- Ordered command transcript and AC coverage matrix.
- Final exact three-name inventory and stale-reference audit.
- Before/after report hashes/status, cleanup proof, and final `just verify` result.
