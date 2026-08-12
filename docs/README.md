# Sparkta documentation

Sparkta is a local, agent-powered rapid UI-prototyping environment. The current repository is a foundational Node.js 24 and TypeScript workspace, not the Prototype 0 or control product described in the [PRD](../PRD.md).

## Development environment

The repository-owned [devcontainer configuration](../.devcontainer/devcontainer.json) and [feature lock](../.devcontainer/devcontainer-lock.json) provide Node.js 24, npm, and `just`. In a cold session, open or rebuild the repository Dev Container, run `just setup`, and discover commands with `just --list`. If Node.js or npm is missing, rebuild the container rather than provisioning an undeclared session-local toolchain.

Use `just run` to start the neutral web foundation on port 5173 and the Fastify foundation on port 3000. Stop the command with Ctrl+C. The processes do not implement a control UI, prompt workflow, agent invocation, generated application, or public product API.

## Validation

Use `just verify-focused [test-path]` during a change. Omitting the path runs all Vitest tests; supplying one runs only that committed target plus the documented diff-integrity safeguard. Use `just verify` for the complete test, lint, format, type-check, build, and diff-integrity suite. All operating command bodies live in the root [`justfile`](../justfile).

## Configuration

The server reads `PORT` (default `3000`) and `LOG_LEVEL` (default `info`). Fastify/Pino request logs use correlation IDs, omit request bodies, and redact authorization, cookies, tokens, prompts, conversation content, and generated source fields. Unexpected HTTP failures receive a generic response while protected structured logs retain causal diagnostics.

## Filesystem contract

- `.sparkta/apps/` is reserved for durable application metadata, generated source, and conversation history.
- `.sparkta/runtime/` is reserved for disposable PIDs, ports, process handles, status caches, and agent-session coordination.

The runtime directory must be reconstructable from durable files. No persistence repository, runtime manager, schema, lifecycle API, generated application, or blessed starter is included in this bootstrap.

## Architecture

- [Foundation stack ADR](../project/architecture/ADR/ADR-260812-foundation-stack.md)
- [Filesystem state boundary ADR](../project/architecture/ADR/ADR-260812-filesystem-state-boundary.md)
- [TypeScript development standards](../project/architecture/core-components/CORE-COMPONENT-260812-development-standards.md)
- [Application error handling](../project/architecture/core-components/CORE-COMPONENT-260812-error-handling.md)
- [Structured observability](../project/architecture/core-components/CORE-COMPONENT-260812-observability.md)
- [Durable and runtime state lifecycle](../project/architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md)
- [Architecture registry](../project/architecture/ADR/DECISION-LOG.md)

This initial foundation introduces no API, data, or configuration migration. It has no deployment procedure: operation is local to the configured development environment.
