# Research Brief: Codify UI-generation instructions and quality checks

## GitHub Issue

- **Issue:** #6
- **Title:** Codify UI-generation instructions and quality checks
- **Work Item:** project/work-items/6-codify-ui-generation-instructions-and-quality-checks

## Scope Classification

- **Scope Type:** issue

## Problem Statement

Prototype quality depends on strict, reusable instructions that constrain architecture, interaction, mock data, visual design, and modification behavior. Issue #6 belongs to Prototype 0 and concerns codified UI-generation guidance plus a repository-local quality checklist.

## Acceptance Criteria

- [ ] Agent instructions require frontend-only prototypes with simulated domain-specific data and independently runnable output.
- [ ] Instructions require plausible behavior for relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes.
- [ ] Instructions cover appropriate loading, empty, error, success, disabled, hover, and selected states.
- [ ] Instructions prohibit unnecessary backend services, databases, Docker, authentication infrastructure, and external API requirements.
- [ ] Instructions discourage the PRD's listed stereotypical AI-interface patterns and require hierarchy, purposeful density, coherent spacing, typography, responsive layout, and realistic content.
- [ ] A repository-local evaluation checklist maps directly to design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup.

## Repository Findings

- GitHub Issue #6 contains one structured `ACCEPTANCE_CRITERIA_START`/`ACCEPTANCE_CRITERIA_END` block and six unchecked Markdown checkboxes, reproduced above in issue order. It is labeled `feature` and `story`.
- `PRD.md` sections 1, 5-7, and 22-24 define frontend-only UI simulations, simulated domain data, independently runnable output, plausible controls, applicable UI states, and the visual-design quality bar. Section 24 explicitly lists both the stereotypical patterns to avoid and the preferred hierarchy, density, spacing, typography, information architecture, responsiveness, and content qualities.
- `PRD.md` sections 25-29 fix the generated-application stack, starter-template premise, dependency policy, assigned-port development command, and build command. Section 51 defines success as build, startup, faithful visual representation, plausible major controls, story-supporting sample data, and a result that is not an unfinished scaffold.
- `PRD.md` Prototype 0 (`# Prototype 0 — Can We Generate?`) limits scope to manual directory creation, agent invocation, build, and development-server startup, and names design quality, instruction quality, frontend stack, mock-data quality, and build reliability as validation concerns.
- `templates/default/AGENTS.md` currently governs bundled dependencies, arbitrary-package prohibition, frontend-only local/mock data, prohibited service dependencies, direct build/runtime contracts, and source-owned primitives. It does not currently contain the PRD interaction catalogue, state catalogue, domain-data realism rules, stereotypical-pattern warnings, or preferred visual qualities.
- The generated starter is a standalone package (`templates/default/package.json`) outside the root workspace graph (`package.json:workspaces`) with its own lockfile. It bundles React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style utilities, and Recharts, and exposes only `dev` and `build` scripts.
- The starter source is a neutral static landing page (`templates/default/src/App.tsx`) with local highlight strings, one source-owned Radix-backed button (`templates/default/src/components/ui/button.tsx`), minimal global CSS (`templates/default/src/index.css`), and a Recharts re-export (`templates/default/src/chart-support.ts`). It provides no existing prototype interaction or state catalogue.
- Root `justfile:starter-check` audits the blessed dependency set, standalone scripts, lockfiles, prohibited service/data-source terms, clean-copy build, assigned-port startup, browser-loadable HTML, and cleanup. It does not evaluate design quality, instruction completeness, domain mock-data quality, or the PRD visual and interaction rules.
- `apps/web/src/App.tsx` and `apps/web/src/foundation.test.ts` are intentionally limited to the Sparkta foundation identity and contain no generated-prototype quality behavior. `README.md`, `docs/README.md`, and `project/architecture/README.md` likewise state that Prototype 0 and generated-app lifecycle are not implemented.
- A repository search found no file named for an evaluation, checklist, or quality artifact, and no current live starter guidance outside the PRD containing the required state and design-quality catalogues.

## Constraints

