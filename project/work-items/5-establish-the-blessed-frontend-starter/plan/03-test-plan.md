# Test Plan: Establish the blessed frontend starter

## Test V-1: Architecture artifacts and decision registry are complete

- **Type:** Static architecture validation
- **Task:** T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Use the complete branch from the repository root with all pre-existing architecture artifacts and read-only templates available.

### Steps

1. Confirm `ADR-260815-blessed-frontend-starter.md` and `CORE-COMPONENT-260815-generated-frontend-contract.md` exist only under global architecture paths.
2. Compare their heading sequence with the ADR and core-component templates; confirm IDs equal full basenames, statuses are Accepted/Adopted, and creation date is 2026-08-15.
3. Confirm both templates are unchanged and no artifact path collision or issue-local architecture document exists.
4. Confirm the decision log registers both artifacts and actionable decisions 58-64 with the correct sources and date.
5. Confirm the ADR resolves location, workspace/lockfile boundary, complete stack, and clean-copy strategy, while the core-component owns reusable dependency, isolation, build, runtime, and validation rules.

### Expected Result

Both artifacts conform to their templates, all concrete choices and reusable contracts are globally owned, and the decision registry is complete and understandable without opening source documents.

### Expected Evidence

- Architecture path and heading audit.
- Template no-diff proof.
- Decision-log excerpts for both registry rows and decisions 58-64.

## Test V-2: Blessed dependencies and frontend-only scope are complete

- **Type:** Dependency and source inspection
- **Task:** T-1, T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-5
- **Priority:** Critical

### Setup

Use the completed canonical starter before installing dependencies. Inspect its manifest, lockfile, configuration, source, and guidance together with the root workspace declaration.

### Steps

1. Confirm `templates/default/` is not matched by the root workspace graph and contains its own package manifest and lockfile.
2. Confirm the manifest/lockfile provide React, TypeScript, Vite, Tailwind CSS, Lucide, Radix primitives, shadcn-style utility dependencies, and Recharts.
3. Confirm source/configuration demonstrate Tailwind, Lucide, and a Radix-backed source-owned component, and that TypeScript can resolve Recharts without requiring chart rendering.
4. Confirm starter content and state are local/mock and source/configuration contain no backend, database, authentication, external-infrastructure, external-data, or runtime fetch requirement.
5. Confirm starter guidance directs agents to bundled dependencies, prohibits arbitrary installs, and names architecture approval as the boundary for later additions.

### Expected Result

The standalone starter provides every AC-1 capability, has no AC-2 service dependency, and makes the AC-5 bundled-dependency policy explicit and consistent with its manifest.

### Expected Evidence

- Manifest and lockfile dependency excerpts.
- Source/configuration import and local-data audit.
- Prohibited-dependency/network scan result.
- Starter guidance excerpt.

## Test V-3: A clean starter copy installs and builds

- **Type:** Clean-copy build integration
- **Task:** T-1, T-3
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Create a temporary directory outside the repository, copy only `templates/default/`, and verify the copy has no `node_modules`, `dist`, cache, or inherited root-workspace files. Use Node.js 24 and npm.

### Steps

1. Record the copied file inventory, package-lock checksum, and clean temporary state.
2. Install exactly from the copied lockfile using the starter validation flow.
3. Confirm installation neither consults nor changes the Sparkta root lockfile and does not modify the copied lockfile.
4. Run `npm run build` from the clean copy.
5. Confirm strict TypeScript and Vite complete successfully and produce an `index.html` plus referenced assets.
6. Remove the temporary copy after evidence capture.

### Expected Result

A standalone clean copy installs deterministically and satisfies the exact build contract without access to a backend or root workspace.

### Expected Evidence

- Before/after inventory and lockfile checksums.
- Successful locked-install and `npm run build` output.
- Built artifact listing and temporary-copy cleanup proof.

## Test V-4: Assigned-port development startup serves a browser-loadable page

- **Type:** Runtime acceptance smoke test
- **Task:** T-1, T-3
- **Acceptance Criteria:** AC-4, AC-6
- **Priority:** Critical

### Setup

Use a freshly installed temporary starter copy. Allocate an available non-default port, retain ownership of the launched process, and configure bounded polling and guaranteed cleanup.

### Steps

1. Start exactly `npm run dev -- --host 0.0.0.0 --port <PORT>` with the allocated port and capture output.
2. Poll the assigned local URL only until the configured deadline.
3. Request `/` and require HTTP 200, HTML content type, and the committed application root/page marker.
4. Confirm the response and process do not require the Sparkta server or any external service.
5. Stop only the owned development process, verify the port is released, and remove the temporary copy.
6. Exercise one failed readiness/assertion path and confirm the same cleanup guarantees.

### Expected Result

The exact command honors an assigned host and port, serves a browser-loadable page within a finite bound, and leaves no process, listener, or temporary source behind.

### Expected Evidence

- Allocated port, exact argv, Vite readiness output, and bounded timing.
- HTTP status, content type, and page-marker assertion.
- Success/failure cleanup and released-port proof.

## Test V-5: Cold-agent dependency and application documentation is accurate

- **Type:** Documentation and usability validation
- **Task:** T-2, T-4
- **Acceptance Criteria:** AC-5
- **Priority:** High

### Setup

Begin from the root README as a cold coding agent without relying on implementation knowledge. Keep starter files, architecture records, and `just --list` available for comparison.

### Steps

1. Follow documentation to the canonical starter, architecture decision, generated frontend contract, and root starter-validation recipe.
2. Confirm the documented stack and local/mock-data boundary match starter files.
3. Confirm dependency guidance clearly says to use bundled packages, avoid arbitrary installation, and require an explicit architecture-approved allowlist for additions.
4. Confirm direct build and assigned-port commands are exact and distinguished from root `justfile` validation.
5. Confirm stale statements that the blessed starter is absent are removed from live docs and maps.
6. Confirm docs accurately state API, database, auth, migration, infrastructure, and deployment non-impact.

### Expected Result

A cold agent can find, copy, operate, and extend the starter without inventing dependencies or service requirements, and all affected application documentation is current.

### Expected Evidence

- Walkthrough with document sections and resolved links.
- Guidance-to-manifest and command-to-`just --list` comparisons.
- Documentation impact checklist and stale-reference scan.

## Test V-6: Root focused and full validation prove the starter contract

- **Type:** Project command-interface validation
- **Task:** T-2, T-3, T-4, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Use the completed implementation in the configured Node.js 24 environment. Ensure no prior starter development process or temporary copy is present.

### Steps

1. Run `just --list` and confirm the starter validation recipe is discoverable while existing project recipes remain available.
2. Run relevant `just verify-focused` targets during implementation and capture their bounded results.
3. Run the root starter validation recipe and confirm it performs V-2 through V-4 behavior from a temporary clean copy.
4. Run root `just verify` and confirm it composes starter validation with tests, lint, formatting, type checks, builds, harness governance, and diff integrity.
5. Confirm full validation leaves repository lockfiles unchanged, the working tree free of generated starter artifacts, all allocated ports released, and no owned process running.
6. Inspect the complete diff for issue scope and all AC-1 through AC-6 evidence mappings.

### Expected Result

The authoritative root interface deterministically proves all six criteria without bypassing the standalone direct npm contracts or leaving runtime residue.

### Expected Evidence

- `just --list`, focused validation, starter validation, and full `just verify` output.
- Per-AC evidence index linking V-1 through V-6 results.
- Unchanged-lockfile, released-port, no-process, diff-integrity, and clean-tree results.
