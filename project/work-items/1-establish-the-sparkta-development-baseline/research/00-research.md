# Research Brief: Establish the Sparkta development baseline

## GitHub Issue
- **Issue:** #1
- **Title:** Establish the Sparkta development baseline
- **Work Item:** `project/work-items/1-establish-the-sparkta-development-baseline/`

## Scope Classification
- **Scope Type:** issue

## Problem Statement
The remote base still contains the engineering template, while the approved Sparkta foundation exists only in the current local checkout. The approved initial delivery includes the existing staged repository customizations and reviewed local bootstrap as one baseline; it is not a request to rerun bootstrap. An immutable copy of that approved baseline is available to the assigned worker. Product work needs the foundation delivered through an isolated reviewed pull request without consuming or changing the controller checkout or its Git index.

## Acceptance Criteria

**Core**
- [ ] The delivered baseline identifies the project as Sparkta, includes the approved staged customizations and prepared foundation, and describes the repository as foundation-only without claiming generation, persistence, session, or process-lifecycle product behavior.
- [ ] The baseline records Node.js 24, pnpm, strict TypeScript, React, Vite, Tailwind CSS, Vitest, ESLint, and Prettier as the selected stack and exposes setup, run, build, test, lint, format-check, type-check, verify-focused, and verify through the project command interface.
- [ ] The committed project profile records repository `jsburckhardt/sparkta`, base branch `main`, the approved Copilot CLI/tmux host adapter, two-worker capacity, managed `--yolo` approval, a three-round review limit, and no automatic merge.

**Edge Cases**
- [ ] Dependency setup reports registry or package-manager failures as failures, and the documentation states that fresh-container setup requires registry access rather than claiming an unperformed container rebuild.
- [ ] Delivering the baseline leaves the original controller checkout and its staged and unstaged Git-index state unchanged and creates no managed worker during setup.

**Verification**
- [ ] In an isolated checkout of the delivered commit, dependency setup restores the frozen dependency graph; the documented run command serves the startup frontend; stopping that command terminates its process and allows its port to be reused.
- [ ] On the delivered commit, build, test, lint, format-check, type-check, verify-focused, verify, and the inherited host-contract checks each exit successfully.
- [ ] The development-container configuration selects Node.js 24 and delegates dependency setup to the project command interface; documentation distinguishes behavior verified in the existing container from the unperformed fresh-container rebuild.

## Repository Findings
- The checked-out base is still the reusable engineering template: `README.md` identifies the repository as a template, and no `package.json`, `pnpm-lock.yaml`, TypeScript configuration, Vite configuration, or `src/` application tree exists in this issue worktree at Research time.
- The current root `justfile` contains starter `verify-focused` and `verify` recipes plus inherited GitHub, Copilot CLI, tmux, worktree, delivery, and integration host primitives. It does not yet expose the Sparkta setup, run, build, test, lint, format-check, or type-check recipes required by the issue.
- `tests/foreman-contract.sh` is the inherited host-contract suite. It uses inert CLI substitutes to inspect managed `--yolo` launch arguments, exact tmux ownership, worker lifecycle primitives, stable-head PR inspection, integration checkout safeguards, and APS contract markers.
- The assignment reserves worker `rpiv-1`, attempt `issue-1-attempt-20261002T055654Z`, branch `feat/1-establish-sparkta-development-baseline`, and this worktree. The reservation in `/workspaces/sparkta/.foreman/registry.json` matches those identities and assignment revision 5.
- The source handoff manifest identifies 39 approved files at source commit `335cf60c06c840885c8783643140a7321d3c838a`. The archive SHA-256 is `bf8e3b87643dd55a2cd21962e0b694d315beb2d45d59fd759616d4772697c2e7`; the manifest SHA-256 is `5df1be152e392dbb227536d92a52c0c9889be26ee487a4a1c7d701c3edfb0fda`. Both match assignment revision 5.
- The archived `README.md` identifies Sparkta and explicitly limits the delivered state to a development foundation. It states that conversational generation, persistence engines, session management, process scheduling, and other product capabilities are not present.
- The archived `package.json` identifies package `sparkta`, Node.js `>=24`, pnpm `10.34.5`, React, Vite, Tailwind CSS, Vitest, ESLint, Prettier, strict-TypeScript support, and a committed frozen dependency graph in `pnpm-lock.yaml`.
- The archived root `justfile` exposes `setup`, `run`, `build`, `test`, `lint`, `format-check`, `type-check`, `verify-focused`, and `verify`. Its shell is configured with `-euo pipefail`; `setup` invokes `pnpm install --frozen-lockfile`, and `run` invokes Vite on `0.0.0.0`.
- The archived `.foreman/project.json` records project Sparkta, repository `jsburckhardt/sparkta`, remote `origin`, base branch `main`, the selected stack and recipe names, the `copilot-cli-tmux` adapter, `max_workers: 2`, approved `yolo` permissions, `max_review_rounds: 3`, and safety flags including `automatic_merge: false` and `launch_during_bootstrap: false`.
- The archived `.devcontainer/devcontainer.json` selects the Node feature at version 24 and delegates dependency restoration to `just setup` from `postCreateCommand`. The current template devcontainer does not select Node, which confirms that the approved baseline is not yet integrated into the issue branch.
- The archived `src/App.tsx` renders a Sparkta development-foundation screen and says product capabilities will arrive through reviewed RPIV issues. `src/App.test.tsx` checks the Sparkta identity and the absence of a product-functionality claim. `src/main.tsx` reports a missing root element as an explicit error.
- The archived host-contract suite extends the inherited checks for setup/verification argument handling, controller recovery, worker wait/resume, issue generation, worktree preparation, delivery inspection, and exact tmux identities. Research inspected these files but did not run validation.
- The controller checkout remains unchanged by Research: its staged diff SHA-256 is `d1af92b1611c71e29a5a4fe3e6cab9a6fe8ba13c64f6d3a6179ca575f6ec04e7`, and its unstaged diff SHA-256 is `223ecd8f9cb8c4016871257ad0f9d770216220aaabcae761abb34a01c46fcb61`, matching assignment revision 5.

