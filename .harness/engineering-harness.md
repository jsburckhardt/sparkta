# Engineering harness

> **AGENTS START HERE → `harness instructions`** — self-brief from the already-configured ambient harness 0.13.0 CLI, then read `harness instructions <verb>` before invoking a repository verb. Confirm discovery with `harness help --json` and classify diagnostics with `harness doctor --json`.

The ambient CLI installation is owned by the configured development environment. Repository npm state owns only Sparkta dependencies; it does not install or reproduce the harness. Committed governance, extensions, skills, and discovery files make repository behavior portable. The committed engineering-harness skill boundary is exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done`; `.harness/skills.lock.json` records source provenance rather than authorization. Do not run broad skill installation when it would restore any other entry.

## Boot command

`harness boot --json` is the bounded boot front door. It reconciles only verified state under `.harness/temp/boot/`, refuses unknown listeners on fixed ports, spawns exactly `just run`, proves both foundations, and composes `harness checks full --json`. A successful boot leaves the owned runtime available until `harness stop --json`.

Web readiness targets port 5173. Server readiness targets `PORT` or 3000. Boot defaults to a 60000 ms readiness bound; `--timeout-ms` accepts 1000 through 120000 ms for bounded diagnostics. Unknown port owners are reported and never signalled.

## Checks command

- `harness checks focused [target] --json` delegates exactly once to `just verify-focused [target]`. A target is forwarded as one argument.
- Bare `harness checks --json` and `harness checks full --json` delegate exactly once to `just verify`.

The root `justfile` remains authoritative. Harness wrappers do not contain npm, Vitest, lint, formatting, type-check, build, or diff-integrity command bodies.

## Health check

`harness readiness --json` uses Linux `/proc` to verify the live PID start time, `just run` command, and process-group membership against recorded ownership before probing both services:

1. `GET http://127.0.0.1:5173/` must return HTTP 200 with the `Sparkta Foundation` marker.
2. `GET /api/readiness` on the `PORT` value or 3000 must return HTTP 200 with exactly `{"foundation":"sparkta-server","status":"ready"}`.

Readiness does not start or stop any process. `harness stop --json` revalidates that complete identity immediately before every negative process-group signal, waits for both ports to release, removes ownership state, and is idempotent. A mismatch is reported in structured ownership validation and removed as stale state without signalling the recorded group.

## Interact method

This issue exposes only foundation interaction. Agents may request the Vite root and `GET /api/readiness` after a successful readiness verdict. There is no product prompt, agent invocation, persistence, generated application, or control-UI interaction in the current foundation.

## Observe method

Use the JSON envelopes from `boot`, `readiness`, `stop`, and `checks` as the primary verdicts. Inspect only the bounded paths named by those envelopes:

- `.harness/temp/boot/evidence.json` — latest structured lifecycle evidence.
- `.harness/temp/boot/boot.log` — transient `just run` output.
- `.harness/temp/boot/ownership.json` — live transient ownership only; absent after stop.

Use `harness doctor --json` for extension and convention diagnostics. During RPIV coding, invoke `/eng-harness-flow --hook coding` through the host skill mechanism and capture concrete friction with `harness observe "<what happened>" --kind <kind>` when a trigger occurs. Never put prompts, source, secrets, tokens, or conversation content in evidence.

## Deterministic signal inventory

| Signal | Deterministic verdict | Source |
|---|---|---|
| Ambient tool identity | Exact `0.13.0` | `harness --version` |
| CLI and extension discovery | One envelope; loaded `checks`, `boot`, `readiness`, and `stop` verbs | `harness help --json` and `harness doctor --json` |
| Focused quality | Exact root delegation and child exit | `harness checks focused [target] --json` |
| Full quality | Exact root delegation and child exit | `harness checks full --json` |
| Web foundation | HTTP 200 plus title marker | `harness readiness --json` |
| Server foundation | HTTP 200 plus exact non-sensitive readiness body | `harness readiness --json` |
| Runtime ownership | PID, process group, process start time, command, and port release | `.harness/temp/boot/ownership.json` and stop envelope |
| Skill portability | Exactly `eng-harness-flow`, `eng-harness-0-harnessability-assessment`, and `grill-agent-done` under `.agents/skills/` | Committed skill content and the root allowlist guard; `.harness/skills.lock.json` is provenance only |
| Root regression gate | Test, lint, format, type-check, build, and diff integrity | `just verify` through the root `justfile` |

## Evidence paths

Transient runtime evidence is confined to `.harness/temp/boot/` and is gitignored by `.harness/temp/.gitignore`. It never uses `.sparkta/apps/` or `.sparkta/runtime/`. Committed evidence and contracts live at:

- `.harness/engineering-harness.md` and `.harness/extensions/`;
- `.harness/skills.lock.json` and `.agents/skills/`;
- `.harness/flows/adopt.json` plus its generated `adopt.md`;
- `.harness/records/harness-change/` for validated capability changes;
- `project/work-items/2-adopt-the-ai-substrate-engineering-harness/implementation/00-implementation.md` for AC-indexed implementation evidence.

The historical `.harness/reports/harnessability/001-sparkta/` assessment remains unchanged branch-main evidence; it is not current runtime proof.

## Injection map

These are structural RPIV agent seams. Slash calls use the host skill mechanism; they are not shell commands and must not be narrated without a real invocation.

| Seam event | Fires from | Exact invocation |
|---|---|---|
| pre-flight | RPIV coordinator after branch confirmation, immediately before Research | `/eng-harness-flow --hook pre-flight` |
| pre-coding | RPIV coordinator after validated Plan, immediately before Implement | `/eng-harness-flow --hook pre-coding` |
| coding | RPIV Implement while tasks are being changed | `/eng-harness-flow --hook coding`; concrete triggers use `harness observe "<what happened>" --kind <kind>` |
| post-coding | RPIV Implement after full validation, before implementation notes and commit handoff | `/eng-harness-flow --hook post-coding` |
| post-flight | RPIV coordinator after successful Verify closeout | `/eng-harness-flow --hook post-flight` |

## Back-pressure gaps

- No product workflow, prompt interaction, agent bridge, generated-app lifecycle, browser automation, screenshot, or trace sensor exists yet; foundation HTTP probes are the only interaction surface.
- The harness has no continuous sensor watcher because no repository sensor is registered.
- Doctor may remain `degraded` for environment-owned telemetry capture and git-ai PATH visibility. The repository action is complete when extensions, quality gate, skills, and commit guidance are loaded; the environment next actions remain explicit in the doctor envelope.
- Runtime evidence is intentionally transient. AC-indexed durable summaries must be written to the work-item implementation notes.

## Current maturity snapshot

**L2 — Commands encoded.** Ambient harness 0.13.0 discovery, delegated focused/full checks, owned boot, dual readiness, safe stop, the exact three-skill allowlist, and managed commit guidance were exercised in the configured Node.js 24 environment. L3 is not claimed: sustained normal-work improvement-loop evidence has not been established.
