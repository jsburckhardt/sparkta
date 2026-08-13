# CORE-COMPONENT-260813-soft-factory-runner-operation: Soft Factory Runner Operating Contract

## Status

Adopted

## Purpose

Provide one safe, repository-wide operating contract for isolated and recoverable RPIV delivery through the user-installed Soft Factory Runner without duplicating Runner resource management or repository validation commands.

## Scope

This contract applies to the configured ambient `soft-factory-runner` CLI, repository configuration and ignore boundaries, official Operator/Assessor/skill assets, canonical RPIV integration metadata and injected handoffs, root command delegation, readiness diagnostics, lifecycle documentation, and preservation of Runner-owned resources. It does not install the CLI, add it to Sparkta npm or devcontainer state, select an issue, start a run, or change the Sparkta product-state boundary.

## Definition

### Rules
- The configured development environment MUST provide the ambient `soft-factory-runner` package and `soft-factory` CLI; repository npm, lockfile, setup, and devcontainer configuration MUST NOT install or reproduce it.
- `.soft-factory/config.yml` MUST declare Runner protocol 1, repository-relative distinct non-overlapping worktree root `.trees`, state root `.soft-factory`, explicit final validation `just verify`, and a strict positive concurrency limit of 1.
- Git ignore rules MUST cover every descendant of `.trees` and runtime state beneath `.soft-factory` while keeping `.soft-factory/config.yml` committable.
- The canonical `.github/agents/rpiv.agent.md` MUST declare `runner_protocol: 1` and `result_contract: agent-result-v1` and MUST consume only Runner-injected progress, result, and validation helpers when launched by Runner.
- RPIV MUST publish ordered phase starts and terminal outcomes through the injected mutable progress helper, MUST attempt terminal failed progress before any nonzero coordinator return, and MUST preserve the original failure when failure publication also fails.
- Verify MUST publish the immutable result through the injected no-clobber helper only after acceptance, snapshotted `just verify`, pushed verification evidence, pull-request creation or update, and independent final-head confirmation; the coordinator MUST invoke the injected validator before successful exit.
- The official Operator, Assessor, Soft Factory skill, and strict `.agents/manifest.json` MUST be committed at their catalog destinations with package-coupled integrity metadata; installation and upgrades MUST use Runner rather than manual replacement.
- Runner MUST be the sole control plane for its worktrees, locks, leases, snapshots, events, state, tmux/process resources, recovery, signaling, logs, and cleanup.
- Every run and issue-specific lifecycle command MUST receive an explicitly selected positive issue number; agents MUST NOT queue, rank, infer, or select an issue.
- Raw `soft-factory` command bodies MUST remain in root `justfile` recipes, and `just verify-focused` plus `just verify` MUST remain the authoritative implementation and final validation gates.
- Repository validation MUST exercise help, instructions, idempotent recommended-asset installation, complete Doctor readiness, and root verification without starting a run or mutating an unrelated issue.

### Interfaces
- Root `justfile` recipes delegate CLI discovery, instructions, official-asset convergence, Doctor, explicit run, list, status, reconcile, resume, stop, clean, attach, and logs operations.
- `soft-factory instructions --json` is the authoritative integration-contract discovery surface, and `soft-factory doctor --json` is the authoritative complete repository-readiness decision.
- `.soft-factory/config.yml`, `.gitignore`, `.github/agents/rpiv.agent.md`, `.agents/manifest.json`, and the three official assets are the committed compatibility surfaces.
- Runner injects exact helper invocations and owned artifact paths for mutable `.soft-factory/rpiv-status.json`, immutable `.soft-factory/agent-result.json`, and final validation.

### Expectations
- A cold operator can discover every lifecycle operation and can act only on an explicitly supplied issue.
- Doctor reports all ordered checks and actionable remediation for every failed prerequisite, and repository readiness reaches `ready: true` in the configured environment.
- Repeated official-asset installation is a no-op after convergence and preserves unrelated `.agents/` content.
- Runner state never overlaps `.harness/temp/boot/`, `.sparkta/apps/`, or `.sparkta/runtime/`.
- Existing harnessability assessments and Runner-installed asset bytes remain unchanged unless a separately planned, integrity-proved upgrade requires replacement.

## Rationale

The Runner is already installed by the configured environment and already owns safe operational mechanics. A thin committed configuration, canonical RPIV handshake, official assets, root command delegation, and explicit operating guidance make that capability usable without introducing a competing installer, scheduler, state manager, cleanup path, or validation authority. Fixed repository-relative roots keep Runner operations separate from harness evidence and Sparkta product state, while the single-run limit is the smallest positive capacity appropriate for initial adoption.

## Usage Examples

```text
just runner --help
just runner instructions --json
just runner doctor --json
just runner run --issue 3 --json
just runner status 3 --json
just verify-focused
just verify
```

## Integration Guidelines

- Read `just runner instructions --json` before changing RPIV integration behavior and preserve injected identity, ordering, atomicity, no-clobber, and final-head rules.
- Run `just runner doctor --json`, retain every failed check and remediation, and correct repository-owned failures before an explicit run.
- Use only documented Runner recipes for issue lifecycle operations; do not manipulate owned files, worktrees, locks, processes, or cleanup resources directly.
- Keep documentation on recipe names and explicit issue placeholders rather than duplicating raw command bodies.
- Preserve user-installed official assets and harnessability assessment artifacts while bringing their repository contracts into convergence.

## Exceptions

- An unavailable or incompatible ambient CLI is an environment-owned prerequisite and MUST be reported as a blocker rather than repaired through repository dependencies.
- No exception permits issue inference, direct Runner-state mutation, force cleanup, replacement of an immutable result, or bypass of `just verify`.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
