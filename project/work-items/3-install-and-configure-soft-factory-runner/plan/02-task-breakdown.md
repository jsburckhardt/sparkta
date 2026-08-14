# Task Breakdown: Install and configure Soft Factory Runner

## Task T-1: Preserve delivery and strengthen architecture contracts

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** None
- **Acceptance Criteria:** AC-3, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`

### Description
Capture current HEAD, PR #11 head, Issue #3 body, official asset/manifest hashes, harness observation, assessment hashes, and Runner resources before implementation resumes. Preserve the exact work-item path and all current PR files. Update the existing Runner component in place and add Decision Log records for executable helpers, harness seams, adapter isolation, and synthetic proof. Create no ADR.

### Acceptance Criteria
- **AC-3:** Preserve valid official assets and keep repository adapters outside the locked manifest.
- **AC-6:** Preserve issue, PR, harness, assessment, and unrelated Runner state.

### Test Coverage
- V-1 captures and compares protected facts.
- V-7 checks the final scoped diff and preservation inventory.

### Expected Evidence
- Before/after protected-path hash/status table.
- PR #11 and Issue #3 identity record.
- Updated component and Decision Log entries 54-57.

## Task T-2: Wire executable coordinator progress, failure, validation, and harness seams

- **Status:** Complete
- **Complexity:** High
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-2, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-project-command-interface`

### Description
Move launch-binding discovery, helper invocation, harness invocation, and failure handling into executable `.github/agents/rpiv.agent.md` processes. Add typed runtime/input state and dedicated processes for binding validation, progress publication, result validation, coordinator harness hooks, and terminal failure. Insert reachable edges in the action-plan order and pass binding fields to workers one-for-one. Invoke exact injected commands through root adapter recipes, never inferred commands or Runner state. Every nonzero path attempts terminal failure while preserving the original error; no-binding behavior remains unchanged.

### Acceptance Criteria
- **AC-2:** Make protocol-1 progress and result validation executable.
- **AC-6:** Require an injected binding and preserve non-Runner operation without issue selection.

### Test Coverage
- V-2 proves success-path order and helper reachability.
- V-3 proves each error return reaches terminal failure first.
- V-4 proves all five executable harness seams.
- V-7 runs APS/static and root gates.

### Expected Evidence
- Parsed process inventory/call graph.
- Ordered bound and unbound traces.
- Failure-path and harness-seam matrices.

## Task T-3: Wire executable verifier final-head result publication

- **Status:** Complete
- **Complexity:** High
- **Dependencies:** T-2
- **Acceptance Criteria:** AC-2, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260505-commit-standards`

### Description
Extend verifier input/runtime with the optional binding and map it one-for-one from coordinator dispatch. Preserve/update the existing PR. After acceptance and the injected final validation pass, finalize and push summary/retro evidence, independently confirm local and open-PR final head/base/issue linkage, build exact strict `AgentResultV1`, write only its candidate, and invoke the injected publisher through the adapter. Return publication evidence for coordinator validation. Any mismatch, candidate, collision, or publication failure returns non-success.

### Acceptance Criteria
- **AC-2:** Bind completion to protocol, snapshot validation, and independently observed final head.
- **AC-6:** Use no-clobber publication only and avoid unrelated issue/PR mutation.

### Test Coverage
- V-2 proves publication ordering and reachability.
- V-3 covers validation, PR/head, candidate, collision, and publication failures.
- V-4 proves coordinator validation precedes terminal success.
- V-6 exercises strict result/no-clobber semantics synthetically.

### Expected Evidence
- Verifier graph and binding map.
- Strict result fixture and ordering report.
- Negative-path results preventing false success.

## Task T-4: Add Sparkta-owned Operator and helper adapters

- **Status:** Complete
- **Complexity:** High
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-3, AC-5
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260813-engineering-harness-operation`

### Description
Do not edit official assets or manifest. Add a distinctly named Sparkta Operator under `.github/agents/` mapping lifecycle operations to root `just runner ...` recipes with explicit positive issue inputs. Add a helper adapter script/root recipes outside official destinations. Validate the launch schema and fixed injected grammar, spawn argv without a shell, and delegate all stateful behavior to Runner.

### Acceptance Criteria
- **AC-1:** Retain ambient CLI access through root recipes.
- **AC-3:** Preserve official integrity and adapter separation.
- **AC-5:** Provide one consistent root-recipe operator surface.

### Test Coverage
- V-1 compares official bytes.
- V-5 validates the operator matrix and raw-command boundaries.
- V-6 proves helper-field selection and argv preservation with a stub executor.
- V-7 confirms idempotent official installation and manifest exclusion.

### Expected Evidence
- Unchanged official digest table.
- Sparkta Operator verb matrix.
- Adapter positive/negative canary results.

## Task T-5: Replace phrase checks and add a non-destructive canary

- **Status:** Complete
- **Complexity:** High
- **Dependencies:** T-2, T-3, T-4
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`, `CORE-COMPONENT-260806-project-command-interface`

### Description
Replace phrase checks with deterministic parsing of frontmatter, APS sections, process IDs, calls, branches, and return sites. Prove required coordinator/verifier/harness edges and order while retaining config, manifest, digest, inventory, documentation, and Doctor checks. Add temporary/in-memory canaries using installed pure helpers and a stub adapter executor; never invoke a live issue helper.

### Acceptance Criteria
- **AC-2:** Verify actual protocol wiring.
- **AC-3:** Enforce official integrity and adapter separation.
- **AC-4:** Retain complete Doctor readiness.
- **AC-6:** Prove helper behavior without run, network, repository state, or real issue.

### Test Coverage
- V-2 checks success edges/order.
- V-3 and V-4 use mutated fixtures to detect bypasses and missing seams.
- V-5 checks operator consistency.
- V-6 runs synthetic positive/negative cases.

### Expected Evidence
- Machine-readable graph and stable diagnostics.
- Mutation-test table.
- Synthetic helper/no-clobber transcript and unchanged repository state.

## Task T-6: Align documentation, evidence, and authoritative gates

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-3, T-4, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** `ADR-260812-foundation-stack`, `ADR-260812-filesystem-state-boundary`
- **Related Core-Components:** `CORE-COMPONENT-260813-soft-factory-runner-operation`, `CORE-COMPONENT-260813-engineering-harness-operation`, `CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-project-command-interface`, `CORE-COMPONENT-260806-agent-executable-acceptance-criteria`

### Description
Update affected setup, configuration, usage, migration, architecture, operation, and deployment documentation for executable integration, adapter boundaries, immutable assets, failure behavior, and canary limits. Refresh implementation evidence but leave final acceptance to Verify. Run focused and full root validation; Implement must not alter issue acceptance or publish live Runner result state for this correction.

### Acceptance Criteria
- **AC-1:** Re-prove ambient identity and root command availability.
- **AC-2:** Re-prove configuration and executable integration.
- **AC-3:** Re-prove official integrity and adapter separation.
- **AC-4:** Re-prove all Doctor checks.
- **AC-5:** Re-prove operator guidance.
- **AC-6:** Re-prove non-mutating validation and preservation.

### Test Coverage
- Execute V-1 through V-7.
- Run `just verify-focused` while building and `just verify` before handoff.

### Expected Evidence
- Updated AC-indexed implementation evidence.
- Passing structural, mutation, canary, focused, and full checks.
- Final protected-state comparison.
