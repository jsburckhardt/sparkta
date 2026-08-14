# Agents — Soft Factory Pipeline Specification

<instructions>
Every piece of work MUST flow through exactly four stages in order: Research, Plan, Implement, Verify.
Every autonomous agent MUST start with `harness instructions`, inspect `harness doctor --json`, and read `harness instructions <verb>` before using a repository harness verb.
RPIV MUST fire `/eng-harness-flow --hook pre-flight`, `pre-coding`, `coding`, `post-coding`, and `post-flight` at the structural seams documented in `.harness/engineering-harness.md`.
Agents MUST treat harness checks as delegation to the authoritative root `just verify-focused` and `just verify` recipes, not replacements for them.
Agents MUST invoke the official `soft-factory` CLI directly for Soft Factory operations, require one caller-supplied positive `<ISSUE_NUMBER>` for issue operations, and MUST NOT infer or select an issue or manipulate Runner-owned state.
You MUST classify scope_type as exactly one of: issue, architecture_decision, core_component.
You MUST NOT create an architectural decision outside of an ADR document.
You MUST NOT create reusable cross-cutting behavior outside of a core-component document.
You MUST update project/architecture/ADR/DECISION-LOG.md for every ADR or core-component change.
You MUST store RPIV artifacts under project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/.
You MUST require Research to resolve and reuse an existing work-item directory before creating one.
You MUST allow Research to create a work-item directory only when no directory matches the issue-number prefix.
You MUST derive SHORT_DESCRIPTION as lowercase ASCII kebab-case from the GitHub Issue title when Research first creates a work item.
You MUST preserve an existing work-item directory name after creation, including when the GitHub Issue title changes.
You MUST prevent more than one work-item directory from using the same issue-number prefix.
You MUST require Plan, Implement, and Verify to resolve exactly one existing work-item directory.
You MUST treat ADRs as global artifacts stored in project/architecture/ADR/ — never inside a work-item documentation folder.
You MUST treat core-components as global artifacts stored in project/architecture/core-components/ — never inside a work-item documentation folder.
You MUST NOT edit template files directly — copy them within the same directory and rename.
You MUST name ADRs as ADR-yymmdd-short-slug.md using their UTC creation date.
You MUST name core-components as CORE-COMPONENT-yymmdd-short-slug.md using their UTC creation date.
You MUST use the full date-and-slug basename as the architecture artifact ID.
You MUST preserve an architecture artifact's creation date after later edits.
You MUST return to the Plan stage if implementation diverges from an ADR or core-component.
You MUST inspect existing repo code and documentation before proposing new work.
You MUST NOT skip any stage in the pipeline.
You MUST keep raw project operating commands in the root justfile.
You MUST treat root justfile recipes as the default validation source for Implement and Verify.
You MUST require the root justfile to expose verify-focused and verify before RPIV.
You MUST enforce this RPIV boundary: RPIV orchestrates, Research investigates, Plan proves coverage, Implement builds and provides evidence, Verify decides acceptance and creates the PR.
You MUST require Implement to maintain affected application documentation and Verify to inspect it independently.
You MUST keep issue acceptance criteria bounded, observable, and executable by configured agents with repository capabilities.
You MUST update the APS version badge in README.md and the APS_BADGE constant when the APS skill is upgraded.
You MUST mark a PR review comment as resolved via the GitHub API after fixing the issue it raised.
</instructions>

