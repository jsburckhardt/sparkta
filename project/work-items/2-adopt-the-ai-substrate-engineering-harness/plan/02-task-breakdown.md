# Task Breakdown: Adopt the AI-Substrate engineering harness

## Task T-1: Validate the configured ambient harness 0.13.0 CLI

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** None
- **Acceptance Criteria:** AC-1
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Perform bounded, read-only validation of the already-installed and configured ambient `@ai-substrate/engineering-harness` v0.13.0 tool in the configured Node.js 24 devcontainer/environment. Run only the AC-1 diagnostic surface needed to establish availability and usability: `harness --version`, `harness instructions`, and `harness doctor --json`. Parse the doctor envelope, distinguish environment-only degradation from repository-actionable adoption findings, and record the configured environment boundary honestly. Do not redesign installation or represent the CLI as reproduced by repository npm state.

### Acceptance Criteria

- **AC-1:** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.

### Test Coverage

- Run V-1 in the configured development environment and assert version `0.13.0`, a usable instructions envelope, and a parseable doctor envelope with allowed status and actionable diagnostics.
- Run V-2 after repository extensions and governance are complete to prove the same ambient CLI discovers the delivered repository surfaces.
- Repeat the three AC-1 commands in the final V-11 acceptance sequence.

### Expected Evidence

- Configured environment and Node.js version identifier.
- Exact `harness --version` output showing `0.13.0`.
- `harness instructions` status and briefing availability.
- Complete `harness doctor --json` envelope plus a concise classification of repository-actionable and environment-only findings.

## Task T-2: Complete portable GitHub Copilot skills

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-2, AC-5
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Use the configured ambient 0.13.0 CLI first-class `harness skills install --target github-copilot` interface with its default packaged source to complete the repository-local GitHub Copilot installation. Preserve and verify the three existing `.agents/skills/` directories while adding the missing packaged skills through that interface. Commit complete skill content and the canonical `.harness/skills.lock.json` packaged-source declaration. Keep a root `skills-lock.json` only if the first-class installation produces repository-portable metadata; no committed state may reference an extraction directory, machine-global skill directory, root npm package path, or other ephemeral source. Cold-agent use must rely on committed skill content and discovery, not on rerunning an installation.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

### Test Coverage

- Run V-3 to compare the ambient CLI packaged skill inventory with committed `.agents/skills/` entry points and validate canonical packaged-source configuration.
- Search committed files for temporary extraction paths, machine-global skill paths, and root npm package-source assumptions.
- Run V-8 from repository entry points to prove skills and governance are discoverable without global agent files or temporary sources.

### Expected Evidence

- First-class `harness skills install --target github-copilot` command transcript and sorted expected/actual skill inventory.
- Committed `.agents/skills/<slug>/SKILL.md` paths for the complete packaged set and readable referenced files.
- Canonical `.harness/skills.lock.json` showing project scope, `github-copilot`, and `packaged` source.
- Zero-result search for transient or machine-specific skill-source references in committed state.

## Task T-3: Add delegated focused and full check extensions

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-4, AC-6
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract

### Description

Create the repository extension package and per-verb instructions for `harness checks`. Bare `checks` and `checks full` must execute `just verify`; `checks focused [target]` must execute `just verify-focused [target]`, preserving the optional target as one argument. Return standard JSON envelopes containing delegated command, exit status, duration, and bounded evidence. Do not copy npm, Vitest, lint, type-check, build, or diff-integrity commands into the extension. Keep `just verify-focused` and `just verify` names and bodies authoritative.

### Acceptance Criteria

- **AC-4:** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Run V-6 with a controlled `just` spy to assert exact focused argv, target forwarding, envelope success/failure behavior, and no direct tool invocation.
- Run V-7 with the spy and actual root command to assert bare/full delegation to exact `just verify`.
- Run actual `harness checks focused ... --json`, `harness checks full --json`, `just verify-focused`, and `just verify` in V-10/V-11.

### Expected Evidence

