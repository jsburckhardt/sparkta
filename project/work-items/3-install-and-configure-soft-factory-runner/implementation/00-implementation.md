# Implementation Evidence: Replace package assets with Runner dispatcher

## Completed Tasks

- **T-1:** Removed all three plan-specified unwanted asset surfaces; retained exactly the three engineering-harness skills and the existing Runner configuration, ignores, and RPIV metadata.
- **T-2:** Added `.github/agents/runner-dispatcher.agent.md` as an APS v1.2.2, VS Code, user- and model-invocable depth-1 leaf with only `execute/runInTerminal` and `execute/getTerminalOutput`.
- **T-3:** Reconciled live setup, usage, governance, architecture, skill index, harnessability assessment, historical work-item, and current evidence references around the dispatcher and Doctor-only readiness authority.
- **T-4:** Ran structural, APS, control-flow, inventory, JSON, stale-reference, direct preflight, focused, and full validation without invoking a real issue run.

## Acceptance Evidence

- **AC-1:** Direct `soft-factory instructions --json` returned schema version 1 and direct `soft-factory doctor --json` returned schema version 1 with `ready: true`; the ambient CLI remained available without repository installation changes.
- **AC-2:** `.soft-factory/config.yml` retains protocol 1, `.trees`, `.soft-factory`, final validation `just verify`, and concurrency 1. `.github/agents/rpiv.agent.md` retains `runner_protocol: 1` and `result_contract: agent-result-v1`; `.gitignore` retains both Runner roots while allowing configuration.
- **AC-3:** APS lint passed section order, newline, instructions, frontmatter, tool, format, trigger, and command-count checks. The dispatcher frontmatter is `user-invocable: true`, `disable-model-invocation: false`, and `target: vscode`; its only tools are the two qualified terminal tools. Static control proof found exactly three ordered terminal calls: instructions, Doctor, and one exact run command.
- **AC-4:** Invalid input branches precede terminal use, the non-ready Doctor branch returns exact structured Doctor output before the run path, Runner output remains exact, and the result separately reports dispatch acceptance and ticket completion. Static proof found no nested delegation, `just` Runner wrapper, lifecycle command invocation, direct state access, retry, or RPIV invocation.
- **AC-5:** The three unwanted paths are absent. The retained `SKILL.md` inventory is exactly `eng-harness-0-harnessability-assessment`, `eng-harness-flow`, and `grill-agent-done`. The Verify repair corrected all six mirrored assessment statements to identify `runner-dispatcher` as a repository-owned agent rather than a Soft Factory skill. Live documentation and current evidence no longer recommend package-managed Copilot asset installation; Research and the old Verify summary are explicitly marked historical/superseded.
- **AC-6:** APS lint, asset/config assertions, assessment JSON parsing, exact-command negative controls, direct instructions/Doctor preflight, Runner-independence scan, focused checks, and full checks passed. No `soft-factory run` command was executed against any issue.

## Documentation Evidence

- **Setup and usage:** `README.md`, `docs/README.md`, and `CONTRIBUTING.md` now provide one-hop dispatcher discovery, explicit positive issue input, ordered direct preflight, Doctor remediation, exact dispatch, and launch-versus-completion semantics.
- **Agent and skill discovery:** `AGENTS.md`, `LLM.txt`, `.github/skills/README.md`, and `.harness/engineering-harness.md` identify the dispatcher as an agent facade and retain exactly three engineering-harness skills.
- **Architecture:** `project/architecture/README.md`, `CORE-COMPONENT-260813-soft-factory-runner-operation.md`, and `DECISION-LOG.md` define Doctor as sole readiness authority and Runner as sole lifecycle/state owner.
- **Assessments:** `003-sparkta` and `latest` Markdown/JSON inventories plus `003-sparkta/evidence.jsonl` now describe exactly three committed engineering-harness skills. The mirrored reports identify `.github/agents/runner-dispatcher.agent.md` as the repository-owned Runner dispatcher agent; both JSON reports parse successfully with Node.
- **Historical evidence:** Research retains a clear pre-revision provenance marker. The prior Verify summary is marked superseded and makes no current acceptance decision. The GitHub issue body and PR body were not changed.
- **No product impact:** API behavior, application configuration, data, migration, deployment, and Sparkta product behavior are unchanged.

## Validation Evidence

- **APS v1.2.2 lint:** `APS_LINT=PASS`; APS v1.0 section order is `instructions,constants,formats,runtime,triggers,processes,input`; VS Code adapter 2.1.0 frontmatter and least-privilege tool checks passed; formats are `INVALID_INPUT`, `DOCTOR_REMEDIATION`, and `RUNNER_RESULT`.
- **Control flow:** `CONTROL_FLOW=PASS`; terminal invocations are exactly instructions, Doctor, run in order; missing, multiple, zero, negative, fractional, signed, and invalid inputs are rejected before terminal use; Doctor non-ready returns without run; positive launch execution was false.
- **Inventory and integration:** `ASSET_INVENTORY=PASS`; exactly three engineering-harness skills remain; protocol, root, validation, concurrency, ignore, and RPIV metadata assertions passed.
- **Assessment JSON:** `ASSESSMENT_JSON=PASS` for `003-sparkta/report.json` and `latest.json`; a changed-assessment scan found zero false Soft Factory-skill claims.
- **Runner independence:** `PROJECT_VALIDATION_RUNNER_INDEPENDENCE=PASS`; root recipes, package metadata, applications, and devcontainer state contain no Runner execution dependency.
- **Direct preflight:** Instructions returned schema version 1 and effective final validation `just verify`. Doctor returned schema version 1, `ready: true`, and 24 passed blocking checks.
- **Focused gate:** `harness checks focused --json` delegated exactly to `just verify-focused`; 6 files and 13 tests passed with exit code 0.
- **Full gate:** The first `harness checks full --json` reached `just verify` and reported a `README.md` Prettier mismatch. After applying the existing formatter, the rerun delegated exactly to `just verify` and passed tests, lint, formatting, type-check, build, and diff integrity with exit code 0.

## Warnings and Friction

- Harness Doctor is usable but degraded because harness telemetry capture is intentionally off and the installed `git-ai` binary directory is absent from editor PATH. Its next actions remain environment-owned.
- `rg` and the required `apply_patch` helper were absent. Tracked-file scans used `git grep`; patch-only edits used a local asserted `apply_patch` fallback. The minimal `python3` lacked `json.tool`, so assessment JSON parsing used the existing Node runtime.
- The host exposed no callable slash-skill tool to fire `/eng-harness-flow --hook coding` or `/eng-harness-flow --hook post-coding`; concrete friction was still captured through `harness observe` as required. The observation bucket contains prior-session entries, so it was not cleared destructively.

## Handoff Status

Implementation is complete pending the managed implementation commit. Final acceptance remains owned by Verify.
