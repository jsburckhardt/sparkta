# Implementation Evidence: Correct Soft Factory Runner operation

> **Status: Superseded - returned to Plan on 2026-08-14.** This evidence does not prove the corrected plan. The prior focused/full gates still required the separately governed Soft Factory skill through `justfile#verify-harness-skills`, so their success cannot establish Runner-independent Sparkta validation. Implement must replace the affected AC evidence after completing T-1 through T-5.

## Correction

The final implementation keeps Runner compatibility and readiness under the direct official CLI. Sparkta's root recipes remain project-only gates and do not invoke Runner or perform separate Runner diagnostics.

## Completed Tasks

- **T-1:** Restored the three RPIV agents to the accepted baseline and removed the rejected custom orchestration surfaces.
- **T-2:** Kept every Runner discovery, preflight, installation, and lifecycle workflow on direct `soft-factory` commands with one caller-supplied positive issue number where required.
- **T-3:** Made `just verify-focused` and `just verify` independent of Soft Factory diagnostics while preserving the official assets, integration metadata, and final Runner validation setting.
- **T-4:** Ran direct Runner Doctor and both project gates, completed a comprehensive repository scan, and prepared the correction without pushing or mutating GitHub.

## Acceptance Evidence

- **AC-1:** The ambient `soft-factory` CLI remains directly available as `soft-factory-runner@0.1.0`.
- **AC-2:** `.soft-factory/config.yml` remains protocol 1 with `.trees`, `.soft-factory`, final `just verify`, and concurrency 1. Direct Doctor accepted the configuration.
- **AC-3:** Superseded. Asset presence and compatibility must be established through official installation and `soft-factory doctor --json`, not independent file or hash checks.
- **AC-4:** Direct `soft-factory doctor --json` exited 0 with schema version 1, `ready: true`, repository `jsburckhardt/sparkta`, default branch `main`, and 24 of 24 blocking checks passed.
- **AC-5:** `README.md` and `docs/README.md` retain the direct lifecycle command matrix. The root command interface has no operational Runner recipe and does not execute `soft-factory`.
- **AC-6:** Superseded. The prior project gates passed only because harness governance still enumerated and required the Soft Factory skill. Corrected evidence must prove those gates know only Sparkta and the three engineering-harness skills while preserving unrelated siblings.

## Documentation Evidence

Updated `README.md`, `LLM.txt`, the Soft Factory operating core-component, the decision log, all Issue #3 Plan artifacts, the existing verification summary, and this implementation evidence. No API, configuration default, migration, deployment, or Sparkta product behavior changed. The harnessability assessment reports contained no rejected identifiers or stale claims requiring edits.

## Validation Notes

Direct Doctor is the sole Runner compatibility and readiness authority. Sparkta focused/full validation remains the final project validation configured in `.soft-factory/config.yml`, but those recipes neither execute Runner nor perform a Soft Factory-specific check. Final acceptance remains owned by Verify.

## Verify-Return Repair

- Rewrote the stale architecture overview so it names direct `soft-factory doctor --json` as the sole Runner compatibility and repository-readiness authority and explicitly disclaims a separate Sparkta repository check.
- Searched all tracked files, excluding Git object history, for all four stale markers specified in the Verify return; the repaired tree contains zero matches.
- Re-ran direct Runner Doctor and the focused and full root project gates. No Runner configuration, direct CLI contract, official asset, or remote pull-request content changed.
