# CORE-COMPONENT-260812-observability: Structured Observability

## Status

Adopted

## Purpose

Provide useful local operational evidence without leaking prompts, generated source, secrets, or personal data.

## Scope

Fastify request logging, server and process lifecycle events, future agent and generated-app lifecycle events, correlation context, and diagnostic output. Product progress events and user-facing status are separate feature interfaces.

## Definition

### Rules
- Node.js operational logs MUST be emitted as structured Pino records through the configured application logger.
- Operational events MUST include an event name, outcome, and relevant correlation identifiers when available.
- HTTP request records MUST use request correlation IDs and MUST avoid logging bodies by default.
- Logs MUST redact authorization data, cookies, tokens, environment secrets, prompts, conversation content, and generated source.
- Application source MUST NOT use ad hoc `console` logging outside narrowly documented bootstrap fallback paths.
- Expected failures MUST use an appropriate non-error level unless they indicate an operational failure.
- Tests MUST assert event shape and redaction for newly introduced sensitive logging paths.

### Interfaces
- Fastify owns the base Pino logger and request correlation context.
- Child loggers carry stable context such as `appId`, `operation`, or `requestId` without repeating message text.
- Process entry points write concise startup and shutdown events through the same logger.

### Expectations
- Logs remain machine-readable and useful in local terminal output.
- A single operation can be followed by its correlation context.
- Sensitive product content does not become routine telemetry.

## Rationale

Fastify already integrates with Pino, minimizing dependencies and configuration. Structured events support troubleshooting future asynchronous app and agent lifecycles, while explicit minimization rules reflect the sensitive nature of user prompts and generated code.

## Usage Examples

```
logger.info({ event: "server.started", outcome: "success", port }, "Sparkta server started");
logger.error({ event: "server.start_failed", outcome: "failure", err }, "Sparkta server failed to start");
```

## Integration Guidelines

How should other parts of the system integrate with this component?

- Request a child logger from the owning boundary instead of constructing independent logger instances.
- Add stable event names and fields before adding prose-only messages.
- Review every new logged field for sensitivity and cardinality.

## Exceptions

Under what circumstances is it acceptable to deviate from this component rules?

- A final process-start fallback may write to standard error when logger construction itself fails.

## Enforcement

How is compliance with this component verified?

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
