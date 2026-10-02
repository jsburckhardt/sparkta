# CORE-COMPONENT-261002-process-ownership-cleanup: Process Ownership and Cleanup

## Status

Adopted

## Purpose

Make every Sparkta-managed runtime process and port attributable, disposable, and safely reclaimable.

## Scope

Future child processes, development servers, allocated ports, runtime sessions, cancellation, restart, and cleanup. Bootstrap defines ownership rules only and does not implement a session manager or scheduler.

## Definition

### Rules
- Every managed process must have one recorded owner and bounded lifecycle.
- Sparkta may stop only processes it can prove it owns; name-based or broad host process termination is prohibited.
- Cleanup must target exact process, session, and port identities and must preserve unrelated host resources.
- Cancellation waits for cooperative shutdown before bounded escalation defined by a reviewed issue.
- Cleanup failures must be reported under the explicit-error contract.

### Interfaces
- Future process adapters expose typed start, inspect, stop, and cleanup operations with stable ownership identities.

### Expectations
- Restart and cleanup are idempotent for the same recorded ownership state.
- A stale or conflicting owner blocks destructive action and requests reconciliation.

## Rationale

Sparkta runs inside shared developer environments where indiscriminate process cleanup could destroy unrelated work.

## Usage Examples

```text
Allowed: stop the exact child process recorded for one Sparkta runtime session
Rejected: kill every process named vite or remove an unverified tmux session
```

## Integration Guidelines

- Design concrete lifecycle state and escalation limits through RPIV before implementation.
- Keep runtime ownership separate from durable project persistence.

## Exceptions

- None; unproven ownership never authorizes destructive cleanup.

## Enforcement

- [ ] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-261002-node-react-vite-toolchain](../ADR/ADR-261002-node-react-vite-toolchain.md)
