# Harnessability Assessment — sparkta

Run metadata
- Timestamp: 20260813T085511Z
- Repo root: `/workspaces/sparkta`
- Branch / commit: `main` / `51679e6bd5559854b2827776af3faa743128851b`
- Mode: static
- Commands executed: read-only Git context, static repository inspection, and comparison with assessment 002
- Commands skipped: service boot, tests/builds, dependency installation, external calls, and deep history analysis
- Safety notes: clean merged main; no secrets read and no runtime/product/external state mutated

## Verdict

- Operate-Today: **A (88.9%)**
- Adaptability: **B (79.2%)**
- Harnessability Index: **84.1% (B)**
- Final grade: **B**
- Readiness: **H4**
- Highest proof level detected: **L4**
- Target next proof level: **L5**
- Confidence: **high**

Sparkta now has a canonical engineering harness with structured discovery, delegated focused/full checks, owned boot, dual readiness, safe cleanup, exactly three engineering-harness skills, the repository-owned `.github/agents/runner-dispatcher.agent.md` agent for Soft Factory Runner dispatch, and durable acceptance evidence. A fresh agent can operate and prove the current foundation locally without remote services or secrets. The remaining proof gap is user-visible UI behavior; the remaining compounding gap is sustained observe/retro/improve use across normal work.

## Assessment matrix

| Area | Grade | Score | Rationale |
|---|---|---:|---|
| Operate-Today | A | 88.9% | Boot, readiness, cleanup, validation, discovery, and evidence are established |
| Adaptability | B | 79.2% | Strong seams and hermetic tests; architecture boundaries remain inferential |

## Top blockers

There are no blocking runtime or remote-service dependencies for the current foundation. Targeted gaps remain:

1. The ambient harness CLI is owned by the configured environment, not provisioned by repository setup.
2. Rendered UI behavior has no automated browser/consequence sensor.
3. Architecture boundaries are documented and reviewed but not executable.
4. No committed CI equivalent runs the complete local gate.
5. The improvement loop lacks sustained normal-work retro evidence.

## Highest-leverage improvements

1. Add a headless local UI smoke with an accessible DOM assertion and bounded artifact when UI behavior enters acceptance scope.
2. Encode workspace import direction and product/harness state-path boundaries in the full check lane.
3. Demonstrate one complete normal-work observe → retro → harvest → encoded-improvement cycle.

## First safe agent session plan

1. Run `harness instructions` and inspect `harness doctor --json`.
2. Run `harness checks focused [target] --json`.
3. Run `harness boot --json` and require `harness readiness --json`.
4. Work through RPIV and capture concrete friction at configured hooks.
5. Run `harness checks full --json`, then `harness stop --json`.

## Harness surfaces

| Surface | Path | Status |
|---|---|---|
| Engineering harness | `.harness/` | Adopted canonical front door |
| Root project commands | `justfile` | Authoritative command bodies |
| RPIV | `AGENTS.md`, `.github/agents/` | Harness-integrated delivery flow |
| Copilot skills | `.agents/skills/` | Exactly three governed engineering-harness skills: `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` |

## Repository topology

Sparkta is a local-only Node.js 24 strict-TypeScript npm workspace with a React/Vite web foundation, Fastify server foundation, and ambient harness 0.13.0. Current operation needs no database, queue, auth provider, model provider, external service, or secret.

## Existing engineering environment survey

The canonical path is now `harness instructions` → doctor/help → focused checks → owned boot/readiness → work → full checks → stop. Harness checks delegate exactly to the root `justfile`. RPIV carries all five harness lifecycle seams. The committed inventory has exactly three engineering-harness skills: `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`; the package lock is provenance, not authorization. Test mechanisms include Fastify injection, an in-memory log sink, command spies, and detached process-group fixtures.

There is no committed CI workflow. The configured environment must separately provide harness 0.13.0; documentation and diagnostics state this boundary honestly.

## Axis A — Operate-Today scorecard

