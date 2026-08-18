# Test Plan: Run repeated Prototype 0 generation trials

## Architecture Baseline

- ADR-260815-blessed-frontend-starter
- ADR-260812-filesystem-state-boundary
- CORE-COMPONENT-260806-rpiv-stage-contract
- CORE-COMPONENT-260806-project-command-interface
- CORE-COMPONENT-260806-agent-executable-acceptance-criteria
- CORE-COMPONENT-260812-state-lifecycle
- CORE-COMPONENT-260813-engineering-harness-operation
- CORE-COMPONENT-260813-soft-factory-runner-operation
- CORE-COMPONENT-260815-generated-frontend-contract
- CORE-COMPONENT-260816-generated-frontend-quality

## Test V-1: Trial layout, fixed prompts, and clean-copy contract

- **Type:** Automated static and negative contract validation
- **Task:** T-1, T-2
- **Acceptance Criteria:** AC-1, AC-2, AC-5
- **Priority:** Critical

### Setup

Use proposed `just trial-init <trial> <attempt>` and `just trials-check`, canonical `templates/default/`, and the three initial attempt paths. Do not modify canonical files for negative cases.

### Steps

1. Require exactly the three fixed numeric trial IDs and exact prompt text/hashes.
2. Require each `01-initial` record set and full app copy, including copied guidance/checklist.
3. Compare pre-generation inventory and lock checksum to the canonical starter; require no `node_modules` or `dist`.
4. Validate all required record headings/fields and initial-versus-rerun path rules.
5. Reject unknown IDs, malformed records, overwrite attempts, and reruns without an adopted affected finding.

### Expected Result

Three complete, distinct clean initial copies and comparable records exist; invalid or destructive inputs fail safely.

### Expected Evidence

- Inventories, hashes, fixed path listing, schema success output, and controlled rejection output.

## Test V-2: Bounded agent generation and result records

- **Type:** Operational integration and evidence review
- **Task:** T-2
- **Acceptance Criteria:** AC-1, AC-2
- **Priority:** Critical

### Setup

Require configured `copilot` CLI noninteractive mode. Invoke only through proposed `just trial-generate <trial> <attempt>`, with the trial app as the writable boundary and without Runner state access.

### Steps

1. Run each fixed prompt once against its clean app copy within the configured timeout.
2. Record CLI version, safe invocation/permission metadata, timestamps, timeout, exit status, outcome, and bounded result.
3. For a successful invocation, require a non-empty generated-source diff from the clean starter baseline; confirm files outside the intended app boundary were not changed.
4. Confirm no credentials, environment secrets, or prompt-adjacent telemetry logs were persisted.
5. Confirm no hand edit or undisclosed repair occurred. Treat unavailable CLI/authentication/timeout as a recorded FAIL/blocker.

### Expected Result

Each trial has an honest finite agent result tied to one fixed prompt and one isolated clean copy.

### Expected Evidence

- Three `agent-result.md` records, prompt hashes, bounded timing/exit data, non-empty generated-source diffs on success, and app-only diff proof.

## Test V-3: Locked install, isolation, build, and assigned-port runtime

- **Type:** Integration, runtime smoke, and cleanup validation
- **Task:** T-3; repeated for T-4 reruns
- **Acceptance Criteria:** AC-2, AC-3
- **Priority:** Critical

### Setup

Run proposed `just trial-validate <trial> <attempt>` sequentially with Node.js 24, copied lockfiles, free nondefault ports, bounded polling, and owned-process cleanup.

### Steps

1. Record lock checksum; run locked install; require unchanged lock and no unapproved dependency.
2. Audit manifest/source for local simulated domain data and absence of backend, database, Docker, auth, external API/data, and runtime fetch requirements.
3. Run `npm run build`; require successful strict TypeScript/Vite output and `dist/index.html`.
4. Start exact `npm run dev -- --host 0.0.0.0 --port <PORT>` on an assigned port.
5. Require bounded HTTP 200, `text/html`, and a trial-specific marker. Label this HTTP browser-loadability, not real-browser automation.
6. Stop only the owned process and prove port release on success and controlled failure paths.

### Expected Result

Every latest required attempt remains frontend-only, installs reproducibly, builds, serves browser-loadable HTML through the standard contract, and cleans up.

### Expected Evidence

- Install/build outputs, lock hashes, audits, artifact listing, exact command/port, HTTP headers/marker, owned PID cleanup, and released port.

## Test V-4: Prompt-major controls and completed quality checklist

- **Type:** Bounded source-backed behavior and quality review
- **Task:** T-3; repeated for T-4 reruns
- **Acceptance Criteria:** AC-2, AC-4
- **Priority:** Critical

### Setup

Use exact prompt, generated React source, successful V-3 runtime load, and copied quality checklist. No screenshot, DOM-event, console, viewport, or browser-automation sensor is available.

