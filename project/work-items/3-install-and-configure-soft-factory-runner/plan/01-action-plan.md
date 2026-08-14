# Action Plan: Restore Soft Factory Doctor authority

## Feature

- **ID:** 3
- **Research Brief:** `project/work-items/3-install-and-configure-soft-factory-runner/research/00-research.md`
- **Plan Return:** PR #11 returned from Verify because `justfile#verify-harness-skills` still enumerates and requires the separately governed Soft Factory skill. That makes Sparkta validation a second authority for Runner assets despite the adopted Doctor-only boundary.

## ADRs Created

- None. The correction stays within the adopted project-command, engineering-harness, and Soft Factory Runner component boundaries.

## Core-Components Updated

- `CORE-COMPONENT-260813-engineering-harness-operation`: validate only the three named engineering-harness skills and ignore/preserve unrelated sibling skill directories.
- `CORE-COMPONENT-260813-soft-factory-runner-operation`: make Doctor the sole compatibility/readiness/asset authority and prohibit Sparkta validation from inspecting Soft Factory configuration or assets.

## Acceptance Criteria

- **AC-1:** The `soft-factory-runner` package is installed and its `soft-factory` CLI is available in the configured development environment.
- **AC-2:** Runner configuration declares protocol 1, safe repository worktree and state roots, and a positive concurrency limit.
- **AC-3:** The recommended official Operator, Assessor, and Soft Factory skill assets are installed with a valid `.agents/manifest.json`.
- **AC-4:** `soft-factory doctor --json` reports every readiness check and provides actionable remediation for any unmet prerequisite.
- **AC-5:** Repository instructions explain how to run, inspect, reconcile, resume, stop, clean, attach to, and read logs for one explicitly selected issue.
- **AC-6:** Runner help, instructions, asset installation, and repository Doctor execute successfully without selecting or mutating an unrelated issue.

## Acceptance Coverage

| AC ID | Implementation tasks | Tests or validation     | Expected evidence                                                                                                                               |
| ----- | -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1  | T-3                  | V-3                     | Direct CLI help and instructions succeed; Doctor reports the configured environment ready                                                       |
| AC-2  | T-1, T-2, T-3        | V-2, V-3, V-5           | Doctor passes configuration/root checks; instructions report effective final validation `just verify`; project recipes contain no Runner checks |
| AC-3  | T-2, T-3             | V-2, V-3                | Recommended installation succeeds and Doctor is the only compatibility/readiness/asset verdict; no Sparkta hash or manifest check remains       |
| AC-4  | T-2, T-3             | V-2, V-3                | Direct Doctor JSON contains the complete ordered check results and actionable remediation contract                                              |
| AC-5  | T-2, T-4             | V-2, V-4                | Live operator documentation retains direct explicit-issue lifecycle commands and assigns Runner diagnostics only to Doctor                      |
| AC-6  | T-1, T-2, T-3, T-4   | V-1, V-2, V-3, V-4, V-5 | Direct non-issue operations and Sparkta project gates pass without issue selection, Runner execution by `just`, or unrelated-skill deletion     |

## Implementation Tasks

1. **T-1 - Scope engineering-harness validation:** Change `verify-harness-skills` to require only the three named engineering-harness `SKILL.md` files, retain excluded-engineering-harness documentation guards, and ignore/preserve every unrelated sibling directory under `.agents/skills/`. Remove all Soft Factory names, paths, inventory equality, and asset requirements from the recipe.
2. **T-2 - Establish sole Soft Factory authority:** Assign all Runner configuration, compatibility, readiness, and asset verdicts exclusively to direct `soft-factory doctor --json`; keep Sparkta validation independent of Runner diagnostics.
3. **T-3 - Preserve direct Runner ownership:** Keep direct `soft-factory` operation, official installation, explicit positive issue input, Runner-owned lifecycle state, and `.soft-factory/config.yml` final validation `just verify`. Do not add Runner wrappers or invoke Runner from Sparkta validation.
4. **T-4 - Reconcile documentation and evidence:** Align harness/skills discovery, Runner operations, architecture summaries, implementation evidence, verification evidence, and PR text with the corrected authority boundary. Cite only current Doctor and Runner-independent project-validation evidence.
5. **T-5 - Prove the boundary:** Run direct Runner discovery/install/Doctor validation, prove Sparkta recipes contain no Soft Factory knowledge, prove an unrelated temporary sibling skill survives engineering-harness validation, then run authoritative focused/full project gates.
