# Test Plan: Adopt the AI-Substrate engineering harness

## Test V-1: Validate the configured ambient harness CLI

- **Type:** Environment / acceptance
- **Task:** T-1, T-8
- **Acceptance Criteria:** AC-1
- **Priority:** Critical

### Setup

Use the configured Node.js 24 devcontainer/environment in which `@ai-substrate/engineering-harness` v0.13.0 is already installed and configured. Record the environment and runtime versions. Start no harness-owned application runtime and make no package, lockfile, PATH, or installation changes.

### Steps

1. Run `harness --version` and capture the exact output and exit code.
2. Run `harness instructions` and parse its single envelope, status, briefing, and next action.
3. Run `harness doctor --json` and parse its single envelope, layer results, extensions, conventions, and next action.
4. Classify each doctor finding as repository-actionable or environment-only under the core-component exception.

### Expected Result

The configured ambient CLI reports exactly `0.13.0`; instructions return a usable briefing; doctor returns valid machine-readable `ok` or allowed `degraded` output with actionable diagnostics. This validation neither changes installation state nor claims the CLI is reproduced by repository npm state.

### Expected Evidence

- Configured environment and Node.js version identifier.
- Exact `harness --version` output showing `0.13.0`.
- `harness instructions` envelope and usable briefing status.
- Complete `harness doctor --json` envelope and finding-classification table.

## Test V-2: Validate CLI discovery, doctor, and commit guidance

- **Type:** Acceptance / diagnostic
- **Task:** T-1, T-6, T-8
- **Acceptance Criteria:** AC-1, AC-5, AC-6
- **Priority:** Critical

### Setup

Complete T-1, T-3, T-5, and T-6 in the configured Node.js 24 development environment. Ensure no test boot runtime is left running.

### Steps

1. Run `harness --version` and `harness instructions`.
2. Run `harness help --json` and assert checks, boot, readiness, and stop verbs are registered with instruction availability.
3. Run `harness instructions checks`, `harness instructions boot`, and `harness instructions commit`.
4. Run `harness doctor --json`; parse the one-envelope schema, status, extensions, conventions, and next actions.
5. Run the managed commit-guidance injection a second time in a disposable copy and assert it is idempotent.

### Expected Result

Version is 0.13.0. Every repository verb and briefing is discoverable. Doctor exits successfully with `ok` or allowed `degraded`, reports loaded extensions and current commit guidance, and has no unresolved repository-adoption complaint. Only environment attribution/capture degradation documented by the core-component exception may remain. Re-injection does not duplicate or alter content outside its markers.

### Expected Evidence

- Version, core/verb instruction output, help verb map, complete doctor JSON, and parsed diagnostic summary.
- AGENTS managed marker count and no-diff idempotency result.

## Test V-3: Prove portable GitHub Copilot skill installation

- **Type:** Static / portability
- **Task:** T-2, T-8
- **Acceptance Criteria:** AC-2, AC-5
- **Priority:** High

### Setup

Complete the repository-local skill installation through the configured ambient CLI first-class `harness skills install --target github-copilot` interface using its default packaged source. Evaluate committed repository state without global agent skill directories or temporary extraction directories.

### Steps

1. Retain the first-class installer transcript and its packaged skill inventory from T-2.
2. Enumerate repository `.agents/skills/*/SKILL.md` slugs in sorted order and compare them with the complete packaged inventory.
3. Validate all files and references needed by each committed skill exist and are readable from repository state.
4. Validate `.harness/skills.lock.json` declares project scope, `github-copilot`, and `packaged` source; accept root `skills-lock.json` only if its metadata is repository-portable.
5. Search committed files for temporary extraction paths, machine-global skill paths, root npm package paths, missing skill sources, and incomplete discovery references.
6. Follow the repository skill index from a cold-agent entry point without consulting global agent files.

### Expected Result

The complete v0.13.0 packaged skill set is committed and readable by GitHub Copilot. Canonical harness configuration records the packaged project installation, and no committed lock or discovery state relies on an ephemeral, machine-global, or repository npm package source.

### Expected Evidence

- First-class installer transcript and sorted expected/actual inventory equality verdict.
- Canonical lock validation and zero-result non-portable-source searches.
- Repository-local paths for every packaged `SKILL.md` entry point and cold-discovery audit.

## Test V-4: Validate the Fastify readiness route

- **Type:** Integration / Vitest
- **Task:** T-4
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Register `GET /api/readiness` through `createServer` and add the exact response oracle to `apps/server/src/app.test.ts` or a focused colocated test.

### Steps

