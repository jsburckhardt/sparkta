# CORE-COMPONENT-260813-soft-factory-runner-operation: Soft Factory Runner Operating Contract

## Status

Adopted

## Purpose

Provide one safe repository-owned dispatch surface for delivering one explicitly supplied GitHub issue through the environment-owned Soft Factory Runner without duplicating Runner orchestration, state, recovery, or cleanup.

## Scope

This contract applies to the ambient `soft-factory-runner` CLI, protocol-1 repository configuration, canonical RPIV metadata, `.github/agents/runner-dispatcher.agent.md`, direct Runner preflight and launch commands, and Runner-owned resources. It excludes package-installed Operator, Assessor, skill, and manifest assets and adds no project command wrapper.

## Definition

### Rules

- The configured environment MUST provide `soft-factory-runner` and `soft-factory`; repository npm, lockfile, setup, and devcontainer configuration MUST NOT install it.
- `.soft-factory/config.yml` MUST declare protocol 1, `.trees`, `.soft-factory`, final validation `just verify`, and concurrency 1.
- Git ignore rules MUST cover Runner roots while keeping `.soft-factory/config.yml` committable.
- `.github/agents/rpiv.agent.md` MUST retain `runner_protocol: 1` and `result_contract: agent-result-v1`.
- `.github/agents/runner-dispatcher.agent.md` MUST be a repository-owned APS framework revision 1.2.2 VS Code agent conforming to APS v1.0, the VS Code adapter, and the subagent architecture guide.
- The dispatcher MUST be user-invocable and model-invocable as a leaf worker and expose only least-privilege terminal tools.
- The dispatcher MUST accept exactly one explicit positive issue number and refuse missing, ambiguous, zero, negative, or multiple issue input before invoking Runner.
- The dispatcher MUST invoke `soft-factory instructions --json`, then `soft-factory doctor --json`, then exactly `soft-factory run --issue <ISSUE_NUMBER> --json` only when Doctor reports ready.
- The dispatcher MUST return Doctor remediation without running an issue when Doctor is not ready.
- The dispatcher MUST report the structured Runner result, including refusal, without retrying or invoking lifecycle recovery commands.
- Runner MUST remain sole owner of RPIV launch, worktrees, locks, leases, snapshots, progress, results, processes, recovery, logs, and cleanup.
- The repository MUST NOT provide a `just` wrapper, shell wrapper, direct Runner-state access, competing RPIV orchestration, or second readiness implementation.
- `.agents/agents/`, `.agents/manifest.json`, and `.agents/skills/soft-factory/SKILL.md` MUST be absent.
- Repository guidance MUST NOT prescribe `soft-factory install --recommended`.
- `soft-factory doctor --json` MUST remain the sole Runner readiness authority.
- Sparkta validation MUST remain Runner-independent and MUST NOT invoke Runner or inspect Runner state.

### Interfaces

- Dispatcher: `.github/agents/runner-dispatcher.agent.md` with one explicit positive issue number in `USER_INPUT`.
- Direct preflight: `soft-factory instructions --json` and `soft-factory doctor --json`.
- Direct launch: `soft-factory run --issue <ISSUE_NUMBER> --json`.
- Sparkta validation: `just verify-focused` and `just verify`.
- Runner integration: `.soft-factory/config.yml` and `.github/agents/rpiv.agent.md`, interpreted by Runner Doctor.

### Expectations

- A human or orchestrator can invoke one leaf dispatcher with one explicit issue number.
- Invalid input causes no Runner command.
- Doctor failure causes no issue run and returns actionable remediation.
- Runner refusal is surfaced without repository-owned recovery behavior.
- Runner state never overlaps harness or Sparkta product state.
- The three engineering-harness skills remain under `.agents/skills/` without a Soft Factory skill sibling.

## Rationale

Runner already owns complete issue delivery and operational safety. A narrow APS VS Code agent provides a discoverable human and orchestrator entry point while preserving direct CLI authority. Removing package-installed Copilot assets keeps repository behavior explicit, reviewable, and least privilege.

## Usage Examples

```text
Invoke runner-dispatcher with: Deliver GitHub Issue #3.
soft-factory instructions --json
soft-factory doctor --json
soft-factory run --issue 3 --json
```

## Integration Guidelines

- Load APS v1.0, the VS Code adapter, and the subagent architecture guide before changing the dispatcher.
- Keep workflow logic in APS `<processes>` and static constraints in `<instructions>`.
- Keep input and result contracts explicit in `<input>` and `<formats>`.
- Keep the dispatcher as a leaf worker with no nested delegation.
- Preserve Runner JSON instead of creating a competing success or recovery model.
- Keep project validation independent of Runner availability and state.

## Exceptions

- An unavailable ambient CLI is an environment-owned blocker and MUST NOT be repaired through repository dependencies or wrappers.
- No exception permits issue inference from repository state, direct state mutation, dispatcher recovery, or Doctor bypass.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
