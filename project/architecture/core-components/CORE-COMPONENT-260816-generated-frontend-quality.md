# CORE-COMPONENT-260816-generated-frontend-quality: Generated Frontend Quality Contract

## Status

Adopted

## Purpose

Define reusable behavioral and evaluation requirements that make generated frontend simulations convincing, domain-specific, and consistently reviewable rather than merely buildable.

## Scope

This component applies to coding-agent guidance, the canonical starter, copied or generated frontend applications, repository-local quality evaluation, and root validation. It complements `CORE-COMPONENT-260815-generated-frontend-contract`; that component remains authoritative for the blessed stack, frontend-only isolation, dependencies, and direct commands. It does not govern the Sparkta control web package or introduce backend or generated-app lifecycle behavior.

## Definition

### Rules
- Generated frontends MUST implement plausible behavior for requested or contextually relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes; irrelevant controls MUST NOT be added solely to satisfy a catalogue.
- Generated frontends MUST represent applicable loading, empty, error, success, disabled, hover, and selected states; an evaluator MAY mark a state not applicable only with a request-specific rationale.
- Simulated data MUST use realistic domain-specific names, values, statuses, and timestamps and MUST avoid placeholder prose or generic numbered identities.
- Generated interfaces MUST avoid giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace.
- Generated interfaces MUST exhibit clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content appropriate to the requested domain.
- Every generated frontend evaluation MUST use a repository-local checklist with exactly these directly traceable categories: design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup.
- Checklist outcomes MUST be pass or fail, cite inspectable evidence, and use not-applicable only for conditional interaction or state details with a written rationale; stack, build, and startup categories are never optional.

### Interfaces
- `templates/default/AGENTS.md` is the starter-local coding-agent instruction surface copied into generated frontend boundaries.
- The repository-local generated-frontend checklist maps each required category to finite checks and expected evidence.
- Root `justfile` recipes are the authoritative automated validation surface for instruction/checklist integrity, stack adherence, build success, and assigned-port runtime startup.

### Expectations
- A reviewer can trace every checklist result to generated source, rendered behavior, command output, or an explicit applicability rationale.
- Controls and states are evaluated against the requested product story rather than by requiring every catalogue entry in every interface.
- Qualitative design checks use the named prohibited and positive traits as a bounded vocabulary instead of an unqualified aesthetic score.

## Rationale

The existing generated-frontend contract proves isolation, dependencies, build, and startup but does not define interaction realism, state coverage, domain data, or visual quality. A complementary global contract keeps these reusable requirements consistent across generation work while allowing deterministic checks for structural requirements and bounded evidence-based review for contextual design behavior.

## Usage Examples

```text
Interaction check: PASS — repository filter updates the visible rows in src/App.tsx.
State check: N/A — no asynchronous workflow was requested; loading-state rationale recorded.
Mock-data check: PASS — fixtures use domain-specific repository names, statuses, and timestamps.
Runtime startup: PASS — root validation records assigned port, HTTP 200, and HTML marker.
```

## Integration Guidelines

- Keep starter-local instructions and the checklist aligned with the rules and vocabulary in this component.
- Evaluate only interactions and states applicable to the requested interface, and record why catalogue entries are omitted.
- Keep frontend isolation, dependency, build, and assigned-port requirements aligned with `CORE-COMPONENT-260815-generated-frontend-contract`.
- Add or change automated checks only through root `justfile` recipes; wrappers may delegate but must not duplicate command bodies.

## Exceptions

- A catalogue interaction or state may be omitted when it is irrelevant to the requested interface and the checklist records a concrete rationale.
- No exception permits external data, prohibited infrastructure, an unapproved dependency, or omission of build and runtime proof.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260815-blessed-frontend-starter](../ADR/ADR-260815-blessed-frontend-starter.md)
