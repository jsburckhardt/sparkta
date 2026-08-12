# Research Brief: Bootstrap Sparkta and coordinate Prototype 0

## GitHub Issue
- **Issue:** #1
- **Title:** Bootstrap Sparkta and coordinate Prototype 0
- **Work Item:** project/work-items/1-bootstrap-sparkta-and-coordinate-prototype-0

## Scope Classification
- **Scope Type:** issue

## Problem Statement
The repository contains the Soft Factory workflow and product requirements, but it has no Sparkta application scaffold, package manifest, application source, or tests. Issue #1 requires the foundational Sparkta bootstrap to establish the product identity and rapid UI-prototyping direction, expose a documented project command interface, and coordinate the ordered Prototype 0 delivery issues #2, #3, and #4. The user has approved the foundational stack and cross-cutting concern scope, regeneration of the inherited root `justfile`, and inclusion of every pre-existing worktree change in this bootstrap work.

## Acceptance Criteria
**Core**
- [ ] The bootstrap agent initializes Sparkta with its product identity, rapid UI-prototyping goal, and PRD-defined Node.js/TypeScript direction.
- [ ] The selected framework, package manager, test runner, development standards, and cross-cutting concerns are recorded through the bootstrap architecture artifacts.
- [ ] The repository exposes documented root operating commands, including focused and full verification, and supports them from a clean checkout.
- [ ] Repository and development-environment documentation enables a cold agent session to install dependencies and use the project command interface.
- [ ] This issue links the harness, Soft Factory Runner, and Prototype 0 feasibility features in delivery order.

**Verification**
- [ ] Bootstrap validation succeeds using the repository's resulting command interface.

## Repository Findings
- GitHub issue #1 has the `epic` and `in-progress` labels. Its structured acceptance criteria are bounded by the required `<!-- ACCEPTANCE_CRITERIA_START -->` and `<!-- ACCEPTANCE_CRITERIA_END -->` markers. Its delivery-order checklist is #2, #3, then #4.
- The ordered children are all open: #2, "Adopt the AI-Substrate engineering harness," is `in-progress`; #3 is "Install and configure Soft Factory Runner"; and #4 is "Validate Prototype 0 prompt-to-running-UI feasibility." Issue #4 further orders #5, #6, and #7.
- `PRD.md` identifies Sparkta as a local, agent-powered rapid UI-prototyping environment and explicitly states that generated source on disk is durable while agent sessions, processes, ports, and runtime files are disposable (`PRD.md`, sections 1, 3, 5, 12-14, 19, and 41).
- The PRD specifies one-command startup, frontend-only generated demos, simulated data, no required backend or external infrastructure, and an opinionated generated-app stack (`PRD.md`, sections 5-7, 25-29). It describes Prototype 0 as manual app-directory creation, agent invocation, build, and development-server startup without a Sparkta UI (`PRD.md`, section 53).
- The PRD's initial technical direction is TypeScript and Node.js, React/Vite for the control UI, Fastify or a similarly lightweight server, React/TypeScript/Vite generated apps, filesystem persistence, and Node child-process runtime management (`PRD.md`, sections 37-41 and 54). The document is currently marked Draft, version 0.1 (`PRD.md`).
- `README.md` still contains the repository-template heading "Project Name" and placeholder description. `docs/README.md` is a generic application-documentation index rather than Sparkta setup or operating documentation. `LLM.txt` maps the Soft Factory files but does not yet list `PRD.md` or `.github/agents/prd-to-gh-issues.agent.md`.
- No application source, test files, `package.json`, lockfile, TypeScript configuration, Vite configuration, or Vitest configuration exists in the worktree. The repository is still at the single initial commit `63242a2`; `feat/1-bootstrap-sparkta`, `main`, and `origin/main` currently point to that commit.
- The inherited root `justfile` defines only `verify-focused` and `verify`. Both run `git diff --check`; `verify` scopes it from the merge base with `origin/main`. `just --list` exposes only those two recipes (`justfile`).
- The current environment provides `just` 1.42.4 but does not resolve `node` or `npm`. In `.devcontainer/devcontainer.json`, the Node feature is commented out, while the `just` feature is enabled; `.devcontainer/devcontainer-lock.json` likewise has no Node feature entry.
- `.github/agents/bootstrap.agent.md` treats a project with no non-template ADR as not yet bootstrapped. It requires foundational stack architecture artifacts, development standards and declared cross-cutting concerns, project-specific documentation, a stack-tailored devcontainer, and applicable root operating recipes. It also requires explicit approval before regenerating an inherited `justfile`; that approval is present in the user request.
- The current worktree is intentionally dirty with user-approved pre-existing changes: Sparkta identity renames in `.devcontainer/devcontainer.json`, `.devcontainer/post-start.sh`, and `.devcontainer/tmux-attach.sh`; deletion of `.github/agents/harness-cli-it.agent.md`; addition of `.github/agents/prd-to-gh-issues.agent.md`; and the untracked `PRD.md` artifact identified by the user as the Sparkta PRD rename. Git history contains no tracked predecessor for `PRD.md`.
- `.devcontainer/devcontainer.json` now names the container and Docker run target `sparkta`; the tmux scripts now use the `sparkta` session name. `.github/agents/prd-to-gh-issues.agent.md` defines PRD analysis and structured GitHub issue hierarchy generation.
- The architecture decision log contains no adopted ADRs. It records five adopted core-components and 25 decisions governing commits, RPIV stage ownership, project commands, acceptance criteria, and architecture artifact naming (`project/architecture/ADR/DECISION-LOG.md`).

