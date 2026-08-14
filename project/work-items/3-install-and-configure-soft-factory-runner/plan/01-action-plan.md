# Action Plan: Install and configure Soft Factory Runner

## Feature
- **ID:** 3
- **Research Brief:** `project/work-items/3-install-and-configure-soft-factory-runner/research/00-research.md`
- **Return Reason:** Focused integration review of PR #11 found prose-only Runner and harness obligations, conflicting Operator command policy, phrase-only verification, and no safe launch-binding canary.

## ADRs Created
- None. `ADR-260812-foundation-stack` and `ADR-260812-filesystem-state-boundary` remain applicable; no technology, state, API, or deployment decision changes.

## Core-Components Created or Updated
- **Updated (creation date preserved):** `CORE-COMPONENT-260813-soft-factory-runner-operation` now requires executable APS helper and harness wiring, final-head-bound result publication, repository-owned adaptation outside official assets, control-flow verification, and a synthetic no-network canary.
- **Referenced unchanged:** `CORE-COMPONENT-260813-engineering-harness-operation` remains authoritative for executable `/eng-harness-flow` seams and root validation.
- **Registry:** `project/architecture/ADR/DECISION-LOG.md` retains decisions 49-53 and adds decisions 54-57.

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
| AC-1 | T-4, T-6 | V-1, V-7 | Ambient identity, help, root recipe discovery, and no repository installation dependency |
| AC-2 | T-2, T-3, T-5, T-6 | V-2, V-3, V-4, V-6, V-7 | Config/root assertions plus reachable progress, result, validator, final-validation, and harness-seam edges |
| AC-3 | T-1, T-4, T-5, T-6 | V-1, V-5, V-7 | Official digest equality, no official-byte diff, adapter separation, and idempotent asset convergence |
| AC-4 | T-5, T-6 | V-6, V-7 | Complete ordered Doctor result retained alongside stronger structural and canary gates |
| AC-5 | T-4, T-6 | V-5, V-7 | Root-recipe-only lifecycle matrix, explicit issue placeholders, and repository adapter discovery |
| AC-6 | T-2, T-3, T-5, T-6 | V-2, V-3, V-4, V-6, V-7 | Structural checks and synthetic canary with no run, GitHub mutation, or protected evidence change |

**Coverage proof:** Every criterion retains its original text and issue order and maps to dependency-ordered tasks, executable validation, and concrete evidence. The Plan-return defects are mandatory delivery quality under AC-2 through AC-6.

## Executable APS Design

### Coordinator control flow
`.github/agents/rpiv.agent.md` will parse the optional Runner integration binding appended to `USER_INPUT` into typed runtime state. Dedicated APS processes will validate it and invoke repository-owned root recipes that consume its exact `publishProgressCommand` and `validateResultCommand`; no process will read Runner state files.

The reachable success path must be ordered as follows:

1. Initialize and confirm the issue branch.
2. Execute the `pre-flight` harness-hook process.
3. Publish `research/running`, then dispatch Research.
4. Publish `plan/running`, then dispatch Plan.
5. Validate Plan coverage, then execute `pre-coding`.
6. Publish `implement/running`, then dispatch Implement; Implement executes `coding` while editing and `post-coding` after full validation before notes/commit handoff.
7. Publish `verify/running`, then dispatch Verify with one-to-one launch-binding input mapping.
8. After Verify returns publication evidence, execute the injected result validator.
9. Execute `post-flight`.
10. Publish `terminal/succeeded`, then return success.

Every error return from initialization, handoff validation, a stage, a hook, result publication, or validation first routes through one failure process that attempts `terminal/failed`. A publication failure is redacted secondary evidence while the original failure remains primary. Without a binding, helper processes are explicit no-ops and normal RPIV behavior remains unchanged.

### Verifier control flow
`.github/agents/rpiv-verifier.agent.md` will receive the optional binding through its `<input>` contract. After acceptance and the snapshotted final validation pass, it will create or update PR #11, commit and push verification summary/retro evidence, independently query the open PR and local final head, and assert issue, branch, base, PR, and head equality. It will create strict `AgentResultV1` candidate bytes and invoke the injected `publishResultCommand` through the repository adapter. Publication failure is a failed Verify result; the immutable destination is never written directly.

### Repository-owned adaptation
The official assets and manifest remain byte-for-byte package-owned. Sparkta will add a distinctly named custom Operator under `.github/agents/` plus a helper script/root-recipe bridge outside every manifest destination. The Operator exposes only `just runner ...` lifecycle commands. The bridge validates `IntegrationLaunchV1` and fixed helper grammar, uses argv without a shell, and delegates to the exact injected helper command without implementing Runner state behavior.

### Deterministic proof strategy
`scripts/verify-soft-factory.mjs` will parse APS sections and process bodies into a call/control-flow graph. It will assert required definitions, reachable edges, success ordering, all error-to-failure-publication edges, verifier candidate/publication/final-head ordering, binding input mapping, and harness seam placement.

A separate synthetic canary will use temporary or in-memory fixtures and installed package pure helpers to prove valid progress, rejected invalid transitions, strict result binding, no-clobber publication, and result validation. A stub executor will prove adapter selection of injected command fields and argv boundaries. It makes no `gh` call, invokes no `soft-factory run`, creates no repository Runner state, and consumes no real issue.

## Implementation Tasks
1. **T-1 - Preserve delivery and strengthen architecture contracts (AC-3, AC-6):** retain PR #11 files, harness observation, official bytes/digests, and the work-item path; update only the Runner component and Decision Log contracts.
2. **T-2 - Wire executable coordinator progress, failure, validation, and harness seams (AC-2, AC-6):** revise coordinator processes/runtime/input for reachable helpers and all harness hooks with no-binding compatibility and original-error preservation.
3. **T-3 - Wire executable verifier final-head result publication (AC-2, AC-6):** map the binding, preserve/update the PR, push evidence, confirm final head, create strict result candidate, and invoke the injected publisher before coordinator validation.
4. **T-4 - Add Sparkta-owned Operator and helper adapters (AC-1, AC-3, AC-5):** leave official assets untouched and route operator/helper behavior through repository-owned root recipes.
5. **T-5 - Replace phrase checks and add a non-destructive canary (AC-2, AC-3, AC-4, AC-6):** verify control flow and synthetic helper semantics without a run, GitHub mutation, or repository state.
6. **T-6 - Align documentation, evidence, and authoritative gates (AC-1 through AC-6):** update affected documentation/evidence and run focused/full root validation while preserving current PR and protected artifacts.
