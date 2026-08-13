# Research Brief: Adopt the AI-Substrate engineering harness

## GitHub Issue
- **Issue:** #2
- **Title:** Adopt the AI-Substrate engineering harness
- **Work Item:** project/work-items/2-adopt-the-ai-substrate-engineering-harness

## Scope Classification
- **Scope Type:** issue

## Problem Statement
Sparkta has a stable root `justfile` command interface and runnable web/server foundation, but the AI-Substrate engineering harness is not yet a repository-integrated deterministic operating surface. In the current environment the harness CLI responds, while repository extensions, boot/readiness behavior, focused and full harness checks, and cold-agent guidance remain absent or incomplete. The issue requires harness adoption without displacing the existing root command contract.

## Acceptance Criteria
**Core**
- [ ] The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- [ ] GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- [ ] Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- [ ] Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- [ ] Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

**Verification**
- [ ] Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

## Repository Findings
- GitHub Issue #2 was fetched with `gh issue view 2 --json title,body,labels,assignees,milestone`. Its body contains one `ACCEPTANCE_CRITERIA_START`/`ACCEPTANCE_CRITERIA_END` block, grouped Markdown headings, and six checkbox criteria in the order preserved above. The issue is labeled `feature` and `in-progress` and identifies #9 as its parent.
- No existing `project/work-items/2-*` directory existed. Repository conventions in `project/README.md`, `project/work-items/README.md`, and `CORE-COMPONENT-260806-rpiv-stage-contract.md` therefore resolve the stable path to `project/work-items/2-adopt-the-ai-substrate-engineering-harness`.
- The branch is `issue-2-adopt-engineering-harness`. Before Research, the worktree already contained a modified `justfile` and untracked `.agents/`, `.harness/`, `ai-substrate-engineering-harness-0.13.0.tgz`, and `skills-lock.json`. Investigation left that baseline intact.
- The local tarball package metadata identifies `@ai-substrate/engineering-harness` version `0.13.0`, exposes `harness` and `engh` binaries, requires Node.js 22 or newer, and includes packaged skills. `harness` resolves from the active Node.js 24 installation at `/usr/local/share/nvm/versions/node/v24.19.0/bin/harness`; the global npm graph reports `@ai-substrate/engineering-harness@0.13.0`.
- The root `package.json`, `package-lock.json`, and root `npm ls --depth=0` contain no engineering-harness dependency. The harness installation is therefore present in this environment but is not represented in the repository npm dependency graph.
- Runtime inspection found `harness --version` returns `0.13.0`; `harness instructions` returns an `ok` envelope with the baked agent briefing; and `harness doctor --json` returns a structured `degraded` envelope. Doctor reports Node 24.19.0, no installed repository extensions, no harness verbs, and an unconfigured quality-gate surface. It also reports degraded capture liveness, a `git-ai` PATH problem, and missing harness commit guidance in `AGENTS.md`.
- `harness help --json` reports zero installed extensions and an empty `verbs` list. There is no `.harness/extensions/` directory, so harness boot, focused checks, and full checks are not currently available.
- `.harness/engineering-harness.md` exists as untracked governance material and points agents to `harness instructions`, but its Boot command, Checks command, Health check, Interact method, Observe method, deterministic signal inventory, evidence paths, and back-pressure sections remain TODOs. Its injection map records manual RPIV seams and says structural wiring is pending; its maturity snapshot remains L0.
- `.harness/flows/adopt.json` and `.harness/flows/adopt.md` record harness version 0.13.0 and place the flow cursor at `build-boot`. Install, scout, governance, and inject are marked done; `build-boot` and `bridge` remain assumed. Flow provenance records branch `main`, not the current issue branch.
- `.harness/reports/harnessability/001-sparkta/report.md` is a static assessment from branch `main` at commit `3f43b50790ed4b573e8889f2d2aca048c5900c69`. It assigns grade B, readiness H3, and a highest detected proof level of L3. It explicitly skipped dependency installation, service boot, validation execution, and runtime probes, and names absent harness checks, absent harness boot, and absent runtime readiness/smoke verdicts as current blockers.
- `.harness/skills.lock.json` records a packaged project-scope installation targeting `github-copilot`. `.agents/skills/` currently contains `eng-harness-0-harnessability-assessment`, `eng-harness-flow`, and `grill-agent-done`. Root `skills-lock.json` lists nine skills with local sources beneath `../../tmp/harness-skills-*`, while only three corresponding repository-local skill directories are present. Doctor reports GitHub Copilot agent hooks as already installed.
- Existing canonical cold-agent surfaces do not yet establish the harness front door. `AGENTS.md` defines RPIV and the root `justfile` as the default operating and validation interface; `LLM.txt` maps repository files without listing `.harness/` or `.agents/`; `README.md` and `docs/README.md` direct users and agents to `just --list`, `just run`, `just verify-focused`, and `just verify`; `.github/skills/README.md` states that APS is the only repository skill.
- The current root `justfile` exposes setup, run, test, lint, format-check, type-check, build, `verify-focused`, and `verify`. `verify-focused` delegates to the root `test:focused` npm script and runs `git diff --check`; `verify` composes root test, lint, format, type-check, build, and merge-base diff-integrity recipes. The pre-existing dirty diff adds a default recipe and changes setup from `npm ci` to `npm ci --include=dev`.
- `package.json` defines the current boot surface as `npm run dev`, using `concurrently --kill-others --success first` to start the Vite web workspace and Fastify server workspace. `apps/web/vite.config.ts` binds the web process to strict port 5173. `apps/server/src/main.ts` binds Fastify to `0.0.0.0` on `PORT` or 3000 and emits structured startup and shutdown events.
- `apps/server/src/app.ts#createServer` configures request IDs and an error boundary but registers no health, readiness, or product route. `apps/web/src/App.tsx` renders a foundation-only Sparkta page. Current runtime startup therefore exposes two processes and documented ports, but no application-defined network readiness verdict.
- Existing application tests are Vitest-based and local. `apps/server/src/app.test.ts` uses Fastify injection without a network listener; `foundation.test.ts` files assert foundation identity/messages; `logger.test.ts` checks structured event fields and redaction; and `errors.test.ts` checks safe error translation. No current test surface exercises live Vite/Fastify startup or browser interaction.
- The prior Issue #1 verification summary at `project/work-items/1-bootstrap-sparkta-and-coordinate-prototype-0/verify/summary.md` records a successful `just run` observation and complete root verification, but the current harnessability report did not repeat runtime or validation execution. README and architecture documentation explicitly left harness adoption to this follow-up issue.
- The configured devcontainer provisions Node.js 24, GitHub CLI, Copilot CLI, and `just` through `.devcontainer/devcontainer.json` and locked feature resolutions. It does not declare the engineering-harness package. Clean npm setup requires registry access; current application runtime and tests do not require external services or credentials.