<harness>
AGENTS START HERE: run `harness instructions`, then `harness help --json` and `harness doctor --json`. Read `harness instructions <verb>` before invoking that verb.
The configured environment owns ambient harness 0.13.0. Repository npm setup does not install or reproduce it; committed portability lives in `.harness/`, `.agents/skills/`, and this discovery guidance.
Use `harness checks focused [target] --json` while building and `harness checks full --json` before handoff. These wrappers delegate exactly to root `just verify-focused [target]` and `just verify`; the root `justfile` stays authoritative.
Use `harness boot --json`, require `harness readiness --json` before interaction, and finish with `harness stop --json`. Boot owns only `.harness/temp/boot/`, refuses unknown listeners on ports 5173 and `PORT` or 3000, and names its transient evidence and log paths.
The only current server interaction is additive `GET /api/readiness` returning `{"foundation":"sparkta-server","status":"ready"}`. Product workflows remain out of scope.
The engineering-harness GitHub Copilot skills allowed at `.agents/skills/*/SKILL.md` are `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`; `.github/skills/README.md` indexes them. `.harness/skills.lock.json` records packaged-source provenance only and does not authorize other engineering-harness names. Validation ignores and preserves unrelated sibling skills. Do not run a broad harness skill installation that restores excluded entries.
Fire the exact `/eng-harness-flow --hook <event>` calls at the RPIV seams in `.harness/engineering-harness.md`. During coding, capture concrete friction with `harness observe` when a documented trigger occurs.
Read `harness instructions commit` and use the managed `harness commit "<message>" -- <explicit-paths>` path. Conventional Commit, Co-authorship, and stage ownership rules still apply.
A doctor `degraded` result is usable only for documented environment capture or attribution visibility warnings when the CLI, extensions, checks, boot, readiness, skills, and commit guidance work; retain every reported next action.
</harness>

<soft-factory-runner>
The configured environment owns ambient `soft-factory-runner` 0.1.0; repository npm, lockfile, setup, and devcontainer state MUST NOT install it. Start with `soft-factory instructions --json` and `soft-factory doctor --json`; Runner Doctor is separate from harness Doctor. Configuration fixes protocol 1, `.trees`, `.soft-factory`, final `just verify`, and concurrency 1. Runner exclusively owns worktrees, locks, processes, snapshots, progress/result paths, recovery, logs, and cleanup. Use an explicit caller-supplied positive `<ISSUE_NUMBER>` for run, status, reconcile, resume, stop, clean, attach, and logs; never queue, rank, infer, or select an issue. Read `docs/README.md#soft-factory-runner-operation`.
</soft-factory-runner>

<constants>
SPARKTA_FOUNDATION: YAML<<
product: Sparkta is a local, agent-powered rapid UI-prototyping environment.
runtime: Node.js 24 with strict TypeScript and npm workspaces.
application_boundaries:
  - apps/web is the minimal React and Vite foundation.
  - apps/server is the minimal Fastify foundation.
state_boundaries:
  - .sparkta/apps is durable and authoritative.
  - .sparkta/runtime is disposable and reconstructable.
architecture:
  - project/architecture/ADR/ADR-260812-foundation-stack.md
  - project/architecture/ADR/ADR-260812-filesystem-state-boundary.md
  - project/architecture/core-components/CORE-COMPONENT-260812-development-standards.md
  - project/architecture/core-components/CORE-COMPONENT-260812-error-handling.md
  - project/architecture/core-components/CORE-COMPONENT-260812-observability.md
  - project/architecture/core-components/CORE-COMPONENT-260812-state-lifecycle.md
  - project/architecture/core-components/CORE-COMPONENT-260813-engineering-harness-operation.md
issue_1_exclusions:
  - Soft Factory Runner installation
  - agent invocation and Prototype 0 behavior
  - Sparkta control UI and generated-app lifecycle
  - blessed generated-app starter
>>
APS_BADGE: "[![APS version](https://img.shields.io/badge/APS-v1.2.2-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.2.2)"
PIPELINE_STAGES: YAML<<
- id: research
  name: Research
  agent: rpiv-research
  purpose: Record constraints, risks, relevant architecture, acceptance criteria, and repository findings
- id: plan
  name: Plan
  agent: rpiv-planner
  purpose: Commit architectural decisions, assign stable AC IDs, and prove task, validation, and evidence coverage
