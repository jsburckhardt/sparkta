# Implementation: Establish the Sparkta development baseline

## Assignment and execution identity

- Issue: `1`
- Worker: `rpiv-1`
- Attempt: `issue-1-attempt-20261002T055654Z`
- Branch: `feat/1-establish-sparkta-development-baseline`
- Assignment revision: `5`
- Assignment SHA-256: `4ddcd1c23e0928bdca1a8f0471941808b36bba776372b9546ba606f3c4999dd5`
- Worktree: `/workspaces/sparkta/.trees/issue-1`
- Scope type: `issue`

Implement executed T-1 through T-5 in dependency order. This note records
implementation evidence only; final acceptance remains owned by Verify.

## Completed tasks

| Task | Result | Evidence |
| --- | --- | --- |
| T-1 | Complete | Immutable hashes, manifest metadata, safe-path authorization, controller fingerprints, and initial worker inventory all matched before import. |
| T-2 | Complete | Exactly 39 declared regular files were imported to assignment-authorized paths and matched their manifest hashes before adaptation. |
| T-3 | Complete | Sparkta identity, foundation limitations, selected stack, project profile, documentation, architecture records, and Node.js 24 devcontainer configuration were reconciled without adaptation. |
| T-4 | Complete | All required recipes were present; setup propagated sentinel exit 73; setup created no worker; APS and inherited host contracts passed. |
| T-5 | Complete | Focused/full validation, isolated frozen setup, startup, exact-PID cleanup, port reuse, scope, documentation, and preservation checks completed. |

## V-1 immutable handoff and import integrity

The assignment, archive, and manifest were hashed before extraction:

| Artifact | SHA-256 |
| --- | --- |
| Assignment revision 5 | `4ddcd1c23e0928bdca1a8f0471941808b36bba776372b9546ba606f3c4999dd5` |
| `bootstrap-baseline-r2.tar.gz` | `bf8e3b87643dd55a2cd21962e0b694d315beb2d45d59fd759616d4772697c2e7` |
| `bootstrap-baseline-r2-manifest.json` | `5df1be152e392dbb227536d92a52c0c9889be26ee487a4a1c7d701c3edfb0fda` |

The parsed manifest had revision `2`, source commit
`335cf60c06c840885c8783643140a7321d3c838a`, and exactly 39 unique relative
paths. The archive had exactly the same 39 unique regular-file entries. There
were zero absolute, traversal, normalized-path mismatch, duplicate,
undeclared, missing, non-regular, or assignment-unauthorized entries.

### Import hash report

Every pre-adaptation archive byte sequence and every imported byte sequence
matched:

| Path | SHA-256 |
| --- | --- |
| `.devcontainer/devcontainer-lock.json` | `f393c5ddeb1d7f9f762dd00614862deef3c60a5f489d508486b67982879e0576` |
| `.devcontainer/devcontainer.json` | `efbd7ce8733298430ed221b0d855be9aad79214fb7ff573961fd2ea4b32b881a` |
| `.devcontainer/post-start.sh` | `3cd2ba06251733906450b01e81de741c60c301f94353c34bbd157ed837ea23ad` |
| `.devcontainer/tmux-attach.sh` | `237be4245b9251d443282a7b83bb64eeff4b9c1b62d24f1a5c986f1ca9be9d4c` |
| `.foreman/project.json` | `06b66db3c806345c703bd5952a4f9c6095c326f6f1117c12d8873d4614e5906d` |
| `.github/agents/harness-cli-it.agent.md` | `2d04ffe57c3792c2a7218bccb764f7d93b7e3b628d39b32ee3474c241bbc9959` |
| `.gitignore` | `4605a9a3f50514a158562a24798fd5bbb9141f8ed19b2e13652785b02e40fdf2` |
| `.prettierignore` | `91728060679a9f049a503369541cc2a87c8a4e155e44a211290c18f2de6a1b95` |
| `.prettierrc.json` | `dcda5a46327b9d54bba7ea50a130a070c77b4b2e1f5bdd4a1fa008c3535b718b` |
| `AGENTS.md` | `11038c38147d7e2d26d6308fcb05a7e0f3f091deec779ded3a83f6ee1ae8f702` |
| `LLM.txt` | `5a5e6c2a2e7b365dabf0c593788849bf71995ae96d769b3eac45519b0be9bcae` |
| `README.md` | `0a151145947bc557bf177b6f1ddf85824de45b0248796b21e661625956938192` |
| `docs/README.md` | `de7ea423c5ee331174cab186d0d4d77763bab4b73b534ab8feee65de48c89695` |
| `docs/foreman.md` | `750e1e2d71a7a56e9a4156a129b3f8a7a4e5cd8e54b49f80e89faf02d5e6d606` |
| `eslint.config.js` | `21f92444d8fc279fd386821d6774e4b3420b1ba4b4563d6c57d5968dbc1a810e` |
| `index.html` | `10d7d324094b9751451780963c2ea20abec2682e14ddb5b57a418cb3c0a5cc91` |
| `justfile` | `825d74ea1a2a94f228598b2aa4e77dffb9dc03d8a4bd1040a89eb35af8792390` |
| `package.json` | `5164f737e178eafbab42c8cd521fc97850ac1ad30d35feb82945325349e95b9f` |
| `pnpm-lock.yaml` | `cb992f9480a44f1030e693e8fb921adfc1e96d50db6f6aa185216a62bd8d0570` |
| `project/architecture/ADR/ADR-261002-node-react-vite-toolchain.md` | `a6825b00052a85e14a8c2b1e556181fb343d2312fe24fc165096c3ef94eef5a6` |
| `project/architecture/ADR/DECISION-LOG.md` | `568278cfbf05bb66eb14e9cdf66440e0ab421e6f05272da10825deb990d53f85` |
| `project/architecture/README.md` | `3014a056f61ea82b47b6b21da1ca6b4c82435e478909e3bc1cbd77e677d1f548` |
| `project/architecture/core-components/CORE-COMPONENT-261002-development-standards.md` | `545c0375f44f0e823b6a0a8bff3202be745e44828f2efa99b778834433e53d97` |
| `project/architecture/core-components/CORE-COMPONENT-261002-explicit-errors.md` | `c3effec41ce490f552f1a7e4d40e4a847e6c9120759c7a9ca1a3e1e0b8161f30` |
| `project/architecture/core-components/CORE-COMPONENT-261002-local-persistence.md` | `9a659fcc03bd6aed80ff2206ea0b3abdbd7e4f88637cac657d2842c0d3b97bb2` |
| `project/architecture/core-components/CORE-COMPONENT-261002-process-ownership-cleanup.md` | `a4c835aa080ee7fd39b0ff0f78a0af4c24b804c9aa5670330a9112b47b5dc67c` |
| `project/architecture/core-components/README.md` | `e1da7db5f2f47332da10bd58921f6a5c7181eb18505c2579b69ef5fc112dd2c3` |
| `project/work-items/42-feat-foreman-bound-managed-rpiv-workers-and-verify-integrated-delivery/research/00-research.md` | `e1e79ea846bbf10c8a53580d201a755c8681787470c041361725c52aed625024` |
| `project/work-items/42-feat-foreman-bound-managed-rpiv-workers-and-verify-integrated-delivery/verify/summary.md` | `fea68328c2e11039cabb243a4660092004ffa0e003396e02a8e79dc840fd1d0a` |
| `src/App.test.tsx` | `58b56f9a515ce8c99d89930cf0f3c76b27424714789e99bf55e9223ba50c9966` |
| `src/App.tsx` | `9a8d1ce95dca6432eb8cf4b2fdf077b32b33f6b2314407409cf3aa5451c3a525` |
| `src/index.css` | `b45d7e03207bc8ef492afa1c47053870b3476f84430de99c2f0a740bbfedb897` |
| `src/main.tsx` | `841aac386b2769e0ac3fda250e1df682fdbbaf731524aba841667762e14a3250` |
| `src/test/setup.ts` | `977afde26bba6a51325908cd7713cbfdc87d18f06b78b237c8f364c44864b7de` |
| `tests/foreman-contract.sh` | `e9e292b52bf03bd5e854240deccdc9b860be890f7e844a98ddde954349a04c52` |
| `tsconfig.app.json` | `db255dd6f2861f3275e4c07d40a0b10df967003f7a55e543513944840614ac51` |
| `tsconfig.json` | `770b4140bbb581e2dfd9ea9946ffc9c75a1d86ba7d2db5f77c83e37cbdf9d808` |
| `tsconfig.node.json` | `a61201a95f22306abaae3cca1014c9a2ae3fc8419bced4d6186f2d662d942e43` |
| `vite.config.ts` | `7f37b192ea0b53e8deb572394e88d6d6b0eb8bd62349ca4e62256c0d3366f7d6` |

