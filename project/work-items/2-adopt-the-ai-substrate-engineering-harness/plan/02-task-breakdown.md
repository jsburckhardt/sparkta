# Task Breakdown: Correct the AI-Substrate engineering harness skill allowlist

## Task T-1: Reconcile the global harness contract

- **Status:** Complete
- **Complexity:** Small
- **Dependencies:** None
- **Acceptance Criteria:** AC-2, AC-5
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Retain the in-place update to `CORE-COMPONENT-260813-engineering-harness-operation`: exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` are allowed under `.agents/skills/`; broad packaged installation must not restore anything else; the canonical harness lock is provenance, not authorization. Preserve the component's `260813` creation date. Retain revised Decision 46 and new Decision 48 in `DECISION-LOG.md`. Create no ADR or new core-component.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

### Test Coverage

- Execute V-1 to compare component rules, interfaces, expectations, examples, integration guidance, registry row, and actionable decision records.
- Confirm every new/revised decision begins with an imperative verb and the source ID/date remain correct.

### Expected Evidence

- Core-component diff preserving `CORE-COMPONENT-260813-engineering-harness-operation` and its creation date.
- Decision Log diff showing exact allowlist Decision 46 and anti-restoration Decision 48.
- Architecture audit reporting no new ADR/component.

## Task T-2: Enforce the exact committed skill allowlist

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1
- **Acceptance Criteria:** AC-2, AC-4
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Delete the six restored `.agents/skills/` directories `builder`, `eng-harness-in-a-box`, `plan-0-v2-constitution`, `plan-v2-extract-domain`, `the-flow`, and `validate-v2`. Preserve every file in the three allowed directories. Retain `.harness/skills.lock.json` only as portable packaged-source provenance and remove the ignored transient root `skills-lock.json` if present. Add a narrow root-`justfile` validation recipe, composed by focused and full verification, that fails on a missing required directory, any additional top-level `.agents/skills/` directory, or excluded live discovery references. Do not invoke the broad installer and do not touch the separate APS skill tree.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-4:** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.

### Test Coverage

- Execute V-2 exact-set positive and missing/extra-directory negative controls.
- Execute V-6 to prove harness checks still delegate exactly once to the authoritative recipes after the guard is composed.

### Expected Evidence

- Sorted actual inventory equal to the three-name expected set and tracked deletion list for all six excluded trees.
- Hashes or clean diffs proving allowed skill content was retained.
- Root validation pass plus controlled failures for one missing and one extra fixture in a disposable copy.
- Absence of root `skills-lock.json`, npm harness changes, and APS-tree changes.

## Task T-3: Correct live discovery and operating documentation

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-1, T-2
- **Acceptance Criteria:** AC-2, AC-5
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract

### Description

Update `.github/skills/README.md`, `.harness/engineering-harness.md`, `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, and `project/architecture/README.md` where needed. Name exactly the three allowed engineering-harness skills, remove links and claims for excluded skills, explain that the canonical lock records provenance rather than the named set, and warn against broad reinstall. Keep harness commands, root `just` authority, runtime boundaries, and the unrelated APS skill accurate. Do not rewrite generated harnessability reports.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

### Test Coverage

- Execute V-3 cold-session traversal and link/path checks.
- Search live normative files for the six excluded names, nine-skill claims, and “complete packaged inventory” language; require zero stale matches except explicit prohibition text.

### Expected Evidence

- Documentation diff and cold-discovery audit table.
- Three resolving index links and zero excluded index links.
- Scoped zero-result stale-reference search, with generated/preserved reports explicitly excluded.

## Task T-4: Reconcile issue evidence and delivery handoff

- **Status:** Complete
- **Complexity:** Medium
- **Dependencies:** T-2, T-3
- **Acceptance Criteria:** AC-2, AC-5
- **Related ADRs:** ADR-260812-foundation-stack
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260505-commit-standards

### Description

Append a dated corrective section to `implementation/00-implementation.md` that supersedes nine-skill final-state claims while retaining historical command facts. Map the correction to AC-2/AC-5, list deleted/restored surfaces, and record validation and preservation evidence. Prepare a Verify handoff requiring independent replacement or annotation of stale final-state claims in `verify/summary.md` and PR #10. Verify, not Implement, owns acceptance and GitHub updates.

### Acceptance Criteria

- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

### Test Coverage

- Execute V-8 over the issue implementation record, Verify handoff, verification summary after Verify, and PR #10 metadata after Verify.
- Confirm historical generated reports remain unchanged and are not cited as the final allowlist oracle.

### Expected Evidence

- AC-indexed corrective implementation addendum identifying the exact three final skills.
- Verify handoff checklist naming stale summary and PR statements.
- Independent Verify diff/metadata output with all nine-skill final-state claims removed or explicitly superseded.

## Task T-5: Run regression and acceptance validation

- **Status:** Complete
- **Complexity:** Large
- **Dependencies:** T-1, T-2, T-3, T-4
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Related ADRs:** ADR-260812-foundation-stack, ADR-260812-filesystem-state-boundary
- **Related Core-Components:** CORE-COMPONENT-260813-engineering-harness-operation, CORE-COMPONENT-260806-project-command-interface, CORE-COMPONENT-260806-rpiv-stage-contract, CORE-COMPONENT-260806-agent-executable-acceptance-criteria

### Description

Run V-1 through V-9 in dependency order. Validate ambient CLI usability, exact skill inventory, cold discovery, focused/full delegation, boot/readiness/stop, and authoritative root checks. Begin and end with status and hashes for the preservation-sensitive harnessability files. Do not clean/reset the tree, regenerate reports, alter application source, or make Verify-stage acceptance decisions.

### Acceptance Criteria

- **AC-1:** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- **AC-2:** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-3:** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-4:** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-5:** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6:** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

### Test Coverage

- Execute every V-1 through V-9 test and record command, exit code, verdict, and artifact path by AC ID.
- Run `just verify-focused`, delegated focused/full checks, and final `just verify`.
- End with `harness stop --json`, closed-port checks, exact inventory audit, stale-reference audit, and preservation comparison.

### Expected Evidence

- Complete AC-1 through AC-6 evidence matrix.
- Successful CLI, checks, lifecycle, and root-validation envelopes/transcripts.
- Final exact three-name inventory and zero stale live references.
- Before/after hashes and status proving `.harness/reports/harnessability/002-sparkta/`, `latest.json`, and `latest.md` were not altered by implementation.
