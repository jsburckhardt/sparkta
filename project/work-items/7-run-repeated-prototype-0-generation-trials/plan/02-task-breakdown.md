# Task Breakdown: Run repeated Prototype 0 generation trials

## Task T-1: Establish the bounded trial protocol and root commands

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** None
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter; ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface; CORE-COMPONENT-260806-agent-executable-acceptance-criteria; CORE-COMPONENT-260813-soft-factory-runner-operation; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Add discoverable root `justfile` recipes `trial-init <trial> <attempt>` for clean-copy initialization, `trial-generate <trial> <attempt>` for bounded noninteractive Copilot CLI generation, `trial-validate <trial> <attempt>` for per-attempt validation, and `trials-check` for all-trial evidence checks. Validate an allowlist of trial/attempt IDs, refuse overwrite, confine agent writes to `app/`, impose a finite timeout, capture safe exit/result metadata without credentials, allocate a free nondefault port, and clean only owned processes. Do not inspect Runner-owned state.

Use `implementation/trials/{01-engineering-productivity,02-autonomous-delivery,03-customer-management}/`. Each has `trial.md` and `attempts/01-initial/{prompt.md,agent-result.md,evidence.md,app/}`; only an adopted improvement creates `attempts/02-rerun/`. Cross-trial findings live at `implementation/trials/00-findings.md`. Generated `node_modules`, `dist`, runtime logs, and PIDs are not durable evidence.

Record these fixed prompts without silent enrichment: (1) “Create an executive dashboard showing engineering productivity across repositories.” (2) “Build a dashboard for monitoring autonomous software delivery. Show active agents, their current task, repository, elapsed time, token consumption and recent activity.” (3) “Build a customer management system. Include customers, orders, invoices, search, filters, create customer, edit customer, customer details, and activity history.” The third combines the PRD request with its explicit illustrative interface list.

Add Issue #7 to root `just format` and `package.json` `format:check` scopes. Plan README, detailed operating docs, and agent-discovery updates for the new recipes/evidence boundary while stating this is manual Prototype 0, not a product adapter, browser automation, or lifecycle.

### Acceptance Criteria

- AC-1: Exactly three fixed trial identities, prompts, and clean initial-copy paths are defined.
- AC-2: Every attempt schema requires all seven issue records.
- AC-3: Root recipes own all raw install/build/runtime/audit commands.
- AC-4: The schema requires prompt-major-control and unmet-check evidence.
- AC-5: Initial/rerun paths preserve comparable before/after evidence.
- AC-6: The final schema requires per-trial and overall verdicts plus blockers.

### Test Coverage

- V-1 uses `just trial-init <trial> <attempt>` and `just trials-check` to validate trial IDs, paths, prompt hashes, clean inventory/checksum, required headings, overwrite refusal, and malformed/unknown input rejection.
- V-2 uses `just trial-generate <trial> <attempt>` and `just trials-check` to validate timeout, a non-empty generated-source diff on success, the app-only boundary, safe result capture, and honest failure when Copilot capability/authentication is unavailable.
- V-6 checks formatting scope, command discoverability, docs, and Runner independence.

### Expected Evidence

- Root justfile recipe diff and controlled negative-case output.
- Three fixed prompt records and standardized record templates.
- Formatting-scope and operational-documentation diffs.

## Task T-2: Run the three initial generation trials

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-1, AC-2
- **Related ADRs:** ADR-260815-blessed-frontend-starter; ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality; CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

In numeric order, initialize each `01-initial/app/` from the full `templates/default/` boundary, prove it has no `node_modules` or `dist`, and record starter inventory/lock checksum. Invoke configured Copilot CLI once in noninteractive mode through the root recipe with the recorded prompt, copied `AGENTS.md`, and only that app writable. Record CLI version, safe bounded arguments/permissions, timestamps, timeout, exit status, outcome, bounded agent result, and the app-only source diff. A successful generation must produce a non-empty source diff from the clean starter baseline. Never record secrets, hand-edit generated source, or run an undisclosed repair. A CLI/auth/timeout failure remains a recorded trial blocker rather than fabricated success.

### Acceptance Criteria

- AC-1: All three initial app directories originate from complete clean starter copies, receive their fixed prompts, and contain a non-empty generated-source diff after successful generation.
- AC-2: Every initial attempt has exact prompt and honest agent-result records.

### Test Coverage

- V-1 compares initial inventories/checksums with the canonical starter.
- V-2 inspects all three bounded invocations, outcomes, non-empty generated-source diffs on success, and app-only path proofs.
- V-6 fails if any initial trial or required record is missing.

### Expected Evidence

- Three persistent generated app directories with baseline inventories/checksums and generated-source diffs.
- Three exact prompts and safe agent-result records with finite outcomes.
- Recipe output showing overwrite refusal and write/path boundaries.