- Extension and `instructions.md` paths loaded by `harness help --json` and `harness doctor --json`.
- Spy invocation records containing only `verify-focused [target]` or `verify` after the `just` executable.
- Focused and full JSON envelopes naming delegated root recipes and carrying pass/fail evidence.
- Root `justfile` diff proving recipes remain present and no verification bodies moved into `.harness/`.

## Task T-4: Add a minimal server readiness seam

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-3, AC-6
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-observability, CORE-COMPONENT-260812-development-standards

### Description

Add `GET /api/readiness` to `createServer` as the smallest product-code seam required to replace startup inference with a deterministic verdict. Return a stable non-sensitive JSON body identifying readiness and the server foundation; do not expose process internals, add product APIs, or introduce dependencies. Keep route behavior compatible with Fastify injection, request correlation, safe errors, and structured redacted logging.

### Acceptance Criteria

- **AC-3:** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Run V-4 with Fastify injection to assert status 200, exact schema/content, request-ID behavior where applicable, and absence of sensitive/internal fields.
- Run `just verify-focused apps/server/src/app.test.ts` during development.
- Exercise the same route over the live listener in V-5.

### Expected Evidence

- Readiness route source and Vitest assertion with exact response oracle.
- Focused root validation transcript.
- Live readiness probe included in the harness readiness and boot envelopes.
- Scope review showing no product workflow, persistence, or external service was introduced.

## Task T-5: Add owned boot, readiness, and stop extensions

- **Status:** Complete
- **Verify repair:** Complete — live PID process-group membership is validated before group signals, with automated mismatch and valid-group controls.
- **Complexity:** Large
- **Dependencies:** T-3, T-4
- **Acceptance Criteria:** AC-3, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260812-observability, CORE-COMPONENT-260812-error-handling, CORE-COMPONENT-260812-state-lifecycle

### Description

Implement bounded `boot`, `readiness`, and `stop` verbs. Boot must reconcile only prior ownership state under `.harness/temp/boot/`, refuse unknown listeners on fixed ports 5173 and `PORT`/3000, spawn `just run`, poll the web foundation marker and `/api/readiness`, run the full harness checks after readiness, and return one inspectable envelope. Persist only transient PID/process-group ownership, timestamps, probe results, and redacted log/evidence paths. On partial startup, failed checks, timeout, or explicit stop, terminate only the owned process group, wait for port release, and remove stale owned state. Successful boot leaves the owned foundation running until `harness stop`.

### Acceptance Criteria

- **AC-3:** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Run V-5 for stop-to-known-state, boot, both readiness probes, full-check composition, repeated readiness, stop, port release, and evidence readability.
- Run V-9 negative controls for occupied unknown port, stale PID state, partial startup, timeout/failure cleanup, and repeated stop idempotency.
- Use disposable test listeners and always clean them in test teardown.

### Expected Evidence

- Boot JSON with owned PID/process group, `just run`, service URLs, probe statuses/durations, composed checks result, and log/evidence paths.
- Readiness JSON proving web and server independently; stop JSON proving owned cleanup and released ports.
- Negative-control transcript proving an unknown listener survives a rejected boot.
- `.harness/temp/boot/` ownership layout and git-ignore proof; zero writes under `.sparkta/`.

## Task T-6: Complete governance, flow, injection, and commit guidance

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260505-commit-standards, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Replace every operational TODO in `.harness/engineering-harness.md` with the validated Boot/Checks/Health/Interact/Observe contract, deterministic signal inventory, evidence paths, back-pressure gaps, and honest current maturity. Add exact harness-hook calls to the RPIV seams in agent behavior and update the injection map. Use `harness instructions commit --inject` to add or refresh only the managed commit-guidance block in `AGENTS.md`; retain Conventional Commit and Copilot co-author rules. Advance `.harness/flows/adopt.json` through validated build-boot/bridge completion with current branch provenance and regenerate its Markdown through the harness renderer. Keep the original static assessment unchanged as historical evidence. Write a `harness-change` record and raise maturity to L2 only after commands are proven.

