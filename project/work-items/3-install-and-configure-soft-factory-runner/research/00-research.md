# Research Brief: Install and configure Soft Factory Runner

## GitHub Issue
- **Issue:** #3
- **Title:** Install and configure Soft Factory Runner
- **Work Item:** project/work-items/3-install-and-configure-soft-factory-runner

## Scope Classification
- **Scope Type:** issue

## Problem Statement
Issue #3 introduces the Soft Factory Runner after engineering-harness adoption so explicitly selected GitHub issues can use isolated and recoverable RPIV runs. The configured environment already contains the Runner CLI and the user-installed official assets. Repository readiness is still blocked by missing repository configuration and associated canonical RPIV and ignore declarations; this Research records those surfaces without installing assets, starting services, selecting an issue, or changing Runner state.

## Acceptance Criteria
<!-- ACCEPTANCE_CRITERIA_START -->

**Core**
- [ ] The `soft-factory-runner` package is installed and its `soft-factory` CLI is available in the configured development environment.
- [ ] Runner configuration declares protocol 1, safe repository worktree and state roots, and a positive concurrency limit.
- [ ] The recommended official Operator, Assessor, and Soft Factory skill assets are installed with a valid `.agents/manifest.json`.
- [ ] `soft-factory doctor --json` reports every readiness check and provides actionable remediation for any unmet prerequisite.
- [ ] Repository instructions explain how to run, inspect, reconcile, resume, stop, clean, attach to, and read logs for one explicitly selected issue.

**Verification**
- [ ] Runner help, instructions, asset installation, and repository Doctor execute successfully without selecting or mutating an unrelated issue.

<!-- ACCEPTANCE_CRITERIA_END -->