- id: implement
  name: Implement
  agent: rpiv-implementer
  purpose: Execute dependency-ordered tasks, maintain tests and application documentation, validate, record evidence, and commit
- id: verify
  name: Verify
  agent: rpiv-verifier
  purpose: Verify the exact implementation and application documentation, decide acceptance, update GitHub, push, and open the PR
>>
AGENTS: YAML<<
onboard-repo:
  file: .github/agents/onboard-repo.agent.md
  purpose: Introduce the Soft Factory engineering flow into an existing repository by analysing its codebase, inferring architectural decisions already embedded in the code, scaffolding the documentation infrastructure, and creating the first GitHub issue and seeding it with a full repository-understanding brief.
  tools:
    - codebase exploration and reading
    - file creation and editing
    - web fetch
    - GitHub CLI (gh)
  read_paths:
    - README.md
    - docs/
    - project/
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
    - project/architecture/ADR/DECISION-LOG.md
    - AGENTS.md
    - LLM.txt
    - application source code
  write_paths:
    - project/architecture/ADR/ADR-yymmdd-short-slug.md
    - project/architecture/core-components/CORE-COMPONENT-yymmdd-short-slug.md
    - project/architecture/ADR/DECISION-LOG.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md
    - README.md
    - AGENTS.md
    - LLM.txt
  templates:
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
  guardrails:
    - must check whether the project is already onboarded before proceeding
    - must refuse to run if the project already has the Soft Factory engineering flow
    - must analyse the existing codebase to infer tech stack and architectural decisions
    - must infer cross-cutting concerns from the existing source code
    - must create ADRs for existing architectural decisions using the UTC creation date and a descriptive slug
    - must create core-component files for existing cross-cutting concerns using the UTC creation date and a descriptive slug
    - must use full date-and-slug basenames as artifact IDs and avoid same-day slug collisions
    - must update DECISION-LOG.md with all new ADRs and core-components
    - must record decision records in the Decisions section of DECISION-LOG.md for every ADR and core-component created
    - must create a GitHub issue for repository understanding and its research brief
    - must not make new feature-level decisions
    - must not scaffold or modify application source code
bootstrap:
  file: .github/agents/bootstrap.agent.md
  purpose: Bootstrap a new project, create its justfile command interface, and prepare the first issue handoff.
  tools:
    - codebase exploration and editing
    - file creation and editing
    - terminal execution
    - GitHub CLI (gh)
  read_paths:
    - docs/
    - project/
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
    - project/architecture/ADR/DECISION-LOG.md
    - .devcontainer/devcontainer.json
    - justfile
    - README.md
    - AGENTS.md
    - LLM.txt
  write_paths:
    - project/architecture/ADR/ADR-yymmdd-short-slug.md
    - project/architecture/core-components/CORE-COMPONENT-yymmdd-short-slug.md
    - project/architecture/ADR/DECISION-LOG.md
    - README.md
    - docs/README.md
    - AGENTS.md
    - LLM.txt
    - .devcontainer/devcontainer.json
    - justfile
  templates:
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
  guardrails:
    - must check whether the project has already been bootstrapped before proceeding
    - must refuse to run if the project is already bootstrapped
    - must gather project name, description, and goal from the user interactively
    - must ask user to choose tech stack and identify cross-cutting concerns
    - must scaffold the project using the appropriate init command
    - must create an ADR for the tech stack decision
    - must create a core-component file for each declared cross-cutting concern
    - must create a development standards core-component covering coding conventions, commit standards, and testing practices
    - must use UTC creation dates and descriptive slugs for ADR and core-component filenames and IDs
    - must update DECISION-LOG.md with all new ADRs and core-components
    - must record decision records in the Decisions section of DECISION-LOG.md for every ADR and core-component created
    - must create a root justfile containing all project operating command bodies
    - must ensure the development environment provides the just command runner
    - must ask user to confirm or customize proposed justfile recipes
    - must not create a standalone verification command config
    - must not set up CI/CD pipelines or infrastructure
    - must not make feature-level decisions
