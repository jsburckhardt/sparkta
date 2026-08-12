# Architecture

This directory contains global architectural documentation for Sparkta.

## Structure

| Directory | Purpose |
|---|---|
| `ADR/` | Read-only ADR template, accepted ADRs, and `DECISION-LOG.md` |
| `core-components/` | Read-only template and adopted cross-cutting behavioral contracts |

ADRs capture significant global decisions. Core-components define reusable global contracts. Every artifact is registered in [`ADR/DECISION-LOG.md`](ADR/DECISION-LOG.md). Templates are read-only references: copy them in place, use the UTC creation date in the new basename, and keep that date stable.

## Sparkta foundation

The bootstrap adopts [Node.js 24, strict TypeScript, npm workspaces, React/Vite, Fastify, Vitest, ESLint, and Prettier](ADR/ADR-260812-foundation-stack.md). It separates [durable `.sparkta/apps/` files from disposable `.sparkta/runtime/` coordination](ADR/ADR-260812-filesystem-state-boundary.md). Implementation follows the adopted contracts for [development standards](core-components/CORE-COMPONENT-260812-development-standards.md), [typed boundary-safe errors](core-components/CORE-COMPONENT-260812-error-handling.md), [structured redacted observability](core-components/CORE-COMPONENT-260812-observability.md), and [state lifecycle](core-components/CORE-COMPONENT-260812-state-lifecycle.md).

These records establish boundaries only. Harness adoption, the Soft Factory Runner, agent integration, Prototype 0, product APIs, generated-app lifecycle, and the blessed generated-app starter remain future issue scope. The implementation introduces no architecture deviation.
