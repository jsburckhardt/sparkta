# ADR-260812-filesystem-state-boundary: Filesystem State Boundary

## Status

Accepted

## Context

Sparkta applications must survive controller, process, port, and agent-session loss. The PRD identifies generated application files as the durable source of truth and runtime coordination data as disposable. A foundational boundary is needed before later lifecycle work introduces persistence or process management.

## Decision

Use the local filesystem as the persistence model. Reserve `.sparkta/apps/` for durable application directories, application metadata, generated source, and conversation history. Reserve `.sparkta/runtime/` for reconstructable process, port, status-cache, and agent-session data. Runtime state must be safe to delete and must never be required to discover or recover an application. Durable metadata must not treat a PID, allocated port, process handle, or agent session as application identity.

This issue records and documents the boundary only. Application discovery, persistence services, runtime managers, and generated applications remain future feature work.

## Alternatives

What other options were considered? Why were they rejected?

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Store all state in one metadata file per app | Simple initial reads and writes | Couples durable identity to stale volatile values | Runtime loss must not invalidate application continuity |
| Use a database for durable state | Querying and transactions | Adds infrastructure and duplicates source already held on disk | The PRD explicitly requires filesystem persistence and no external data store |
| Treat agent sessions as durable application identity | Easy conversational resumption | Applications fail when sessions expire or disappear | Application files, not agent sessions, are authoritative |
| Persist fixed app-to-port assignments | Predictable URLs | Ports can be unavailable after environment restart | Ports are runtime allocations and must be selected dynamically |

## Consequences

What becomes easier or harder as a result of this decision?

### Positive
- Applications can be rediscovered and restarted from their files.
- Runtime cleanup cannot delete authoritative application state when boundaries are followed.
- Future process and agent adapters can change without migrating application identity.

### Negative
- Future startup logic must reconstruct runtime state and handle stale runtime files.
- Code review and tests must guard writes crossing the durable and disposable boundaries.

### Neutral
- Backup and source-control policy for user-generated app directories remains a later operational choice.
- This record does not define metadata schemas or lifecycle APIs.

## Related Issues

- [#1](https://github.com/jsburckhardt/sparkta/issues/1)

## References

- [Sparkta PRD](../../../PRD.md)
- [Issue 1 research brief](../../work-items/1-bootstrap-sparkta-and-coordinate-prototype-0/research/00-research.md)
