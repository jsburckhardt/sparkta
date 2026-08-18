# Research Brief: Run repeated Prototype 0 generation trials

## GitHub Issue

- **Issue:** #7
- **Title:** Run repeated Prototype 0 generation trials
- **Work Item:** project/work-items/7-run-repeated-prototype-0-generation-trials

## Scope Classification

- **Scope Type:** issue

## Problem Statement

One successful generation cannot establish reliability. Issue #7 requires bounded, repeatable Prototype 0 trials against three distinct PRD interface examples, with comparable records of generation, build, runtime, browser load, interaction, and quality outcomes. The trials must determine whether repeated prompts produce useful working prototypes without expanding Prototype 0 to the Sparkta control product or generated-app lifecycle.

## Acceptance Criteria

- [ ] Three clean starter copies are generated from the PRD examples for engineering-productivity, autonomous-delivery monitoring, and customer-management interfaces.
- [ ] Each trial records its prompt, agent result, dependency installation, build result, runtime port, browser-load result, and completed quality checklist.
- [ ] Every generated application uses simulated data, has no required backend, builds successfully, and starts through the standard runtime contract.
- [ ] Major controls described by each prompt behave plausibly and the evidence identifies any unmet quality check.
- [ ] Trial findings identify instruction or starter improvements, and any adopted improvement is followed by a rerun of the affected trial.
- [ ] The final evidence states whether all three trials satisfy the Prototype 0 exit criterion and identifies any blocking gap when they do not.

## Repository Findings

- GitHub Issue #7 contains one structured `ACCEPTANCE_CRITERIA_START`/`ACCEPTANCE_CRITERIA_END` interval and six unchecked Markdown checkboxes, reproduced above verbatim and in issue order.
- No existing `project/work-items/7-*` directory was found. The resolved path is the caller-supplied exact path shown above; the branch is `feat/7-run-repeated-prototype-0-generation-trials`.
- Parent Issue #4 orders #5, #6, and #7 and limits Prototype 0 to manual app-directory creation, agent invocation, build validation, and development-server startup. It excludes the Sparkta control UI, backend, database, authentication, deployment, and multi-app lifecycle.
- `PRD.md` provides the three domain examples: an engineering productivity executive dashboard (line 23), an autonomous software-delivery dashboard with agent/task/repository/elapsed-time/token/activity detail (line 144), and a customer-management system with customers, orders, invoices, search, filters, create/edit, detail, and activity history (lines 286-302).
- `PRD.md` sections 23-29 require frontend-only simulations, realistic local data, the blessed stack, a known-good starter, bundled dependencies, `npm run build`, and `npm run dev -- --host 0.0.0.0 --port <PORT>`. Section 51 defines a successful generated app as building, starting, visually representing the request, having plausible major controls and story-supporting sample data, and not looking like an unfinished scaffold.
- `PRD.md` Prototype 0 (lines 1752-1783) excludes a Sparkta UI, assumes manual directory creation/agent invocation/build/dev-server startup, names design, instruction, stack, mock-data, and build reliability as validation concerns, and sets the exit criterion to “Repeated prompts produce useful working prototypes.”
- `templates/default/` is the canonical standalone copy source, outside the root npm workspace graph and with its own manifest and lockfile (`ADR-260815-blessed-frontend-starter`, `templates/default/package.json`, root `package.json:workspaces`). It bundles React, strict TypeScript, Vite, Tailwind, Lucide, Radix/shadcn-style utilities, and Recharts.
- `templates/default/AGENTS.md` is copied with the starter and requires domain-specific simulated data, request-relevant interactions, applicable states, purpose-driven visual quality, bundled dependencies, no external requirements, and the direct build/runtime contracts.
- `templates/default/QUALITY-CHECKLIST.md` has exactly six categories: design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup. It requires finite PASS/FAIL results and inspectable support, permits `N/A` only for conditional interaction/state rows with a request-specific rationale, and makes stack, build, and runtime mandatory.
- The root `justfile:starter-check` validates the canonical and copied document contracts, rejects controlled malformed copies, performs `npm ci` and `npm run build`, starts a copy on a dynamic port, requires HTTP 200/`text/html`/page marker, and cleans its owned process/port/temporary copy. It validates the neutral canonical starter, not agent-generated trial applications.
- `apps/web/src/App.tsx` and `apps/server/src/app.ts` remain foundation-only. The repository has no Sparkta product agent adapter, trial runner, generated application, or generated-app lifecycle. Targeted repository search found no Playwright, Cypress, Puppeteer, or implemented `AgentAdapter`.
- Existing Issue #5 artifacts record the accepted starter boundary and passing clean-copy install/build/assigned-port proof. Existing Issue #6 artifacts record the adopted generated-frontend quality contract, the copied checklist, and the boundary that contextual rendered quality is inferential rather than proven by static catalogue checks.
- `harness doctor --json` reported a usable but `degraded` envelope: the CLI, extensions, quality gate, and commit guidance are loaded; capture liveness is unmeasurable because telemetry capture is off, and the git-ai collector is not collecting because global Trace2 configuration prevented hook installation.
- Root `package.json` and `justfile` formatting scopes currently name Issue #5 and #6 work-item directories explicitly and do not name Issue #7 work-item documentation.

