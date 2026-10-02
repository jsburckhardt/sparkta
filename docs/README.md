# Sparkta documentation

Sparkta is a local agent-powered UI prototyping environment for devcontainers and GitHub Codespaces. The current repository state is a development foundation only; product behavior is delivered through reviewed RPIV issues.

## Foundation

- Node.js 24 with pnpm
- React and Vite with strict TypeScript
- Tailwind CSS for styling
- Vitest for deterministic tests
- ESLint and Prettier for quality checks
- Root `justfile` as the command interface

Use `just setup` to enable the package-manager shim when pnpm is absent and restore the frozen dependency graph, `just run` for the local frontend, and `just verify` for the full repository validation. A fresh devcontainer delegates dependency setup to `just setup` after the inherited `.devcontainer/post-create.sh` hook; it requires the configured Node.js 24 feature to permit `corepack enable` and requires registry access for uncached packages. This correction was validated in the existing container, not by rebuilding a fresh container. The scaffold does not yet implement conversational generation, local persistence, session management, process ownership, or scheduling.

## Architecture and delivery

Foundational decisions and cross-cutting contracts are indexed in [`project/architecture/`](../project/architecture/). The confirmed local-persistence, explicit-error, process-cleanup, and development standards are contracts for future RPIV delivery, not claims of completed product implementations.

[Foreman operations](foreman.md) documents optional managed execution. Foreman remains above RPIV and does not replace its Research, Plan, Implement, and Verify stages. The configured delivery primitive reports GitHub identity plus fetched remote/base ancestry for merged deliveries, while nonmerged deliveries remain explicitly nonmerged. Bounded worker waits report either a wakeup or an ordinary timeout together with owned-pane liveness; transport failures remain non-zero errors.

## Controller host recovery

The tmux adapter resolves session options through the exact session ID returned by tmux, while names remain discovery checks only. Normal `tmux-foreman-launch` rejects any existing `foreman` session. If that recipe partially created an empty shell before controller startup, `tmux-foreman-recover` requires the bootstrap file plus expected session, window, pane, original pane PID, and repository path. Recovery rejects missing or changed identities, multiple windows or panes, a non-shell command, and a mismatched path before respawning the exact window through the shared `--yolo` launcher. It does not inspect history, inject keystrokes, parse Foreman state, or affect unrelated sessions.
