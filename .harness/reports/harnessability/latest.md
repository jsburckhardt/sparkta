# Harnessability Assessment — sparkta

Run metadata
- Timestamp: 20260813T052139Z
- Repo root: `/workspaces/sparkta`
- Branch / commit: `main` / `3f43b50790ed4b573e8889f2d2aca048c5900c69`
- Mode: static
- Commands executed: read-only Git context, `harness --version`, `harness doctor --json`, and `harness flow --help`
- Commands skipped: dependency installation, service boot, validation execution, runtime probes, and external calls
- Safety notes: no secrets read; no product or service mutation; pre-existing dirty worktree preserved

## Verdict

- Operate-Today: **B (74.1%)**
- Adaptability: **B (75.0%)**
- Harnessability Index: **74.5% (B)**
- Final grade: **B**
- Readiness: **H3**
- Highest proof level detected: **L3**
- Target next proof level: **L4**
- Confidence: **high**

The repository is easy to enter, statically validate, and modify within its small web/server boundaries. Its main proof gap is runtime: `just run` starts processes, but no health, readiness, smoke, or browser-evidence path establishes that the running system is usable. The engineering harness CLI is present but has not yet wrapped the strong existing `just` validation surface.

## Assessment matrix

| Area | Grade | Score | Rationale |
|---|---|---:|---|
| Operate-Today | B | 74.1% | Strong setup and L2 validation; boot/readiness and harness adoption remain incomplete |
| Adaptability | B | 75.0% | Small cohesive packages and hermetic tests; architecture rules remain prose |

## Top blockers

1. **No harness `checks` or `boot` verbs.** The deterministic local gate exists as `just verify`, but cold agents cannot discover or run it through the harness front door.
2. **No runtime readiness or smoke verdict.** Documented ports and process startup require inference.
3. **Architecture contracts are not executable.** ADRs and core-components guide reviewers but cannot fail violating changes.

## Highest-leverage improvements

1. Add `harness checks` as a thin wrapper over `just verify`.
2. Add `harness boot` that composes checks and returns a structured readiness verdict.
3. Plan a minimal safe server readiness endpoint and probe so boot can reach L3 without guessing.
4. Encode package and filesystem architecture constraints into the existing checks lane.

## First safe agent session plan

1. Run `harness init` to stamp governance.
2. Record the RPIV lifecycle injection map.
3. Wrap `just verify` as `harness checks`.
4. Create `harness boot` that composes checks; handle runtime readiness through separately planned product work.
5. Retain structured evidence from doctor, checks, and boot.

## Harness surfaces

| Surface | Path | Kind | Status | Notes |
|---|---|---|---|---|
| Root justfile | `justfile` | canonical | configured | Complete setup, run, focused, and full validation interface |
| Engineering harness | `.harness/` | canonical | adoption in progress | CLI works; governance and project extensions absent |
| RPIV flow | `AGENTS.md` | canonical | configured | Research → Plan → Implement → Verify with durable work-item evidence |

## Repository topology

Sparkta is a Node.js 24 strict-TypeScript npm workspace. `apps/server` is a Fastify foundation and `apps/web` is a React/Vite foundation. The current product is local-only, has no durable state implementation, and has no runtime database, queue, auth provider, model provider, or third-party side effect.

## Existing engineering environment survey

### Engineering flows

| Flow | Kind | Commands | Canonical | Where detected |
|---|---|---|---|---|
| RPIV | SDD | Research, Plan, Implement, Verify | yes | `AGENTS.md`, `project/work-items/` |
| Local validation | test | `just verify-focused`, `just verify` | yes | `justfile`, README |
| Local development | local | `just setup`, `just run` | yes | `justfile`, docs |

### Pre-commit and CI/local equivalence

No committed pre-commit mechanism or CI workflow was detected. `just verify` is therefore a strong local-only gate with no committed remote equivalent.

### Existing harness concepts

The `justfile` is the current canonical command surface and has strong coverage. The engineering harness CLI is installed, but project coverage is weak because governance, `checks`, and `boot` do not yet exist.

### Test mechanisms

| Mechanism | Type | Deterministic | Where detected |
|---|---|---|---|
| Vitest tests | unit | yes | Both workspaces |
| Fastify injection | integration | yes | `apps/server/src/app.test.ts` |
| Writable log capture | sink | yes | `apps/server/src/logger.test.ts` |

The Fastify test factory and in-process injection are reusable harness affordances: they prove real HTTP boundary behavior without a port or remote dependency. The logging test similarly provides an in-memory sink for structured redaction evidence.

### External-dependency pressure

Only clean dependency restoration requires the npm registry. Current runtime behavior and tests have no remote or secret-gated dependency.

### Code composition and seams

The web/server workspace boundary is clear and current coupling is low. `createServer()` is a direct in-process test seam, and tests are colocated with the modules they prove.

### Deterministic-encoding opportunities

| Opportunity | Current encoding | Proposed encoding | Proof |
|---|---|---|---|
| Runtime readiness | documented ports | health endpoint + boot probe | L3 |
| Architecture boundaries | ADR/core-component prose | lint or architecture sensor | L2 |

### Manual signals

`just run` relies on manual stop and visual process interpretation. Web behavior is currently browser-inspected rather than asserted through a headless interaction and evidence artifact.

### Candidate first harness surfaces

| Surface | Rationale | Proof | Priority |
|---|---|---|---|
| `checks` | Wrap the complete canonical local gate | L2 | high |
| `boot` | Compose checks and produce readiness evidence | L3 | high |
| `architecture` | Enforce stable documented boundaries | L2 | medium |

