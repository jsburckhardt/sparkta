# CORE-COMPONENT-260812-development-standards: TypeScript Development Standards

## Status

Adopted

## Purpose

Provide one enforceable coding and testing baseline for all Sparkta TypeScript workspaces without duplicating the existing commit contract.

## Scope

Application TypeScript, React source, Fastify source, tests, package scripts, and static-analysis configuration. Commit and pull-request formatting remain governed by `CORE-COMPONENT-260505-commit-standards`.

## Definition

### Rules
- TypeScript application projects MUST enable strict mode and MUST pass type checking without emitted files.
- Application source MUST use ESLint and Prettier through the root project command interface.
- Application modules SHOULD use named exports; tool-required default exports are allowed.
- Asynchronous application code MUST prefer `async`/`await` over manually chained promises when behavior is equivalent.
- Exported behavior MUST have Vitest coverage; every defect fix MUST add a regression test.
- Tests MUST be deterministic, isolated from external services, and organized with descriptive `describe` and `it` blocks.
- Dependencies MUST be declared in the consuming workspace and locked by the root npm lockfile.

### Interfaces
- Root `just` recipes expose setup, test, lint, format-check, type-check, build, focused verification, and full verification.
- Shared TypeScript, ESLint, Prettier, and Vitest configuration provides the workspace defaults.
- Workspace package scripts are implementation details called by root recipes.

### Expectations
- A clean dependency installation reproduces the validated dependency graph.
- New source and tests pass all static and automated checks before handoff.
- Exceptions are narrow, documented beside configuration, and do not weaken unrelated workspaces.

## Rationale

Strict TypeScript, ESLint, Prettier, and Vitest match the approved foundation and provide fast feedback for a repository optimized for rapid iteration. The rules complement rather than restate the existing commit standards.

## Usage Examples

```
just format-check
just lint
just type-check
just test
just verify-focused path/to/module.test.ts
just verify
```

## Integration Guidelines

How should other parts of the system integrate with this component?

- Add workspace scripts that can be composed by the root recipes.
- Co-locate tests with the behavior they cover unless a cross-workspace integration test is clearer.
- Keep browser and server globals explicit in their own TypeScript and lint configuration.

## Exceptions

Under what circumstances is it acceptable to deviate from this component rules?

- Generated applications may follow a separately adopted generated-app standard.
- Tool configuration may use a required default export.

## Enforcement

How is compliance with this component verified?

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
