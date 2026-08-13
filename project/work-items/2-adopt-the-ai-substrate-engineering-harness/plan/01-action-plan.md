# Action Plan: Adopt the AI-Substrate engineering harness

## Feature

- **ID:** 2
- **Research Brief:** `project/work-items/2-adopt-the-ai-substrate-engineering-harness/research/00-research.md`

## ADRs Created

- None. Issue #2 supplies the harness-adoption choices, and the accepted foundation and command-interface architecture already govern the implementation. The readiness route is a bounded foundation probe, not a new product or system boundary.

## Core-Components Created

- [`CORE-COMPONENT-260813-engineering-harness-operation`](../../../architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md) — ambient configured CLI validation, authoritative command delegation, boot/readiness ownership, committed discovery surfaces, RPIV injection, and commit guidance.

## Acceptance Criteria

The following IDs preserve the GitHub issue checkbox order and exact criterion text.

- **AC-1 (Core):** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- **AC-2 (Core):** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-3 (Core):** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-4 (Core):** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-5 (Core):** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6 (Verification):** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

## Acceptance Coverage

| AC ID | Implementation tasks         | Tests or validation                                                                                                                                     | Expected evidence                                                                                                                                                                                                                   |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1  | T-1, T-6, T-8                | V-1 ambient CLI validation; V-2 CLI discovery and doctor; V-11 final acceptance sequence                                                                | Configured-environment identity; `harness --version` reporting 0.13.0; usable `harness instructions` envelope; parsed `harness doctor --json` envelope with repository-actionable findings tracked                                  |
| AC-2  | T-2, T-6, T-7, T-8           | V-3 repository-portable skill inventory; V-8 cold-agent discovery audit; V-11 final acceptance sequence                                                 | Complete v0.13.0 packaged skill content under `.agents/skills/`; canonical packaged-source harness lock; no transient source in committed state; complete governance and discovery links                                            |
| AC-3  | T-4, T-5, T-6, T-8           | V-4 readiness route integration; V-5 boot/readiness/stop lifecycle; V-9 occupied-port and stale-state negative controls; V-11 final acceptance sequence | Structured boot envelope with owned PID, delegated command, web/server probes, durations, and evidence paths; readiness response; log path; clean stop proof; unknown port owner remains alive                                      |
| AC-4  | T-3, T-6, T-8                | V-6 focused delegation contract; V-7 full delegation contract; V-10 authoritative root validation; V-11 final acceptance sequence                       | Harness envelopes identify exact `just verify-focused [target]` and `just verify` delegation; spy/negative-control records show no duplicated npm/tool commands; unchanged authoritative root recipe names and successful root runs |
| AC-5  | T-2, T-6, T-7, T-8           | V-2 CLI instructions; V-8 cold-agent discovery and commit-guidance audit; V-11 final acceptance sequence                                                | AGENTS managed commit block and RPIV hook seams; LLM map; README/docs setup and use; `.github/skills/README.md`; governance breadcrumb and per-verb instructions; explicit ambient-tool boundary                                    |
| AC-6  | T-3, T-4, T-5, T-6, T-7, T-8 | V-5, V-6, V-7, V-9, V-10, V-11                                                                                                                          | Successful JSON envelopes for readiness, boot, focused checks, and full checks in the configured Node.js 24 environment; successful `just verify-focused`; successful final `just verify`; cleanup proof and command transcript     |

**Coverage proof:** AC-1 through AC-6 each has one or more implementation tasks, deterministic validation, and named inspectable evidence. No criterion is task-only, test-only, or evidence-only.

## Implementation Tasks

1. **T-1 — Validate the configured ambient harness 0.13.0 CLI** (`AC-1`): perform bounded, read-only validation of the already-installed configured tool with `harness --version`, `harness instructions`, and `harness doctor --json`; record usable output and separate environment-only degradation from repository-actionable findings. Do not redesign or reproduce installation through repository npm state.
2. **T-2 — Complete portable GitHub Copilot skills** (`AC-2`, `AC-5`): use the ambient CLI first-class `harness skills install --target github-copilot` packaged-source surface, commit the complete repository-local skill content and canonical harness install declaration, and reject transient extraction paths from committed discovery or lock state.
3. **T-3 — Add delegated focused and full check extensions** (`AC-4`, `AC-6`): implement repository extensions and verb briefings for bare/full and focused checks; call only `just verify` or `just verify-focused [target]`; return structured envelopes and evidence.
4. **T-4 — Add a minimal server readiness seam** (`AC-3`, `AC-6`): add the explicitly scoped `GET /api/readiness` Fastify route with a stable non-sensitive response and injection tests. Do not add product workflows, persistence, or external dependencies.
5. **T-5 — Add owned boot, readiness, and stop extensions** (`AC-3`, `AC-6`): start through `just run`, manage only `.harness/temp/boot/`, detect fixed-port conflicts without killing unknown processes, poll web and server readiness, compose full checks, retain structured evidence, and clean owned processes on failure or explicit stop.
6. **T-6 — Complete governance, flow, injection, and commit guidance** (`AC-1`, `AC-2`, `AC-3`, `AC-4`, `AC-5`, `AC-6`): replace governance TODOs with the validated BIO contract, document the ambient CLI/repository-state boundary, add exact RPIV seam calls, inject harness-managed commit guidance, register verb instructions, and update the adoption flow only from validated evidence.
7. **T-7 — Update all cold-agent and operator documentation** (`AC-2`, `AC-5`, `AC-6`): align `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, and architecture overview links with the harness front door, clearly identifying the already-configured ambient CLI while retaining root `just` authority and foundation-only scope.
8. **T-8 — Execute acceptance and preserve evidence** (`AC-1`, `AC-2`, `AC-3`, `AC-4`, `AC-5`, `AC-6`): run targeted `just verify-focused`, all harness-specific validations, final `just verify`, portability and negative-control checks, and formatting/diff checks; record AC-indexed evidence without cleaning or overwriting unrelated dirty baseline content.

## Delivery Guardrails

- Treat `@ai-substrate/engineering-harness` v0.13.0 as already installed and configured in the ambient development environment. Do not recover, recreate, commit, delete, or depend on `ai-substrate-engineering-harness-0.13.0.tgz`; do not add harness entries to `package.json` or `package-lock.json`.
- Do not claim the ambient CLI can be reproduced from repository npm state unless existing independent configuration proves that claim. Repository portability applies to governance, extensions, skills, discovery, and evidence.
- Snapshot the intentional modified/untracked baseline before implementation. Change related partial harness artifacts in place; do not reset, clean, or overwrite unrelated work.
- Treat the original static harnessability report as historical branch-`main` evidence. Do not rewrite it as current proof.
- Use `.harness/temp/boot/` only for disposable runtime ownership and evidence. Do not place harness state under `.sparkta/apps/` or `.sparkta/runtime/`.
- A doctor `degraded` envelope is usable only under the documented core-component exception: the ambient CLI, repository extensions, checks, boot, readiness, and commit guidance must work; environment-only attribution/capture warnings must retain explicit next actions.
- The root `justfile`, including `just setup`, `just verify-focused`, and `just verify`, remains authoritative. Harness commands supplement and delegate to it.
