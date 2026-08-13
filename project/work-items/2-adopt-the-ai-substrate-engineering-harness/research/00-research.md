# Research Brief: Correct the AI-Substrate engineering harness skill allowlist

## GitHub Issue
- **Issue:** #2
- **Title:** Adopt the AI-Substrate engineering harness
- **Work Item:** project/work-items/2-adopt-the-ai-substrate-engineering-harness

## Scope Classification
- **Scope Type:** issue

## Problem Statement
Issue #2 and open PR #10 currently commit and describe the full nine-skill packaged GitHub Copilot inventory. The corrective requirement narrows the committed engineering-harness skill allowlist to exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`. The branch currently includes six explicitly unwanted packaged skills and multiple repository, governance, work-item, generated-report, and GitHub claims based on the nine-skill inventory. Research must identify those surfaces while preserving unrelated working-tree changes, especially the newly generated harnessability assessment.

## Acceptance Criteria
**Core**
- [x] The locally available `@ai-substrate/engineering-harness` v0.13.0 package is installed and `harness --version`, `harness instructions`, and `harness doctor --json` report usable results.
- [x] GitHub Copilot harness skills are installed and repository-local governance artifacts are discoverable by a cold agent session.
- [x] Harness boot starts the current application or bootstrap surface from a known state and returns inspectable evidence.
- [x] Focused and full harness checks delegate to the authoritative root recipes without replacing `just verify-focused` or `just verify`.
- [x] Repository instructions direct autonomous agents to use the harness as the deterministic engineering surface.

**Verification**
- [x] Harness readiness, boot, focused checks, and full checks succeed in the configured development environment.

## Repository Findings
- GitHub Issue #2 was fetched first with `gh issue view 2 --json title,body,labels,assignees,milestone`. Its body contains a structured `ACCEPTANCE_CRITERIA_START`/`ACCEPTANCE_CRITERIA_END` block with the six checked Markdown criteria preserved above in issue order. The issue is labeled `feature` and `in-progress`; its criteria do not state a skill count.
- Exactly one matching work-item directory exists: `project/work-items/2-adopt-the-ai-substrate-engineering-harness/`. The stable path is required by `project/README.md`, `CORE-COMPONENT-260806-rpiv-stage-contract.md`, and Decision Log entries 24–25.
- The current branch is `issue-2-adopt-engineering-harness` at `bc5201c10d0d58138c4f44f674387ec4e01ade13`, tracking its remote. Open PR #10, `feat(harness): adopt deterministic engineering surface`, targets `main` and claims that nine packaged skills and 55 files are accepted.
- The committed `.agents/skills/` inventory contains nine top-level skills: `builder` (21 files), `eng-harness-0-harnessability-assessment` (11), `eng-harness-flow` (13), `eng-harness-in-a-box` (1), `grill-agent-done` (1), `plan-0-v2-constitution` (1), `plan-v2-extract-domain` (1), `the-flow` (1), and `validate-v2` (5). All were added by the PR branch. The three required names are present; the other six are the names the corrective requirement explicitly excludes.
- `.harness/skills.lock.json` is tracked and is documented as canonical, but it records only project scope, `github-copilot` target, and `packaged` source; it does not enumerate allowed skill names. Root `skills-lock.json` does enumerate all nine names and transient `../../tmp/harness-skills-*` sources, but it is not tracked and is locally ignored by `.git/info/exclude`.
- `.github/skills/README.md` is the explicit skill index and links all nine `.agents/skills` entries. It separately indexes the pre-existing `.github/skills/agnostic-prompt-standard/` skill.
- `.harness/engineering-harness.md` describes skill portability as "Nine repository-local" entries. `README.md` and `docs/README.md` describe a complete packaged inventory; `LLM.txt` describes `.agents/skills/` as the complete ambient 0.13.0 packaged set; `AGENTS.md` points agents generically to `.agents/skills/*/SKILL.md` and the index. `project/architecture/README.md` also describes repository-local skills as part of the adopted harness boundary.
- `CORE-COMPONENT-260813-engineering-harness-operation.md` requires committed "complete GitHub Copilot skill content" and installation through the ambient packaged-source command. `project/architecture/ADR/DECISION-LOG.md` decision 46 similarly says to install packaged skills and commit skills/discovery, without naming an allowed subset.
- Existing issue artifacts encode the superseded inventory: `implementation/00-implementation.md` names all nine and states ambient/committed equality; `verify/summary.md` accepts nine skills and 55 files. PR #10 repeats those claims in its body. The original issue criteria are already checked.
- The adoption flow (`.harness/flows/adopt.json` and generated `.md`) references skills generically rather than listing names. The harness-change record concerns checks and runtime commands and does not enumerate skills.
- The working tree had unrelated assessment changes before this Research update: modified `.harness/reports/harnessability/latest.json` and `latest.md`, plus untracked `.harness/reports/harnessability/002-sparkta/`. The generated run identifies branch `issue-2-adopt-engineering-harness`, commit `bc5201c`, static mode, and explicitly says no installation, service boot, runtime probes, tests, or builds were run. Its Markdown currently reports "Nine committed packaged skills" at line 63.
- Application inspection found that `apps/server/src/app.ts#createServer` still owns the non-sensitive `/api/readiness` route and `apps/server/src/app.test.ts` covers it. `.harness/extensions/checks/extension.ts` delegates to root `just` recipes, while `.harness/extensions/boot/extension.ts` and `apps/server/src/harness-boot-ownership.test.ts` govern runtime ownership. None of these source/test surfaces enumerates the skill allowlist.
- The root `justfile` remains the authoritative setup/run/validation interface. No service was booted, no dependency was installed, and no application source or tests were changed during Research.