- Generated outputs must stay within the adopted standalone frontend boundary: local/mock data only; no backend, database, authentication, infrastructure, runtime fetch, or external-data dependency (`ADR-260815-blessed-frontend-starter`, `CORE-COMPONENT-260815-generated-frontend-contract`).
- Generated frontends must use the already bundled blessed stack and cannot add arbitrary packages without an explicitly adopted allowlist change (`templates/default/AGENTS.md`, `CORE-COMPONENT-260815-generated-frontend-contract`).
- Every generated frontend must preserve `npm run build` and `npm run dev -- --host 0.0.0.0 --port <PORT>` and remain independent of Sparkta services (`CORE-COMPONENT-260815-generated-frontend-contract`).
- The canonical copy source remains `templates/default/`, outside root npm workspaces and with its independent manifest and lockfile (`ADR-260815-blessed-frontend-starter`).
- Root `justfile` recipes are the authoritative repository operating and validation interface; wrappers may delegate but must not duplicate command bodies (`CORE-COMPONENT-260806-project-command-interface`).
- Acceptance language must remain bounded, observable, repository-accessible, and solution-neutral; unavailable subjective or manual-only prerequisites cannot be assumed (`CORE-COMPONENT-260806-agent-executable-acceptance-criteria`).
- Research is limited to findings, constraints, relevant architecture, risks, and open questions. The stable issue path is `project/work-items/6-codify-ui-generation-instructions-and-quality-checks/`, and this stage may write only this research brief (`CORE-COMPONENT-260806-rpiv-stage-contract`).

## Relevant ADRs and Core-Components

- **`ADR-260815-blessed-frontend-starter` — Blessed Frontend Starter Architecture:** Establishes the canonical standalone starter, complete bundled UI stack, local/mock-data isolation, independent lockfile, and direct build/runtime contracts.
- **`ADR-260812-foundation-stack` — Sparkta Foundation Stack:** Establishes Node.js 24 and strict TypeScript while separating the Sparkta web/server foundation from generated applications and Prototype 0 behavior.
- **`ADR-260812-filesystem-state-boundary` — Filesystem State Boundary:** Distinguishes durable generated source from disposable process and port state; it does not define generated-app lifecycle behavior.
- **`CORE-COMPONENT-260815-generated-frontend-contract` — Generated Frontend Contract:** Governs stack adherence, frontend-only local/mock data, dependency isolation, direct commands, assigned ports, and clean-copy validation.
- **`CORE-COMPONENT-260806-project-command-interface` — Project Command Interface:** Makes the root `justfile` the authoritative project command surface.
- **`CORE-COMPONENT-260806-agent-executable-acceptance-criteria` — Agent-Executable Acceptance Criteria:** Requires bounded, deterministic, observable, repository-executable outcomes.
- **`CORE-COMPONENT-260806-rpiv-stage-contract` — RPIV Stage Contract:** Governs the Research-only content boundary and stable work-item directory resolution.
- **`CORE-COMPONENT-260812-development-standards` — TypeScript Development Standards:** Governs Sparkta application code while explicitly allowing generated applications to follow their separately adopted generated-app standard.
- `project/architecture/ADR/DECISION-LOG.md` registers all three accepted ADRs and the adopted core-components; decisions 58-64 are the existing generated-frontend decisions.

## Risks and Open Questions

- Terms such as “plausible,” “appropriate,” “purposeful density,” and “quality” depend on the requested domain and may be interpreted inconsistently without a bounded evaluation vocabulary.
- The repository has starter-local guidance in `templates/default/AGENTS.md`, while `PRD.md` section 22 sketches a broader instruction system that does not exist. The issue does not identify which repository-local instruction surface is authoritative for Prototype 0 agent invocation.
- The acceptance criteria require direct checklist mapping but do not specify scoring, pass thresholds, checklist granularity, or how conditional controls and states are treated when irrelevant to a requested interface.
- Prototype 0 names five validation concerns, whereas the issue checklist names six and adds runtime startup explicitly; the relationship between “build reliability” and per-run build/startup checks is not further defined.
- Existing deterministic validation covers stack, build, and startup, but design, instruction, and mock-data quality include contextual judgments not represented by current repository commands.
- The neutral starter intentionally has no representative domain workflow, so current starter content cannot establish how domain realism, interaction relevance, or state applicability should be judged across different prompts.
