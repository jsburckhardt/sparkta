# Test Plan: Replace official assets with a Runner dispatcher

## Test V-1: Asset removal and retained integration

- **Type:** Structural repository validation
- **Task:** T-1, T-4
- **Acceptance Criteria:** AC-2, AC-5
- **Priority:** Critical

### Setup

Use the Issue #3 branch without a Runner lifecycle command.

### Steps

1. Assert the three unwanted asset paths are absent.
2. Require exactly the three engineering-harness `SKILL.md` files under `.agents/skills/`.
3. Inspect Runner config for protocol 1, safe roots, `just verify`, and concurrency 1.
4. Inspect ignore coverage while retaining config.
5. Inspect RPIV metadata for protocol 1 and `agent-result-v1`.

### Expected Result

Official assets are absent, harness skills remain, and Runner integration is valid.

### Expected Evidence

- Path assertions, skill inventory, and integration file evidence.

## Test V-2: APS v1.2.2 and VS Code adapter lint

- **Type:** Prompt schema and static lint
- **Task:** T-2, T-4
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Load APS v1.0 references, VS Code adapter, and subagent guide.

### Steps

1. Validate frontmatter order, identity, terminal-only tools, invocation modes, and target.
2. Reject agents, handoffs, MCP, search, read, edit, broad toolsets, and deprecated fields.
3. Require every APS section exactly once in normative order.
4. Apply APS hard-error checks for tags, tabs, comments, instructions, IDs, symbols, placeholders, key ordering, formats, runtime, triggers, and processes.
5. Require workflows only in `<processes>` and static rules only in `<instructions>`.
6. Complete the leaf-worker checklist.

### Expected Result

The agent passes APS v1.0 lint under framework revision 1.2.2 and the VS Code adapter.

### Expected Evidence

- APS lint matrix and leaf-worker checklist.

## Test V-3: Exact command and negative controls

- **Type:** Static control-flow and safe invocation validation
- **Task:** T-2, T-4
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Priority:** Critical

### Setup

Do not supply a valid positive issue and do not execute `soft-factory run`.

### Steps

1. Exercise or inspect missing, zero, negative, ambiguous, and multiple issue input; require refusal before terminal use.
2. Prove preflight is exactly instructions then Doctor.
3. Prove non-ready Doctor returns remediation with no run path.
4. Prove the sole launch is exactly `soft-factory run --issue <ISSUE_NUMBER> --json`, once, after positive input and `ready: true`.
5. Prove Runner refusal returns the structured result without retry, status, reconcile, resume, stop, clean, attach, logs, RPIV dispatch, or state access.
6. Reject shell chaining, `just`, wrappers, and state reads in the agent.

### Expected Result

Missing/nonpositive input, Doctor failure, and Runner refusal are closed controls; the sole positive path has exact commands.

### Expected Evidence

- Reachability matrix, command counts, zero prohibited matches, and no-run statement.

## Test V-4: Stale-reference and documentation proof

- **Type:** Documentation and architecture validation
- **Task:** T-3, T-4
- **Acceptance Criteria:** AC-3, AC-4, AC-5, AC-6
- **Priority:** High

### Setup

Inspect tracked files and `origin/main...HEAD`. Exclude Git history and historical Research; Verify owns GitHub updates.

### Steps

1. Require zero live references to removed paths, official assets, package convergence, or recommended install.
2. Inspect README, operations docs, guidance, indexes, harness governance, architecture, Decision Log, assessments, and current evidence.
3. Require one-hop dispatcher discovery, explicit input, preflight, Doctor refusal, exact run, structured results, and Runner ownership.
4. Parse changed assessment JSON and compare claims with Markdown.
5. Require current evidence to describe replacement and no-run validation.

### Expected Result

Current repository surfaces consistently describe the dispatcher with no stale asset design.

### Expected Evidence

- Zero-match scans, documentation matrix, JSON results, and diff inspection.

## Test V-5: Direct preflight and Runner-independent project gates

- **Type:** Non-mutating integration and regression
- **Task:** T-1, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-4, AC-6
- **Priority:** Critical

### Setup

Run only non-issue Runner discovery and project validation.

### Steps

1. Run direct `soft-factory instructions --json`.
2. Run direct `soft-factory doctor --json` and retain its verdict/remediation.
3. Run `harness checks focused --json` and confirm root delegation.
4. Run `harness checks full --json` and confirm root delegation.
5. Prove project recipes neither invoke Runner nor inspect its config, state, or assets.
6. Confirm no evidence contains execution of `soft-factory run --issue`.

### Expected Result

Preflight is non-mutating, Doctor is authoritative, and project validation passes without a real issue run.

### Expected Evidence

- Instructions/Doctor JSON, harness envelopes, isolation proof, and no-run audit.
