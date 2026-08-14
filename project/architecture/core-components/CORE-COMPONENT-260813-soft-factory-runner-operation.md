# CORE-COMPONENT-260813-soft-factory-runner-operation: Soft Factory Runner Operating Contract

## Status

Adopted

## Purpose

Provide one safe operating contract for isolated and recoverable RPIV delivery through the environment-owned Soft Factory Runner without repository-specific orchestration, command wrappers, or duplicated Runner behavior.

## Scope

This contract applies to the ambient `soft-factory-runner` CLI, repository configuration and ignore boundaries, official Operator/Assessor/skill assets, canonical RPIV integration metadata and injected handoffs, direct operator commands, readiness diagnostics, and preservation of Runner-owned resources. It does not install or wrap the CLI, select an issue, start a run, or change Sparkta product state.

## Definition

### Rules

- The configured development environment MUST provide `soft-factory-runner` and the `soft-factory` CLI; repository npm, lockfile, setup, and devcontainer configuration MUST NOT install or reproduce it.
- `.soft-factory/config.yml` MUST declare protocol 1, worktree root `.trees`, state root `.soft-factory`, final validation `just verify`, and concurrency 1.
- `just verify` is the Sparkta validation command Runner/RPIV invokes; it is not a Soft Factory command wrapper.
- Git ignore rules MUST cover `.trees` descendants and `.soft-factory` runtime state while keeping `.soft-factory/config.yml` committable.
- The canonical `.github/agents/rpiv.agent.md` MUST retain `runner_protocol: 1` and `result_contract: agent-result-v1` and consume only Runner-injected helpers when launched by Runner.
- The official Operator, Assessor, Soft Factory skill, and `.agents/manifest.json` MUST remain package-owned compatibility assets; installation and upgrades MUST use Runner directly rather than manual replacement.
- Runner MUST remain the sole control plane for its RPIV launch binding, worktrees, locks, leases, snapshots, progress, result publication, processes, recovery, logs, and cleanup.
- Operators MUST invoke `soft-factory` directly. The repository MUST NOT provide `operational Just wrapper`, operational Runner recipes, custom Operator, helper-adapter, or synthetic Runner orchestration surfaces.
- Every issue-specific command MUST receive one caller-supplied positive issue number; agents MUST NOT queue, rank, infer, or select an issue.
- The root `justfile` MUST remain authoritative for Sparkta setup, run, focused/full verification, and MAY include a static compatibility check that does not execute the Runner CLI or duplicate Runner behavior.
- `soft-factory instructions --json` and `soft-factory doctor --json` MUST be run directly as operator preflight; they MUST NOT be hidden inside project validation.

### Interfaces

- Direct discovery and preflight: `soft-factory --help`, `soft-factory instructions --json`, `soft-factory install --recommended`, and `soft-factory doctor --json`.
- Direct lifecycle: `soft-factory run --issue <ISSUE_NUMBER> --json`, `list`, `status`, `reconcile`, `resume`, `stop`, `clean`, `attach`, and `logs` with explicit issue input where required.
- Sparkta validation: `just verify-focused` and `just verify`.
- Static compatibility: `just verify-soft-factory-contract`, which reads committed files only and does not invoke `soft-factory`.
- Committed compatibility surfaces: `.soft-factory/config.yml`, `.gitignore`, `.github/agents/rpiv.agent.md`, `.agents/manifest.json`, and the three official assets.

### Expectations

- A cold operator discovers and operates Runner through its official direct CLI.
- Doctor reports all ordered readiness checks and actionable remediation for failed prerequisites.
- Repeated official-asset installation is a no-op and preserves unrelated `.agents/` content.
- Runner state never overlaps `.harness/temp/boot/`, `.sparkta/apps/`, or `.sparkta/runtime/`.
- Repository validation proves committed compatibility without simulating, adapting, or executing Runner behavior.

## Rationale

Runner already owns complete issue delivery and operational safety. Direct CLI operation keeps that ownership legible and prevents Sparkta from creating a second orchestration layer. The root `justfile` remains a project command interface: Runner may invoke `just verify`, while operators invoke Runner itself directly. A static contract check can protect committed configuration and asset integrity without becoming an operational wrapper.

## Usage Examples

```text
soft-factory --help
soft-factory instructions --json
soft-factory doctor --json
soft-factory run --issue 3 --json
soft-factory status 3 --json
just verify-focused
just verify
```

## Integration Guidelines

- Read `soft-factory instructions --json` before changing RPIV compatibility behavior.
- Run `soft-factory doctor --json` directly and retain every failed check and remediation.
- Use the official direct CLI for every lifecycle operation; do not manipulate Runner-owned resources directly.
- Keep `.soft-factory/config.yml` final validation at `just verify` unless a separately planned project-validation decision changes it.
- Preserve official assets and harnessability assessment artifacts byte-for-byte unless a separately planned package upgrade changes them.

## Exceptions

- An unavailable or incompatible ambient CLI is an environment-owned blocker and MUST NOT be repaired through repository dependencies or wrappers.
- No exception permits issue inference, direct Runner-state mutation, force cleanup, replacement of an immutable result, or bypass of `just verify`.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