| Dimension | Band | Points | Notes |
|---|---|---:|---|
| A1 Orientation | Strong | 3 | One-hop harness, RPIV, skills, and evidence routing |
| A2 Setup contract | Partial | 2 | Application reproducible; harness is an ambient prerequisite |
| A3 Locality | Strong | 3 | No runtime remote service or secret |
| A4 Front door | Strong | 3 | Structured canonical verbs and briefings |
| A5 Boot/readiness | Strong | 3 | Owned dual-service proof and safe cleanup |
| A6 State setup | N/A | — | No product persistence yet |
| A7 Interaction | Partial | 2 | Foundation HTTP only; no product/browser flow |
| A8 Sensors | Strong | 3 | Static, runtime, ownership, delegation, cleanup |
| A9 Evidence | Strong | 3 | JSON, logs, transient evidence, durable AC summaries |
| A10 Compounding | Partial | 2 | Hooks and one encoded change; sustained use not shown |

## Axis B — Adaptability scorecard

| Dimension | Band | Points | Notes |
|---|---|---:|---|
| B1 Structural coupling | Strong | 3 | Small package boundaries |
| B2 Temporal coupling | Unknown | 0 | Deep history mode not enabled |
| B3 Cohesion | Strong | 3 | Focused modules, tests, and extensions |
| B4 Seams | Strong | 3 | Injection, spies, fixtures, extension points |
| B5 Hermetic tests | Strong | 3 | No remote credentials or services |
| B6 External sinks | N/A | — | No product external effects |
| B7 State evolution | N/A | — | No durable product state |
| B8 Architecture enforcement | Partial | 2 | Contracts are not dedicated sensors |
| B9 Complexity thresholds | Partial | 2 | Lint exists; explicit thresholds do not |
| B10 Inner loop | Strong | 3 | Focused/full and known-state runtime loops |

## Back-pressure and scenario probes

- **L2 static:** root tests, lint, formatting, type checks, builds, and diff integrity through harness delegation.
- **L4 runtime/consequence:** boot/readiness/stop proves both services, bounded evidence, ownership removal, and port release.
- **UI probe:** availability is proven by a title marker, but user-visible behavior still requires inference.
- **Architecture probe:** boundaries are documented but lack an executable verdict.

## Services, environment, and remote dependency exposure

`PORT` and `LOG_LEVEL` are optional and have safe defaults. Clean npm restoration needs registry access. Runtime proof itself has no remote dependency. Harness 0.13.0 is an explicit configured-environment prerequisite and is not claimed as repository-provisioned.

## State, fixtures, reset, and cleanup

No product durable state exists. Harness runtime ownership and evidence are isolated under `.harness/temp/boot/`; stop verifies identity, removes ownership, and releases ports. Tests use disposable temporary roots, listeners, and process groups.

## Observability and evidence

Boot, readiness, stop, checks, help, and doctor return structured envelopes. Transient logs/evidence are bounded and gitignored; work-item Implement and Verify summaries retain durable acceptance evidence.

## Codebase affordance recommendations

No immediate product-code affordance is required. Add stable accessible UI assertions only when a real UI behavior enters issue scope.

## Harness-only recommendations

- Add `ui-smoke` when UI acceptance needs L4 evidence.
- Add an architecture fitness sensor to the authoritative full gate.
- Complete and retain a normal-work retro/improvement cycle to reach H5/L5 confidence.

## Onboarding consolidation notes

Existing onboarding is cleanly consolidated. README separates application setup from ambient harness ownership; AGENTS routes autonomous work; docs carries detailed operational safety.

## Human questions

None.

## Evidence and inference log

| Source | Provenance | Claim |
|---|---|---|
| `.harness/engineering-harness.md`, `.github/skills/README.md`, `justfile` | evidence | Canonical commands, evidence, lifecycle seams, and the exact three-skill engineering-harness inventory are governed |
| Issue #2 Verify summary | evidence | Independent validation passed lifecycle, ownership, docs, and full checks |
| Boot extension and tests | evidence | Unknown owners are protected and valid groups are safely stopped |
| Checks extension | evidence | Root recipe authority is preserved through exact delegation |
| README/AGENTS/LLM/docs | evidence | Cold discovery and ambient-tool ownership are explicit |
