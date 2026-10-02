# Architecture

This directory contains all architectural documentation for the project.

## Structure

| Directory | Purpose |
|-----------|---------|
| `ADR/` | ADR template, active ADRs, and the decision log (`DECISION-LOG.md`). |
| `core-components/` | Core-component template and active core-component definitions |

## Key Concepts

The [Foreman control-plane ADR](ADR/ADR-260906-foreman-control-plane.md) separates
mission scheduling from single-issue RPIV execution.
[Foreman Orchestration](core-components/CORE-COMPONENT-260906-foreman-orchestration.md)
and [RPIV Observability](core-components/CORE-COMPONENT-260906-rpiv-observability.md)
define their shared boundaries.

Sparkta's application foundation is recorded in the [Node React Vite Toolchain ADR](ADR/ADR-261002-node-react-vite-toolchain.md). Shared application contracts cover [development standards](core-components/CORE-COMPONENT-261002-development-standards.md), [local persistence](core-components/CORE-COMPONENT-261002-local-persistence.md), [explicit errors](core-components/CORE-COMPONENT-261002-explicit-errors.md), and [process ownership and cleanup](core-components/CORE-COMPONENT-261002-process-ownership-cleanup.md). These are foundation boundaries, not completed product implementations.

### ADRs (Architecture Decision Records)
ADRs capture significant architectural decisions. They are **global** — not scoped to any single issue. Every ADR must be recorded in `ADR/DECISION-LOG.md`.

### Core-Components
Core-components define reusable, cross-cutting behavioral contracts. They are **global** and shared across all issues. Every core-component must be recorded in `ADR/DECISION-LOG.md`.

### Templates
Templates are read-only references — copy and rename them, don't edit them directly:
- `ADR/ADR-260101-template.md` — copy within `ADR/` and name the artifact `ADR-yymmdd-short-slug.md`
- `core-components/CORE-COMPONENT-260101-template.md` — copy within `core-components/` and name the artifact `CORE-COMPONENT-yymmdd-short-slug.md`

Use the UTC creation date for `yymmdd`. The full date-and-slug basename is the artifact ID, and the date remains unchanged after later edits.
