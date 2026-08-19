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

## Blessed frontend starter

The canonical copy source is [`templates/default/`](../templates/default/). Copy the whole directory, including its independent `package-lock.json`; it is not a root npm workspace. The package bundles React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style source components and utilities, and Recharts for chart-requiring interfaces. Starter content and state are local/mock only.

Agents must follow the copied [`AGENTS.md`](../templates/default/AGENTS.md): implement the supplied interface prompt directly in the current standalone app without attempting parent-repository discovery, GitHub issue workflows, RPIV stages, engineering-harness orchestration, or Runner orchestration; build from realistic domain-specific simulated data, implement requested or contextually relevant interactions and applicable states, use bundled packages, and must not install arbitrary dependencies. Any addition requires an explicitly adopted architecture change that adds an allowlist entry. The direct standalone contracts are:

```bash
npm ci
npm run build
npm run dev -- --host 0.0.0.0 --port <PORT>
```

Choose an available assigned port; generated-app identity never depends on that port. Evaluate the copy with [`QUALITY-CHECKLIST.md`](../templates/default/QUALITY-CHECKLIST.md), whose six categories are design quality, instruction quality, stack adherence, mock-data quality, build success, and runtime startup. Each check requires pass/fail evidence; N/A is limited to conditional interaction/state checks with a request-specific rationale.

From the repository root, `just starter-check` asserts the canonical and copied guidance/checklist contracts, rejects controlled malformed copies, performs the locked clean-copy install and build, runs the exact development command, requires HTTP 200 plus HTML/root markers, exercises failure cleanup, verifies lockfiles, and removes only its owned process and copy. `just verify` composes this recipe. These deterministic checks establish document completeness and operational behavior, not contextual visual quality; a reviewer must inspect rendered evidence against the checklist vocabulary.

The starter does not call `GET /api/readiness` and requires no Sparkta server, product API, backend, database, Docker, authentication infrastructure, external infrastructure, external API, or external data source.

## Prototype 0 trial operation

The Issue 7 trial protocol is a bounded manual evaluation layer, not a product generation adapter. Use exactly these root commands in dependency order:

```text
just trial-init <trial> <attempt>
just trial-generate <trial> <attempt>
just trial-validate <trial> <attempt>
just trials-check
```

Allowed trial IDs are `01-engineering-productivity`, `02-autonomous-delivery`, and `03-customer-management`. Allowed attempts are `01-initial` and `02-rerun`; a rerun is rejected unless `00-findings.md` records an adopted improvement affecting that trial. Initialization copies the complete standalone starter, records clean inventory and lock hashes, rejects `node_modules`/`dist`, and refuses overwrite. Generation invokes configured Copilot noninteractively once with a 600-second bound, current-directory-only path access, and shell, URL, temporary-directory, remote-export, and built-in MCP access disabled. It records finite success, unavailable, authentication, timeout, error, or no-source-diff outcomes without credentials or session telemetry.

Validation performs the locked install, dependency allowlist and frontend-only source audits, strict build, assigned-port Vite startup, HTTP 200/`text/html` and trial-marker probe, verified owned-process-group cleanup, and port-release proof. Runtime logs, PIDs, `node_modules`, and `dist` are removed; durable prompt, result, evidence, generated app source, checklist, and findings remain beneath `project/work-items/7-run-repeated-prototype-0-generation-trials/implementation/trials/`. Control evidence is explicitly source-backed inference plus HTTP load. The repository has no real-browser, screenshot, DOM-event, console, or viewport sensor.

`just trials-check` verifies the complete evidence graph, finite outcomes, prompt hashes, generated-source diff on successful generation, checklist completion, finding dispositions, rerun bounds, and per-trial/overall verdict arithmetic. It accepts an honestly failed product trial when the exact blocker and arithmetic are complete; it never converts that trial into a pass. The initial evidence records PASS for engineering productivity and autonomous delivery and an honest 600-second customer-management timeout. F-1 adopts one canonical direct-generation guidance change, so only customer management has a fresh `02-rerun` with the identical prompt. That rerun generated successfully, passed locked install/build/frontend-only/runtime/HTTP/cleanup validation, and records complete source-backed major-control traces plus explicit inert-secondary-control limitations. The latest required attempt for each trial now passes, yielding overall PASS evidence without altering the preserved initial result beyond mechanical trailing-whitespace normalization.

This workflow must not inspect or manipulate Runner-owned worktrees or state. It adds no API endpoint, application configuration/default, data or API migration, architecture contract, deployment process, or external infrastructure. Existing local setup and runtime configuration are unchanged.

