# Research Brief: Establish the blessed frontend starter

## GitHub Issue

- **Issue:** #5
- **Title:** Establish the blessed frontend starter
- **Work Item:** project/work-items/5-establish-the-blessed-frontend-starter

## Scope Classification

- **Scope Type:** issue

## Problem Statement

Agents need a known-good starting application rather than an empty directory so Prototype 0 trials use predictable dependencies and runtime contracts. Issue #5 is the first child in the delivery order for Prototype 0 and is limited to a reusable, frontend-only starter that can be copied, built, started on an assigned port, and loaded in a browser without external services or data.

## Acceptance Criteria

- [ ] A reusable starter uses React, TypeScript, Vite, Tailwind CSS, Lucide icons, Radix/shadcn-style components, and Recharts support where charts are needed.
- [ ] The starter requires no backend, database, authentication system, external infrastructure, or external data source.
- [ ] The starter supports `npm run build`.
- [ ] The starter supports `npm run dev -- --host 0.0.0.0 --port <PORT>`.
- [ ] Dependency guidance directs agents to use bundled dependencies rather than arbitrary package installation.
- [ ] A clean starter copy installs, builds, starts on an assigned port, and serves a browser-loadable page.

## Repository Findings

- GitHub Issue #5 contains exactly one `ACCEPTANCE_CRITERIA_START`/`ACCEPTANCE_CRITERIA_END` marker pair and six unchecked Markdown checkboxes in the order reproduced above. It is labeled `feature` and `story` and belongs to the Prototype 0 feasibility feature.
- Parent Issue #4 orders Issues #5, #6, and #7 and limits Prototype 0 to manual app-directory creation, agent invocation, build validation, and development-server startup, without a Sparkta control UI or backend capabilities.
- `PRD.md` sections 25-29 specify the blessed stack, a known-good starter rather than an empty directory, bundled-dependency guidance, the assigned-port development command, and the build command. Sections 1, 5-6, 23, and 51 further establish frontend-only simulations, local/mock data, no external infrastructure, and a working rather than unfinished scaffold.
- No starter or template directory exists. The only package manifests are `package.json`, `apps/web/package.json`, and `apps/server/package.json`.
- `apps/web/package.json` declares React, React DOM, TypeScript, Vite, Vitest, and the React Vite plugin. Neither it nor the root `package-lock.json` declares Tailwind CSS, Lucide, Radix, shadcn-style utility dependencies, or Recharts.
- The existing `apps/web` package is a minimal Sparkta foundation, not a generated-application starter: `App` renders foundation copy (`apps/web/src/App.tsx`), `main.tsx` mounts it through React `StrictMode` (`apps/web/src/main.tsx`), and `index.css` contains plain CSS (`apps/web/src/index.css`). `README.md`, `docs/README.md`, and `project/architecture/README.md` explicitly state that the blessed starter is not included in the foundation.
- The existing web workspace has `build`, `dev`, `test`, and `type-check` scripts. Its `dev` script invokes `vite --host 0.0.0.0`, while `apps/web/vite.config.ts` sets port 5173 with `strictPort: true`. The root `dev` script instead starts both web and Fastify workspaces through `concurrently` (`package.json`).
- `apps/web/src/foundation.test.ts` covers only `getFoundationMessage`; there is no existing starter-specific source or test suite.
- The root dependency graph is an npm workspace graph locked by `package-lock.json`. `just setup` uses `npm ci --include=dev`, and root build/validation commands delegate to workspace scripts (`justfile`).
- `tsconfig.base.json` enables strict TypeScript and additional safety checks. Browser globals are scoped to `apps/web` by `eslint.config.js`.

## Constraints

