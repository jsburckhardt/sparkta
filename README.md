# Sparkta

[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)

Sparkta is a local, agent-powered environment for rapidly turning product ideas into interactive UI prototypes. This repository currently provides the Node.js 24 and strict TypeScript foundation: a minimal React/Vite web process, a minimal Fastify server process, and a deterministic engineering harness surface for humans and autonomous agents.

## Foundation scope

The foundation establishes buildable application boundaries, tests, standards, safe errors, structured logs, the root project command interface, and repository-local harness governance, extensions, and GitHub Copilot skills. It configures the ambient Soft Factory Runner for isolated RPIV delivery, but does **not** install or reimplement it, select an issue, implement product agent invocation, the Sparkta control UI, Prototype 0 behavior, generated-app lifecycle or a generated demo. The standalone blessed frontend starter is available under `templates/default/`.

## Cold setup

1. Open the repository in its Dev Container or Codespace for Node.js 24, npm, and `just`. The committed devcontainer does not install or provision the harness CLI.
2. Use the separately configured development environment that exposes the ambient harness, run `harness --version`, and require `0.13.0`. Repository npm state and `just setup` do not install it; it is intentionally absent from `package.json` and `package-lock.json`.
3. Run `just setup` from the repository root to install the exact Sparkta dependency graph.
4. Run `harness instructions`, `harness help --json`, and `harness doctor --json`. Read `harness instructions <verb>` before using a repository verb.
5. Require the separately configured ambient `soft-factory-runner` 0.1.0 CLI, then run `soft-factory --help`, `soft-factory instructions --json`, and `soft-factory doctor --json`. Repository npm, lockfile, setup, and devcontainer state do not install it.
6. Run `just --list` to inspect the authoritative project recipes.

A `degraded` doctor envelope is usable only when the CLI, extensions, quality gate, skills, and commit guidance are loaded. The expected environment-only findings identify disabled harness telemetry capture and a git-ai binary that is installed but not on the editor PATH; follow each doctor `next_action` when that capability is needed.

## Deterministic harness surface

| Command                                     | Purpose                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `harness checks focused [test-path] --json` | Delegate exactly once to `just verify-focused [test-path]`                            |
| `harness checks full --json`                | Delegate exactly once to `just verify`                                                |
| `harness boot --json`                       | Reconcile owned state, start `just run`, prove both services, and compose full checks |
| `harness readiness --json`                  | Recheck the Vite marker and Fastify readiness verdict for the owned runtime           |
| `harness stop --json`                       | Stop only the verified owned process group and release both ports                     |
| `harness instructions commit`               | Explain the attribution-aware commit path                                             |
| `harness commit "<message>" -- <paths>`     | Commit explicit pathspecs and report confirmed or named attribution state             |

Successful boot leaves the foundation running. Always finish with `harness stop --json`. Transient ownership, the latest structured evidence, and the boot log are confined to `.harness/temp/boot/`; they never use the product state roots. The complete operating contract is [`.harness/engineering-harness.md`](.harness/engineering-harness.md).

## Authoritative project recipes

| Recipe                                  | Purpose                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| `just setup`                            | Recreate dependencies from the committed lockfile                                      |
| `just run`                              | Start the minimal web and server processes                                             |
| `just test`                             | Run all workspace tests                                                                |
| `just lint`                             | Check application source                                                               |
| `just format`                           | Format application and affected operating documentation                                |
| `just format-check`                     | Check application and operating-document formatting                                    |
| `just type-check`                       | Type-check both workspaces                                                             |
| `just build`                            | Build both workspaces                                                                  |
| `just verify-focused [test-path]`       | Run one selected Vitest target, or all tests when omitted, plus diff integrity         |
| `just starter-check`                    | Prove a clean starter copy installs, builds, serves on an assigned port, and cleans up |
| `just trial-init <trial> <attempt>`     | Create an overwrite-safe full starter copy for an allowlisted Issue 7 trial            |
| `just trial-generate <trial> <attempt>` | Run one app-bounded Copilot generation with a finite 600-second timeout                |
| `just trial-validate <trial> <attempt>` | Audit, install, build, HTTP-smoke, and clean one trial attempt                         |
| `just trials-check`                     | Validate the Issue 7 evidence graph, rerun bounds, and verdict arithmetic              |
| `just verify`                           | Run the complete static, test, build, starter, and diff-integrity suite                |

