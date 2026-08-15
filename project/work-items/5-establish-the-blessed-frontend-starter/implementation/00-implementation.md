# Implementation Notes: Establish the blessed frontend starter

## Scope

Implemented T-1 through T-5 in dependency order for GitHub Issue #5. The implementation remains within `ADR-260815-blessed-frontend-starter` and `CORE-COMPONENT-260815-generated-frontend-contract`; it does not add generated-app lifecycle behavior or change GitHub acceptance state.

## Completed Tasks

- **T-1:** Added `templates/default/` as a standalone package outside root workspaces with its own `package.json`, `package-lock.json`, strict TypeScript, Vite, Tailwind, React entry point, and direct npm scripts.
- **T-2:** Added local/mock starter content, Lucide usage, a source-owned Radix Slot/shadcn-style button with bundled utilities, a Recharts resolution module, and starter-local `AGENTS.md` dependency policy.
- **T-3:** Added root `just starter-check`, composed it into `just verify`, and proved clean copy, locked install, build, dynamic assigned-port startup, HTTP/HTML marker response, success and failure cleanup, released ports, unchanged lockfiles, and removed temporary state.
- **T-4:** Preserved valid application documentation, restored `AGENTS.md` from `origin/main`, and inserted only the intended `templates/default` application-boundary line.
- **T-5:** Re-executed corrected V-5/V-6 scope gates, focused and full root validation, runtime cleanup, evidence recording, and managed handoff preparation without changing GitHub acceptance state.

## Acceptance Evidence

### AC-1 — Complete blessed frontend stack

- `templates/default/package.json` and its independent lock declare and lock React/React DOM, TypeScript, Vite, Tailwind CSS/PostCSS, Lucide, `@radix-ui/react-slot`, class-variance-authority, clsx, tailwind-merge, and Recharts.
- `src/index.css`, `src/App.tsx`, `src/components/ui/button.tsx`, and `src/chart-support.ts` prove Tailwind, Lucide, a Radix-backed source-owned shadcn-style component, utility composition, and Recharts module/type resolution.
- Final `just starter-check` reported `11 blessed packages declared and locked`; strict `tsc -b` and Vite build passed.

### AC-2 — Frontend-only and self-contained

- Starter state and displayed data are source-local constants; no runtime network request exists.
- The starter audit rejects fetch, Axios, Fastify, Express, Prisma, Sequelize, Firebase, Supabase, and Passport references in source/manifest.
- `templates/default/AGENTS.md` prohibits backend, database, authentication, external infrastructure, runtime fetch, and external data requirements. Runtime proof used only the copied frontend package.

### AC-3 — Direct build

- `templates/default/package.json` exposes `build: tsc -b && vite build`.
- The clean temporary copy ran `npm ci --include=dev` then `npm run build`; output included `dist/index.html`, CSS, and JavaScript assets.
- Final full root validation reran and passed this build contract.

### AC-4 — Assigned host and port

- The starter exposes `dev: vite`, forwarding arguments after `npm run dev --`.
- Final full validation launched exact commands `npm run dev -- --host 0.0.0.0 --port 43619` and the cleanup-path run on dynamic port `43001`; neither used default 5173 or 3000.
- Both owned process groups were stopped and both ports were proven released with bounded retries.

### AC-5 — Bundled dependency guidance

- `templates/default/AGENTS.md`, `README.md`, and `docs/README.md` direct agents to bundled packages and prohibit arbitrary installation unless an explicitly adopted architecture change adds an allowlist entry.
- Root static assertions compare this guidance with the starter manifest and require the cold-agent maps to resolve `templates/default/`.

### AC-6 — Clean copy and browser-loadable page

- Final full validation copied only `templates/default/.` to `/tmp/sparkta-starter.MjMP7H`, confirmed no `node_modules` or `dist`, and recorded lock checksum `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7` before/after install.
- The dynamic-port request returned HTTP 200, `text/html`, and `data-sparkta-starter="ready"`.
- A deliberate missing-marker assertion failed as expected, after which the owned process stopped, port 43001 was released, the root and copied lockfiles were unchanged, and the temporary copy was removed.

## V-1 through V-6 Evidence

- **V-1:** Root static assertions require the global Accepted/Adopted artifacts, decision rows 58-64, and absence of issue-local architecture artifacts. Template files remain unchanged by this issue.
- **V-2:** Manifest/lock/source/guidance audits run at the start of `starter-check`; final result reported all required bundled dependencies and no prohibited service source.
- **V-3:** Clean copy, `npm ci`, unchanged lock checksum, strict TypeScript/Vite build, built artifact listing, and temporary removal passed.
- **V-4:** Exact assigned-host/port commands, bounded polling, HTTP 200, HTML marker, owned process-group cleanup, bounded port release, and deliberate failure cleanup passed.
- **V-5:** Existing README/docs/architecture/starter guidance remains accurate. The corrected `AGENTS.md` byte-compares equal to `origin/main` plus one exact insertion and has one additive hunk with zero deletions.
- **V-6:** `just --list` exposes `starter-check`, `verify-focused`, and `verify`; correction-cycle focused/full wrappers delegated to the authoritative root recipes and passed with complete issue-scope inspection.