rpiv:
  file: .github/agents/rpiv.agent.md
  purpose: Create the issue feature branch and coordinate Research, Plan, Implement, and Verify with validated handoffs.
  tools:
    - subagent dispatch
    - codebase exploration and reading
    - terminal execution
    - file creation
  read_paths:
    - AGENTS.md
    - project/architecture/ADR/DECISION-LOG.md
    - docs/
    - project/
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/
  write_paths:
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/
  templates: []
  guardrails:
    - must create or confirm the issue feature branch before Research
    - must verify the root justfile exposes verify-focused and verify before Research
    - must execute Research, Plan, Implement, and Verify in strict order
    - must delegate stage work to rpiv-research, rpiv-planner, rpiv-implementer, and rpiv-verifier
    - must validate each stage artifact before proceeding
    - Plan to Implement handoff must include the exact work-item path, acceptance criteria, tasks, test plan, and relevant ADRs
    - Implement to Verify handoff must include the exact work-item path, branch, commit SHA, clean-tree proof, implementation evidence, documentation evidence, and test results
    - verification code, test, or application documentation failures return to Implement
    - verification plan, architecture, scope, or acceptance coverage failures return to Plan
    - must stop with a pipeline error when a stage fails
rpiv-research:
  file: .github/agents/rpiv-research.agent.md
  purpose: Investigate the issue and record constraints, risks, relevant architecture, acceptance criteria, and repository findings.
  tools:
    - web search and documentation lookup
    - codebase exploration (grep, glob, file reading)
    - external API/library research
    - GitHub CLI (gh) for fetching issue details
  read_paths:
    - docs/
    - project/
    - project/architecture/ADR/
    - project/architecture/core-components/
    - project/architecture/ADR/DECISION-LOG.md
    - application source code
  write_paths:
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md
  templates:
    - Research Brief (Section 5.1)
  guardrails:
    - classify scope_type as exactly one of issue, architecture_decision, core_component
    - validate that the issue has structured acceptance criteria; stop if absent
    - extract acceptance criteria from the issue and include them in the research brief
    - inspect existing repo code and docs before recording findings
    - record only constraints, risks, relevant ADRs and core-components, and repository findings
    - must not design solutions, create tasks, define tests, or propose architectural artifacts
rpiv-planner:
  file: .github/agents/rpiv-planner.agent.md
  purpose: Own the Plan stage — read the research brief, commit architectural decisions via ADRs and core-components, then produce the action plan, task breakdown, and test plan.
  tools:
    - codebase exploration (grep, glob, file reading)
    - file creation and editing
  read_paths:
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
    - project/architecture/ADR/DECISION-LOG.md
    - project/architecture/ADR/
    - project/architecture/core-components/
    - application source code
  write_paths:
    - project/architecture/ADR/ADR-yymmdd-short-slug.md
    - project/architecture/core-components/CORE-COMPONENT-yymmdd-short-slug.md
    - project/architecture/ADR/DECISION-LOG.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/01-action-plan.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/02-task-breakdown.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/03-test-plan.md
  templates:
    - project/architecture/ADR/ADR-260101-template.md
    - project/architecture/core-components/CORE-COMPONENT-260101-template.md
    - Task Breakdown (Section 5.5)
    - Test Plan (Section 5.6)
  guardrails:
    - no architectural decision exists unless it is in an ADR
    - no reusable cross-cutting behavior exists unless it is a core-component
    - every ADR or core-component change must update DECISION-LOG.md
    - every ADR or core-component must produce at least one decision record
    - ADRs and core-components are global — not scoped to an issue
    - assign UTC creation dates and descriptive slugs to ADR and core-component filenames and IDs
    - preserve creation dates and use distinct slugs for same-day artifacts
    - assign stable AC-1, AC-2, and subsequent IDs in issue order
    - map every AC ID to implementation tasks, tests or validation, and expected evidence
    - include AC IDs in the action plan, task breakdown, and test plan
    - every task must have acceptance criteria
    - every task must have explicit test coverage requirements
    - every task must identify expected evidence
    - tasks must reference relevant ADRs and core-components
