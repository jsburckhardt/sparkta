# Test Plan: Establish the Sparkta development baseline

## Validation Boundary

Implement executes these checks and records evidence without accepting any
criterion. Verify independently inspects the exact implementation commit,
reruns the configured root-justfile validation, and decides acceptance. Tests
must not modify the controller checkout, extract/import archive content before
T-1 passes, launch a managed worker, kill unrelated processes, or claim that an
unperformed fresh-container rebuild succeeded.

## Acceptance Coverage

| AC | Tasks | Tests or inspection | Expected concrete evidence |
|---|---|---|---|
| AC-1 | T-1, T-2, T-3, T-5 | V-1, V-2, V-8 | Verified handoff hashes/file inventory, exact-scope diff, Sparkta identity, and explicit foundation-only limitations. |
| AC-2 | T-2, T-3, T-4, T-5 | V-2, V-3, V-7 | Parsed stack/config declarations, ten required recipes, frozen setup, and successful recipe outputs. |
| AC-3 | T-2, T-3, T-4, T-5 | V-2, V-7 | Parsed project-profile values and successful inherited host-contract checks. |
| AC-4 | T-3, T-4, T-5 | V-4, V-7, V-8 | Exact nonzero setup failure propagation and docs that state registry/fresh-container limitations. |
| AC-5 | T-1, T-4, T-5 | V-5 | Matching controller staged/unstaged fingerprints and unchanged setup-time worker inventory. |
| AC-6 | T-4, T-5 | V-3, V-6 | Isolated frozen install, frontend HTTP evidence, exact-process termination, and same-port reuse. |
| AC-7 | T-4, T-5 | V-7 | Zero status from each required delivered check and inherited host-contract suite. |
| AC-8 | T-2, T-3, T-5 | V-2, V-8 | Node.js 24 devcontainer selection, `just setup` delegation, and accurate existing-versus-fresh-container docs. |

## Test V-1: Immutable handoff, manifest, and import integrity

- **Type:** Security and provenance inspection
- **Task:** T-1, T-2
- **Acceptance Criteria:** AC-1
- **Priority:** Critical

### Setup

Use assignment revision 5, the read-only archive, and the read-only manifest.
Do not extract/import the archive until all pre-import gates pass.

### Steps

1. Recompute the assignment SHA-256 and require `4ddcd1c23e0928bdca1a8f0471941808b36bba776372b9546ba606f3c4999dd5`.
2. Recompute archive and manifest SHA-256 values and require the assignment values `bf8e3b87643dd55a2cd21962e0b694d315beb2d45d59fd759616d4772697c2e7` and `5df1be152e392dbb227536d92a52c0c9889be26ee487a4a1c7d701c3edfb0fda`.
3. Parse the manifest and require revision 2, source commit `335cf60c06c840885c8783643140a7321d3c838a`, 39 unique safe relative paths, no traversal, and assignment write authorization for each path.
4. During Implement only, import those declared files and compare each pre-adaptation file to its manifest hash.
5. Record each adapted path and reason; reject a missing, extra, unsafe, or unauthorized entry.

### Expected Result

Every immutable identity matches, exactly 39 authorized files are imported by
Implement, every original imported file matches its manifest hash, and every
adaptation is explicit and bounded.

### Expected Evidence

- Hash command output and parsed manifest report.
- 39-path import/hash table.
- Finite adaptation list or an explicit statement that none were needed.

## Test V-2: Identity, stack, commands, profile, architecture, and devcontainer inspection

- **Type:** Static configuration and documentation inspection
- **Task:** T-2, T-3
- **Acceptance Criteria:** AC-1, AC-2, AC-3, AC-8
- **Priority:** Critical

### Setup

Inspect the final candidate commit after approved import/adaptation.

### Steps

