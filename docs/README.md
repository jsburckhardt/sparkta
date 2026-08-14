# Sparkta documentation

Sparkta is a local, agent-powered rapid UI-prototyping environment. The current repository is a foundational Node.js 24 and TypeScript workspace, not the Prototype 0 or control product described in the [PRD](../PRD.md).

## Development environment and setup

The repository-owned [devcontainer configuration](../.devcontainer/devcontainer.json) and [feature lock](../.devcontainer/devcontainer-lock.json) provide Node.js 24, npm, and `just`. The configured development environment also provides the ambient `@ai-substrate/engineering-harness` CLI at version 0.13.0. That ambient tool is not a Sparkta npm dependency and is not reproduced by `just setup`.

For a cold setup:

1. Open or rebuild the repository Dev Container for the Sparkta Node.js/npm/`just` toolchain; this does not provision the harness.
2. In the separately configured environment that exposes the ambient CLI, run `harness --version` and require `0.13.0`.
3. Run `just setup` for Sparkta dependencies.
4. Run `harness instructions`, `harness help --json`, and `harness doctor --json`.
5. Require ambient `soft-factory-runner` 0.1.0 and run `soft-factory --help`, `soft-factory instructions --json`, and `soft-factory doctor --json`; repository dependencies and provisioning intentionally do not install it.
6. Run `just --list` to inspect the root project interface.

If doctor is `degraded` only because harness telemetry capture is disabled or git-ai is not visible on the editor PATH, retain and follow the reported environment `next_action`. Repository adoption is not usable when extensions, quality gate, skills, or commit guidance are missing.

## Agent and operator workflow

Read [`.harness/engineering-harness.md`](../.harness/engineering-harness.md) and `harness instructions <verb>` before operating a verb.

```bash
harness checks focused apps/server/src/app.test.ts --json
harness boot --json
harness readiness --json
harness checks full --json
harness stop --json
```

The check extension is delegation-only: focused calls `just verify-focused [target]` and bare/full calls `just verify`. All project command bodies remain in the root [`justfile`](../justfile).

### Boot ownership and cleanup

Boot uses fixed web port 5173 and `PORT` or 3000 for the server. On Linux/Node.js 24 it reads `/proc/<pid>/stat` and `/proc/<pid>/cmdline` to require the live PID start time, `just run` command, and process-group membership to match the recorded ownership. The same complete identity is revalidated immediately before every negative process-group signal. A mismatch is removed as stale state without signalling the recorded group. Boot also refuses unknown listeners and never kills them. On partial startup, readiness timeout, or failed composed checks, boot cleans a still-verified owned process group and waits for both ports to release.

A successful boot intentionally leaves both foundation services running. Run `harness stop --json` when finished; repeated stop calls are safe. Inspect the repository-relative paths named by the envelope:

- `.harness/temp/boot/ownership.json` — live ownership; removed by stop;
- `.harness/temp/boot/evidence.json` — latest bounded structured lifecycle evidence;
- `.harness/temp/boot/boot.log` — transient startup output.

All three are gitignored and separate from `.sparkta/apps/` and `.sparkta/runtime/`.

## Soft Factory Runner operation

The repository commits protocol-1 configuration and official assets while the configured environment owns the CLI. `.trees/` is the isolated-worktree root. Only `.soft-factory/config.yml` is committed beneath the state root; runtime descendants are ignored. Concurrency is 1 and each new run snapshots final validation as `just verify`. Runner state is separate from harness `.harness/temp/boot/` and product `.sparkta/` state.

Runner Doctor and harness Doctor are different authorities: use `soft-factory doctor --json` for all 24 Runner repository checks and `harness doctor --json` for harness extensions and environment diagnostics. Never manipulate Runner worktrees, locks, leases, snapshots, processes, result files, recovery, logs, or cleanup directly.

A caller must explicitly authorize one positive `<ISSUE_NUMBER>`; operators and agents must not queue, rank, infer, or select one. Invoke every supported lifecycle interface directly:

| Workflow                   | Direct CLI invocation                                                      |
| -------------------------- | -------------------------------------------------------------------------- |
| Run                        | `soft-factory run --issue <ISSUE_NUMBER> --json`                           |
| List and status inspection | `soft-factory list --json` and `soft-factory status <ISSUE_NUMBER> --json` |
| Reconcile                  | `soft-factory reconcile <ISSUE_NUMBER> --json`                             |
| Resume                     | `soft-factory resume <ISSUE_NUMBER> --json`                                |
| Stop                       | `soft-factory stop <ISSUE_NUMBER> --json`                                  |
| Clean retained resources   | `soft-factory clean <ISSUE_NUMBER> --json`                                 |
| Attach                     | `soft-factory attach <ISSUE_NUMBER>`                                       |
| Logs                       | `soft-factory logs <ISSUE_NUMBER> --json`                                  |

Before an authorized run, inspect `soft-factory instructions --json` and require `soft-factory doctor --json` to report ready. `status` and `list` do not select an issue. Reconcile, resume, stop, clean, attach, and logs always target the explicit issue supplied by the caller.

