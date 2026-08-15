# CORE-COMPONENT-260815-generated-frontend-contract: Generated Frontend Contract

## Status

Adopted

## Purpose

Give every generated frontend and the reusable starter one enforceable dependency, isolation, build, and assigned-port runtime contract.

## Scope

The canonical starter, clean copies used for validation, and future generated frontend applications. It governs frontend dependencies, data boundaries, package guidance, direct npm scripts, and repository validation. It does not govern the Sparkta control web package or add generated-app lifecycle behavior.

## Definition

### Rules

- Generated frontends MUST use the blessed React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style, and bundled Recharts stack.
- Generated frontends MUST remain frontend-only and MUST use local or mock data without backend, database, authentication, infrastructure, or external-data dependencies.
- The starter MUST declare and lock all blessed dependencies within its standalone copy boundary.
- Agents MUST use bundled dependencies and MUST NOT install arbitrary packages; any future addition requires an explicitly adopted allowlist change.
- Every generated frontend MUST support `npm run build`.
- Every generated frontend MUST accept `npm run dev -- --host 0.0.0.0 --port <PORT>` without depending on a fixed port.

### Interfaces

- `templates/default/` is the canonical copy source and contains its independent package manifest and lockfile.
- The starter package scripts expose the direct build and development-server contracts.
- Root `justfile` recipes remain the Sparkta validation interface and exercise a temporary clean starter copy.

### Expectations

- A clean copy installs from its lockfile, builds, starts on an available assigned port, and returns a browser-loadable HTML page.
- Recharts is available to generated code without requiring the clean starter page to render a chart.
- Removing the copied application runtime process does not affect its source identity or require a Sparkta service.

## Rationale

A shared contract prevents each generation task from selecting frameworks, dependencies, ports, or service assumptions independently. Bundling the complete UI stack trades a larger install for predictable generation, while direct npm scripts let future lifecycle code operate any generated copy uniformly.

## Usage Examples

```bash
cp -R templates/default /tmp/sparkta-app
cd /tmp/sparkta-app
npm ci
npm run build
npm run dev -- --host 0.0.0.0 --port 6017
```

## Integration Guidelines

- Copy the complete starter boundary, including its lockfile, before generation.
- Build interfaces from the bundled primitives, icons, styling utilities, and chart library.
- Keep sample and generated data in frontend source or local fixtures.
- Add deterministic clean-copy validation to the root `justfile` and compose it into full verification.
- Document dependency guidance and direct runtime commands for coding agents.

## Exceptions

- A generated interface that needs no chart may omit chart rendering, but Recharts remains bundled.
- Dependency additions are permitted only after an explicit architecture change defines an allowlist entry.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260815-blessed-frontend-starter](../ADR/ADR-260815-blessed-frontend-starter.md)
- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