1. Inspect README, docs, UI, and tests for Sparkta identity and explicit foundation-only wording.
2. Require no claim that generation, persistence, sessions, scheduling, or process-lifecycle product behavior is delivered.
3. Parse package/config/architecture declarations for Node.js 24, pnpm, strict TypeScript, React, Vite, Tailwind CSS, Vitest, ESLint, and Prettier.
4. Run `just --list` and require `setup`, `run`, `build`, `test`, `lint`, `format-check`, `type-check`, `verify-focused`, and `verify`.
5. Parse `.foreman/project.json` and require repository `jsburckhardt/sparkta`, base `main`, `copilot-cli-tmux`, worker capacity 2, approved `yolo`, review limit 3, automatic merge false, and setup/bootstrap worker launch false.
6. Inspect `.devcontainer/devcontainer.json` for Node.js version 24 and dependency setup delegated to `just setup`.
7. Inspect the imported architecture records and decision log for exact approved source-handoff records, with no unassigned new architecture decision.

### Expected Result

All identity, limitation, stack, command, profile, architecture, and
devcontainer values agree with AC-1, AC-2, AC-3, and AC-8.

### Expected Evidence

- Parsed values and `just --list` output.
- File/line references for positive identity and limitation assertions.
- Negative-search report for prohibited product and fresh-rebuild claims.

## Test V-3: Isolated frozen dependency restoration

- **Type:** Isolated integration
- **Task:** T-4, T-5
- **Acceptance Criteria:** AC-2, AC-6
- **Priority:** Critical

### Setup

Create a clean temporary Git checkout/worktree at the exact candidate delivered
commit, outside the controller checkout and without copying an existing
`node_modules`. Registry access is an explicit prerequisite.

### Steps

1. Record the exact candidate commit and confirm the isolated tree is clean.
2. Run `just setup` through the delivered command interface.
3. Confirm setup invokes pnpm with the frozen lockfile and exits zero.
4. Confirm the lockfile remains unchanged and the isolated tree stays clean.
5. Record dependency graph/tool version evidence needed to reproduce the run.

### Expected Result

The isolated checkout restores the committed frozen dependency graph without
lockfile mutation. A registry outage is a visible nonzero/blocker, not a pass.

### Expected Evidence

- Exact commit and isolated path.
- `just setup` output showing frozen-lockfile restoration and exit status 0.
- Before/after lockfile hash and clean-tree output.

## Test V-4: Frozen setup failure propagation and no launch side effect

- **Type:** Deterministic negative integration
- **Task:** T-4, T-5
- **Acceptance Criteria:** AC-4, AC-5
- **Priority:** Critical

### Setup

In an isolated checkout, place an inert `pnpm` substitute first on `PATH`. It
must record arguments, emit a sentinel registry/package-manager error, return a
known nonzero status, and perform no network or worker operation. Capture the
managed `foreman` tmux worker-window inventory before the check when that
session exists; otherwise record its bounded absence.

### Steps

1. Run `just setup` with the inert failing package-manager substitute.
2. Require the captured arguments to contain `install --frozen-lockfile`.
3. Require `just setup` to return the sentinel nonzero status rather than zero.
4. Inspect output for the visible sentinel error and absence of success-shaped fallback text.
5. Compare managed-worker inventory before/after and require no new worker; inspect the setup recipe for no Copilot/tmux/worker-launch call.

### Expected Result

Setup propagates the package-manager failure exactly and performs no managed
worker launch.

### Expected Evidence

- Stub argument log, sentinel error, and exact nonzero status.
- Setup recipe inspection.
- Identical before/after worker inventory or bounded proof that no managed
  session existed in either observation.

## Test V-5: Controller checkout fingerprint preservation

- **Type:** Host-state invariant
- **Task:** T-1, T-4, T-5
- **Acceptance Criteria:** AC-5
- **Priority:** Critical

### Setup

Treat `/workspaces/sparkta` as read-only. Use data-only Git diff commands that
do not refresh, reset, stash, clean, switch, stage, unstage, commit, or push.

### Steps

1. Before Implement import, hash the controller's staged diff bytes and require `d1af92b1611c71e29a5a4fe3e6cab9a6fe8ba13c64f6d3a6179ca575f6ec04e7`.
2. Hash its unstaged diff bytes and require `223ecd8f9cb8c4016871257ad0f9d770216220aaabcae761abb34a01c46fcb61`.
3. Repeat both checks after setup/runtime validation and after the implementation commit.
4. Compare each final value byte-for-byte with both its initial value and assignment revision 5.

### Expected Result

Staged and unstaged controller fingerprints remain exactly unchanged through
delivery.

### Expected Evidence

