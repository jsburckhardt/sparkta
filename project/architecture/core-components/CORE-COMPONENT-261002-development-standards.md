# CORE-COMPONENT-261002-development-standards: Development Standards

## Status

Adopted

## Purpose

Define the coding, commit, and testing practices shared by every Sparkta change.

## Scope

Application TypeScript, React components, tests, documentation, commits, and pull requests.

## Definition

### Rules
- Use strict TypeScript and preserve all configured strictness checks.
- Follow the configured ESLint and Prettier rules.
- Prefer named exports where the host framework does not require a default export.
- Use async/await for asynchronous control flow and surface rejected operations explicitly.
- Follow Conventional Commits and the repository's required Copilot commit trailers.
- Keep raw project operating commands in root justfile recipes.

### Interfaces
- `just lint`, `just format-check`, and `just type-check` enforce source quality.
- `just test`, `just verify-focused`, and `just verify` provide deterministic validation boundaries.

### Expectations
- Exported behavior has deterministic automated tests at the appropriate level.
- Tests do not depend on live external services unless an issue explicitly configures an available test environment.
- Documentation changes accompany behavior or operating-interface changes.

## Rationale

One strict, executable standard makes agent-authored changes reviewable and keeps local and RPIV validation aligned.

## Usage Examples

```text
just verify-focused
just verify
```

## Integration Guidelines

- Add checks through root justfile recipes and update this contract when the shared standard changes.
- Keep tests isolated and deterministic by default.

## Exceptions

- Framework-required default exports are allowed when no named-export interface is available.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-261002-node-react-vite-toolchain](../ADR/ADR-261002-node-react-vite-toolchain.md)