## Task T-3: Validate and evaluate every initial attempt

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-2
- **Acceptance Criteria:** AC-2, AC-3, AC-4
- **Related ADRs:** ADR-260815-blessed-frontend-starter; ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260806-project-command-interface; CORE-COMPONENT-260812-state-lifecycle; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Sequentially run each attempt through `just trial-validate <trial> <attempt>`: lock checksum; `npm ci --include=dev`; dependency diff/allowlist and prohibited service/network audits; `npm run build`; exact `npm run dev -- --host 0.0.0.0 --port <PORT>`; bounded HTTP 200, `text/html`, and app-specific marker proof; owned cleanup and released-port proof. Record browser load as HTTP-level browser-loadability only—do not claim screenshot, DOM event, console, viewport, or real-browser automation.

Complete the copied checklist with PASS/FAIL for every row and N/A only where permitted with request-specific rationale. Derive each prompt-major control, then trace rendered control → event handler/state transition → expected visible data/workflow effect. Require successful runtime load too. Because no browser automation exists, identify this as source-backed inferential behavior evidence; mark inconclusive rendered behavior FAIL/blocking instead of weakening AC-4. List every failed checklist row and concrete gap.

### Acceptance Criteria

- AC-2: Every attempt records install, build, port, HTTP load, and a complete checklist.
- AC-3: Every app has local simulated data, no prohibited requirement, successful build, and exact runtime proof.
- AC-4: Every prompt-major control has a plausible complete source path and every unmet check is explicit.

### Test Coverage

- V-3 executes all operational/audit checks, including failure cleanup.
- V-4 reviews control tables, checklist completeness, applicability rationale, and unmet-check index.
- V-6 audits all three attempt records.

### Expected Evidence

- Per-attempt command outcomes, hashes, artifacts, port/HTTP/marker/cleanup records.
- Completed quality checklists and control-to-visible-effect tables.
- Explicit FAIL/blocker records for anything not proven.

## Task T-4: Classify findings and rerun affected trials for adopted improvements

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-3
- **Acceptance Criteria:** AC-5
- **Related ADRs:** ADR-260815-blessed-frontend-starter
- **Related Core-Components:** CORE-COMPONENT-260806-rpiv-stage-contract; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Create `implementation/trials/00-findings.md` with observation, instruction/starter category, proposed/adopted/deferred status, rationale, affected trials, and evidence. Adoption means Implement changes canonical `templates/default/` source or copied instructions within existing architecture; architecture deviation returns to Plan. After at most one adoption batch, rerun each affected trial once from a fresh `02-rerun/app/` using the identical prompt and full T-2/T-3 procedure, then run `just trials-check`. Preserve `01-initial/`; do not rerun unaffected trials or create a second improvement cycle. If nothing is adopted, record why and create no fake rerun.

### Acceptance Criteria

- AC-5: Every finding has an explicit disposition; every adopted finding has all affected clean reruns and before/after comparison.

### Test Coverage

- V-5 checks dispositions, adopted diffs, affected-trial set, identical prompt hashes, fresh starter baselines, complete rerun evidence, and attempt bounds.
- V-3/V-4 repeat for each rerun; V-6 audits the final findings graph.

### Expected Evidence

- Findings disposition table and canonical change diff for adopted improvements.
- Preserved initial evidence and complete comparable `02-rerun` records for every affected trial.
- Explicit no-adoption rationale when applicable.

## Task T-5: Publish final findings, documentation, and handoff evidence

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-3, T-4
- **Acceptance Criteria:** AC-2, AC-5, AC-6
- **Related ADRs:** ADR-260815-blessed-frontend-starter; ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260806-rpiv-stage-contract; CORE-COMPONENT-260806-project-command-interface; CORE-COMPONENT-260813-engineering-harness-operation; CORE-COMPONENT-260815-generated-frontend-contract; CORE-COMPONENT-260816-generated-frontend-quality

### Description

Use the latest required attempt per trial. Apply the PRD Product Quality Bar: builds, starts, visually represents request, major controls plausible, sample data supports story, and not unfinished scaffold. A trial passes only if all six are PASS, mandatory checklist rows are PASS, and permitted N/A rows have rationale. Overall Prototype 0 passes only if all three trials pass; otherwise state FAIL and name exact blocking trial/check/capability gap.

Update README, detailed operating docs, and agent discovery for trial commands/paths and limitations. Record API, configuration, migration, architecture, operations, and deployment impact or explicit no-impact. Run `just trials-check`, `harness checks focused --json` during work, and `harness checks full --json` before handoff, then complete `implementation/00-implementation.md` with AC evidence, docs, commit SHA, and clean-tree proof.

### Acceptance Criteria

- AC-2: Final indexes resolve every required per-attempt record.
- AC-5: Findings and reruns are compared without overwriting initial evidence.
- AC-6: Three trial verdicts and overall verdict follow the fixed rule and any FAIL names a blocker.

### Test Coverage

- V-5 validates findings/rerun links.
- V-6 validates evidence completeness, verdict arithmetic, docs, formatting, full root verification, and clean handoff.

### Expected Evidence

- Final findings and implementation records with three trial verdicts and overall PASS/FAIL/blocker.
- Updated operational/application docs and explicit no-impact statements.
- Passing focused/full harness envelopes, exact commit SHA, changed-path inventory, and clean `git status`.