- Timestamped before/after staged and unstaged SHA-256 values.
- Explicit four-way equality result; no controller-mutating command.

## Test V-6: Isolated startup, exact stop, and port reuse

- **Type:** Isolated runtime lifecycle
- **Task:** T-5
- **Acceptance Criteria:** AC-6
- **Priority:** Critical

### Setup

Use the V-3 isolated checkout after successful frozen setup. Select an
available non-privileged port supported by the documented `just run` command.
Start it in an independently owned process group and record the exact leader,
descendants, and port. Do not use `pkill`, `killall`, or name-based cleanup.

### Steps

1. Start documented `just run` and wait with a finite timeout for readiness.
2. Request the frontend over HTTP and require a successful response containing the Sparkta startup identity.
3. Signal only the recorded owned process/process group as a user stopping that command would.
4. Wait boundedly and require the leader and all recorded descendants to exit.
5. Bind the same port with a short-lived Node.js probe, require success, then stop that exact probe.
6. On failure, clean up only the recorded owned process IDs/process group and report the failure.

### Expected Result

The documented run command serves the Sparkta frontend, stopping it terminates
its exact owned process tree, and the same port is immediately reusable.

### Expected Evidence

- Port, process-group leader, descendant inventory, readiness timing, and HTTP response excerpt.
- Exact signal/wait result and proof no recorded process survived.
- Successful same-port Node.js bind/reuse result.

## Test V-7: Delivered recipes and inherited host-contract checks

- **Type:** Configured project verification
- **Task:** T-3, T-4, T-5
- **Acceptance Criteria:** AC-2, AC-3, AC-4, AC-7
- **Priority:** Critical

### Setup

Use the exact candidate commit with dependencies restored. Keep separate
statuses for each command; one aggregate success must not hide a failed recipe.

### Steps

1. Run `just build`.
2. Run `just test`.
3. Run `just lint`.
4. Run `just format-check`.
5. Run `just type-check`.
6. Run `just verify-focused`.
7. Run `just verify`.
8. Run the inherited host-contract check `bash tests/foreman-contract.sh` explicitly, even if a verification recipe also invokes it.
9. Inspect successful outputs for the application tests, setup argument/failure checks, no-launch checks, and inherited host adapter/ownership checks.

### Expected Result

Every listed command exits zero independently on the candidate commit, and the
host-contract suite covers the inherited checks without creating a live
managed worker.

### Expected Evidence

- Command-to-exit-status table and bounded output excerpts.
- Host-contract assertion count/summary and zero exit.
- `just verify-focused` and `just verify` logs tied to the exact commit.

## Test V-8: Documentation, exact scope, and fresh-container limitation

- **Type:** Documentation and delivery inspection
- **Task:** T-2, T-3, T-5
- **Acceptance Criteria:** AC-1, AC-4, AC-8
- **Priority:** Critical

### Setup

Inspect the complete candidate branch diff from its merge base with
`origin/main`, all affected documentation categories, and the assignment's
read/write/forbidden scopes.

### Steps

1. Require every changed application/config/test/documentation/architecture path to be assignment-authorized and issue-related.
2. Require no changed controller, assignment, registry, mission, graph, inbox, review, context, forbidden inherited architecture, or other out-of-scope path.
3. Inspect README, configuration, usage, operations, architecture, and development-container guidance against delivered behavior.
4. Require docs to say registry access is needed for fresh setup and that only the existing container was used for validation.
5. Require docs not to claim a fresh-container rebuild, product generation, persistence, session management, scheduling, or process-lifecycle behavior.
6. Record explicit no-impact rationales for API, migration, deployment, and persistence documentation.
7. Require `.devcontainer/devcontainer.json` to select Node.js 24 and delegate setup to `just setup`; do not perform or claim a fresh-container rebuild.

### Expected Result

The diff is exactly within assignment scope, all affected docs are accurate,
and existing-container evidence is clearly separated from the unperformed
fresh-container rebuild.

### Expected Evidence

- Exact changed-path list with authorization result per path.
- Documentation category checklist with file/line references and no-impact rationales.
- Node.js 24 and `just setup` devcontainer excerpts.
- Negative-claim inspection report and explicit fresh-container limitation.