Adaptations: none. The approved archive was coherent with the issue plan and
architecture boundaries, so all 39 imported files remain byte-identical to the
manifest.

## V-2 static contract inspection

- `README.md`, `docs/README.md`, `src/App.tsx`, and `src/App.test.tsx` identify
  Sparkta and state that the repository is a development foundation.
- The repository does not claim implemented conversational generation,
  persistence engines, session management, process scheduling, or product
  process-lifecycle behavior.
- `package.json`, TypeScript/Vite/Tailwind/Vitest/ESLint/Prettier configuration,
  the ADR, and `.foreman/project.json` record Node.js 24, pnpm, strict
  TypeScript, React, Vite, Tailwind CSS, Vitest, ESLint, and Prettier.
- `just --list --unsorted` exposed `setup`, `run`, `build`, `test`, `lint`,
  `format-check`, `type-check`, `verify-focused`, and `verify`.
- Parsed profile values were repository `jsburckhardt/sparkta`, base `main`,
  adapter `copilot-cli-tmux`, capacity `2`, permission mode `yolo`, approval
  `true`, review limit `3`, automatic merge `false`, and
  `launch_during_bootstrap` `false`.
- `.devcontainer/devcontainer.json` selects Node.js `24` and its
  `postCreateCommand` delegates dependency restoration to `just setup`.
- The approved ADR, four approved core-components, indexes, and decision log
  were imported with no additional architecture decision.

The installed APS v1.2.2 skill and the applicable `vscode-copilot` adapter were
loaded before importing `.github/agents/harness-cli-it.agent.md`. Its
frontmatter, 12 VS Code tool declarations, seven APS sections, 13 processes,
RUN references, placeholders, SET targets, and YAML-list constants passed the
adapter/APS structural compile checks. Prettier also parsed the complete agent
file successfully.

## V-3 isolated frozen setup

- Candidate implementation commit:
  `088946afc8b856fee86c3a1c8cd6414a22888693`.
- Standalone clone:
  `/home/vscode/.copilot/session-state/64bc26ad-cd9e-4857-a80f-19ce5bbe58ab/files/issue-1-isolated-candidate`.
- The clone used `git clone --no-local` and detached at the candidate commit,
  avoiding any worktree-registration write to the controller repository.
- `just setup` exited zero and ran `pnpm install --frozen-lockfile`.
- pnpm restored 287 packages using pnpm `10.34.5` under Node.js `v24.21.0`.
- The lockfile SHA-256 remained
  `cb992f9480a44f1030e693e8fb921adfc1e96d50db6f6aa185216a62bd8d0570`.
- The isolated tracked tree was clean before and after setup.

Registry access was available during this run. This is existing-container
evidence, not evidence of a fresh-container rebuild.

## V-4 controlled setup failure

An inert `pnpm` substitute was placed first on `PATH`. It received exactly
`install --frozen-lockfile`, printed `SENTINEL package registry unavailable`,
and returned exit `73`. `just setup` returned the same exit `73`; it did not
convert the package-manager error into success or print a success-shaped
fallback. Recipe inspection found no Copilot, tmux, or worker-launch call.

## V-5 controller and worker preservation

| Invariant | Before | After validation |
| --- | --- | --- |
| Controller staged diff SHA-256 | `d1af92b1611c71e29a5a4fe3e6cab9a6fe8ba13c64f6d3a6179ca575f6ec04e7` | `d1af92b1611c71e29a5a4fe3e6cab9a6fe8ba13c64f6d3a6179ca575f6ec04e7` |
| Controller unstaged diff SHA-256 | `223ecd8f9cb8c4016871257ad0f9d770216220aaabcae761abb34a01c46fcb61` | `223ecd8f9cb8c4016871257ad0f9d770216220aaabcae761abb34a01c46fcb61` |
| Managed window inventory | `0:foreman:@1`, `1:rpiv-1:@2` | `0:foreman:@1`, `1:rpiv-1:@2` |

All controller checks were read-only `git diff` operations. No managed worker
was created during setup or validation.

## V-6 isolated runtime lifecycle

The isolated candidate started through the documented `just run` command:

- Port: `5173`
- Readiness: HTTP 200 on bounded attempt 3
- Response identity: `<title>Sparkta</title>`
- Owned process group: `70600`
- Exact recorded PIDs: leader `70600`, descendants `70602` and `70618`
- Stop: SIGTERM was sent only to those three positive recorded PIDs
- Command wait status: `143`, the expected terminated status
- Surviving recorded processes: `0`
- Same-port bind: a short-lived Node.js probe immediately bound port `5173`
  successfully and closed itself

The initial probe attempt correctly reached Sparkta but treated an unreaped
leader zombie as live. The corrected bounded probe reaped the leader before
checking descendants and produced the passing evidence above. No name-based or
broad process termination was used.

## V-7 delivered command results

| Command | Result |
| --- | --- |
| `just setup` | Exit 0; frozen dependency graph restored |
| `just build` | Exit 0; TypeScript build and Vite production build passed |
| `just test` | Exit 0; 1 test file and 1 test passed |
| `just lint` | Exit 0 |
| `just format-check` | Exit 0; all configured files matched Prettier |
| `just type-check` | Exit 0 |
| `just verify-focused` | Exit 0 |
| `just verify` | Exit 0 |
| `bash tests/foreman-contract.sh` | Exit 0; managed launch, recovery, real tmux targeting, and PR primitive contracts passed |

## V-8 documentation and exact scope

The pre-evidence candidate had 43 changed paths and all 43 were assignment
authorized. This evidence note adds one path under the assignment-authorized
canonical work item, for 44 final changed paths. There are zero controller,
assignment, mission, registry, context, inbox, review, graph, forbidden
inherited architecture, or other out-of-scope changed paths.

Documentation evidence:

- **README and usage:** `README.md` describes Sparkta, foundation-only status,
  limitations, all application recipes, and RPIV/Foreman boundaries.
- **Configuration:** `.foreman/project.json`, `.devcontainer/devcontainer.json`,
  `package.json`, and the root `justfile` consistently record the selected
  stack, profile, setup, and command contracts.
- **Operational guidance:** `docs/README.md` states that uncached setup requires
  registry access and that validation occurred in the existing container,
  without claiming a fresh-container rebuild. `docs/foreman.md` maintains the
  approved Copilot CLI/tmux operating boundary.
- **Architecture:** the ADR, four core-components, decision log, and indexes
  distinguish adopted future boundaries from implemented product behavior.
- **API no impact:** this foundation exposes no application API.
- **Migration no impact:** there is no data, API, or configuration migration.
- **Deployment no impact:** no deployment workflow or runtime deployment
  contract is introduced.
- **Persistence no impact:** the local-persistence record is a future contract;
  no persistence engine or persisted schema is implemented.

No fresh devcontainer rebuild was performed or claimed.

## Acceptance evidence

- **AC-1:** Exact 39-file provenance/import evidence, Sparkta UI/test identity,
  and README/docs foundation limitations are present.
- **AC-2:** The selected stack is recorded; every required operating recipe was
  listed and executed at the applicable validation boundary.
- **AC-3:** Parsed committed profile values match the repository, base,
  Copilot CLI/tmux adapter, capacity, permission, review, and merge contracts;
  the inherited host contract passed.
- **AC-4:** Controlled setup returned the package-manager sentinel exit 73, and
  docs state registry and fresh-container limitations.
- **AC-5:** Controller fingerprints and managed worker inventory remained
  byte-for-byte identical; setup launched no worker.
- **AC-6:** The standalone candidate restored the frozen graph, served Sparkta,
  stopped only its exact recorded PIDs, left no owned process, and reused its
  port.
- **AC-7:** Build, test, lint, format-check, type-check, focused verification,
  full verification, and the explicit inherited host contract each exited
  zero.
- **AC-8:** Devcontainer configuration selects Node.js 24 and delegates to
  `just setup`; documentation clearly separates existing-container validation
  from the unperformed fresh-container rebuild.

## Limitations

- A fresh-container rebuild was not performed.
- Dependency restoration depends on registry access when packages are not
  cached; a registry or package-manager failure remains a nonzero blocker.
- This issue delivers only the foundation. It does not deliver generation,
  persistence, session management, scheduling, or product process-lifecycle
  behavior.
- Final acceptance, GitHub updates, push, and pull-request delivery remain
  Verify-stage responsibilities.