## Constraints
- `CORE-COMPONENT-260806-project-command-interface.md` makes the root `justfile` the default operating surface, requires stable and distinct `verify-focused` and `verify` recipes, permits only a documented wrapper that delegates to root recipes, and prohibits standalone verification configuration that duplicates the root command bodies.
- `CORE-COMPONENT-260806-rpiv-stage-contract.md` limits Research to findings, constraints, risks, acceptance criteria, and relevant architecture. It also requires Implement and Verify validation to use root recipes by default and requires the existing issue work-item path to remain stable.
- The accepted foundation is Node.js 24, strict TypeScript, npm workspaces, React/Vite, Fastify, and Vitest under `ADR-260812-foundation-stack.md`. Dependencies must be declared in the consuming workspace and locked by the root npm lockfile under `CORE-COMPONENT-260812-development-standards.md`.
- The current application surface is intentionally foundation-only. `README.md`, `docs/README.md`, and `project/architecture/README.md` exclude product workflows, agent invocation, generated-app lifecycle, and public product APIs from the bootstrap.
- The configured boot command starts both web and server processes, uses fixed default ports 5173 and 3000, and is long-running until stopped. Vite uses `strictPort: true`; existing process or port state can affect startup.
- `CORE-COMPONENT-260812-observability.md` requires Node.js operational evidence to remain structured, correlated where applicable, and redacted of secrets, prompts, conversation content, and generated source. `CORE-COMPONENT-260812-error-handling.md` requires startup failures to be normalized, logged, and reflected by non-zero process status.
- `.sparkta/apps/` is durable and authoritative while `.sparkta/runtime/` is disposable and reconstructable under `ADR-260812-filesystem-state-boundary.md` and `CORE-COMPONENT-260812-state-lifecycle.md`. Harness artifacts currently live separately under `.harness/`; no implemented Sparkta durable state exists to reset.
- Repository instructions and architecture documentation currently identify the root `justfile` as canonical and explicitly describe harness adoption as future scope. Any delivered state must keep those documents internally consistent with the accepted command-interface contract.
- All pre-existing modified and untracked files are intentional inputs to this issue and must be preserved. In particular, the existing harness flow, governance scaffold, skills, assessment, tarball, and `justfile` diff cannot be treated as clean-checkout proof or overwritten during Research.

