# CORE-COMPONENT-261002-explicit-errors: Explicit Errors

## Status

Adopted

## Purpose

Ensure Sparkta failures are visible, actionable, and distinguishable from successful outcomes.

## Scope

Application boundaries, local storage, Copilot CLI integration, child processes, configuration, and user-facing operations. Bootstrap establishes the contract but not product error flows.

## Definition

### Rules
- Invalid input and failed operations must return or throw typed, actionable errors.
- Broad catches, silent defaults, swallowed failures, and success-shaped fallbacks are prohibited.
- Error messages must state the failed operation and a safe next action without exposing secrets.
- External command failures must retain bounded exit and diagnostic evidence.

### Interfaces
- Future domain and adapter boundaries define typed success and failure results.

### Expectations
- Callers can distinguish validation, configuration, dependency, process, and unexpected failures.
- Tests cover deterministic failure behavior as well as successful behavior.

## Rationale

Agent-powered local tooling crosses many host boundaries; hidden failures make recovery unsafe and evidence unreliable.

## Usage Examples

```text
Rejected: return an empty project after a storage read fails
Required: report that the project could not be read and preserve the original diagnostic
```

## Integration Guidelines

- Define domain-specific errors close to each reviewed boundary.
- Translate low-level diagnostics once, retaining the causal evidence needed for troubleshooting.

## Exceptions

- Best-effort cleanup may aggregate errors, but it must still report every unresolved owned resource.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-261002-node-react-vite-toolchain](../ADR/ADR-261002-node-react-vite-toolchain.md)