The root [`justfile`](justfile) owns all project command bodies. Harness checks supplement that interface and never duplicate or replace the focused or full recipes.

## Blessed frontend starter

[`templates/default/`](templates/default/) is the canonical, copyable generated-frontend package. It is intentionally outside the root npm workspaces and owns its package manifest and lockfile. The bundle includes React, strict TypeScript, Vite, Tailwind CSS, Lucide, a Radix-backed shadcn-style source component and utilities, plus Recharts for interfaces that need charts. The neutral page uses only local mock content and requires no Sparkta server, backend, database, authentication, external infrastructure, or external data.

```bash
cp -R templates/default /tmp/sparkta-app
cd /tmp/sparkta-app
npm ci
npm run build
npm run dev -- --host 0.0.0.0 --port 6017
```

Coding agents must follow the copied [`templates/default/AGENTS.md`](templates/default/AGENTS.md): use realistic domain-specific simulated data, implement relevant interactions and applicable states, remain frontend-only, use bundled dependencies, and must not install arbitrary packages. A future dependency addition requires an explicitly adopted architecture allowlist change.

Every copy also carries [`templates/default/QUALITY-CHECKLIST.md`](templates/default/QUALITY-CHECKLIST.md). Its six direct pass/fail categories are design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup. Only conditional interaction/state checks may be N/A, with a request-specific rationale. Run `just starter-check` at the repository root for deterministic canonical/copied-document assertions, malformed-copy rejection, temporary-copy install/build/startup, assigned-port HTTP marker, failure cleanup, and lockfile proof. The static catalogue checks do not automate contextual visual judgment; reviewers record rendered evidence using the bounded checklist vocabulary.

## Prototype 0 generation trials

Issue 7 adds a manual, evidence-producing trial surface; it does not add a Sparkta product agent adapter or generated-app lifecycle. The fixed trial IDs are `01-engineering-productivity`, `02-autonomous-delivery`, and `03-customer-management`; attempt IDs are `01-initial` and, only after an adopted canonical improvement, `02-rerun`. Operate them only through the root recipes above. Initialization refuses overwrite, generation confines Copilot path access to the copied `app/` and records unavailable/auth/timeout outcomes, validation uses locked dependencies and an assigned nondefault port, and cleanup removes only owned runtime processes and non-durable artifacts.

Durable records live under [`project/work-items/7-run-repeated-prototype-0-generation-trials/implementation/trials/`](project/work-items/7-run-repeated-prototype-0-generation-trials/implementation/trials/). Each attempt contains its exact prompt, bounded agent result, operational/control evidence, complete app copy, and completed quality checklist. `just trials-check` validates record completeness, findings dispositions, at-most-one rerun, and the fixed rule that all three latest attempts must pass for the overall verdict to pass. HTTP proof establishes browser-loadable HTML only; no screenshot, DOM-event, console, viewport, or real-browser automation is claimed. Never call the issue-local helper directly or access Runner-owned state.

The recorded initial run produced two passing trials and one honest customer-management generation timeout, so the Issue 7 overall evidence verdict is **FAIL** with that exact blocker. No canonical starter/instruction improvement was adopted and no rerun was created.

## Soft Factory Runner operations

Runner Doctor is the authority for repository Runner readiness; harness Doctor covers the separate engineering-harness surface. The configured environment owns the CLI, while the repository owns the user- and model-invocable [`runner-dispatcher`](.github/agents/runner-dispatcher.agent.md) facade. The caller must supply exactly one explicit positive `<ISSUE_NUMBER>`; never queue, rank, infer, or select an issue. Runner alone owns its worktrees, locks, processes, snapshots, recovery, logs, and cleanup.

