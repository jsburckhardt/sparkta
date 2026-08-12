# Sparkta

[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)

Sparkta is a local, agent-powered environment for rapidly turning product ideas into interactive UI prototypes. This repository currently provides only the Node.js 24 and strict TypeScript foundation: a minimal React/Vite web process and a minimal Fastify server process.

## Bootstrap scope

This foundation establishes buildable application boundaries, tests, standards, safe errors, structured logs, and the project command interface. It does **not** implement harness adoption, the Soft Factory Runner, agent invocation, the Sparkta control UI, Prototype 0 behavior, generated-app lifecycle, a generated demo, or the blessed generated-app starter. Those capabilities remain in their ordered follow-up issues.

## Cold setup

1. Open the repository in a Dev Container or Codespace. If the current container predates this foundation, run **Dev Containers: Rebuild Container** from the editor command palette. The repository configuration provisions Node.js 24, npm, and `just`.
2. From the repository root, run `just setup` to install the exact dependency graph from the root lockfile.
3. Run `just --list` to discover the stable project command interface.

If Node.js or npm is unavailable, do not install an ad hoc version in the session; rebuild the repository devcontainer so the locked feature configuration supplies the required tools.

## Project commands

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

`just run` exposes the neutral web foundation on port 5173 and starts the server on port 3000. Stop both with Ctrl+C. These processes expose no product workflow or public product API.

## Configuration and state boundary

| Setting     | Default | Purpose                       |
| ----------- | ------: | ----------------------------- |
| `PORT`      |  `3000` | Minimal Fastify listener port |
| `LOG_LEVEL` |  `info` | Pino server log level         |

Future durable generated-application files belong under `.sparkta/apps/`. Reconstructable process, port, and agent-session coordination belongs under `.sparkta/runtime/` and must be safe to delete while Sparkta is stopped. This issue documents that contract but does not implement persistence or lifecycle services.

## Repository layout

- [`apps/web/`](apps/web/) — minimal React/Vite foundation and tests
- [`apps/server/`](apps/server/) — minimal Fastify foundation, typed errors, structured logging, and tests
- [`docs/README.md`](docs/README.md) — setup, operation, configuration, and architecture guide
- [`PRD.md`](PRD.md) — product direction; most described behavior remains future scope
- [`project/architecture/`](project/architecture/) — accepted ADRs and adopted cross-cutting contracts
- [`project/work-items/`](project/work-items/) — RPIV evidence and plans

There is no deployment or migration procedure for this initial local-only foundation.
