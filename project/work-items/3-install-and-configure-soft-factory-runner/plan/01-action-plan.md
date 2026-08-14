# Action Plan: Replace official assets with a Runner dispatcher

## Feature

- **ID:** 3
- **Research Brief:** `project/work-items/3-install-and-configure-soft-factory-runner/research/00-research.md`
- **Plan Return:** GitHub Issue #3 / PR #11 returned from Verify after the user replaced the package-installed asset design with one repository-owned APS v1.2.2 VS Code agent.
- **Acceptance Source:** This catalog is the user-approved replacement for Issue #3. Verify may update the GitHub issue body after independent acceptance.

## ADRs Created

- None. The change updates a reusable Runner operating contract.

## Core-Components Updated

- `CORE-COMPONENT-260813-soft-factory-runner-operation`: replace package-installed Copilot assets with a least-privilege `runner-dispatcher` leaf while preserving Doctor authority and Runner lifecycle ownership.
- `CORE-COMPONENT-260813-engineering-harness-operation`: no content change; it already authorizes only the three engineering-harness skills.

## Acceptance Criteria

- **AC-1:** The `soft-factory-runner` package is installed and its `soft-factory` CLI is available in the configured development environment.
- **AC-2:** Runner configuration declares protocol 1, safe roots, final validation `just verify`, and concurrency 1 while canonical RPIV metadata declares protocol 1 and `agent-result-v1`.
- **AC-3:** `.github/agents/runner-dispatcher.agent.md` is a repository-owned APS v1.2.2 VS Code leaf that is user- and model-invocable, uses only least-privilege terminal tools, accepts exactly one explicit positive issue number, runs direct Runner instructions and Doctor, runs exactly `soft-factory run --issue <ISSUE_NUMBER> --json` only when Doctor is ready, and reports the structured Runner result.
- **AC-4:** Runner Doctor remains the sole readiness authority; the dispatcher refuses invalid input or a non-ready Doctor with actionable remediation and does not orchestrate RPIV, recovery, or cleanup.
- **AC-5:** `.agents/agents/`, `.agents/manifest.json`, and `.agents/skills/soft-factory/SKILL.md` are absent; the three engineering-harness skills remain; live docs, governance, architecture, indexes, assessments, and current evidence contain no official-asset or recommended-install guidance.
- **AC-6:** APS lint, structural checks, exact-command negative controls, non-mutating Runner preflight, and Runner-independent project validation pass without executing a real issue run.

## Acceptance Coverage

| AC ID | Tasks         | Validation         | Expected evidence                                                                      |
| ----- | ------------- | ------------------ | -------------------------------------------------------------------------------------- |
| AC-1  | T-4           | V-5                | Direct instructions and Doctor identify the configured CLI without an issue run        |
| AC-2  | T-1, T-4      | V-1, V-5           | Config, ignore, RPIV metadata, Doctor, and effective `just verify` evidence            |
| AC-3  | T-2, T-4      | V-2, V-3           | APS lint, frontmatter, leaf/tool proof, ordered commands, and typed result formats     |
| AC-4  | T-2, T-4      | V-3, V-5           | Invalid-input and Doctor gates plus refusal passthrough without lifecycle intervention |
| AC-5  | T-1, T-3, T-4 | V-1, V-4           | Removed assets, retained three-skill inventory, and zero stale live references         |
| AC-6  | T-2, T-3, T-4 | V-2, V-3, V-4, V-5 | Structural reports, preflight envelopes, project gates, and no-run proof               |

## Architecture Handoff

- Create `.github/agents/runner-dispatcher.agent.md` with `name: runner-dispatcher`, `user-invocable: true`, `disable-model-invocation: false`, and `target: vscode`.
- Grant only `execute/runInTerminal` and `execute/getTerminalOutput`; omit search, read, edit, agent, MCP, handoff, and nested delegation.
- Use APS v1.0 order: `<instructions>`, `<constants>`, `<formats>`, `<runtime>`, `<triggers>`, `<processes>`, `<input>`.
- Apply APS framework revision 1.2.2, the VS Code adapter, and subagent guide; keep a portable depth-1 leaf.
- Define typed invalid-input, Doctor-remediation, and structured Runner-result formats.
- Route `user_message` to one workflow: validate one explicit positive issue, run direct instructions, run direct Doctor, refuse unless ready, then invoke exactly `soft-factory run --issue <ISSUE_NUMBER> --json` once.
- Return Runner refusal unchanged. Do not retry or call status, reconcile, resume, stop, clean, attach, logs, RPIV agents, or Runner state paths.
- Preserve Runner config, RPIV metadata, safe roots, ignore boundaries, and root `just verify` final validation.
- Remove the three unwanted asset surfaces and retain the three engineering-harness skills.

## Implementation Tasks

1. **T-1 - Remove official asset ownership:** Delete package-installed Operator, Assessor, skill, and manifest assets while preserving integration and engineering-harness skills.
2. **T-2 - Author the APS Runner dispatcher:** Create and APS-lint the terminal-only leaf with explicit input, ordered preflight, exact run, remediation, and structured results.
3. **T-3 - Reconcile repository references:** Remove obsolete asset/install claims from live docs, governance, architecture, indexes, assessments, current evidence, and PR-facing material.
4. **T-4 - Prove the replacement without a run:** Execute APS, structural, inventory, stale-reference, negative-control, direct preflight, focused, and full checks without a real issue run.