### Acceptance Criteria

- **AC-1:** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-3:** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-4:** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Run V-2 to validate help/instructions/doctor and managed commit guidance.
- Run V-8 to validate all governance sections, RPIV seam wiring, generated-flow consistency, branch provenance, and cold discovery.
- Run V-11 after T-5 validation before writing maturity/change records; rerun doctor afterward.

### Expected Evidence

- Completed governance sections with exact commands and inspectable evidence paths.
- `harness help --json` verb map and per-verb `harness instructions <verb>` outputs.
- Doctor JSON showing extensions loaded and commit guidance present; any environment-only degradation includes next action.
- AGENTS managed block markers, RPIV hook wiring, completed adoption flow JSON/render, and one validated harness-change record.

## Task T-7: Update all cold-agent and operator documentation

- **Status:** Complete
- **Verify repair:** Complete — ambient-tool setup and Linux process-group ownership wording now match committed behavior.
- **Complexity:** Medium
- **Dependencies:** T-1, T-2, T-3, T-4, T-5, T-6
- **Acceptance Criteria:** AC-2, AC-5, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract

### Description

Update `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, and `project/architecture/README.md`. A cold agent must find `harness instructions`, doctor, focused/full checks, boot/readiness/stop, evidence locations, installed skill paths, RPIV injection expectations, and commit guidance in one hop. Human setup must explain the already-configured ambient CLI boundary, Node.js 24, repository `just setup`, fixed ports, cleanup, and doctor degradation interpretation without claiming npm-state reproduction. Remove stale statements that harness adoption is future scope while preserving foundation-only product exclusions and root `justfile` authority.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Run V-8 link/path/command discovery audit from AGENTS, LLM, README, docs, skills index, and architecture overview.
- Run command examples against the actual CLI and root recipes; reject stale, duplicated, or contradictory instructions.
- Include all affected Markdown/configuration in `just format-check` and final V-10.

### Expected Evidence

- Documentation diff with current setup, operation, validation, readiness, cleanup, skills, evidence, and scope.
- Successful link/path existence audit and command-example transcript.
- Explicit statement that harness checks delegate and do not replace root recipes.
- Documentation-impact evidence in `implementation/00-implementation.md` for independent Verify review.

## Task T-8: Execute acceptance and preserve evidence

- **Status:** Complete
- **Verify repair:** Complete — merge-base whitespace integrity, ownership controls, full checks, boot/readiness/stop, and root validation were rerun.
- **Complexity:** Large
- **Dependencies:** T-1, T-2, T-3, T-4, T-5, T-6, T-7
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-agent-executable-acceptance-criteria, CORE-COMPONENT-260806-project-command-interface

### Description

Execute the complete test plan in dependency order. Use `just verify-focused` as the targeted source during implementation and `just verify` as the final source. Run the harness-specific acceptance commands with JSON where available, including ambient CLI validation, skills portability, doctor, readiness, boot, focused/full checks, negative controls, stop, and final cleanup. Record results by AC ID in `implementation/00-implementation.md`. Compare final status to the initial dirty/untracked snapshot and retain all unrelated baseline content. Do not mark GitHub acceptance or perform Verify-stage decisions.

### Acceptance Criteria

- **AC-1:** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-3:** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-4:** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Execute V-1 through V-11, preserving raw JSON envelopes or concise command transcripts as named evidence.
- Run targeted `just verify-focused` after affected behavior and final `just verify` after all documentation and governance updates.
- End with `harness stop --json`, readiness-negative confirmation, port checks, and git diff integrity.

### Expected Evidence

- AC-1 through AC-6 evidence matrix with command, exit code, status, relevant fields, and artifact paths.
- Successful `just verify-focused` and final `just verify` outputs.
- Successful harness readiness, boot, focused, and full command envelopes plus final cleanup proof.
- Final branch/status/diff snapshot showing planned changes and preservation of unrelated pre-existing content.