## Relevant ADRs and Core-Components
- `project/architecture/ADR/ADR-260812-foundation-stack.md` — fixes the Node.js 24/npm workspace runtime, current web/server package boundaries, and local bootstrap surface.
- `project/architecture/ADR/ADR-260812-filesystem-state-boundary.md` — separates authoritative `.sparkta/apps/` state from disposable `.sparkta/runtime/` coordination; the current issue must not blur harness artifacts with product state.
- `project/architecture/core-components/CORE-COMPONENT-260806-project-command-interface.md` — directly governs delegation to root recipes and preservation of focused/full verification.
- `project/architecture/core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md` — governs stage ownership, stable work-item paths, and root-recipe validation boundaries.
- `project/architecture/core-components/CORE-COMPONENT-260806-agent-executable-acceptance-criteria.md` — requires deterministic, bounded, repository-accessible, inspectable acceptance outcomes.
- `project/architecture/core-components/CORE-COMPONENT-260812-development-standards.md` — governs dependency declaration, lockfile reproducibility, workspace scripts, and root static/validation interfaces.
- `project/architecture/core-components/CORE-COMPONENT-260812-observability.md` — governs machine-readable and privacy-safe operational output from the current server surface.
- `project/architecture/core-components/CORE-COMPONENT-260812-error-handling.md` — governs safe startup and boundary failure reporting.
- `project/architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md` — constrains any interaction with future Sparkta durable or runtime state during boot.
- `project/architecture/ADR/DECISION-LOG.md` registers the two accepted ADRs and all adopted core-components above. It contains no existing harness-specific ADR or core-component.

## Risks and Open Questions
- The CLI is globally installed in the current container but absent from root manifests, lockfile, and devcontainer declarations. A cold or rebuilt configured environment may not reproduce the observed executable or version.
- All current harness governance, flow, skill, and assessment artifacts are untracked. They are visible in this working tree but unavailable to a cold session from the committed branch.
- Doctor currently returns `degraded`, not `ok`. It reports unrelated or adjacent environment concerns for capture liveness, `git-ai` PATH visibility, and missing commit guidance; the issue does not define whether a degraded but structured report is considered usable.
- No repository extension supplies boot or checks, and the governance file leaves all operational contracts as TODOs. Current flow status also stops before `build-boot`, so flow records do not establish readiness or successful boot.
- The static harnessability assessment predates the current branch state, records `main` provenance, and skipped the operations central to the issue acceptance criteria. Its B/H3/L3 ratings cannot establish current boot or check success.
- Root `skills-lock.json` points at transient `../../tmp/harness-skills-*` sources and lists more skills than are present under `.agents/skills/`. The intended complete GitHub Copilot harness skill set and the portability of this lock state are unresolved.
- Cold-agent discovery is split among `AGENTS.md`, `LLM.txt`, `.github/skills/`, `.agents/skills/`, and `.harness/`; the canonical entry point and precedence among these surfaces are not currently stated.
- The terms usable results, known state, inspectable evidence, harness readiness, focused harness checks, and configured development environment are not further defined in the issue. In particular, it is unclear whether boot must establish readiness for both web and server processes or one bootstrap surface.
- Fixed ports and a coupled long-running `just run` process can make boot sensitive to stale processes, occupied ports, termination timing, and partial startup. The current application has no network health/readiness route and no live browser automation surface.
- The working tree intentionally combines partial adoption artifacts with unrelated pre-existing `justfile` changes. Provenance and scope attribution may be difficult unless later stages distinguish the baseline from issue delivery without discarding it.
- Clean npm restoration depends on registry availability, while the harness package is locally available as a tarball and globally installed. The acceptance boundary between offline local availability and reproducible clean-environment installation remains unspecified.