- Research is limited to repository findings, constraints, existing architecture, risks, and open questions. It does not select a starter structure, component strategy, package set, or artifact location.
- The issue requires all six named frontend capabilities and conditionally requires Recharts support where charts are needed; the starter must remain independent of backend, database, authentication, infrastructure, and external-data requirements.
- The two exact npm runtime contracts in the issue are direct starter contracts, even though the repository also uses a root `justfile` as Sparkta’s default operating interface (`CORE-COMPONENT-260806-project-command-interface`).
- The repository requires Node.js 24, strict TypeScript, npm workspaces, and one root lockfile for Sparkta application code (`ADR-260812-foundation-stack`, `package.json`, `CORE-COMPONENT-260812-development-standards`). Dependencies consumed by a Sparkta workspace must be declared in that workspace and locked at the root.
- `ADR-260812-foundation-stack` deliberately left the blessed generated-app starter to later issue scope and states that the generated-application stack is a separate artifact. The existing `apps/web` boundary therefore cannot be treated as evidence that the starter already exists.
- The PRD’s dependency policy says agents should generally use starter-bundled dependencies and avoid arbitrary additions; any later allowance is expected to be explicit (`PRD.md`, section 27).
- Generated applications are frontend-only UI simulations using local/mock data and must remain independently runnable (`PRD.md`, sections 1, 5-6, and 23; Issue #4).
- Generated source is durable filesystem state, while processes and ports are disposable. Future generated applications belong under `.sparkta/apps/`, and identity cannot depend on a port or process (`ADR-260812-filesystem-state-boundary`, `CORE-COMPONENT-260812-state-lifecycle`).
- The accepted RPIV contract requires this stage to preserve issue order, write only this research brief, and leave planning, implementation, and verification to later stages (`CORE-COMPONENT-260806-rpiv-stage-contract`).

## Relevant ADRs and Core-Components

- **`ADR-260812-foundation-stack` — Sparkta Foundation Stack:** Establishes Node.js 24, strict TypeScript, npm workspaces, React/Vite, Vitest, and the existing web/server boundaries while explicitly excluding the blessed starter from the bootstrap.
- **`ADR-260812-filesystem-state-boundary` — Filesystem State Boundary:** Makes generated source durable under `.sparkta/apps/` and ports/process state disposable under `.sparkta/runtime/`.
- **`CORE-COMPONENT-260812-development-standards` — TypeScript Development Standards:** Governs strict TypeScript, ESLint/Prettier, deterministic Vitest coverage, workspace dependency declarations, and the root lockfile; it permits generated applications to follow a separately adopted generated-app standard.
- **`CORE-COMPONENT-260812-state-lifecycle` — Durable and Runtime State Lifecycle:** Prevents generated-application continuity or identity from depending on runtime ports, processes, or sessions.
- **`CORE-COMPONENT-260806-project-command-interface` — Project Command Interface:** Keeps Sparkta repository operations behind root `justfile` recipes while workspace package scripts remain implementation details.
- **`CORE-COMPONENT-260806-agent-executable-acceptance-criteria` — Agent-Executable Acceptance Criteria:** Requires bounded, deterministic, repository-executable criteria and inspectable outcomes.
- **`CORE-COMPONENT-260806-rpiv-stage-contract` — RPIV Stage Contract:** Defines the Research-stage boundary and stable work-item path rules.
- `project/architecture/ADR/DECISION-LOG.md` records all of the above as accepted or adopted and contains no existing decision specifically defining the blessed starter.

## Risks and Open Questions

- “Radix/shadcn-style components” does not identify whether the requirement concerns bundled source, package dependencies, styling conventions, or a combination; the repository has no existing generated-app component contract.
- “Recharts support where charts are needed” leaves unresolved what support must be present in a clean starter that does not itself need to render a chart.
- “Bundled dependencies” and “clean starter copy” do not define the copy boundary, lockfile ownership, or whether the copy must be independent of the Sparkta npm workspace.
- The PRD shows `templates/default/` only as an example, while the filesystem ADR reserves `.sparkta/apps/` for generated applications. No accepted artifact identifies the starter’s repository location.
- The current root development command starts both web and server processes, and the existing Vite package fixes port 5173. Those current foundation behaviors do not demonstrate the starter’s assigned-port, frontend-only runtime contract.
- The issue does not pin package versions or define compatibility among React 19, Vite 8, Tailwind CSS, Radix/shadcn-style components, Lucide, and Recharts. The current lockfile covers only the existing foundation subset.
- The repository currently has no starter-specific dependency guidance or browser-loadable starter artifact, so all six criteria remain unsupported by existing starter files.