| Operation                              | Invocation                                                         |
| -------------------------------------- | ------------------------------------------------------------------ |
| Discover the immutable Runner contract | `soft-factory instructions --json`                                 |
| Evaluate Runner readiness              | `soft-factory doctor --json`                                       |
| Dispatch through Copilot               | Invoke `runner-dispatcher` with one explicit positive issue number |
| Direct CLI equivalent                  | `soft-factory run --issue <ISSUE_NUMBER> --json`                   |

The dispatcher runs instructions and Doctor directly, returns Doctor remediation without dispatch when `ready` is false, and otherwise runs the direct issue command exactly once. Its structured result distinguishes dispatch acceptance from ticket completion. It never invokes RPIV itself or manages Runner lifecycle resources.

## Readiness API and configuration

`GET /api/readiness` returns HTTP 200 with the exact non-sensitive body:

```json
{ "foundation": "sparkta-server", "status": "ready" }
```

| Setting or option           | Default | Purpose                                                          |
| --------------------------- | ------: | ---------------------------------------------------------------- |
| `PORT`                      |  `3000` | Fastify listener and harness server probe; must differ from 5173 |
| `LOG_LEVEL`                 |  `info` | Pino server log level                                            |
| `harness boot --timeout-ms` | `60000` | Bounded readiness polling; accepts 1000 through 120000 ms        |

The Vite foundation uses fixed port 5173. Boot refuses occupied fixed ports without signalling the unknown owner. On Linux/Node.js 24, cleanup validates the live PID start time, `just run` command, and `/proc` process-group membership against ownership metadata immediately before any negative process-group signal. A mismatch is stale state and is removed without signalling that recorded group.

## Skills and agent discovery

Engineering-harness validation requires non-empty `SKILL.md` files for exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` beneath [`.agents/skills/`](.agents/skills/). [`.harness/skills.lock.json`](.harness/skills.lock.json) records packaged-source provenance only; it does not authorize additional names. The Runner facade is a [VS Code agent](.github/agents/runner-dispatcher.agent.md), not a skill. Cold agents start from [`AGENTS.md`](AGENTS.md), [`LLM.txt`](LLM.txt), and the [skill index](.github/skills/README.md).

## State boundaries and evidence

Future durable generated-application files belong under `.sparkta/apps/`. Reconstructable product runtime coordination belongs under `.sparkta/runtime/` and must be safe to delete while Sparkta is stopped. Harness runtime evidence is a separate transient boundary under `.harness/temp/boot/`. Runner worktrees use `.trees/`; Runner configuration is committed at `.soft-factory/config.yml`, while all other `.soft-factory/` descendants are ignored Runner-owned state.

- [`apps/web/`](apps/web/) — minimal React/Vite foundation and tests
- [`apps/server/`](apps/server/) — Fastify foundation, readiness route, safe errors, logs, and tests
- [`templates/default/`](templates/default/) — standalone blessed generated-frontend starter
- [`docs/README.md`](docs/README.md) — detailed setup, API, configuration, operation, and cleanup guide
- [`project/architecture/`](project/architecture/) — accepted ADRs and adopted cross-cutting contracts
- [`project/work-items/`](project/work-items/) — RPIV plans and evidence

The trial surface is local, manual, and evidence-only: it adds no product API, configuration option, data migration, deployment procedure, or generated-app lifecycle. The starter is additive and local-only: it adds no product API, database, authentication, configuration migration, external infrastructure, server deployment, or generated-app lifecycle procedure. Harness and Runner adoption are also additive and require no API or data migration. Runner configuration remains protocol 1 with safe roots, final `just verify`, and concurrency 1; do not hand-edit Runner state. There is no server deployment procedure for this local-only foundation.
