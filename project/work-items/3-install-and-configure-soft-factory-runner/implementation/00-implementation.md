# Implementation Evidence: Restore Soft Factory Doctor authority

## Completed Tasks

- **T-1:** Scoped `verify-harness-skills` to non-empty `SKILL.md` files for `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`. The recipe no longer enumerates sibling directories and leaves unrelated skills untouched.
- **T-2:** Assigned Runner compatibility, readiness, configuration, and asset authority exclusively to Doctor while keeping Sparkta project gates independent of Runner diagnostics.
- **T-3:** Preserved direct official CLI operation, package-owned installation, protocol-1 integration, Runner-owned state, explicit issue input, and `.soft-factory/config.yml` final validation `just verify`. No Runner wrapper or project-validation invocation was added.
- **T-4:** Updated harness discovery, skills guidance, architecture-facing documentation, and RPIV evidence to describe the three named engineering-harness checks, unrelated-sibling preservation, and Doctor-only Runner authority.
- **T-5:** Executed V-1 through V-5, including the temporary unrelated sibling control, direct Runner commands, zero-knowledge scans, and focused/full project gates.

## Acceptance Evidence

- **AC-1:** Direct `soft-factory --help` and `soft-factory instructions --json` succeeded. Recommended installation reported the package-owned assets already up to date, and direct Doctor reported ready.
- **AC-2:** Direct Doctor accepted protocol 1, safe `.trees` and `.soft-factory` roots, and positive concurrency. Instructions reported effective final validation `just verify`; Sparkta project recipes did not inspect Runner configuration.
- **AC-3:** `soft-factory install --recommended` completed with `ASSETS_UP_TO_DATE` and no changes. Direct Doctor supplied the sole compatibility, readiness, and asset verdict.
- **AC-4:** Direct `soft-factory doctor --json` returned schema version 1, `ready: true`, and 24 passed checks with no failed check.
- **AC-5:** `README.md` and `docs/README.md` retain direct commands for run, list/status, reconcile, resume, stop, clean, attach, and logs, with caller-supplied issue input where required.
- **AC-6:** Direct help, instructions, installation, and Doctor completed without selecting an issue. The temporary unrelated sibling sentinel retained the same SHA-256 before and after engineering-harness validation, and focused/full Sparkta gates remained independent of Runner.

## Documentation Evidence

- Updated `AGENTS.md`, `LLM.txt`, `README.md`, `docs/README.md`, `.github/skills/README.md`, and `.harness/engineering-harness.md` for named engineering-harness checks and unrelated-sibling preservation.
- Existing `project/architecture/README.md` and the engineering-harness and Soft Factory Runner core-components already state the corrected authority boundary and required no further contract change.
- API behavior, configuration defaults, migrations, deployment, and Sparkta product behavior were unaffected.
- The remote PR description was not changed during Implement. Verify must regenerate it from this corrected evidence and the final implementation SHA.

## Validation Evidence

- **V-1:** `just --show verify-harness-skills` named only the three governed engineering-harness skills and contained no sibling enumeration or Runner knowledge. `just verify-harness-skills` passed with an unrelated temporary sibling present; sentinel digest before and after was `9a74a9b6e01d4c658c79e61e1b7e4cd7d8e0feacb18327a2a775c5b78e227322`.
- **V-2:** Tracked project recipes, scripts, and tests contained no Runner-specific validation logic or competing compatibility, readiness, configuration, or asset verdicts.
- **V-3:** Direct help, schema-1 instructions, recommended installation, and schema-1 Doctor succeeded; instructions resolved final validation to `just verify`, installation changed no assets, and Doctor reported 24 passed checks.
- **V-4:** The operator command matrix and Doctor-only authority language were present in live setup, operations, skills, harness, and architecture documentation.
- **V-5:** `harness checks focused --json` delegated to `just verify-focused`; `harness checks full --json` delegated to `just verify`; direct instructions still resolved final validation to `just verify`.

## Handoff Status

Implementation is complete and committed by the SHA supplied in the Implement handoff. Final acceptance remains owned by Verify.