## Constraints
- The committed engineering-harness GitHub Copilot allowlist must contain exactly these names, in the user-specified set: `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`.
- `builder`, every `plan-*` skill, `the-flow`, `validate-v2`, `eng-harness-in-a-box`, and every other harness skill must not be restored or represented as allowed.
- The existing work-item directory name must remain `project/work-items/2-adopt-the-ai-substrate-engineering-harness`.
- Unrelated user changes must be preserved. In particular, the modified latest assessment and untracked `.harness/reports/harnessability/002-sparkta/` files must not be overwritten, removed, or folded into corrective work merely because they retain a nine-skill observation.
- The ignored root `skills-lock.json` is not committed state. Its transient-source entries cannot establish the committed allowlist described by repository documentation.
- Cold-agent discovery claims across the tracked skill directories, canonical lock declaration, skill index, repository maps, governance, architecture contract, prior implementation/verification records, and PR metadata currently disagree with the corrective requirement. Historical/generated artifacts and live normative surfaces have different ownership and mutability constraints.
- `CORE-COMPONENT-260806-project-command-interface.md` and Decision Log entries 10–15 preserve the root `justfile` and distinct focused/full recipes. The skill correction must not displace that unrelated contract.
- `ADR-260812-foundation-stack.md`, `ADR-260812-filesystem-state-boundary.md`, and the readiness/ownership source and tests establish application and runtime boundaries unrelated to skill selection.
- Research is limited to findings, constraints, relevant architecture, risks, and questions. It does not alter plans, application code, tests, ADRs, core-components, or implementation/verification records.

## Relevant ADRs and Core-Components
- `project/architecture/ADR/ADR-260812-foundation-stack.md` — fixes the Node.js 24/npm workspace foundation; the ambient harness remains outside repository npm dependencies.
- `project/architecture/ADR/ADR-260812-filesystem-state-boundary.md` — keeps product state separate from `.harness/` governance and evidence.
- `project/architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md` — directly governs packaged skill installation, committed skill content, discovery, extensions, and the ambient CLI boundary; its "complete" wording is relevant to the narrowed allowlist.
- `project/architecture/core-components/CORE-COMPONENT-260806-project-command-interface.md` — preserves root `justfile` authority and delegated harness checks.
- `project/architecture/core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md` — requires this stable work-item path and limits Research to non-design findings.
- `project/architecture/core-components/CORE-COMPONENT-260806-agent-executable-acceptance-criteria.md` — governs bounded, observable issue outcomes; Issue #2 does not itself specify the corrected count.
- `project/architecture/core-components/CORE-COMPONENT-260505-commit-standards.md` — governs later branch commits and PR title format.
- `project/architecture/ADR/DECISION-LOG.md` — registers the relevant architecture and records decision 46 for packaged skill installation/committed discovery.

## Risks and Open Questions
- The tracked canonical `.harness/skills.lock.json` has no per-skill entries, while the only file that names all nine as a lock is ignored and transient. The repository currently has no unambiguous, tracked named allowlist artifact.
- Running the documented packaged installer under the current contract may repopulate the six unwanted skills because prior evidence says the ambient packaged inventory contains all nine. This conflicts with the explicit prohibition on restoring any additional skill.
- The preserved generated assessment and its `latest` aliases state that nine skills are committed. After correction, that static statement may be stale, but the user has explicitly made these pre-existing changes preservation-sensitive.
- The pre-existing `.github/skills/agnostic-prompt-standard/` tree is separate from the PR-added harness skills. It is unclear whether "exactly these three" applies only to the engineering-harness packaged `.agents/skills/` allowlist or to every Copilot-discoverable skill in both trees; removing the APS skill would affect unrelated main-branch content.
- The adopted core-component says "complete GitHub Copilot skill content" and the Decision Log says to install packaged skills, while the corrective requirement requires a subset. The intended interpretation of "complete" after narrowing is not stated.
- Issue #2 and PR #10 currently present acceptance as complete based on nine skills. Their checked criteria and verification narrative no longer establish the user-required corrected inventory.
