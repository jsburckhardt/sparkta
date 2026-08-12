# CORE-COMPONENT-260812-error-handling: Application Error Handling

## Status

Adopted

## Purpose

Give browser, server, and future controller boundaries a consistent way to classify failures, preserve diagnostics, and return safe actionable results.

## Scope

Expected application failures, unexpected exceptions, HTTP boundary translation, startup and shutdown failures, asynchronous task failures, and user-visible error responses. Generated applications are outside this component until a generated-app contract adopts it.

## Definition

### Rules
- Expected failures MUST use a typed application error with a stable machine-readable code and safe message.
- Unexpected thrown values MUST be normalized to `Error` before handling or logging.
- Error causes MUST be preserved when wrapping lower-level failures.
- Errors MUST be translated exactly once at a transport or process boundary.
- Client responses MUST NOT expose stack traces, filesystem paths, command output, secrets, or internal causes.
- Unexpected failures MUST be logged and MUST NOT be silently swallowed.
- Cleanup failures MUST be reported without replacing the primary failure cause.

### Interfaces
- Application errors expose a stable code, safe message, optional cause, and explicitly safe context.
- Fastify error handling maps known errors to intentional status codes and unknown errors to a generic internal failure.
- Process entry points convert startup failures into structured logs and non-zero exit status.

### Expectations
- Callers can branch on stable error codes without parsing prose.
- Operators retain causal diagnostics in protected logs while users receive safe messages.
- Tests cover known-error translation, unknown-error redaction, and preserved causes.

## Rationale

A local prototype controller still executes filesystem operations and child processes that can fail. Typed classification at the source and one translation point avoid inconsistent responses while preserving enough context to diagnose rapid-development failures.

## Usage Examples

```
throw new ApplicationError({
    code: "APP_NOT_FOUND",
    message: "The requested Sparkta app does not exist.",
    cause,
});
```

## Integration Guidelines

How should other parts of the system integrate with this component?

- Classify an error where expected recovery semantics are known.
- Let boundary handlers own response formatting and final unexpected-error logging.
- Pass only explicitly safe fields from errors into client responses.

## Exceptions

Under what circumstances is it acceptable to deviate from this component rules?

- Programmer assertions may throw standard errors when they cannot represent a recoverable application outcome.

## Enforcement

How is compliance with this component verified?

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