## Soft Factory Runner operation

The repository commits protocol-1 configuration and the APS v1.2.2 [`runner-dispatcher`](../.github/agents/runner-dispatcher.agent.md), while the configured environment owns the CLI. `.trees/` is the isolated-worktree root. Only `.soft-factory/config.yml` is committed beneath the state root; runtime descendants are ignored. Concurrency is 1 and each new run snapshots final validation as `just verify`. Runner state is separate from harness `.harness/temp/boot/` and product `.sparkta/` state.

Runner Doctor and harness Doctor are different authorities: use `soft-factory doctor --json` for all 24 Runner repository checks and `harness doctor --json` for harness extensions and environment diagnostics. Never manipulate Runner worktrees, locks, leases, snapshots, processes, result files, recovery, logs, or cleanup directly.

A caller must provide exactly one explicit positive `<ISSUE_NUMBER>`; operators and agents must not queue, rank, infer, or select one. The dispatcher is both user- and model-invocable and exposes only the qualified VS Code terminal tools needed to run commands and retrieve output:

1. It rejects missing, multiple, nonpositive, fractional, signed, or invalid issue input before terminal use.
2. It runs `soft-factory instructions --json` directly.
3. It runs `soft-factory doctor --json` directly and returns its exact structured remediation when `ready` is false.
4. Only when Doctor reports ready, it runs exactly `soft-factory run --issue <ISSUE_NUMBER> --json` once.
5. It returns exact Runner output and distinguishes dispatch acceptance from ticket completion.

The dispatcher does not invoke RPIV agents, retry refusals, use `just`, inspect `.trees` or `.soft-factory`, or manage locks, processes, worktrees, recovery, logs, or cleanup. Those resources and all lifecycle decisions remain Runner-owned. Project validation remains Runner-independent.

## Validation

Use `just verify-focused [test-path]` during a change, `just trials-check` for complete Issue 7 trial evidence, `just starter-check` for the clean-copy frontend contract, and `just verify` for the complete test, lint, format, type-check, workspace build, starter, and diff-integrity suite. Harness wrappers report the delegated command, argv, exit status, duration, and bounded output without copying recipe internals.

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

| Setting or option           |  Default | Constraints and effect                                                    |
| --------------------------- | -------: | ------------------------------------------------------------------------- |
| `PORT`                      |   `3000` | Server listener and readiness probe; integer from 1 to 65535 and not 5173 |
| `LOG_LEVEL`                 |   `info` | Pino server log level                                                     |
| `harness boot --timeout-ms` |  `60000` | Readiness bound from 1000 through 120000 ms                               |
| Starter `<PORT>`            | assigned | Available port forwarded by the exact direct development command          |

Fastify/Pino request logs use correlation IDs, omit request bodies, and redact authorization, cookies, tokens, prompts, conversation content, and generated source fields. Unexpected HTTP failures receive a generic response while protected structured logs retain causal diagnostics.

## GitHub Copilot skills

Engineering-harness validation under [`.agents/skills/`](../.agents/skills/) checks non-empty `SKILL.md` files only for `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`. It neither enumerates nor modifies unrelated sibling skills. [`.harness/skills.lock.json`](../.harness/skills.lock.json) records project scope and packaged-source provenance only; it does not authorize additional engineering-harness names. Cold-agent use depends only on committed skill content. Do not run a broad installer that would restore excluded engineering-harness skills.

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

No persistence repository, runtime manager, schema, lifecycle API, or generated application is implemented. The canonical starter is a copy source only; it does not implement lifecycle behavior.

## Architecture

- [Blessed frontend starter ADR](../project/architecture/ADR/ADR-260815-blessed-frontend-starter.md)
- [Generated frontend contract](../project/architecture/core-components/CORE-COMPONENT-260815-generated-frontend-contract.md)
- [Generated frontend quality contract](../project/architecture/core-components/CORE-COMPONENT-260816-generated-frontend-quality.md)
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

The blessed starter is additive and introduces no product API, database, authentication, data or configuration migration, external infrastructure, operational service, or deployment procedure. It is copied and run locally with an assigned port. Harness adoption, Runner integration, and `GET /api/readiness` are also additive and introduce no breaking API or data migration. Runner configuration remains protocol 1 with `.trees`, `.soft-factory`, `just verify`, and concurrency 1. The foundation has no server deployment procedure; both ambient tools remain local configured-environment prerequisites.