1. Inject a GET request to `/api/readiness` without opening a network listener.
2. Assert HTTP 200 and the exact stable readiness body.
3. Assert the body omits PID, path, environment, stack, secrets, prompt, source, and mutable internal state.
4. Assert request lifecycle/error/observability contracts remain intact.
5. Run `just verify-focused apps/server/src/app.test.ts`.

### Expected Result

The readiness seam deterministically reports the local server foundation ready, exposes no sensitive/internal values, and passes targeted authoritative root validation.

### Expected Evidence

- Passing Vitest case with exact body assertion.
- `just verify-focused` output and exit code.

## Test V-5: Validate positive boot, readiness, checks composition, and cleanup

- **Type:** Runtime / end-to-end
- **Task:** T-5, T-6, T-8
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Use the configured devcontainer with ports 5173 and 3000 free, no unrelated service listeners, dependencies installed, and no valid harness-owned process. Preserve any stale test ownership file for V-9 instead of this positive path.

### Steps

1. Run `harness stop --json` to establish an idempotent known state.
2. Run `harness boot --json` and bound completion to the documented timeout.
3. Assert boot delegated startup to `just run`, both service probes passed, and the composed full harness check passed.
4. Run `harness readiness --json` and independently request the web root and `/api/readiness`.
5. Inspect only the named `.harness/temp/boot/` log/evidence files for non-empty structured evidence.
6. Run `harness stop --json`; verify the owned process is gone, both ports are released, and a repeated stop succeeds without collateral action.

### Expected Result

Boot starts both foundation processes from a known state, reports a successful structured envelope with inspectable evidence, leaves them ready for interaction, and stop removes only owned runtime state/listeners. Full checks are visibly composed through the delegated harness checks surface.

### Expected Evidence

- Boot/readiness/stop JSON envelopes with commands, ownership ID/PID, URLs, statuses, durations, checks result, and evidence paths.
- Independent HTTP responses, redacted log excerpt, released-port checks, and repeated-stop result.

## Test V-6: Prove focused checks delegate exactly once

- **Type:** Contract / negative control
- **Task:** T-3, T-8
- **Acceptance Criteria:** AC-4, AC-6
- **Priority:** Critical

### Setup

Place a disposable `just` spy first on PATH for one isolated harness invocation. The spy records argv and returns controlled success/failure without running npm, Vitest, lint, type-check, or build. Keep a real committed focused test path for the actual invocation.

### Steps

1. Run `harness checks focused apps/server/src/app.test.ts --json` against the spy.
2. Assert exactly one child call with argv `verify-focused`, `apps/server/src/app.test.ts` and no direct tool call.
3. Repeat with no target and assert exact `verify-focused` delegation.
4. Make the spy fail and assert the harness returns a non-ok envelope, child exit detail, and next action.
5. Restore real PATH and run the same focused harness command; also run the authoritative `just verify-focused apps/server/src/app.test.ts`.

### Expected Result

Focused harness checks are a thin one-call wrapper over the root focused recipe, forward the optional target safely, preserve failures, and succeed against the actual root command.

### Expected Evidence

- Spy argv/count records, success/failure envelopes, and actual harness/root focused outputs.
- Static extension review showing no duplicated verification tool commands.

## Test V-7: Prove full checks delegate exactly once

- **Type:** Contract / negative control
- **Task:** T-3, T-5, T-8
- **Acceptance Criteria:** AC-4, AC-6
- **Priority:** Critical

### Setup

Use the same isolated `just` spy method as V-6, then restore the real PATH.

### Steps

1. Run bare `harness checks --json` against the spy and assert one `just verify` call.
2. Run `harness checks full --json` against the spy and assert one `just verify` call.
3. Make the spy fail and assert full failure propagation with a next action.
4. Search the extension for copied npm/test/lint/format/type-check/build/diff-integrity bodies.
5. Run `harness checks full --json` against the actual root recipe.

### Expected Result

Bare and explicit full checks delegate exactly once to `just verify`, duplicate no root recipe body, propagate failure honestly, and pass against the authoritative recipe.

### Expected Evidence

- Spy invocation records and JSON envelopes.
- Zero duplication review result and successful actual full-check envelope.

## Test V-8: Audit cold-agent discovery, governance, flow, and documentation

- **Type:** Documentation / governance validation
- **Task:** T-2, T-6, T-7, T-8
- **Acceptance Criteria:** AC-2, AC-5, AC-6
- **Priority:** High

### Setup

Evaluate only repository files in a cold-session reading order: `AGENTS.md`, `LLM.txt`, `README.md`, `.harness/engineering-harness.md`, `docs/README.md`, `.github/skills/README.md`, and RPIV agent definitions.

### Steps

