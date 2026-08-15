# Implementation Notes: Establish the blessed frontend starter

## Scope

Implemented T-1 through T-5 in dependency order for GitHub Issue #5. The implementation remains within `ADR-260815-blessed-frontend-starter` and `CORE-COMPONENT-260815-generated-frontend-contract`; it does not add generated-app lifecycle behavior or change GitHub acceptance state.

## Completed Tasks

- **T-1:** Added `templates/default/` as a standalone package outside root workspaces with its own `package.json`, `package-lock.json`, strict TypeScript, Vite, Tailwind, React entry point, and direct npm scripts.
- **T-2:** Added local/mock starter content, Lucide usage, a source-owned Radix Slot/shadcn-style button with bundled utilities, a Recharts resolution module, and starter-local `AGENTS.md` dependency policy.
- **T-3:** Added root `just starter-check`, composed it into `just verify`, and proved clean copy, locked install, build, dynamic assigned-port startup, HTTP/HTML marker response, success and failure cleanup, released ports, unchanged lockfiles, and removed temporary state.
- **T-4:** Updated README, detailed docs, architecture overview, AGENTS and LLM cold-agent maps, commands, direct usage, dependency policy, and explicit non-impact statements.
- **T-5:** Executed V-1 through V-6 through root recipes, recorded evidence, drained harness observations, and prepared this Implement handoff without claiming final acceptance.

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
- **V-5:** README, detailed docs, architecture map, AGENTS, and LLM links/policies are statically required; stale starter-absence statements are rejected.
- **V-6:** `just --list` exposes `starter-check`, `verify-focused`, and `verify`; final `harness checks full --json` delegated to `just verify` and passed with starter validation composed.

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

`harness checks focused --json` delegated to `just verify-focused` after T-1, T-2, T-3, T-4, and T-5. Every final task run passed; the T-5 run reported 6 test files and 13 tests passed plus harness governance and diff integrity.

### Full

Final `harness checks full --json` delegated to `just verify` and passed in 48.331 seconds: 13 workspace tests, lint, Prettier check, workspace type checks/builds, static starter/documentation/architecture audit, clean-copy install/build, two runtime cleanup paths, and branch diff integrity. Earlier formatting and port-release race failures were corrected before this passing result.

## Harness Observations

The post-coding drain saved 13 observations to `.harness/records/retro/2026-08-15/001-5-establish-the-blessed-frontend-starter.md` and cleared the transient buffer. Highest-leverage encoded improvements were the root `format` recipe, an HTTP-observable source marker, and bounded port-release proof. Registry mirror discovery and the managed commit socket failure remain recorded friction for future environment encoding.

Final acceptance remains owned by Verify.
