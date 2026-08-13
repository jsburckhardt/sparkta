# CORE-COMPONENT-260813-engineering-harness-operation: Engineering Harness Operating Contract

## Status

Adopted

## Purpose

Provide a repository-wide, deterministic engineering harness front door for humans and autonomous agents while preserving the root `justfile` as the authoritative project command interface.

## Scope

This contract applies to validation of the already-installed ambient harness CLI in the configured development environment and to repository-local extensions, boot and readiness lifecycle, check delegation, GitHub Copilot skills, governance, agent discovery, RPIV injection seams, and commit guidance. The repository does not own or reproduce the ambient CLI installation, and this contract does not change the `.sparkta/apps/` and `.sparkta/runtime/` product-state boundary.

## Definition

### Rules

- The configured development environment MUST provide ambient `@ai-substrate/engineering-harness` version `0.13.0`, and adoption MUST validate it with `harness --version`, `harness instructions`, and `harness doctor --json`.
- The repository MUST NOT recover, recreate, commit, delete, or depend on `ai-substrate-engineering-harness-0.13.0.tgz`, and MUST NOT add the harness to `package.json` or `package-lock.json`.
- Repository documentation and evidence MUST distinguish the ambient configured CLI from committed repository state and MUST NOT claim npm-state reproduction unless independent configuration proves it.
- The root `justfile` MUST remain the authoritative setup, run, focused, and full validation surface. Harness focused and full checks MUST delegate to `just verify-focused` and `just verify` respectively and MUST NOT duplicate their command bodies.
- Harness extensions MUST return the CLI envelope contract and MUST include the delegated command, outcome, and inspectable evidence in check and runtime results.
- Harness boot MUST start the current foundation through `just run`, probe both the web and server surfaces within a bounded time, and compose the full harness check before reporting success.
- Boot MUST keep ownership and runtime evidence only under `.harness/temp/boot/`, MUST refuse to kill an unknown process occupying a fixed port, and MUST clean only the processes it owns after failure or an explicit stop.
- Readiness MUST prove both the Vite foundation on port `5173` and a stable, non-sensitive Fastify readiness response on the `PORT` value or default port `3000` without implementing a product workflow.
- Harness governance, extensions, complete GitHub Copilot skill content, and cold-agent discovery guidance MUST be committed. Skill installation MUST use the ambient CLI first-class `harness skills install --target github-copilot` packaged-source surface, and committed state MUST NOT reference transient extraction paths.
- Agents MUST self-brief with `harness instructions`, consult `harness doctor --json`, use the managed `harness commit` guidance when supported, and fire the documented harness hooks at the RPIV seams.

### Interfaces

- `harness --version`, `harness instructions [<verb>]`, `harness doctor --json`, and `harness help --json` are the ambient discovery and diagnostic interfaces.
- `harness skills install --target github-copilot` is the first-class packaged-skill installation interface; `.agents/skills/` and repository-portable lock/discovery files are the committed cold-agent surfaces.
- `harness checks focused [<target>] --json` delegates to `just verify-focused [<target>]`; `harness checks full --json` and bare `harness checks --json` delegate to `just verify`.
- `harness boot --json` starts and proves the foundation; `harness readiness --json` re-checks the running surfaces; `harness stop --json` stops only the harness-owned runtime.
- `/api/readiness` returns a stable readiness verdict from the local Fastify foundation.
- `.harness/engineering-harness.md`, `.agents/skills/`, `AGENTS.md`, `LLM.txt`, `README.md`, `docs/`, and the RPIV agent definitions are the repository-owned cold-agent discovery and operating surfaces.

### Expectations

- The configured development environment exposes an already-installed ambient harness CLI at version `0.13.0`; repository npm setup remains responsible only for Sparkta dependencies.
- A cold agent can discover the ambient tool boundary and every committed harness verb, briefing, skill, governance rule, and evidence path without global agent files or temporary skill sources.
- A successful boot leaves both processes running for interaction, while failure and explicit stop leave no harness-owned listeners.
- A structured `degraded` doctor result is usable only when the ambient CLI, its repository extensions, and the required operating surfaces are loaded and every repository-actionable complaint is resolved or documented.

## Rationale

The harness CLI is already implemented, installed, and configured as an ambient engineering tool, so duplicating installation in repository npm state would create an unnecessary and misleading ownership boundary. Committing governance, extensions, skills, and discovery keeps repository behavior portable; thin extensions preserve root command authority; and ownership-aware boot state prevents cleanup from terminating unrelated processes.

## Usage Examples

```bash
# Validate the configured ambient tool; this does not install it from npm state.
harness --version
harness instructions
harness doctor --json

# Install packaged skills into repository-local GitHub Copilot state.
harness skills install --target github-copilot

# Delegated validation and bounded runtime lifecycle.
harness checks focused apps/server/src/app.test.ts --json
harness checks full --json
harness boot --json
harness readiness --json
harness stop --json
```

## Integration Guidelines

- Add or refresh harness extensions with `harness new <name>`, then keep wrappers delegation-only.
- Commit repository-local governance, extensions, skill content, and discovery files; do not infer CLI installation ownership from them.
- Keep sensitive content out of envelopes, logs, governance, and runtime evidence.
- Regenerate `.harness/flows/adopt.md` from its JSON source after flow updates.
- Keep the static harnessability assessment as historical evidence and record new runtime and validation evidence separately.
- Update a `harness-change` record and the governance maturity snapshot only after the new capability passes its planned validation.

## Exceptions

- A structured `degraded` doctor result may be acceptable when only environmental attribution or capture liveness is degraded, provided the CLI, extensions, checks, boot, readiness, and commit guidance surfaces are usable and the next action is recorded.
- An owner may explicitly opt out of harness commit attribution only when the harness reports that attribution is buffered or unverified; the existing Conventional Commit and Co-authored-by rules still apply.

## Enforcement

- [x] Automated checks
- [x] Code review checklist
- [x] Test coverage requirements

## Related ADRs

- [ADR-260812-foundation-stack](../ADR/ADR-260812-foundation-stack.md)
- [ADR-260812-filesystem-state-boundary](../ADR/ADR-260812-filesystem-state-boundary.md)