## Documentation Evidence

- **README and usage:** `README.md` documents location, copy boundary, full stack, local/mock scope, dependency policy, direct npm commands, and `just starter-check`.
- **Detailed configuration/operations:** `docs/README.md` documents assigned `<PORT>`, exact direct commands, root clean-copy validation, process/temp cleanup, and copied lockfile ownership.
- **Architecture explanation:** `project/architecture/README.md` links the accepted ADR and adopted generated-frontend contract and distinguishes the starter from future lifecycle behavior. `DECISION-LOG.md` contains registry entries and decisions 58-64 from Plan.
- **Agent-facing maps:** `AGENTS.md` adds the standalone application boundary; `LLM.txt` maps the manifest, lock, guidance, source, ADR, and core-component.
- **API impact:** No API contract or behavior changed; the starter does not call the existing readiness API.
- **Configuration impact:** No Sparkta configuration default changed. The starter accepts caller-assigned ports through direct Vite arguments.
- **Migration impact:** No breaking, data, API, or configuration migration is required.
- **Operations/deployment impact:** Local copy/build/dev and owned validation cleanup are documented. No server deployment, authentication, database, or external-infrastructure procedure was added.

## Validation Results

### Focused

Correction-cycle `harness checks focused --json` delegated to `just verify-focused` and passed in 4.732 seconds: 6 test files and 13 tests passed, with harness governance and diff integrity.

### Full

Correction-cycle `harness checks full --json` delegated to `just verify` and passed in 44.447 seconds: 13 workspace tests, lint, Prettier, type checks/builds, starter audits, clean-copy install/build, runtime success/failure cleanup, and diff integrity. Runtime ports 33975 and 46141 were released, `/tmp/sparkta-starter.Q9dTyP` was removed, lockfiles stayed unchanged, and `harness stop --json` released owned ports 3000/5173.

## Harness Observations

The correction drains saved tooling observations to retro records 003 through 007 under `.harness/records/retro/2026-08-15/`, then cleared the transient buffer. They record the unavailable callable host Skill tool, missing `python` executable fallback to Node.js, inherited `/etc/bash.bashrc` `PS1` warning, multiline-edit retry, and repeated managed-commit attempts losing the git-ai socket after successful probes before diagnosing the actual unavailable SSH signing-agent socket and applying a temporary local signing override. Earlier implementation observations remain in records 001 and 002.

## Verify Return and Plan Correction

Verify returned the implementation because the complete issue diff showed destructive, unrelated `AGENTS.md` formatting even though AC-1 through AC-6 product behavior and independent full validation passed. The corrected Plan narrowed T-4/T-5 and V-5/V-6 to preserve every `origin/main` byte except the intended application-boundary insertion. No product architecture or acceptance criterion changed.

### Corrected AGENTS scope proof

- Generated expected bytes directly from `git show origin/main:AGENTS.md` by inserting `  - templates/default is the standalone blessed generated-frontend copy source outside root workspaces.` immediately after the unique `apps/server` boundary.
- Byte comparison passed: branch `AGENTS.md` is exactly 31,322 bytes with SHA-256 `ec65911e2ab6b2bf90b1a99b0c0b5cb24537391f9ac039ce6546f74065c34d5f`; the source `origin/main` bytes hash to `c11312afafdb69c4da28a4d070ae28b68754f26f59fdf11d0a2489fbc3295c54`.
- `git diff --unified=0 origin/main -- AGENTS.md` contains exactly one hunk at `@@ -62,0 +63 @@`, adding only the intended line. `git diff --numstat` reports `1 0 AGENTS.md`, and `git diff --check` passes.
- Because expected and actual files are byte-identical, issue-generator YAML indentation/list layout, agent metadata/contracts, and every `>>` terminator match `origin/main` unchanged.

### Acceptance evidence continuity

The correction changes no starter product bytes. AC-1/AC-2 remain evidenced by the declared/locked blessed stack and frontend-only local data audit; AC-3/AC-4 by the clean-copy build and exact assigned-port command; AC-5 by starter/README/docs bundled-dependency guidance plus the corrected cold-agent-map byte proof; and AC-6 by HTTP 200/HTML marker, negative-path cleanup, released ports, unchanged lockfiles, and removed temporary copy.

### Correction paths and documentation impact

The correction changes `AGENTS.md`, corrected Plan artifacts `plan/01-action-plan.md`, `plan/02-task-breakdown.md`, and `plan/03-test-plan.md`, this implementation note, and the post-coding retro record. Existing README, detailed usage/configuration/operations documentation, architecture explanation, LLM map, API no-impact statement, migration no-impact statement, and deployment no-impact statement remain valid and required no correction.

Final acceptance remains owned by Verify.