rpiv-implementer:
  file: .github/agents/rpiv-implementer.agent.md
  purpose: Execute dependency-ordered tasks, maintain tests and application documentation, run configured validation, record evidence, and commit.
  tools:
    - code generation and editing
    - build and test execution
    - file creation
  read_paths:
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/
    - project/architecture/ADR/
    - project/architecture/core-components/
    - justfile
    - application source code
    - README.md
    - docs/
    - API, configuration, usage, migration, architecture, operational, and deployment documentation
  write_paths:
    - application source code
    - test files
    - affected application documentation
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/02-task-breakdown.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/implementation/00-implementation.md
  templates: []
  guardrails:
    - must implement within architectural boundaries defined by ADRs and core-components
    - deviations from ADRs or core-components require returning to the Plan stage
    - implement tasks in dependency order and mark them complete
    - write or update tests required by the plan
    - write or update all application documentation affected by the implementation
    - cover README, API, configuration, usage, migration, architecture, operational, and deployment documentation when applicable
    - record documentation evidence or an explicit no-impact rationale in implementation notes
    - return to Plan when documentation requires an ADR or core-component contract change
    - treat root justfile recipes as the validation source
    - run just verify-focused while building and fix failures
    - run just verify before handoff and fix failures
    - record concrete implementation evidence for every AC ID
    - commit the implementation and hand off a clean working tree
    - must not check GitHub acceptance criteria or claim final verification
rpiv-verifier:
  file: .github/agents/rpiv-verifier.agent.md
  purpose: Verify the exact committed implementation and documentation, decide acceptance, update GitHub criteria, push, and open a PR for review.
  tools:
    - terminal execution (git, gh, test runners)
    - file reading and editing
    - codebase exploration
  read_paths:
    - project/architecture/ADR/DECISION-LOG.md
    - project/architecture/ADR/
    - project/architecture/core-components/
    - AGENTS.md
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/
    - justfile
    - .github/PULL_REQUEST_TEMPLATE.md
    - application source code and test files
    - README.md
    - docs/
    - API, configuration, usage, migration, architecture, operational, and deployment documentation
  write_paths:
    - project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/verify/summary.md
  templates:
    - .github/PULL_REQUEST_TEMPLATE.md
  guardrails:
    - must verify the exact branch and commit SHA received from Implement
    - must inspect the full branch diff for issue scope and architecture compliance
    - must independently inspect every application documentation category affected by the implementation
    - must fail missing, stale, inaccurate, or inconclusive documentation and return it to Implement
    - must treat root justfile recipes as the validation source
    - must rerun just verify independently
    - must not auto-detect or invent validation commands
    - must independently mark every AC ID passed or failed with concrete evidence
    - must not proceed to push or PR creation if any acceptance criterion fails validation
    - must update the GitHub issue body to mark satisfied acceptance criteria as checked
    - must populate the PR description from the PR template with acceptance criteria status
    - must not push directly to main or master
    - must not create the feature branch or implementation commits
    - must follow Conventional Commits for the PR title
    - must not force-push or use --no-verify
    - must not modify application source code, tests, or application documentation
    - must verify the branch is clean after all commits
    - must write summary.md to project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/verify/ after PR creation
prd-to-gh-issues:
  file: .github/agents/prd-to-gh-issues.agent.md
  purpose: Convert PRD artifacts into a user-reviewed hierarchy of linked GitHub backlog issues without prescribing unprovided implementation details.
  tools:
    - codebase and PRD exploration
    - GitHub CLI (gh)
    - user review and confirmation
  read_paths:
    - PRD.md
    - README.md
    - AGENTS.md
    - LLM.txt
    - existing GitHub issues
  write_paths:
    - GitHub labels and issues after explicit user approval
  templates: []
  guardrails:
    - must discover existing issues before proposing backlog additions
    - must present the complete hierarchy for user review before creating issues
    - must preserve agent-executable acceptance markers
    - must not create issues without explicit user approval