## Axis A — Operate-Today scorecard

| Dimension | Band | Points | Evidence | Notes |
|---|---|---:|---|---|
| A1 Orientation | Strong | 3 | README, docs, AGENTS, project docs | Clear purpose, layout, commands, and evidence paths |
| A2 Setup | Strong | 3 | devcontainer, lockfile, README | Node 24 and just are pinned |
| A3 Locality | Strong | 3 | manifests and scope docs | No current runtime external dependency |
| A4 Front door | Partial | 2 | justfile, harness doctor | just is strong; harness verbs absent |
| A5 Boot/readiness | Weak | 1 | `just run` | Starts processes without a verdict |
| A6 State lifecycle | N/A | — | scope docs | No implemented product state |
| A7 Interaction | Partial | 2 | Fastify inject, Vite app | HTTP boundary exists; product/UI flow absent |
| A8 Sensors | Strong | 3 | just recipes, prior verify summary | Complete L2 gate with recorded evidence |
| A9 Observability | Partial | 2 | structured logs and RPIV records | No live inspect/capture command |
| A10 Compounding | Weak | 1 | adoption flow | Observe/retro/improve loop incomplete |

## Axis B — Adaptability scorecard

| Dimension | Band | Points | Evidence | Notes |
|---|---|---:|---|---|
| B1 Structural coupling | Strong | 3 | workspace/source layout | Small, separated packages |
| B2 Temporal coupling | Unknown | 0 | not assessed | Deep history mode not enabled |
| B3 Cohesion | Strong | 3 | colocated modules/tests | Focused current modules |
| B4 Seams | Partial | 2 | server factory and injection | Useful current seam; broader adapters not yet needed |
| B5 Hermetic tests | Strong | 3 | Vitest suites | No services or credentials required |
| B6 External sinks | N/A | — | scope docs | No external effects implemented |
| B7 State evolution | N/A | — | scope docs | No state implementation |
| B8 Architecture enforcement | Partial | 2 | ADRs, ESLint | Contracts are not executable |
| B9 Complexity thresholds | Partial | 2 | ESLint, small files | No explicit complexity thresholds |
| B10 Inner loop | Strong | 3 | focused/full recipes and lockfile | Repeatable lanes with prior passing evidence |

## Back-pressure surface inventory

- **Static L2:** `just verify` and `just verify-focused`.
- **Runtime L3:** Fastify in-process request injection with deterministic HTTP response assertions.
- **Observability L2:** structured event/redaction assertions through an in-memory stream.
- **Inferential:** independent RPIV architecture, documentation, and acceptance review.
- **Absent:** network readiness, browser smoke, consequence evidence, architecture sensor, CI equivalence.

## Scenario probes

### Server HTTP behavior loop

Fastify injection reaches L3 for HTTP error-boundary behavior and closes servers deterministically. It does not prove that the network listener on port 3000 is ready. A minimal readiness endpoint plus boot-time HTTP probe is the highest-leverage missing sensor.

### Web UI foundation loop

Vitest proves the foundation message at L2, while rendered UI behavior remains manual. A headless smoke with an accessible DOM assertion or screenshot would establish portable runtime evidence.

### Architecture-rule loop

The repository has clear intended package and state boundaries, but no executable verdict. An architecture check in the existing validation lane would turn recurring review inference into L2 proof.

## Command tiers

| Tier | Command | Status | Proof | Notes |
|---|---|---|---|---|
| bootstrap | `just setup` | configured, unverified this run | L1 | Locked clean install |
| boot | `just run` | configured, unverified this run | L1 | No readiness verdict |
| fast | `just verify-focused` | configured, prior evidence | L2/L3 | Selected tests plus diff integrity |
| proof | `just verify` | configured, prior evidence | L2/L3 | Complete static and test gate |
| doctor | `harness doctor --json` | verified | L1 | CLI works; adoption gaps reported |

## Services, environment, and remote dependency exposure

`PORT` and `LOG_LEVEL` are optional, documented, and have safe defaults. No secret-like application configuration was detected. Clean setup needs the npm registry; runtime proof does not.

## State, fixtures, reset, and cleanup

The current foundation intentionally implements no durable state. Test cleanup is explicit where needed: Fastify instances are closed after each injected-request test.

## Observability and evidence

The server emits structured Pino events with correlation fields and tested redaction. RPIV stores implementation and independent verification evidence. Live processes do not yet expose a structured inspection command or retained smoke artifact.

## Codebase affordance recommendations

Propose a minimal readiness endpoint that returns no internal state or secrets and uses a stable schema. This is low-risk local/test functionality and would let `harness boot` prove listener readiness instead of relying on startup logs.

## Harness-only recommendations

1. Add `checks` wrapping `just verify`.
2. Add `boot` composing `harness checks`.
3. Add architecture enforcement after the nucleus is working.

## Onboarding consolidation notes

The README and docs already consolidate cold setup and command discovery cleanly. AGENTS.md is the canonical RPIV contract. Harness governance should reference these surfaces rather than duplicate them.

## Human questions

None required for this static assessment.

## Evidence and inference log

| Source | Provenance | Claim |
|---|---|---|
| README and docs | evidence | Setup, operation, configuration, and current exclusions are explicit |
| justfile | evidence | Focused and complete validation lanes exist |
| prior Verify summary | evidence | Full tests, lint, format, type checks, and builds passed independently |
| Fastify tests | evidence | Hermetic HTTP interaction is already reusable |
| harness doctor | evidence | CLI loads, but project extensions and governance are incomplete |
