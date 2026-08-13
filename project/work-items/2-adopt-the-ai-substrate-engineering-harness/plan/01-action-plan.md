# Action Plan: Correct the AI-Substrate engineering harness skill allowlist

## Feature

- **ID:** 2
- **Research Brief:** `project/work-items/2-adopt-the-ai-substrate-engineering-harness/research/00-research.md`

## ADRs Created

- None. The correction narrows an existing repository operating contract and does not introduce a new architectural boundary.

## Core-Components Created

- No new core-component. Updated [`CORE-COMPONENT-260813-engineering-harness-operation`](../../../architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md) in place, preserving its creation date, to require exactly the three approved skills and prohibit broad installation from restoring excluded skills. Decisions 46 and 48 in `DECISION-LOG.md` record the revised contracts.

## Acceptance Criteria

The IDs preserve GitHub Issue #2 criterion order and text exactly.

- **AC-1 (Core):** The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- **AC-2 (Core):** GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- **AC-3 (Core):** Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- **AC-4 (Core):** Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- **AC-5 (Core):** Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.
- **AC-6 (Verification):** Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

## Acceptance Coverage

| AC ID | Implementation tasks    | Tests or validation     | Expected evidence                                                                                                                                             |
| ----- | ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1  | T-5                     | V-4, V-9                | Exact `0.13.0` version output plus usable instructions and parsed doctor envelopes after correction                                                           |
| AC-2  | T-1, T-2, T-3, T-4, T-5 | V-1, V-2, V-3, V-8, V-9 | Exact three-directory inventory, retained entry points, no excluded names in live lock/index/docs, cold-session discovery proof, corrected work-item evidence |
| AC-3  | T-5                     | V-5, V-9                | Successful boot/readiness envelopes, inspectable evidence paths, and owned cleanup proof                                                                      |
| AC-4  | T-2, T-5                | V-2, V-6, V-9           | Allowlist gate plus focused/full envelopes naming exact root recipe delegation and unchanged root authority                                                   |
| AC-5  | T-1, T-3, T-4, T-5      | V-1, V-3, V-8, V-9      | Updated governance and entry-point text naming the exact allowlist and deterministic harness workflow; corrected handoff metadata                             |
| AC-6  | T-5                     | V-4, V-5, V-6, V-7, V-9 | Successful focused/full root and harness checks, boot/readiness/stop envelopes, and final cleanup evidence                                                    |

**Coverage proof:** Every AC-1 through AC-6 row maps to at least one implementation task, deterministic validation, and explicit evidence. The task breakdown and test plan repeat these IDs; no criterion is task-only, validation-only, or evidence-only.

## Implementation Tasks

1. **T-1 — Reconcile the global harness contract** (`AC-2`, `AC-5`): retain the in-place core-component update and Decision Log records; create no ADR or replacement component.
2. **T-2 — Enforce the exact committed skill allowlist** (`AC-2`, `AC-4`): retain only `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` under `.agents/skills/`; remove the other six restored directories, eliminate contradictory lock state, and add an authoritative root validation guard without rerunning the broad packaged installer.
3. **T-3 — Correct live discovery and operating documentation** (`AC-2`, `AC-5`): update the skill index, harness governance, repository maps, README/docs, and architecture overview so no live surface claims nine or complete packaged inventory.
4. **T-4 — Reconcile issue evidence and delivery handoff** (`AC-2`, `AC-5`): append corrective Implement evidence, identify superseded nine-skill claims, and hand Verify the exact updates required for `verify/summary.md` and PR #10 without falsifying historical command results.
5. **T-5 — Run regression and acceptance validation** (`AC-1`–`AC-6`): prove the exact allowlist, cold discovery, ambient CLI, delegated checks, boot/readiness/stop, and root validation while preserving unrelated report changes.

## Delivery Guardrails

- Do not run `harness skills install --target github-copilot` when it would restore excluded skills.
- Do not remove or alter `.github/skills/agnostic-prompt-standard/`; the exact three-name allowlist applies to engineering-harness skills under `.agents/skills/`.
- Preserve modified `.harness/reports/harnessability/latest.json`, modified `latest.md`, and untracked `.harness/reports/harnessability/002-sparkta/` byte-for-byte. Their generated nine-skill observation is not a live allowlist contract.
- Treat `.harness/skills.lock.json` as installation provenance only. Remove the ignored transient root `skills-lock.json` if present; do not commit or cite it as authority.
- Do not modify application behavior, readiness ownership, check delegation, root recipe bodies beyond the narrow allowlist validation hook, or npm dependency state.
- Implement records corrective evidence; Verify independently refreshes acceptance decisions, `verify/summary.md`, and PR #10 metadata.
