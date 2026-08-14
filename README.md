# Sparkta

[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)

Sparkta is a local, agent-powered environment for rapidly turning product ideas into interactive UI prototypes. This repository currently provides the Node.js 24 and strict TypeScript foundation: a minimal React/Vite web process, a minimal Fastify server process, and a deterministic engineering harness surface for humans and autonomous agents.

## Foundation scope

The foundation establishes buildable application boundaries, tests, standards, safe errors, structured logs, the root project command interface, and repository-local harness governance, extensions, and GitHub Copilot skills. It configures the ambient Soft Factory Runner for isolated RPIV delivery, but does **not** install or reimplement it, select an issue, implement product agent invocation, the Sparkta control UI, Prototype 0 behavior, generated-app lifecycle, a generated demo, or the blessed generated-app starter.

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

| Recipe                            | Purpose                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `just setup`                      | Recreate dependencies from the committed lockfile                              |
| `just run`                        | Start the minimal web and server processes                                     |
| `just test`                       | Run all workspace tests                                                        |
| `just lint`                       | Check application source                                                       |
| `just format-check`               | Check application and operating-document formatting                            |
| `just type-check`                 | Type-check both workspaces                                                     |
| `just build`                      | Build both workspaces                                                          |
| `just verify-focused [test-path]` | Run one selected Vitest target, or all tests when omitted, plus diff integrity |
| `just verify`                     | Run the complete static, test, build, and diff-integrity suite                 |

The root [`justfile`](justfile) owns all project command bodies. Harness checks supplement that interface and never duplicate or replace the focused or full recipes.

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
- [`docs/README.md`](docs/README.md) — detailed setup, API, configuration, operation, and cleanup guide
- [`project/architecture/`](project/architecture/) — accepted ADRs and adopted cross-cutting contracts
- [`project/work-items/`](project/work-items/) — RPIV plans and evidence

Harness and Runner adoption are additive. They require no API or data migration. Runner configuration remains protocol 1 with safe roots, final `just verify`, and concurrency 1; do not hand-edit Runner state. There is no server deployment procedure for this local-only foundation.
