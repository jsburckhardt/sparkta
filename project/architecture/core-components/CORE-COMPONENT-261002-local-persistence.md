# CORE-COMPONENT-261002-local-persistence: Local Persistence

## Status

Adopted

## Purpose

Keep durable Sparkta project data local and distinguish it from disposable runtime sessions, processes, and ports.

## Scope

Future persistence adapters, generated source, mock data, configuration, migrations, and recovery behavior. This document defines boundaries only; bootstrap does not implement a persistence engine.

## Definition

### Rules
- Durable source and user-authored project data must survive runtime process and session disposal.
- Runtime process identifiers, allocated ports, and transient session state must be treated as disposable.
- Persisted formats must be explicit, versionable, and recoverable without relying on an active process.
- Persistence failures must be surfaced through the explicit-error contract and must not return success-shaped fallbacks.
- Secrets and host credentials must not be stored in project persistence.

### Interfaces
- Future persistence adapters expose typed read, write, version, and recovery boundaries defined by reviewed issues.

### Expectations
- Restarting disposable runtime resources does not remove durable source.
- Corrupt, incompatible, or unavailable local data produces an actionable error.

## Rationale

Sparkta's local-first model needs durable project artifacts without coupling their lifetime to ephemeral runtime resources.

## Usage Examples

```text
Durable: generated React source and approved mock data
Disposable: child process IDs, development-server ports, and runtime sessions
```

## Integration Guidelines

- Select concrete storage formats and migration behavior through RPIV planning before implementation.
- Keep durable and runtime paths visibly separate.

## Exceptions

- Explicit caches may be disposable when their loss cannot remove user-authored data.

## Enforcement

- [ ] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-261002-node-react-vite-toolchain](../ADR/ADR-261002-node-react-vite-toolchain.md)
