# Core-Components

This directory contains all active core-component definitions for the project.

- [Foreman Orchestration](CORE-COMPONENT-260906-foreman-orchestration.md): context, graph, capacity, isolation, recovery, and integration.
- [RPIV Observability](CORE-COMPONENT-260906-rpiv-observability.md): standalone/managed lifecycle state and worker communication.
- [Development Standards](CORE-COMPONENT-261002-development-standards.md): strict TypeScript, commits, tests, and command validation.
- [Local Persistence](CORE-COMPONENT-261002-local-persistence.md): durable local data and disposable runtime boundaries.
- [Explicit Errors](CORE-COMPONENT-261002-explicit-errors.md): actionable failures without silent fallbacks.
- [Process Ownership and Cleanup](CORE-COMPONENT-261002-process-ownership-cleanup.md): exact ownership and safe runtime cleanup.

## Creating a New Core-Component

1. Copy the template `CORE-COMPONENT-260101-template.md` in this directory
2. Name it `CORE-COMPONENT-yymmdd-short-slug.md` using its UTC creation date
3. Fill in all sections
4. Update the decision log at `../ADR/DECISION-LOG.md`

## Conventions

- Core-components are **global** — they define reusable, cross-cutting behavior shared across all issues
- The full date-and-slug filename basename is the core-component ID
- Multiple core-components may share a date when their slugs are distinct
- Creation dates never change after later edits
- Deprecated core-components are marked as such and link to the replacement
- Every core-component should reference the ADR(s) that motivate it