## Repository Findings
- GitHub Issue #3 was fetched first with `gh issue view 3 --json title,body,labels,assignees,milestone`. It is titled “Install and configure Soft Factory Runner,” is labeled `feature` and `in-progress`, is assigned, belongs to #9, and contains the structured acceptance-criteria block reproduced above in original order.
- No `project/work-items/3-*` directory existed. The title-derived stable path is therefore `project/work-items/3-install-and-configure-soft-factory-runner`, consistent with `project/README.md` and `CORE-COMPONENT-260806-rpiv-stage-contract.md`.
- The current branch is `issue-3-install-and-configure-soft-factory-runner`. Before Research, the tree already contained modified `.harness/reports/harnessability/latest.json` and `latest.md`, untracked `.harness/reports/harnessability/003-sparkta/`, and the untracked Soft Factory assets. These files were not edited. The assessment identifies itself as static historical evidence and explicitly says no services, tests, builds, dependency installation, or external calls were run (`.harness/reports/harnessability/latest.md`).
- `soft-factory` resolves to the globally installed `soft-factory-runner` package version `0.1.0`. `soft-factory --help` identifies “Soft Factory Runner Phase 5” and exposes install, doctor, instructions, explicit run, reconcile, resume, stop, clean, list, status, attach, and logs commands. Bare `--version` is not supported and returns `CLI_INVALID`; package metadata was the available version evidence.
- `soft-factory instructions --json` completed without mutation. It reports protocol schema 1, RPIV phases and statuses, `.soft-factory/rpiv-status.json`, immutable `.soft-factory/agent-result.json`, Runner ownership of snapshots/operational state/recovery/control/cleanup, and effective final validation `just verify`.
- `soft-factory doctor --json` returned a complete structured result with `ready: false` and exit 3. Repository identity, primary-worktree status, Git common directory, default branch, required commands, authentication, and RPIV-agent compatibility passed. It supplied messages and remediation for every failed check.
- Doctor reports `.soft-factory/config.yml` missing or unreadable. The `.soft-factory/` directory does not exist. Installed Runner documentation describes strict configuration surfaces for `protocol_version`, `repository.worktree_root`, `repository.state_root`, and positive `execution.max_concurrent_runs`; it rejects unknown keys and unsafe absolute, traversing, or overlapping roots (`/usr/local/share/nvm/versions/node/v24.19.0/lib/node_modules/soft-factory-runner/README.md`).
- Doctor also reports that Runner protocol 1 is not declared by both configuration and the canonical RPIV asset, and that the result contract is absent. `.github/agents/rpiv.agent.md` currently contains neither `runner_protocol: 1` nor `result_contract: agent-result-v1`; installed Runner documentation identifies that file as the canonical RPIV readiness asset.
- Root `.gitignore` currently ignores `node_modules/`, build/coverage artifacts, `.devcontainer/.tmux-shared`, and `.sparkta/runtime/`; it has no Runner worktree or state-root coverage. Doctor consequently cannot prove complete worktree-tree or runtime-state ignore coverage until valid roots exist.
- The official Operator, Assessor, and skill are present at `.agents/agents/soft-factory.agent.md`, `.agents/agents/soft-factory-assessor.agent.md`, and `.agents/skills/soft-factory/SKILL.md`. Their SHA-256 values exactly match `.agents/manifest.json`; the manifest is schema version 1, records package version `0.1.0`, Runner protocol 1, fixed destinations, and all three expected asset types. The assets delegate operations and readiness to the CLI and prohibit competing worktree, lock, process, state, and cleanup paths.
- Repository documentation does not yet expose the Runner operational workflow. `README.md`, `docs/README.md`, `LLM.txt`, and `project/architecture/README.md` describe the Runner as future or excluded scope and document only the engineering harness. `AGENTS.md` defines RPIV and harness behavior but does not provide the Runner control-command surface.
- The root `justfile` contains `verify-focused` and `verify`, and `soft-factory instructions --json` resolves final validation to `just verify`. However, `verify-harness-skills` currently requires exactly three engineering-harness directories under `.agents/skills/`; the installed `.agents/skills/soft-factory/` directory makes the actual inventory exceed that encoded allowlist.
- Existing application code remains a minimal React/Vite and Fastify foundation (`apps/web/`, `apps/server/`). `.harness/extensions/checks/extension.ts#delegate` delegates checks to root recipes. `.harness/extensions/boot/extension.ts#ownershipValidation` and `apps/server/src/harness-boot-ownership.test.ts` enforce harness process ownership. No inspected application source or test implements Runner configuration or control behavior.
- `.devcontainer/devcontainer.json`, `.devcontainer/post-create.sh`, and root `package.json` do not provision `soft-factory-runner`; the package is currently an ambient user-installed tool rather than repository-reproduced npm state.