1. Confirm each entry point links to existing harness governance, extensions, skills, architecture, and evidence paths.
2. Confirm agents are told to run `harness instructions`, doctor, verb briefings, focused/full checks, boot/readiness/stop, and the managed commit path.
3. Confirm RPIV pre-flight, pre-coding, coding, post-coding, and post-flight seams identify the exact harness hook/event invocation and agree with the governance injection map.
4. Validate `.harness/flows/adopt.md` is generated from JSON, carries current branch provenance, and records validated completion rather than assumptions.
5. Confirm root `just` authority, the already-configured ambient CLI boundary, Node.js 24 application setup, fixed ports, cleanup, evidence, doctor exception, and foundation-only scope are consistent across docs.
6. Run formatting/link/path checks through the root validation surface.

### Expected Result

A cold agent reaches the deterministic harness front door in one hop, recognizes the configured ambient CLI boundary, and can discover how to inspect, validate, boot, observe, stop, commit, and invoke RPIV seams. No documentation contradicts root `just` authority or claims unproved maturity.

### Expected Evidence

- Entry-point/link/path audit table and command-example transcript.
- Generated-flow consistency result, hook seam comparison, and documentation diff.
- Successful formatting/root validation relevant output.

## Test V-9: Exercise boot ownership and failure negative controls

- **Type:** Runtime / resilience
- **Task:** T-5, T-8
- **Acceptance Criteria:** AC-3, AC-6
- **Priority:** Critical

### Setup

Use disposable listeners/processes with captured PIDs. Ensure every fixture has teardown independent of the harness. Prepare stale ownership metadata that names a definitely dead PID. Never use an existing developer process as a fixture.

### Steps

1. Occupy port 3000 with the disposable unknown listener and run `harness boot --json`.
2. Assert boot rejects the conflict, names the port, does not signal the listener, and creates no live owned runtime.
3. Repeat for port 5173.
4. Remove listeners, place stale harness ownership metadata, and run boot; assert stale state is reconciled without signaling an unrelated PID.
5. Force one readiness probe or composed check to fail and assert all harness-owned processes are stopped and ports released.
6. Run repeated `harness stop --json` and confirm idempotency.

### Expected Result

Boot never kills unknown port owners, safely reconciles stale owned state, reports actionable structured failures, and leaves no owned process after partial startup, timeout, or check failure.

### Expected Evidence

- Conflict/failure envelopes, fixture PID liveness before/after, stale-state reconciliation record, and released-port proof.
- Teardown confirmation for every disposable fixture.

## Test V-10: Run authoritative targeted and final root validation

- **Type:** Regression / quality gate
- **Task:** T-3, T-4, T-5, T-7, T-8
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Complete all implementation and documentation tasks, stop harness-owned runtime, and retain the intentional baseline plus planned changes. Do not clean the worktree.

### Steps

1. During implementation, run `just verify-focused` with the affected committed test target after each behavior change.
2. Run `git diff --check` through the focused recipe as configured.
3. After all changes, run `just verify` as the final authoritative validation source.
4. Inspect the final root recipe names/bodies and confirm harness wrappers remain delegation-only.

### Expected Result

Targeted root validation succeeds during implementation, final root test/lint/format/type-check/build/diff-integrity succeeds, and the harness has not replaced or duplicated either authoritative recipe.

### Expected Evidence

- Targeted `just verify-focused` transcripts by changed behavior.
- Final `just verify` command, exit code, component results, and diff-integrity result.
- Root-versus-wrapper delegation review.

## Test V-11: Run the configured-environment acceptance sequence

- **Type:** Final acceptance / end-to-end
- **Task:** T-8
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Use the configured Node.js 24 devcontainer after V-1 through V-10 pass. Start with no harness-owned runtime and free fixed ports. Preserve all unrelated dirty/untracked files.

### Steps

1. Run `harness --version`, `harness instructions`, `harness help --json`, and `harness doctor --json`.
2. Run V-3 skill portability validation.
3. Run `harness checks focused apps/server/src/app.test.ts --json`.
4. Run `harness boot --json`, then `harness readiness --json`.
5. Run `harness checks full --json`.
6. Run `harness stop --json` and confirm both ports are released.
7. Confirm final `just verify` evidence is current and record every result under AC-1 through AC-6.

### Expected Result

All six acceptance criteria have current, repository-accessible proof. Harness readiness, boot, focused checks, and full checks succeed; the ambient CLI is validated; repository skills, governance, extensions, and instructions are portable and discoverable; cleanup succeeds; root validation remains authoritative.

### Expected Evidence

- Ordered command transcript and JSON envelopes for all harness commands.
- AC-1 through AC-6 evidence matrix in `project/work-items/2-adopt-the-ai-substrate-engineering-harness/implementation/00-implementation.md`.
- Final port/process cleanup, git status/diff-integrity snapshot, and successful final `just verify` reference.
