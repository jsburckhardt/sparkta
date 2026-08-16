# Architecture

This directory contains global architectural documentation for Sparkta.

## Structure

| Directory          | Purpose                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `ADR/`             | Read-only ADR template, accepted ADRs, and `DECISION-LOG.md`      |
| `core-components/` | Read-only template and adopted cross-cutting behavioral contracts |

ADRs capture significant global decisions. Core-components define reusable global contracts. Every artifact is registered in [`ADR/DECISION-LOG.md`](ADR/DECISION-LOG.md). Templates are read-only references: copy them in place, use the UTC creation date in the new basename, and keep that date stable.

## Sparkta foundation

The bootstrap adopts [Node.js 24, strict TypeScript, npm workspaces, React/Vite, Fastify, Vitest, ESLint, and Prettier](ADR/ADR-260812-foundation-stack.md). It separates [durable `.sparkta/apps/` files from disposable `.sparkta/runtime/` coordination](ADR/ADR-260812-filesystem-state-boundary.md). Implementation follows the adopted contracts for [development standards](core-components/CORE-COMPONENT-260812-development-standards.md), [typed boundary-safe errors](core-components/CORE-COMPONENT-260812-error-handling.md), [structured redacted observability](core-components/CORE-COMPONENT-260812-observability.md), and [state lifecycle](core-components/CORE-COMPONENT-260812-state-lifecycle.md).

## Generated frontend boundary

The accepted [blessed frontend starter ADR](ADR/ADR-260815-blessed-frontend-starter.md) places the independent copy source at `templates/default/`, outside root workspaces with its own lockfile. The adopted [generated frontend contract](core-components/CORE-COMPONENT-260815-generated-frontend-contract.md) governs the bundled React/TypeScript/Vite/Tailwind/Lucide/Radix-shadcn/Recharts stack, local/mock-data isolation, bundled-dependency policy, direct npm commands, assigned ports, and root clean-copy validation. The complementary [generated frontend quality contract](core-components/CORE-COMPONENT-260816-generated-frontend-quality.md) governs realistic domain data, relevant interactions, applicable states, bounded visual-quality vocabulary, and the copied six-category `templates/default/QUALITY-CHECKLIST.md`. Root validation deterministically checks document integrity and runtime behavior; contextual visual quality remains evidence-based reviewer judgment. This boundary does not implement generated-app lifecycle behavior.

## Engineering harness boundary

The adopted [engineering harness operating contract](core-components/CORE-COMPONENT-260813-engineering-harness-operation.md) defines the already-configured ambient CLI boundary, the exact `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` skill allowlist, preservation of unrelated sibling skills, packaged-source lock provenance, repository-local extensions, root `justfile` delegation, dual-service readiness, Linux PID/start-time/command/process-group validation for owned transient boot state, RPIV hook injection, and managed commit guidance. The [project command interface](core-components/CORE-COMPONENT-260806-project-command-interface.md) remains authoritative, and the [RPIV stage contract](core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md) retains stage ownership.

Harness ownership under `.harness/temp/boot/` is engineering evidence, not Sparkta product state. Adoption does not alter the `.sparkta/apps/` or `.sparkta/runtime/` architecture and introduces no product persistence or lifecycle service.

## Soft Factory Runner boundary

The adopted [Soft Factory Runner operating contract](core-components/CORE-COMPONENT-260813-soft-factory-runner-operation.md) governs the environment-owned CLI, protocol-1 configuration, safe `.trees/` and `.soft-factory/` roots, canonical RPIV handoff, and the APS v1.2.2 `runner-dispatcher` facade. Direct `soft-factory doctor --json` is the sole Runner readiness authority; Sparkta does not claim or implement a separate repository check. Runner state is independent of harness evidence and Sparkta product state. Sparkta focused/full validation does not inspect Runner configuration or state, while engineering-harness validation requires exactly its three named skills.

## Scope boundary

The current code provides only the local web/server foundation, the additive `GET /api/readiness` probe, and its deterministic engineering surface. Runner installation and product agent integration, Prototype 0, control UI, product APIs, and generated-app lifecycle remain future issue scope. The blessed copyable starter is present, but no generated application lifecycle is implemented. No architecture deviation is introduced.