### Steps

1. Derive a finite list of controls explicitly described by the prompt.
2. Trace each rendered control to its handler/state transition and visible data/workflow effect.
3. PASS only a coherent complete trace backed by source and V-3 load; mark inconclusive rendered behavior FAIL and name the gap.
4. Complete every checklist row as PASS/FAIL, or permitted N/A with request-specific rationale.
5. Record visual/responsive judgments as bounded inferential review using the checklist vocabulary; never claim automated browser evidence.
6. Index every FAIL and concrete unmet quality check in `evidence.md`.

### Expected Result

Every prompt-major control has a plausible verdict and every quality row has an honest finite outcome; no limitation is hidden.

### Expected Evidence

- Control/source/state/effect tables, completed checklists, applicability rationales, and unmet-check index.

## Test V-5: Improvement disposition and affected-trial rerun

- **Type:** Traceability and before/after comparison validation
- **Task:** T-4, T-5
- **Acceptance Criteria:** AC-5
- **Priority:** Critical

### Setup

Use completed initial attempts, `implementation/trials/00-findings.md`, and proposed `just trials-check`. Permit at most one adoption batch and one rerun per affected trial.

### Steps

1. Require every finding to name category, disposition, rationale, affected trials, and evidence.
2. If none is adopted, require rationale and absence of `02-rerun` directories.
3. For each adopted finding, inspect canonical starter/instruction diff and require it stays within existing architecture.
4. Require exactly the affected trials to have new clean `02-rerun` copies with identical prompt hashes.
5. Repeat V-2, V-3, and V-4 for each rerun and compare initial versus rerun without overwriting either.
6. Reject missing affected reruns, unaffected reruns, second reruns, or a second adoption cycle.

### Expected Result

Every improvement is dispositioned and every adopted change has bounded, comparable affected-trial rerun evidence.

### Expected Evidence

- Findings table, canonical diff, affected set, baseline/prompt hashes, complete rerun records, and before/after comparison.

## Test V-6: Cross-trial exit verdict and full repository handoff

- **Type:** Full regression, documentation, and acceptance coverage audit
- **Task:** T-1, T-2, T-3, T-4, T-5
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Priority:** Critical

### Setup

Complete all required attempts and findings. Use the latest required attempt for each trial and proposed `just trials-check`. Prepare docs and `implementation/00-implementation.md`; use harness checks that delegate to root recipes.

### Steps

1. Require every trial/attempt record and every AC-1..AC-6 implementation evidence link.
2. For each latest trial, record PASS/FAIL for PRD Product Quality Bar: build, start, visually represents request, major controls plausible, story-supporting data, and not unfinished scaffold.
3. PASS a trial only when all six quality-bar items and mandatory checklist rows PASS and permitted N/A rows have rationale.
4. PASS overall Prototype 0 only when all three trials PASS; otherwise require exact blocking trial/check/capability gap.
5. Inspect README, detailed docs, agent discovery, and API/configuration/migration/architecture/operations/deployment impact or no-impact statements.
6. Confirm Issue #7 is included in both root formatting scopes and raw commands remain root justfile recipes.
7. Run `just trials-check`, `harness checks focused --json` during implementation, and `harness checks full --json` before handoff; inspect delegation, exit code, and bounded output.
8. Confirm no Runner-owned state was accessed, all owned ports/processes are clean, and handoff includes commit SHA and clean tree.

### Expected Result

Evidence is complete, verdict arithmetic is consistent, documentation is accurate, and full root validation passes. A failed trial produces an overall FAIL with a precise blocker rather than a weakened criterion.

### Expected Evidence

- Findings/implementation indexes, three trial verdicts, overall PASS/FAIL and blocker, documentation review, harness envelopes, commit SHA, and clean status.

## Coverage Proof

| AC   | Tasks              | Tests                   | Evidence focus                                       |
| ---- | ------------------ | ----------------------- | ---------------------------------------------------- |
| AC-1 | T-1, T-2           | V-1, V-2, V-6           | Three fixed-prompt clean generated copies            |
| AC-2 | T-1, T-2, T-3, T-5 | V-1, V-2, V-3, V-4, V-6 | Complete comparable per-attempt records              |
| AC-3 | T-1, T-3           | V-3, V-6                | Simulated data, isolation, build, standard runtime   |
| AC-4 | T-1, T-3, T-5      | V-4, V-6                | Plausible major controls and explicit unmet checks   |
| AC-5 | T-1, T-4, T-5      | V-1, V-5, V-6           | Findings dispositions and clean affected reruns      |
| AC-6 | T-1, T-5           | V-6                     | Three trial verdicts, overall verdict, exact blocker |

Every AC maps to tasks, tests/validation, and expected evidence.