## Constraints
- Assignment revision 5 and GitHub Issue #1 are aligned on eight acceptance criteria in the preserved issue order. The assignment digest is `4ddcd1c23e0928bdca1a8f0471941808b36bba776372b9546ba606f3c4999dd5`.
- Research may inspect the approved archive and manifest only. Importing, extracting into the worktree, or adapting archived files is reserved for Implement.
- The controller checkout at `/workspaces/sparkta` is read-only source context. Its working tree and Git index must not be reset, stashed, cleaned, switched, staged, unstaged, committed, pushed, or otherwise modified.
- The issue must remain foundation-only. Real GitHub Copilot CLI generation is a later product requirement; persistence, session management, and process-lifecycle behavior are not part of this baseline.
- Raw project operating commands belong in the root `justfile`, which is the default Implement and Verify command interface under `CORE-COMPONENT-260806-project-command-interface`.
- Research cannot accept criteria or produce validation evidence. Implement and Verify retain independent validation responsibilities under `CORE-COMPONENT-260806-rpiv-stage-contract`.
- Dependency restoration requires registry access and must preserve nonzero package-manager or registry failures. Existing-container observations cannot be represented as evidence of an unperformed fresh-container rebuild.
- Runtime cleanup must preserve unrelated host resources. Process and port termination claims require exact ownership and bounded lifecycle evidence under the approved source-handoff process-ownership contract.
- Only `research/00-research.md` is a tracked Research-stage output. Runtime `state.json` and immutable event files are ignored lifecycle records; no controller, assignment, registry, mission, inbox, graph, review, context, application, test, plan, or architecture file is writable during this stage.

## Relevant ADRs and Core-Components
- `project/architecture/ADR/ADR-260906-foreman-control-plane.md` — Foreman remains above RPIV; managed workers use isolated issue worktrees and tmux windows, and approved managed sessions use `--yolo`.
- `project/architecture/core-components/CORE-COMPONENT-260806-rpiv-stage-contract.md` — Research records findings, constraints, relevant architecture, criteria, and risks only; validation and delivery remain later RPIV activities.
- `project/architecture/core-components/CORE-COMPONENT-260806-project-command-interface.md` — The root `justfile` is the operating surface and must expose setup, run, quality, build, focused-verification, and full-verification recipes where applicable.
- `project/architecture/core-components/CORE-COMPONENT-260806-agent-executable-acceptance-criteria.md` — Criteria must remain bounded, deterministic, observable, safe, and independently verifiable.
- `project/architecture/core-components/CORE-COMPONENT-260906-foreman-orchestration.md` — Managed work is bound to immutable assignments, exact worker ownership, explicit capacity, no automatic integration inference, and exact-head review.
- `project/architecture/core-components/CORE-COMPONENT-260906-rpiv-observability.md` — This attempt uses immutable correlated events, a last-event snapshot, assignment revision/digest fields, and typed worker results.
- Approved source-handoff `ADR-261002-node-react-vite-toolchain` records Node.js 24, pnpm, React, strict TypeScript, Vite, Tailwind CSS, Vitest, ESLint, Prettier, and a foundation-only boundary. It is present in the archive, not yet in the issue branch.
- Approved source-handoff `CORE-COMPONENT-261002-development-standards` requires strict TypeScript, configured linting/formatting, deterministic tests, root-justfile commands, and documentation maintenance. It is not yet in the issue branch.
- Approved source-handoff `CORE-COMPONENT-261002-explicit-errors` prohibits swallowed failures and success-shaped fallbacks, including external command failures. It is not yet in the issue branch.
- Approved source-handoff `CORE-COMPONENT-261002-local-persistence` defines future durable-versus-runtime boundaries without implementing persistence in the baseline. It is not yet in the issue branch.
- Approved source-handoff `CORE-COMPONENT-261002-process-ownership-cleanup` defines future exact process ownership and safe cleanup without implementing a session manager or scheduler in the baseline. It is not yet in the issue branch.

## Risks and Open Questions
- The approved baseline is external source material until Implement imports it; therefore every Sparkta application, stack, profile, command, and devcontainer finding is a handoff observation rather than a delivered-branch fact.
- Fresh dependency restoration depends on registry availability. Registry access and a fresh-container rebuild have not been performed during Research.
- The frozen lockfile, startup frontend, shutdown behavior, and port reuse have not been executed in an isolated checkout during Research.
- Build, test, lint, formatting, type-check, focused verification, full verification, and inherited host-contract success have not been established for a delivered commit during Research.
- The archived devcontainer lock contains resolved entries beyond the features selected by the archived devcontainer configuration, including Python, uv, and Azure CLI entries; their presence does not establish that those features are selected at runtime.
- The source handoff records local initialization and capabilities, but that is not evidence that the exact future delivered commit passes independent Verify or that a fresh container rebuild succeeds.
- No external issue dependency is recorded in assignment revision 5, and Research found no new prerequisite requiring a mission-graph change.