The strict `.agents/manifest.json` governs the official Operator, Assessor, and Soft Factory skill at version 0.1.0 and Runner protocol 1. Use `soft-factory install --recommended` to prove package-catalog convergence; do not manually replace these files or run the broad harness skill installer.

## Validation

Use `just verify-focused [test-path]` during a change and `just verify` for the complete test, lint, format, type-check, build, and diff-integrity suite. Harness wrappers report the delegated command, argv, exit status, duration, and bounded output without copying recipe internals.

Use the attribution-aware managed commit path after reading `harness instructions commit`:

```bash
harness commit "feat(scope): describe the change" -- <explicit-paths>
```

Conventional Commit and configured Co-authorship requirements still apply. The command reports whether git-ai attribution was confirmed or buffered and named.

## Readiness API

### `GET /api/readiness`

The local Fastify foundation exposes a deterministic liveness and readiness seam.

- **Response status:** `200 OK`
- **Content type:** JSON
- **Response body:**

  ```json
  {
    "foundation": "sparkta-server",
    "status": "ready"
  }
  ```

The response intentionally omits PID, paths, environment, stack, secrets, prompts, source, and mutable process state. This endpoint is a local foundation probe, not a public product API or product workflow.

## Configuration

| Setting or option           | Default | Constraints and effect                                                    |
| --------------------------- | ------: | ------------------------------------------------------------------------- |
| `PORT`                      |  `3000` | Server listener and readiness probe; integer from 1 to 65535 and not 5173 |
| `LOG_LEVEL`                 |  `info` | Pino server log level                                                     |
| `harness boot --timeout-ms` | `60000` | Readiness bound from 1000 through 120000 ms                               |

Fastify/Pino request logs use correlation IDs, omit request bodies, and redact authorization, cookies, tokens, prompts, conversation content, and generated source fields. Unexpected HTTP failures receive a generic response while protected structured logs retain causal diagnostics.

## GitHub Copilot skills

The committed engineering-harness allowlist under [`.agents/skills/`](../.agents/skills/) is exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`; the separately governed official `soft-factory` skill is the only additional directory, as indexed in [`.github/skills/README.md`](../.github/skills/README.md). [`.harness/skills.lock.json`](../.harness/skills.lock.json) records project scope and packaged-source provenance only; it does not authorize additional names. Cold-agent use depends only on committed skill content. Do not run a broad installer that would restore other packaged skills.

## RPIV harness seams

The RPIV coordinator and Implement agent structurally call `/eng-harness-flow` through the host skill mechanism:

- `--hook pre-flight` before Research;
- `--hook pre-coding` between Plan and Implement;
- `--hook coding` during implementation, with concrete friction captured by `harness observe`;
- `--hook post-coding` after full validation and before the Implement handoff;
- `--hook post-flight` after successful Verify closeout.

The exact seam map is in [`.harness/engineering-harness.md`](../.harness/engineering-harness.md).

## Filesystem contract

- `.sparkta/apps/` is reserved for durable application metadata, generated source, and conversation history.
- `.sparkta/runtime/` is reserved for disposable product PIDs, ports, status caches, and agent-session coordination.
- `.harness/temp/boot/` is reserved for disposable engineering-harness runtime ownership and evidence.
- `.trees/` and runtime descendants of `.soft-factory/` are reserved for Runner-owned worktrees and operational state; `.soft-factory/config.yml` is committed configuration.

No persistence repository, runtime manager, schema, lifecycle API, generated application, or blessed starter is included in this foundation.

## Architecture

- [Foundation stack ADR](../project/architecture/ADR/ADR-260812-foundation-stack.md)
- [Filesystem state boundary ADR](../project/architecture/ADR/ADR-260812-filesystem-state-boundary.md)
- [Soft Factory Runner operating contract](../project/architecture/core-components/CORE-COMPONENT-260813-soft-factory-runner-operation.md)
- [Engineering harness operating contract](../project/architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md)
- [Project command interface](../project/architecture/core-components/CORE-COMPONENT-260806-project-command-interface.md)
- [RPIV stage contract](../project/architecture/core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md)
- [TypeScript development standards](../project/architecture/core-components/CORE-COMPONENT-260812-development-standards.md)
- [Application error handling](../project/architecture/core-components/CORE-COMPONENT-260812-error-handling.md)
- [Structured observability](../project/architecture/core-components/CORE-COMPONENT-260812-observability.md)
- [Durable and runtime state lifecycle](../project/architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md)
- [Architecture registry](../project/architecture/ADR/DECISION-LOG.md)

## Migration and deployment impact

Harness adoption, Runner integration, and `GET /api/readiness` are additive. They introduce no breaking API or data migration. Existing Runner users converge configuration to protocol 1, `.trees`, `.soft-factory`, `just verify`, and concurrency 1 without deleting state or replacing official assets. The foundation has no server deployment procedure; both ambient tools remain local configured-environment prerequisites.
