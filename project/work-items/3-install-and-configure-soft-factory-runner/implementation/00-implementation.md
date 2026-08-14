# Implementation Evidence: Correct Soft Factory Runner operation

## Correction

Commit `5f704997f33a892f46590045e003fd17a1858c83` introduced a repository-specific Operator, helper adapter, synthetic canary, executable APS rewrites, and operational Just recipes. The user rejected that design. This corrective implementation restores the prior official Runner-owned RPIV integration semantics and removes the repository-specific execution layer rather than amending or hiding the rejected commit.

## Completed Tasks

- **T-1:** Restored `.github/agents/rpiv.agent.md`, `rpiv-implementer.agent.md`, and `rpiv-verifier.agent.md` byte-for-byte to the `e67a2ac5d4f7c56b80007a2a5404f9c00fa21fec` baseline. Removed the Sparkta Operator, integration adapter, synthetic canary, rejected retro, and their architecture claims.
- **T-2:** Removed the generic pass-through and every operational Runner recipe. Updated live guidance to use direct `soft-factory` discovery, preflight, installation, and lifecycle commands with one explicit positive issue number.
- **T-3:** Retained only `verify-soft-factory-contract`, a static repository check that validates committed compatibility and never executes Runner. Focused and full Sparkta validation include that static check.
- **T-4:** Ran direct Runner discovery and Doctor, ran focused and full project validation, captured integrity evidence, and prepared a corrective commit without pushing or mutating GitHub.

## Acceptance Evidence

- **AC-1:** `soft-factory --help` exited 0 at `/usr/local/share/nvm/versions/node/v24.19.0/bin/soft-factory`; global package identity is `soft-factory-runner@0.1.0`. Direct `soft-factory instructions --json` returned schema version 1.
- **AC-2:** `.soft-factory/config.yml` remains protocol 1 with `.trees`, `.soft-factory`, final `just verify`, and concurrency 1. Direct instructions reported effective final validation `just verify`.
- **AC-3:** Static validation and independent `sha256sum` produced official Operator `46b96e18bbf06178c8163d34bd0698ec82c80015af782c22ce6bc44527ced760`, Assessor `40054f0959a92710cdaed42b8bb870867faae29d5e3c1acf6087349762b7ed3d`, skill `07d0c15bb765281f7d47cb0d8e1784b70cb5d2ec06f3943880420f8c579d3b6f`, and manifest `e57667a0f61e5025a6022b412744281fe6418f39bebe885e3f6e34b5a1a6a857`. The package-owned files were unchanged.
- **AC-4:** Direct `soft-factory doctor --json` exited 0 with schema version 1, `ready: true`, repository `jsburckhardt/sparkta`, default branch `main`, and all 24 unique blocking checks passed.
- **AC-5:** `README.md` and `docs/README.md` contain the complete direct lifecycle matrix. The static contract rejects the removed operational-wrapper phrase across live docs, governance, plans, implementation evidence, verification script, and `justfile`.
- **AC-6:** The custom Operator, adapter, and canary are absent; no synthetic issue or Runner operation was executed. `just verify-focused` passed 6 files/13 tests plus static contracts and diff integrity. `just verify` passed static contracts, 6 files/13 tests, lint, formatting, type-check, build, and branch diff integrity.

## Documentation Evidence

Updated `AGENTS.md`, `README.md`, `docs/README.md`, `CONTRIBUTING.md`, `LLM.txt`, `.harness/engineering-harness.md`, `project/architecture/README.md`, and `CORE-COMPONENT-260813-soft-factory-runner-operation.md` to describe direct Runner operation and static-only repository validation. Added corrected decisions 54 and 55 to `DECISION-LOG.md`. No API, configuration default, migration, deployment, or Sparkta product behavior changed.

## Review Repair

The correction preserves the user-approved boundary: Runner delivers issues normally through its official CLI and Runner-owned RPIV integration. Sparkta contributes no synthetic issue, fake helper, alternate Operator, execution adapter, or operational wrapper. `.soft-factory/config.yml` still names `just verify` because that is the project validation command Runner executes, not a Runner invocation.

## Validation Notes

The first full gate found only README and detailed-documentation formatting drift. Prettier corrected those two files and the complete gate then passed. The harness did not expose a registered `observe` verb when that retry trigger occurred; `harness instructions observe` returned `unconfigured`, so no observation was recorded. The host skill mechanism was unavailable to this Implement session, so no shell command was substituted for the required slash-command seams.
