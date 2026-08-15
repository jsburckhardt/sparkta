# Task Breakdown: Establish the blessed frontend starter

## Task T-1: Create the standalone starter boundary

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** None
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4
- **Related ADRs:** ADR-260815-blessed-frontend-starter, ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract, CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-state-lifecycle

### Description

Create `templates/default/` as an independent, copyable npm package outside root workspaces. Add its own manifest and lockfile; React/TypeScript/Vite/Tailwind configuration; strict type-checking; HTML and React entry points; and direct `build` and argument-forwarding `dev` scripts. Use local source data only. Do not alter `apps/web`, create a backend, or implement generated-app lifecycle behavior.

### Acceptance Criteria

- AC-1: The package declares the complete blessed stack and has strict TypeScript/Vite/Tailwind source configuration.
- AC-2: Installation and runtime require no Sparkta server, backend, database, authentication, infrastructure, or external data.
- AC-3: The copied package exposes `npm run build`.
- AC-4: The copied package forwards host and port arguments through `npm run dev --`.

### Test Coverage

- V-2 audits package declarations, lockfile ownership, workspace exclusion, source imports, and prohibited service dependencies.
- V-3 executes a locked clean-copy install and `npm run build`.
- V-4 invokes the exact assigned-host/port development command.
- Add deterministic tests or static assertions for any exported starter utility behavior introduced.

### Expected Evidence

- `templates/default/` file inventory, package manifest, independent lockfile, TypeScript/Vite/Tailwind configuration, and source entry points.
- Dependency and source audit tied to AC-1 and AC-2.
- Passing clean-copy build and exact runtime-command transcripts.

## Task T-2: Provide bundled UI primitives and dependency guidance

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-2, AC-5
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract, CORE-COMPONENT-260812-development-standards

### Description

Add a minimal, working starter page that proves Tailwind styling, a Lucide icon, and a source-owned shadcn-style component composed from a Radix primitive and bundled utilities. Bundle Recharts and prove module/type resolution without requiring a chart in the neutral starter page. Keep all displayed data local/mock. Add concise starter-facing guidance that tells coding agents to use declared dependencies and forbids arbitrary package installation absent an architecture-approved allowlist.

### Acceptance Criteria

- AC-1: The source demonstrates the styling, icon, and Radix/shadcn-style component baseline, while Recharts is installed and resolvable for chart-requiring applications.
- AC-2: The starter page operates entirely from local source and mock content.
- AC-5: Guidance explicitly directs agents to bundled dependencies rather than package installation.

### Test Coverage

- V-2 checks each named dependency, representative source integration, Recharts resolution, local data, and prohibited dependencies/network calls.
- V-5 checks the guidance text against the manifest and architecture policy.
- V-6 runs static, type, build, and scope checks through the root interface.

### Expected Evidence

- Component, utility, CSS, icon, and local-content source paths.
- Successful TypeScript/module resolution including Recharts support.
- Guidance excerpt stating the bundled-dependency rule and explicit-addition boundary.

## Task T-3: Add deterministic root clean-copy validation

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-3, AC-4, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-agent-executable-acceptance-criteria, CORE-COMPONENT-260812-state-lifecycle

### Description

Extend the authoritative root `justfile` with a discoverable starter validation recipe and compose it into `verify`. Its test support must create a temporary clean copy without `node_modules` or build output, run a lockfile install and build, allocate an available port, start the exact development command on `0.0.0.0`, poll within a bound, request the page, assert HTTP/HTML/root markers, and terminate only the process it started. Keep raw operating command orchestration in the root recipe and avoid fixed or persisted port identity.

### Acceptance Criteria

- AC-3: Root validation proves `npm run build` in an isolated copied package.
- AC-4: Root validation proves the exact assigned-port command with a non-default available port.
- AC-6: One deterministic flow proves clean copy, install, build, startup, browser-loadable response, and cleanup.

### Test Coverage

- V-3 validates clean install and build with unchanged lockfile.
- V-4 validates assigned-port startup, HTTP response, browser page marker, bounded polling, and cleanup.
- V-6 proves the starter check is listed by `just --list` and included in full `just verify`.
- Exercise failure cleanup so no owned listener or temporary copy remains after a failed assertion.

### Expected Evidence

- Root `justfile` diff and any deterministic validation test support.
- Before/after temporary-directory, lockfile, listener, and process-cleanup proof.
- Successful HTTP status, content marker, build output, and root verification log.

## Task T-4: Update application and agent documentation

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3
- **Acceptance Criteria:** AC-5
- **Related ADRs:** ADR-260815-blessed-frontend-starter, ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract

### Description

Update README, detailed application documentation, architecture overview, and relevant cold-agent repository maps. Document the canonical location and copy boundary, standalone lockfile rationale, bundled stack, conditional Recharts use, local/mock-data boundary, dependency prohibition, exact direct npm contracts, and root validation recipe. Replace stale statements that the starter is absent. State that this adds no API, database, migration, deployment, authentication, or external infrastructure procedure.

### Acceptance Criteria

- AC-5: A cold coding agent is unambiguously told to use bundled dependencies and not install arbitrary packages.
- Documentation accurately describes all AC-1 through AC-6 operating contracts and architecture without claiming lifecycle implementation.

### Test Coverage

- V-5 performs a cold-agent documentation walkthrough and validates links, commands, dependency guidance, architecture IDs, and non-impact statements.
- V-6 checks formatting and stale starter-absence statements through full root verification and targeted inspection.

### Expected Evidence

- Updated README/docs/architecture and agent-map paths with working links.
- Command and dependency-guidance comparison against starter files and `just --list`.
- Documentation-impact record covering usage, configuration, architecture, migration, operations, API, and deployment.

## Task T-5: Execute validation and record the Implement handoff

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter, ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-agent-executable-acceptance-criteria, CORE-COMPONENT-260812-development-standards, CORE-COMPONENT-260812-state-lifecycle

### Description

Execute V-1 through V-6 in dependency order, using root `just verify-focused` during implementation and root `just verify` before handoff. Record task status, all per-AC evidence, clean-copy/runtime evidence, and application documentation impact in `implementation/00-implementation.md`. Commit through the required managed path and hand Verify the branch, exact SHA, changed paths, and clean-tree proof. Do not update GitHub checkboxes or claim final acceptance.

### Acceptance Criteria

- AC-1 through AC-6 each have reproducible implementation evidence and no unresolved validation failure.
- The implementation remains inside the accepted ADR and adopted core-component boundaries.
- The handoff includes documentation evidence, exact commit identity, and clean working-tree proof.

### Test Coverage

- Execute every V-1 through V-6 step; omissions or architecture divergence return to Plan.
- Run targeted root `just verify-focused` checks, then full root `just verify`.
- Recheck listener cleanup and repository status after runtime validation and commit.

### Expected Evidence

- `implementation/00-implementation.md` with task, AC, command, runtime, and documentation evidence.
- Passing focused and full root-validation logs.
- Exact implementation commit SHA, explicit changed-path inventory, and clean `git status`.