## Constraints

- Research may write only `project/work-items/7-run-repeated-prototype-0-generation-trials/research/00-research.md`; this stage does not design the trial procedure, create implementation tasks, define tests, or make architecture decisions.
- Prototype 0 remains a manual feasibility exercise. No Sparkta control UI, product backend, authentication, deployment, multi-app lifecycle, or product agent adapter exists or belongs in this parent scope (Parent Issue #4; `PRD.md` Prototype 0; `README.md`).
- Each trial must begin from a clean copy of the entire `templates/default/` boundary, including its independent lockfile, copied `AGENTS.md`, and copied `QUALITY-CHECKLIST.md` (`ADR-260815-blessed-frontend-starter`; `CORE-COMPONENT-260815-generated-frontend-contract`; `CORE-COMPONENT-260816-generated-frontend-quality`).
- Generated frontends must use the bundled stack, remain frontend-only with local/simulated data, add no arbitrary packages, and preserve `npm run build` and `npm run dev -- --host 0.0.0.0 --port <PORT>` (`CORE-COMPONENT-260815-generated-frontend-contract`, `templates/default/AGENTS.md`).
- The six copied checklist categories are finite PASS/FAIL classifications, not an aggregate score. Only conditional interaction and state rows may be `N/A` with a request-specific rationale; stack adherence, build, and runtime startup are mandatory (`templates/default/QUALITY-CHECKLIST.md`, `CORE-COMPONENT-260816-generated-frontend-quality`).
- The root `justfile` remains the authoritative Sparkta project command surface. Its existing `starter-check` proves the canonical starter contract but does not run generation trials or judge rendered design/control behavior (`CORE-COMPONENT-260806-project-command-interface`, `justfile:starter-check`).
- Processes, ports, and agent sessions are disposable runtime state; generated source is durable and application identity cannot depend on a port or session (`ADR-260812-filesystem-state-boundary`, `CORE-COMPONENT-260812-state-lifecycle`).
- Repository validation must remain Runner-independent, and Runner worktrees, locks, processes, results, logs, recovery, and cleanup remain Runner-owned and must not be inspected or modified (`CORE-COMPONENT-260813-soft-factory-runner-operation`).
- The repository contains no browser-automation dependency or rendered-interaction sensor. The existing runtime proof is an HTTP/HTML/marker smoke, while contextual design and interaction judgment remains inferential (`justfile:starter-check`; `project/work-items/6-codify-ui-generation-instructions-and-quality-checks/plan/assets/backpressure-coverage.md`).
- `package.json` and `templates/default/package.json` require Node.js 24; the starter’s independent lockfile and `npm ci` are the reproducible installation boundary.
- `package.json` and root `justfile` formatting commands explicitly scope work-item documentation to Issues #5 and #6; Issue #7 research path is not currently included.

## Relevant ADRs and Core-Components

- **`ADR-260815-blessed-frontend-starter` — Blessed Frontend Starter Architecture:** Fixes `templates/default/` as the independent, copyable, lockfile-owning starter and requires the blessed stack, local/mock data, and direct build/assigned-port runtime contracts.
- **`ADR-260812-foundation-stack` — Sparkta Foundation Stack:** Sets Node.js 24/strict TypeScript for the repository and keeps the Sparkta web/server foundation separate from Prototype 0 and generated apps.
- **`ADR-260812-filesystem-state-boundary` — Filesystem State Boundary:** Reserves durable generated source under `.sparkta/apps/` and keeps ports/processes/sessions under disposable `.sparkta/runtime/`.
- **`CORE-COMPONENT-260815-generated-frontend-contract` — Generated Frontend Contract:** Governs the blessed stack, frontend-only isolation, bundled dependencies, direct npm scripts, assigned ports, and clean-copy expectations.
- **`CORE-COMPONENT-260816-generated-frontend-quality` — Generated Frontend Quality Contract:** Governs plausible request-relevant interactions, applicable states, realistic domain data, bounded visual quality, and the six-category checklist.
- **`CORE-COMPONENT-260812-state-lifecycle` — Durable and Runtime State Lifecycle:** Prevents generated app continuity or identity from depending on ports, processes, or agent sessions.
- **`CORE-COMPONENT-260806-project-command-interface` — Project Command Interface:** Keeps the root `justfile` authoritative for repository operations and validation.
- **`CORE-COMPONENT-260806-rpiv-stage-contract` — RPIV Stage Contract:** Requires stable work-item path resolution and restricts Research to findings, constraints, risks, and relevant architecture.
- **`CORE-COMPONENT-260806-agent-executable-acceptance-criteria` — Agent-Executable Acceptance Criteria:** Requires bounded, safe, repeatable, repository-accessible outcomes and identification of unavailable external prerequisites.
- **`CORE-COMPONENT-260813-engineering-harness-operation` — Engineering Harness Operating Contract:** Keeps harness validation delegated to the root `justfile` and allows a `degraded` doctor only for documented environmental attribution/capture warnings.
- **`CORE-COMPONENT-260813-soft-factory-runner-operation` — Soft Factory Runner Operating Contract:** Reserves Runner operational state and keeps project validation Runner-independent.

## Risks and Open Questions

- The repository does not implement a product coding-agent adapter or define the Prototype 0 agent invocation/result contract. Which configured agent capability produces a bounded result for each trial is conduct-stage information not resolved by existing source or architecture.
- The PRD examples differ in granularity: the engineering-productivity example is a single sentence, the autonomous-delivery example names several fields, and the customer-management example is a short request followed by an illustrative feature list. The issue does not state whether that surrounding list is part of the recorded prompt.
- The repository has no browser-automation dependency or rendered-interaction sensor. The existing `starter-check` HTTP smoke can establish browser-loadable HTML in the repository’s current terminology, but it does not establish a rendered page, control behavior, responsiveness, or contextual design quality.
- The Prototype 0 exit criterion “repeated prompts produce useful working prototypes” uses `useful` while the quality checklist explicitly has no aggregate score. The repository does not define how the three per-trial checklists compose into the final single exit verdict.
- Issue #7 requires improvements to be identified and any adopted improvement to trigger an affected-trial rerun, but neither the issue nor existing artifacts defines who adopts an improvement, what counts as adoption, or how the original and rerun are compared.
- The canonical `starter-check` deletes its temporary copy, while the issue needs comparable trial records. The repository has no existing per-trial artifact location or schema.
- The root formatting scope omits the Issue #7 work-item path, creating a risk that authoritative full validation will not check this new artifact’s Prettier conformance unless the scope is changed later.
- Harness Doctor is degraded only for environmental capture/mattribution readings, but git-ai attribution is currently not being collected. The reported next actions remain unresolved environment concerns.
