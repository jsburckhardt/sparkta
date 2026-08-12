# CORE-COMPONENT-260812-state-lifecycle: Durable and Runtime State Lifecycle

## Status

Adopted

## Purpose

Prevent application continuity from depending on disposable controller processes, ports, files, or agent sessions.

## Scope

All future code that creates, discovers, reads, writes, caches, starts, stops, or recovers Sparkta applications and runtime state beneath `.sparkta/`.

## Definition

### Rules
- `.sparkta/apps/<app-id>/` MUST contain the authoritative durable state for an application.
- `.sparkta/runtime/` MUST contain only reconstructable state and MUST be safe to delete while Sparkta is stopped.
- Application identity MUST NOT depend on a PID, port, process handle, in-memory object, or agent session.
- Durable metadata MUST NOT persist volatile runtime values as authoritative fields.
- Startup and recovery MUST discover applications from durable directories and reconstruct runtime status.
- Runtime allocations MUST be released or treated as stale after process loss.
- Code that deletes runtime state MUST be unable to traverse into durable application directories.

### Interfaces
- Durable repositories operate only beneath `.sparkta/apps/` and expose application identity and metadata.
- Runtime registries operate only beneath `.sparkta/runtime/` and expose reconstructable coordination data.
- Lifecycle services compose the two interfaces without sharing writable path roots.

### Expectations
- Deleting `.sparkta/runtime/` while Sparkta is stopped does not remove or corrupt an application.
- Restarted environments initially treat discovered applications as stopped until a new runtime is allocated.
- Tests use separate temporary roots for durable and runtime state and exercise runtime-loss recovery.

## Rationale

Filesystem-owned application state is the product continuity mechanism. Explicit path and identity contracts prevent convenient runtime caches from becoming accidental sources of truth.

## Usage Examples

```
.sparkta/apps/app-1/sparkta.json     # durable
.sparkta/apps/app-1/src/             # durable
.sparkta/runtime/app-1.json          # disposable
```

## Integration Guidelines

How should other parts of the system integrate with this component?

- Inject durable and runtime roots independently into persistence and lifecycle code.
- Derive current process and port status from live checks rather than durable metadata.
- Test recovery by removing runtime state and rebuilding it from application files.

## Exceptions

Under what circumstances is it acceptable to deviate from this component rules?

- None.

## Enforcement

How is compliance with this component verified?

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