issue-generator:
  file: .github/agents/issue-generator.agent.md
  purpose: Analyze codebase history for issue-quality gaps, draft a problem-focused GitHub issue with structured agent-executable acceptance criteria, dispatch a rubber-duck subagent to critique it, then create the issue via gh. Runs before the RPIV pipeline to produce feasible work without preempting RPIV Research or Plan.
  tools:
    - codebase exploration (search, grep, file reading)
    - terminal execution (git, gh)
    - file creation
    - web fetch
    - subagent dispatch (rubber-duck)
  read_paths:
    - project/architecture/ADR/DECISION-LOG.md
    - AGENTS.md
    - LLM.txt
    - justfile
    - project/work-items/
    - application source code
  write_paths:
    - GitHub issues (via gh issue create)
  templates: []
  guardrails:
    - must read AGENTS.md and DECISION-LOG.md before starting
    - must run git history analysis to surface recurring issue-quality gaps
    - must structure every issue with only the required Problem and Acceptance Criteria sections
    - must not include proposed solutions, technical considerations, implementation plans, architecture decisions, technology choices, dependency choices, API designs, file paths, or test-framework prescriptions unless explicitly provided by the user as problem context
    - must format acceptance criteria as markdown checkboxes with ACCEPTANCE_CRITERIA_START/END HTML markers
    - must make every acceptance criterion bounded, deterministic, observable, and independently verifiable by configured agents
    - must use repository and declared agent capabilities when proposing validation evidence
    - must reject unavailable, subjective, manual-only, destructive-production, unbounded, or exhaustive validation requirements
    - must identify essential external or human prerequisites explicitly instead of encoding impossible agent tasks
    - must dispatch a rubber-duck subagent to critique the draft before creating the issue
    - must incorporate rubber-duck feedback before issue creation
    - must not create an issue without rubber-duck review
>>
TEMPLATE_PATHS: YAML<<
adr: project/architecture/ADR/ADR-260101-template.md
core_component: project/architecture/core-components/CORE-COMPONENT-260101-template.md
action_plan: project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/01-action-plan.md
task_breakdown: project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/02-task-breakdown.md
test_plan: project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/plan/03-test-plan.md
research_brief: project/work-items/<ISSUE_NUMBER>-<SHORT_DESCRIPTION>/research/00-research.md
pull_request: .github/PULL_REQUEST_TEMPLATE.md
>>
SCOPE_TYPES: YAML<<
- issue
- architecture_decision
- core_component
>>
NAMING: YAML<<
issues: "GitHub Issue #<number>"
work_items: "project/work-items/<issue-number>-<short-description>/"
adrs: "ADR-yymmdd-short-slug.md"
core_components: "CORE-COMPONENT-yymmdd-short-slug.md"
>>
</constants>

<formats>
</formats>

<runtime>
SCOPE_TYPE: ""
ISSUE_NUMBER: ""
SHORT_DESCRIPTION: ""
WORK_ITEM_PATH: ""
ADRS: []
CORE_COMPONENTS: []
DECISIONS: []
ACTION_PLAN: ""
TASK_BREAKDOWN: ""
TEST_PLAN: ""
RESULT: ""
VERIFY_RESULT: ""
</runtime>

<triggers>
<trigger event="user_message" target="pipeline-route" />
</triggers>

<processes>
<process id="pipeline-route" name="Route work through the RPIV pipeline">
RUN `research`
RUN `plan`
RUN `implement`
RUN `verify`
RETURN: SCOPE_TYPE, ISSUE_NUMBER
</process>

