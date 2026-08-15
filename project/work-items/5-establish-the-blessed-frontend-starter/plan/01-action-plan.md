# Action Plan: Establish the blessed frontend starter

## Feature

- **ID:** 5
- **Research Brief:** `project/work-items/5-establish-the-blessed-frontend-starter/research/00-research.md`

## ADRs Created

- [`ADR-260815-blessed-frontend-starter`](../../../architecture/ADR/ADR-260815-blessed-frontend-starter.md) — places a deterministic standalone starter at `templates/default/`, outside the Sparkta workspace graph, with its own copyable lockfile and the complete blessed stack.

## Core-Components Created

- [`CORE-COMPONENT-260815-generated-frontend-contract`](../../../architecture/core-components/CORE-COMPONENT-260815-generated-frontend-contract.md) — governs bundled dependencies, frontend-only data, direct build/runtime scripts, assigned ports, and root clean-copy validation.

## Acceptance Criteria

- **AC-1:** A reusable starter uses React, TypeScript, Vite, Tailwind CSS, Lucide icons, Radix/shadcn-style components, and Recharts support where charts are needed.
- **AC-2:** The starter requires no backend, database, authentication system, external infrastructure, or external data source.
- **AC-3:** The starter supports `npm run build`.
- **AC-4:** The starter supports `npm run dev -- --host 0.0.0.0 --port <PORT>`.
- **AC-5:** Dependency guidance directs agents to use bundled dependencies rather than arbitrary package installation.
- **AC-6:** A clean starter copy installs, builds, starts on an assigned port, and serves a browser-loadable page.

## Acceptance Coverage

| Acceptance Criterion | Implementation Tasks | Tests or Validation | Expected Evidence                                                                                                                                     | Relevant Architecture                                                                                                                              |
| -------------------- | -------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1                 | T-1, T-2             | V-1, V-2, V-6       | Starter manifest/lockfile, Tailwind/Vite configuration, typed component source, and dependency/import audit proving every named capability is bundled | ADR-260815-blessed-frontend-starter; CORE-COMPONENT-260815-generated-frontend-contract                                                             |
| AC-2                 | T-1, T-2             | V-2, V-6            | Dependency/source audit showing local mock content and no server, database, auth, infrastructure, fetch, or external-data requirement                 | ADR-260815-blessed-frontend-starter; ADR-260812-filesystem-state-boundary; CORE-COMPONENT-260815-generated-frontend-contract                       |
| AC-3                 | T-1, T-3, T-5        | V-3, V-6            | Successful `npm run build` in a clean copied starter and passing root `just verify` output                                                            | CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-project-command-interface                                                 |
| AC-4                 | T-1, T-3, T-5        | V-4, V-6            | Captured Vite startup on a dynamically assigned port using the exact argument contract                                                                | CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260812-state-lifecycle                                                           |
| AC-5                 | T-2, T-4             | V-2, V-5, V-6       | Starter agent guidance and application docs explicitly direct use of bundled dependencies; manifest audit shows the blessed set                       | CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-rpiv-stage-contract                                                       |
| AC-6                 | T-3, T-5             | V-3, V-4, V-6       | Temporary clean-copy transcript: locked install, build, assigned-port startup, HTTP 200, HTML/root marker, cleanup, and passing root verification     | ADR-260815-blessed-frontend-starter; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-agent-executable-acceptance-criteria |

Coverage is complete: AC-1 through AC-6 each map to implementation tasks, repository-executable validation, concrete evidence, and governing architecture.

## Implementation Tasks

1. **T-1 — Create the standalone starter boundary (AC-1, AC-2, AC-3, AC-4):** add `templates/default/` with an independent locked package, strict TypeScript, Vite/Tailwind configuration, direct scripts, and a frontend-only entry point.
2. **T-2 — Provide bundled UI primitives and dependency guidance (AC-1, AC-2, AC-5):** include a minimal Radix-backed shadcn-style component/utilities, Lucide usage, Recharts availability, local/mock content, and starter-facing agent guidance prohibiting arbitrary installs.
3. **T-3 — Add deterministic root clean-copy validation (AC-3, AC-4, AC-6):** extend the root `justfile` and supporting test assets to copy, lock-install, build, start on a free assigned port, request the page, and clean up safely; compose this check into `just verify`.
4. **T-4 — Update application and agent documentation (AC-5):** document starter location, copy boundary, bundled stack, dependency policy, direct npm contracts, validation, local-data scope, and migration/deployment non-impact in README/docs and relevant repository maps.
5. **T-5 — Execute validation and record the Implement handoff (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6):** run focused checks and root `just verify`, record per-AC and documentation evidence, and provide the exact commit and clean-tree proof without changing GitHub acceptance state.
