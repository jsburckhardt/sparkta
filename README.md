# Sparkta

[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)

Sparkta is a local agent-powered UI prototyping environment for devcontainers and GitHub Codespaces. It turns reviewed product conversations into interactive React frontends backed by mock data. Source is durable; runtime sessions, processes, and ports are disposable.

## Goal

Establish a dependable development foundation so reviewed RPIV issues can deliver the product incrementally. The first product release is intended to use the real GitHub Copilot CLI for generation; that product capability is not implemented by bootstrap.

## Development status

This checkout contains only the foundational React, strict TypeScript, Vite, Tailwind CSS, Vitest, ESLint, and Prettier scaffold. It does not yet provide conversational generation, persistence engines, session management, process scheduling, or other product features.

## Commands

The root `justfile` is the operating interface:

| Recipe                | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| `just setup`          | Restore the frozen pnpm dependency graph         |
| `just run`            | Start the Vite development server                |
| `just test`           | Run deterministic Vitest tests                   |
| `just lint`           | Run ESLint                                       |
| `just format-check`   | Check application and project formatting         |
| `just type-check`     | Check strict TypeScript projects                 |
| `just build`          | Type-check and build the frontend                |
| `just verify-focused` | Run focused application and host-contract checks |
| `just verify`         | Run the complete configured verification suite   |

## Engineering workflow

Foreman owns repository missions; RPIV delivers one issue through Research, Plan, Implement, and Verify. Managed workers are optional and use isolated `.trees/issue-N` worktrees and `rpiv-N` windows in an owned `foreman` tmux session. Bootstrap configures capabilities but does not create a mission, issue, worktree, session, or worker.

See [Foreman operations](docs/foreman.md), [agent contracts](AGENTS.md), and [project architecture](project/architecture/README.md).
