# Test Plan: Install and configure Soft Factory Runner

## Test V-1: Preservation, ambient identity, and official integrity

- **Type:** Preservation and environment validation
- **Task:** T-1, T-4, T-6
- **Acceptance Criteria:** AC-1, AC-3, AC-6
- **Priority:** Critical

### Setup
Capture branch/HEAD, PR #11 head, Issue #3 body, Git status, official hashes, assessment hashes, harness observation, and Runner resources before implementation.

### Steps
1. Run root identity and help without an issue.
2. Confirm package name/version/bin and no repository installation dependency.
3. Validate manifest schema/destinations/digests and package-byte equality.
4. Record protected GitHub/repository facts.
5. Repeat and compare after implementation.

### Expected Result
Ambient identity and official integrity pass; protected evidence and unrelated state remain unchanged.

### Expected Evidence
- Identity/help transcript and dependency search.
- Official digest table.
- Before/after protected-state comparison.

## Test V-2: Executable APS success-path wiring

- **Type:** Static control-flow and APS lint validation
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup
Use updated agents and APS v1.2.2 grammar, lint, VS Code adapter, and subagent input contracts.

### Steps
1. Parse frontmatter/sections and reject malformed order, tags, IDs, backticks, inputs, and targets.
2. Build process and invocation edges.
3. Assert coordinator order: branch, pre-flight, Research progress/dispatch, Plan progress/dispatch, pre-coding, Implement progress/dispatch, Verify progress/dispatch, result validation, post-flight, terminal success, return.
4. Assert verifier order: acceptance, injected final validation, PR create/update, summary/retro push, independent final-head observation, candidate creation, injected publication, typed return.
5. Assert one-to-one binding mapping and no direct Runner state/result-destination access.

### Expected Result
All required behavior is reachable executable control flow; prose alone cannot pass.

### Expected Evidence
- Process/input registry.
- Edge/order and binding-map reports.
- APS lint diagnostics.

## Test V-3: Coordinator and verifier failure paths

- **Type:** Negative control-flow validation
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup
Use canonical agents and temporary mutated copies.

### Steps
1. Enumerate all non-success returns for setup, stages, handoffs, hooks, validation, PR/head, candidate, publication, and coordinator validation.
2. Prove each bound coordinator failure first reaches terminal-failed publication.
3. Prove publication failure remains secondary to the original error.
4. Prove verifier failure cannot reach success.
5. Mutate fixtures to bypass failure publication, move terminal success, remove validation, or permit head mismatch; require rejection.
6. Prove no-binding compatibility without helper calls.

### Expected Result
Bound failures publish terminal failure and unsafe/misordered paths are rejected without masking original errors.

### Expected Evidence
- Error-site coverage matrix.
- Suppressed-error and mutation results.
- No-binding trace.

## Test V-4: Executable harness lifecycle seams

- **Type:** Structural integration validation
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup
Use `.harness/engineering-harness.md` and parsed coordinator/implementer graphs.

### Steps
1. Assert pre-flight after branch confirmation and before Research.
2. Assert pre-coding after Plan coverage and before Implement.
3. Assert coding while editing and post-coding after full validation before notes/commit.
4. Assert post-flight after Verify/result validation and before terminal success.
5. Remove/reorder each hook in fixtures and require failure.
6. Confirm host skill invocation, not shell/narrative-only text.

### Expected Result
All five hooks are reachable at exact seams and every omission/reordering is detected.

### Expected Evidence
- Hook seam matrix and five negative fixture results.

## Test V-5: Operator consistency and locked-asset separation

- **Type:** Operator contract and integrity validation
- **Task:** T-1, T-4, T-5, T-6
- **Acceptance Criteria:** AC-3, AC-5, AC-6
- **Priority:** Critical

### Setup
Use V-1 hashes and the Sparkta custom Operator/adapter.

### Steps
1. Revalidate official hashes and package bytes.
2. Confirm adapters are absent from the official manifest and installation is idempotent.
3. Parse help/instructions/doctor/run/list/status/reconcile/resume/stop/clean/attach/logs mappings.
4. Require root `just runner` commands and explicit issue placeholders where applicable.
5. Reject raw operator commands outside root recipes/helper implementation/immutable upstream assets.
6. Assert adapter contains no Runner resource management.

### Expected Result
Official assets remain untouched and Sparkta policy provides one root-recipe command surface.

### Expected Evidence
- Digest equality and manifest exclusion.
- Verb matrix and prohibited-reference report.

## Test V-6: Synthetic launch-binding and helper canary

- **Type:** Deterministic integration canary
- **Task:** T-3, T-4, T-5
- **Acceptance Criteria:** AC-2, AC-4, AC-6
- **Priority:** Critical

### Setup
Use temporary/in-memory ports, synthetic identities never sent to GitHub, installed pure helpers, and a stub adapter executor. Capture repository state first.

### Steps
1. Construct strict `IntegrationLaunchV1`; prove exact helper-field selection and shell-free argv.
2. Publish valid Research-through-terminal progress.
3. Reject repeated, skipped, regressed, stale, mismatched, and late progress while preserving bytes.
4. Build strict synthetic `AgentResultV1` with all AC evidence and snapshot validation.
5. Publish/validate, repeat byte-equivalently, then reject conflicting replacement.
6. Reject malformed binding/helper, wrong head/PR, missing AC evidence, and final-validation mismatch.
7. Assert no `gh`, `soft-factory run`, network, repository Runner state, or real issue use; compare state.

### Expected Result
Positive/negative helper semantics pass in isolation without a real run or GitHub mutation.

### Expected Evidence
- Canary case table and stub argv capture.
- Atomic/no-clobber preservation evidence.
- Before/after repository-state equality.

## Test V-7: Authoritative acceptance sequence

- **Type:** End-to-end repository validation
- **Task:** T-1, T-2, T-3, T-4, T-5, T-6
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup
V-1 through V-6 pass. Capture final protected hashes, Git status, GitHub facts, and Runner resources. Supply no issue to mutating commands.

### Steps
1. Run root identity, help, instructions, structural contract/canary, idempotent installation, and Doctor.
2. Require schema 1, helper/result contract, snapshotted `just verify`, and all 24 Doctor checks ready.
3. Run `just verify-focused` during implementation.
4. Run `just verify` before handoff.
5. Compare protected facts and resource inventory with V-1.
6. Confirm the diff contains only planned architecture, agent, adapter, verification, documentation, and evidence changes.

### Expected Result
All root gates pass, executable wiring/canary proof is enforced, official assets remain intact, and no Runner run or unrelated GitHub mutation occurs.

### Expected Evidence
- Ordered root transcript, Doctor summary, and focused/full results.
- Final preservation/scoped-diff report.
- AC-1 through AC-6 evidence index for Verify.