## Constraints
- Scope classification is exactly `issue`; Research does not select an architecture change.
- Runner configuration must satisfy protocol 1, safe repository-relative non-overlapping roots, and a strict positive concurrency limit. Doctor requires complete ignore coverage and safe/writable/creatable root facts before readiness can pass.
- `.github/agents/rpiv.agent.md` is the sole canonical RPIV readiness asset according to Doctor and the installed Assessor. Installed `.agents/` assets do not replace it.
- Runner is the sole control plane for its worktrees, locks, leases, snapshots, state, tmux/process resources, recovery, and cleanup, as stated by the installed Operator and skill assets and `soft-factory instructions --json`.
- The root `justfile` remains the authoritative project validation interface under `CORE-COMPONENT-260806-project-command-interface.md`, `CORE-COMPONENT-260806-rpiv-stage-contract.md`, and `CORE-COMPONENT-260813-engineering-harness-operation.md`. Runner currently discovers `just verify` as final validation.
- The adopted engineering-harness contract and `justfile#verify-harness-skills` authorize exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` beneath `.agents/skills/`, while Issue #3 requires the official Soft Factory skill at that same parent path. This is an existing repository-contract conflict, not a Research-stage design choice.
- Harness-owned transient evidence remains under `.harness/temp/boot/` and must not overlap Runner state. Sparkta product state remains separately governed as durable `.sparkta/apps/` and disposable `.sparkta/runtime/` by `ADR-260812-filesystem-state-boundary.md` and `CORE-COMPONENT-260812-state-lifecycle.md`.
- Repository guidance must preserve explicit issue selection: the CLI and installed assets prohibit queueing, ranking, inferring, or selecting an issue.
- The pre-existing modified `latest.*`, untracked `.harness/reports/harnessability/003-sparkta/`, and all user-installed `.agents/` assets must remain unchanged. Research did not run asset installation, boot services, issue execution, reconciliation, resume, stop, clean, attach, logs, or any Runner-mutating command.
- Research may record findings only; it does not design a solution, create implementation tasks, define tests/evidence, modify application code, tests, plans, ADRs, core-components, or the Decision Log.

## Relevant ADRs and Core-Components
- `project/architecture/ADR/ADR-260812-foundation-stack.md` — establishes Node.js 24, npm workspaces, root lockfile, and configured development-tool ownership.
- `project/architecture/ADR/ADR-260812-filesystem-state-boundary.md` — reserves `.sparkta/apps/` and `.sparkta/runtime/` for product state, relevant to avoiding overlap with Runner-owned roots.
- `project/architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md` — directly governs ambient-tool boundaries, the exact engineering-harness skill allowlist, root-recipe delegation, process ownership, discovery, and RPIV seams; its skill rule conflicts with the installed official Soft Factory skill.
- `project/architecture/core-components/CORE-COMPONENT-260806-project-command-interface.md` — keeps root `justfile` recipes authoritative and requires distinct focused/full validation.
- `project/architecture/core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md` — governs stage ownership, stable work-item resolution, Research limits, and root validation.
- `project/architecture/core-components/CORE-COMPONENT-260806-agent-executable-acceptance-criteria.md` — requires safe, bounded, observable repository validation and explicit external prerequisites.
- `project/architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md` — reinforces separation of durable and disposable Sparkta product state from operational tooling state.
- `project/architecture/ADR/DECISION-LOG.md` — registers both accepted ADRs and all adopted core-components; decisions 7, 10–15, 24–25, 29–30, and 43–48 are directly relevant to command authority, stable work-item paths, state boundaries, and harness governance.

## Risks and Open Questions
- Doctor contradicts the narrower premise that only one configuration file is missing: readiness also requires canonical RPIV protocol/result metadata and root ignore coverage, while several runtime checks remain downstream-blocked until roots are valid.
- The official Soft Factory skill required by Issue #3 violates the currently adopted exact-three `.agents/skills/` rule and causes `justfile#verify-harness-skills` to reject the inventory. Resolving that contradiction may affect a global core-component and Decision Log, but Research cannot choose or propose that decision.
- `soft-factory --version` is unsupported even though the package is installed. The repository currently has no reproducible provisioning declaration, and existing setup documentation expressly scopes the Runner out.
- Worktree and state roots have not been selected. Their eventual relationship to Git ignore rules, `.harness/` transient evidence, `.sparkta/` product boundaries, the Git common directory, filesystem writability, and ownership checks remains unresolved.
- Repository instructions currently omit every Runner lifecycle command required by the issue. The appropriate authoritative discovery surfaces and how they coexist with harness-first guidance remain unresolved.
- The official assets are untracked. Until repository ownership is established, their availability depends on this working tree and they remain vulnerable to accidental cleanup or replacement.
- Doctor runtime ownership, state readability, lock interpretation, and required-path creation checks cannot produce positive facts while configuration is absent; their current failures do not distinguish later configuration defects from downstream effects.
- The pre-existing harnessability assessment reflects the exact-three skill contract. It will become stale relative to the four-directory `.agents/skills/` inventory if retained as live guidance, but the user explicitly requires all assessment artifacts to remain byte-for-byte preserved during Research.
