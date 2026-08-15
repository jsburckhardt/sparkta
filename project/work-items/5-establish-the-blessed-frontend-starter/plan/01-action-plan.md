# Action Plan: Establish the blessed frontend starter

## Feature

- **ID:** 5
- **Research Brief:** `project/work-items/5-establish-the-blessed-frontend-starter/research/00-research.md`

## ADRs Created

- [`ADR-260815-blessed-frontend-starter`](../../../architecture/ADR/ADR-260815-blessed-frontend-starter.md) — places a deterministic standalone starter at `templates/default/`, outside the Sparkta workspace graph, with its own copyable lockfile and the complete blessed stack.

## Core-Components Created

- [`CORE-COMPONENT-260815-generated-frontend-contract`](../../../architecture/core-components/CORE-COMPONENT-260815-generated-frontend-contract.md) — governs bundled dependencies, frontend-only data, direct build/runtime scripts, assigned ports, and root clean-copy validation.

## Plan Correction — Verify Return (2026-08-15)

Verify independently passed AC-1 through AC-6 product behavior and `just verify`, but returned the work to Plan because the complete issue diff failed scope review. T-4 permitted an overly broad cold-agent map rewrite: `AGENTS.md` lost issue-generator YAML indentation, collapsed lists, and changed `>>` terminators to `> >`. No push, issue update, verification summary, pull request, or final result occurred.

This single Plan correction preserves AC-1 through AC-6 and the existing ADR/core-component set. T-4 is narrowed so `AGENTS.md` may differ from `origin/main` only by the one intended additive `application_boundaries` entry for `templates/default`; every unrelated byte, agent metadata field, contract, list, indentation character, and terminator must remain byte-identical. V-5 and V-6 now make any unrelated reformatting or corruption a blocking failure and require explicit one-hunk and byte-comparison evidence before Verify can resume.

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
| AC-5                 | T-2, T-4             | V-2, V-5, V-6       | Starter guidance plus an `AGENTS.md` byte comparison and one-hunk diff proving only the intended `templates/default` boundary entry was added         | CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-rpiv-stage-contract                                                       |
| AC-6                 | T-3, T-5             | V-3, V-4, V-6       | Temporary clean-copy transcript: locked install, build, assigned-port startup, HTTP 200, HTML/root marker, cleanup, and passing root verification     | ADR-260815-blessed-frontend-starter; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260806-agent-executable-acceptance-criteria |

Coverage is complete: AC-1 through AC-6 each map to implementation tasks, repository-executable validation, concrete evidence, and governing architecture. The correction adds scope-integrity proof to AC-5/T-4 and complete-diff validation to T-5 without changing acceptance IDs or architecture.

## Implementation Tasks

1. **T-1 — Create the standalone starter boundary (AC-1, AC-2, AC-3, AC-4):** add `templates/default/` with an independent locked package, strict TypeScript, Vite/Tailwind configuration, direct scripts, and a frontend-only entry point.
2. **T-2 — Provide bundled UI primitives and dependency guidance (AC-1, AC-2, AC-5):** include a minimal Radix-backed shadcn-style component/utilities, Lucide usage, Recharts availability, local/mock content, and starter-facing agent guidance prohibiting arbitrary installs.
3. **T-3 — Add deterministic root clean-copy validation (AC-3, AC-4, AC-6):** extend the root `justfile` and supporting test assets to copy, lock-install, build, start on a free assigned port, request the page, and clean up safely; compose this check into `just verify`.
4. **T-4 — Correct the bounded agent-map update (AC-5):** preserve the valid application documentation, restore `AGENTS.md` from `origin/main`, and add only `  - templates/default is the standalone blessed generated-frontend copy source outside root workspaces.` immediately after the existing `apps/server` application-boundary entry. No other `AGENTS.md` byte may change.
5. **T-5 — Revalidate scope and record the corrected Implement handoff (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6):** run V-5/V-6 including explicit `AGENTS.md` one-hunk/byte-identity checks and complete-diff scope inspection, rerun root `just verify`, and provide corrected evidence, commit identity, and clean-tree proof without changing GitHub acceptance state.
