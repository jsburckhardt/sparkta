---
record_kind: "retro"
harness_version: "0.13.0"
branch: "feat/7-run-repeated-prototype-0-generation-trials"
repo: "https://github.com/jsburckhardt/sparkta.git"
created_at: "2026-08-18T05:17:47.590Z"
agent: "github-copilot"
plan_id: "7-run-repeated-prototype-0-generation-trials"
schema_version: "1.2"
retro_id: "2026-08-18T05:17:47Z-github-copilot-1fc80c3a4987"
started_at: "2026-08-18T04:47:16Z"
ended_at: "2026-08-18T05:17:47Z"
summary: "Built bounded Prototype 0 trial commands, ran three fixed prompts, validated two successful apps, and preserved one finite Copilot timeout as the overall blocker."
entries:
  - id: DL-001
    kind: difficulty
    description: "Harness doctor reported no sensors and unmeasurable capture liveness."
    target: tooling
    severity: degrading
    workaround: "Used root trial checks and recorded the missing sensor limitation."
    suggested_encoding: "Add a registered generated-app interaction sensor when browser capability is adopted."
    fp: "eef1a6125d79"
    disposition: deferred
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T04:47:47Z" } }
  - id: CONF-001
    kind: confusion
    description: "The instructions lookup does not recognize the core observe or record commands."
    target: tooling
    severity: annoying
    workaround: "Followed the top-level briefing and command help."
    suggested_encoding: "Expose briefings for core observe and record commands."
    fp: "4a9e7d6ca70b"
    disposition: kept
    system: { compound: { status: suggested, source: agent-self, first_seen_at: "2026-08-18T04:47:47Z" } }
  - id: DL-002
    kind: difficulty
    description: "Copilot -p --help executed a real prompt rather than showing prompt-option help."
    target: tooling
    severity: annoying
    workaround: "Used copilot help permissions for deterministic option documentation."
    suggested_encoding: "Document that -p consumes the next token as prompt text."
    fp: "a2721d112b79"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T04:49:12Z" } }
  - id: DL-003
    kind: difficulty
    description: "The expected apply_patch helper was unavailable."
    target: tooling
    severity: annoying
    workaround: "Used python3 file operations."
    suggested_encoding: "Provide one deterministic repository editing helper."
    fp: "e95071dfeb5d"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T04:51:20Z" } }
  - id: DL-004
    kind: difficulty
    description: "Only python3, not python, was available for file operations."
    target: tooling
    severity: annoying
    workaround: "Retried with python3."
    suggested_encoding: "Advertise python3 as the configured command."
    fp: "f5d59eea3591"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T04:52:48Z" } }
  - id: DL-005
    kind: difficulty
    description: "Passing just recipes emitted repeated PS1 unbound-variable stderr noise."
    target: infra
    severity: annoying
    workaround: "Used harness envelope exit status and bounded stdout as verdict."
    suggested_encoding: "Guard PS1 access in the ambient bash startup file."
    fp: "88920b5ffb9f"
    disposition: deferred
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T04:54:46Z" } }
  - id: DL-006
    kind: difficulty
    description: "The customer-management Copilot generation reached the 600-second timeout."
    target: project
    severity: degrading
    workaround: "Recorded TIMEOUT, preserved partial output, skipped validation, and applied FAIL verdict arithmetic without retry."
    suggested_encoding: "Add explicit app-generation mode guidance after recurrence proves the need."
    fp: "1fc80c3a4987"
    disposition: deferred
    system: { compound: { status: suggested, source: agent-self, first_seen_at: "2026-08-18T05:11:07Z" } }
  - id: DL-007
    kind: difficulty
    description: "Full validation took 38 seconds."
    target: tooling
    severity: annoying
    workaround: "Allowed the bounded root verification to finish and recorded its exact result."
    suggested_encoding: "Retain duration reporting to track validation regressions."
    fp: "cff1f5797e3a"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:17:25Z" } }
---

# Retro — Issue 7 Prototype 0 trials

The highest-leverage follow-up is explicit generated-app mode guidance if scope-orientation overhead recurs; one timeout is not enough to change the canonical starter today.