## Constraints
- Research is limited to findings, constraints, existing architecture, risks, and open questions. Architectural choices beyond the user- and PRD-provided direction belong to a later stage.
- The user-approved foundational stack is TypeScript, Node.js, npm workspaces, React/Vite, Fastify, and Vitest. The approved foundational cross-cutting scope covers development standards, error handling, observability, and the boundary between durable application state and disposable runtime state.
- Every pre-existing worktree change listed in Repository Findings is explicitly in scope and must not be discarded merely because it predates this Research run.
- Sparkta's product identity and quality target are rapid, polished, interactive UI prototypes rather than production applications (`PRD.md`, sections 1-7 and 51). Generated applications are frontend-only simulations and must not require databases, backend APIs, authentication infrastructure, cloud services, or external data stores (`PRD.md`, sections 5-7 and 42).
- Application continuity is filesystem-based and cannot depend on an agent session, process, PID, port, or other volatile runtime state (`PRD.md`, sections 11-14, 19, 33-34, and 41). Runtime files must remain safe to delete while application files are durable.
- Prototype 0 remains a feasibility exercise without the Sparkta control UI or broader lifecycle product (`PRD.md`, section 53; GitHub issue #4). Issue #1 must preserve the delivery order #2 -> #3 -> #4.
- Root operating commands must be defined as `justfile` recipes; raw project commands belong only in recipe bodies. Applicable setup, run, test, lint, format-check, type-check, build, `verify-focused`, and `verify` operations are governed by `CORE-COMPONENT-260806-project-command-interface`. Focused and full verification must remain distinct.
- RPIV stages must preserve the stable work-item path and their ownership boundaries. Architecture artifacts are global, date-and-slug named, and registered in the decision log; templates are read-only (`CORE-COMPONENT-260806-rpiv-stage-contract`, `CORE-COMPONENT-260806-architecture-artifact-naming`, `project/README.md`).
- Issue acceptance criteria must remain in issue order and agent-executable (`CORE-COMPONENT-260806-agent-executable-acceptance-criteria`, `project/work-items/README.md`).
- Commit and eventual PR-title formatting are governed by `CORE-COMPONENT-260505-commit-standards`.
- The bootstrap must not introduce CI/CD or infrastructure, and it must remain foundational rather than implement feature-level Sparkta behavior (`.github/agents/bootstrap.agent.md`).

## Relevant ADRs and Core-Components
- **ADRs:** None. `project/architecture/ADR/DECISION-LOG.md` records no ADRs; `project/architecture/ADR/ADR-260101-template.md` is a read-only template, not a decision.
- **`CORE-COMPONENT-260806-project-command-interface` - Project Command Interface:** Defines the root `justfile` as the default operating surface, requires applicable operating recipes, and requires distinct `verify-focused` and `verify` recipes.
- **`CORE-COMPONENT-260806-rpiv-stage-contract` - RPIV Stage Contract:** Defines Research boundaries, stable work-item path handling, root-recipe validation, documentation ownership, and downstream handoffs.
- **`CORE-COMPONENT-260806-agent-executable-acceptance-criteria` - Agent-Executable Acceptance Criteria:** Requires bounded, deterministic, repository-executable acceptance criteria.
- **`CORE-COMPONENT-260806-architecture-artifact-naming` - Architecture Artifact Naming:** Governs UTC date-and-slug names, stable IDs, collision handling, and decision-log references for architecture artifacts.
- **`CORE-COMPONENT-260505-commit-standards` - Commit Standards:** Governs Conventional Commits, PR titles, and the configured AI co-author trailer.

## Risks and Open Questions
- A clean checkout currently lacks the approved application scaffold and the configured devcontainer does not install Node.js; therefore the clean-checkout and cold-agent criteria are not supported by the repository as it stands.
- The issue, PRD, and user input do not pin a Node.js version or package versions. Version compatibility and reproducibility boundaries are unresolved.
- The PRD recommends additional generated-app technologies such as Tailwind CSS and component/chart libraries, while the user's approved foundational stack names React/Vite but not those additional packages. Their bootstrap relevance is not established by the current issue.
- The scope boundary between the foundational React/Vite surface and the later blessed generated-app starter in Prototype 0 is not explicit. Issue #4 and its children own Prototype 0 feasibility, so overlap could blur delivery ownership.
- The PRD is Draft v0.1, and several statements are framed as recommendations or deferred choices. Their authority relative to explicit issue criteria and user approvals may need clarification in later-stage decision records.
- `PRD.md` and `.github/agents/prd-to-gh-issues.agent.md` are untracked, so their current contents have no committed baseline. The user describes `PRD.md` as a rename, but repository history does not identify a tracked predecessor.
- The approved deletion of `.github/agents/harness-cli-it.agent.md` removes a prior repo-local harness bootstrap agent, while ordered child issue #2 adopts an external engineering harness. The repository currently has no completed harness surface, and ownership remains sequenced through #2.
- The existing development-standards requirement overlaps the already adopted commit-standards contract; later architecture work must avoid contradictory global rules.
- Observability, error handling, and durable-versus-disposable state are approved foundational concerns, but the repository has no application boundaries or source symbols yet from which to infer their concrete scope.