<process id="research" name="Research stage">
SET SCOPE_TYPE := <CLASSIFICATION> (from "Agent Inference" using USER_INPUT)
SET ISSUE_NUMBER := <ID> (from "Agent Inference")
SET WORK_ITEM_PATH := <PATH> (from "Agent Inference" using ISSUE_NUMBER, USER_INPUT; resolve one existing project/work-items/<ISSUE_NUMBER>-*/ path or derive SHORT_DESCRIPTION from the GitHub Issue title)
</process>

<process id="plan" name="Plan stage">
SET ADRS := <ADR_LIST> (from "Agent Inference" using ISSUE_NUMBER, SCOPE_TYPE, WORK_ITEM_PATH)
SET CORE_COMPONENTS := <CC_LIST> (from "Agent Inference" using ISSUE_NUMBER, SCOPE_TYPE, WORK_ITEM_PATH)
SET DECISIONS := <DECISION_LIST> (from "Agent Inference" using ADRS, CORE_COMPONENTS)
SET ACTION_PLAN := <PLAN> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH)
SET TASK_BREAKDOWN := <TASKS> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH, ACTION_PLAN)
SET TEST_PLAN := <TESTS> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH, TASK_BREAKDOWN)
</process>

<process id="implement" name="Implement stage">
SET RESULT := <OUTCOME> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH, TASK_BREAKDOWN, TEST_PLAN)
</process>

<process id="verify" name="Verify stage">
SET VERIFY_RESULT := <OUTCOME> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH)
</process>
</processes>

<input>
USER_INPUT is the GitHub issue number, URL, or description for pipeline routing.
</input>

<!-- BEGIN harness:commit-guidance -->
## Committing in this repo

Use `harness commit "<message>" -- <paths>` rather than a chained
`git add … && git commit …`.

A `harness commit` is **verified or named**: it probes the collector ingress,
commits, and then tells you WHICH outcome you got. It never blocks and never
rolls back. The outcomes are:

- **confirmed** — when the collector ingress socket is reachable: harness commits with no trace2 override, waits (bounded) for the `refs/notes/ai` note, and tells you whether it landed. A landed note is the healthy shape, and a miss is reported to you rather than hidden — with the next step named in the command's own output. Nothing was buffered on this path, so there is nothing to drain.
- **buffered and named** — when git's configured trace2 target is a plain FILE, or when the ingress is blocked, absent or unconfigured: the commit is made with its trace2 events going to a buffer file instead of the collector, so attribution is DEFERRED, not lost — and it isn't proven yet either. `harness commit` names the buffer it used; when the configured target is a plain FILE it must be pointed back at the socket first, because while it names a file there is no ingress to replay into. Drain it with `harness doctor telemetry-nudge` from an UNSANDBOXED shell. Recovery is POSIX-ONLY: the drain replays into an af_unix socket, so on a Windows host `harness doctor telemetry-nudge` refuses on platform grounds and drains nothing — the buffered events stay on disk, untouched, until they are drained from a host whose collector ingress is an af_unix socket.
- **NOT VERIFIED on this platform** — when trace2 points at a Windows NAMED PIPE (\\.\pipe\…): the commit is made with no trace2 override (git talks to the pipe as usual), nothing was buffered, nothing was written beside the pipe — and nothing is claimed about attribution, because nothing was measured. Check for yourself with `git notes --ref=ai show HEAD`. Do NOT run `harness doctor telemetry-nudge` — there is no buffer to drain and no replay path for the named-pipe transport, and it will refuse.

A chained or compound `git commit` can **silently lose attribution** — agent
command sandboxes block git-ai's socket, git quietly disables trace2, and the
commit's authorship may later be recorded as human.

Neither shape guarantees delivery. What `harness commit` guarantees is that the
outcome is never silent. Read `harness instructions commit` for the detail.
<!-- END harness:commit-guidance -->
