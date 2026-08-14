---
record_kind: "retro"
harness_version: "0.13.0"
branch: "issue-3-install-and-configure-soft-factory-runner"
repo: "https://github.com/jsburckhardt/sparkta.git"
created_at: "2026-08-14T03:09:34.451Z"
agent: "github-copilot"
plan_id: "3-install-and-configure-soft-factory-runner"
schema_version: "1.2"
retro_id: "2026-08-14T03:09:34Z-github-copilot-issue3"
started_at: "2026-08-14T03:00:52Z"
ended_at: "2026-08-14T03:09:34Z"
summary: "Repaired PR #11's Runner integration by replacing phrase-only checks with executable APS control flow, repository-owned adapters, mutation checks, and a synthetic no-network canary while preserving official assets and original failure semantics."
entries:
  - id: INS-001
    kind: insight
    description: "Phrase presence did not prove that Runner helpers or harness seams were reachable on success and failure paths."
    target: tooling
    workaround: "Parsed APS process bodies into a call/order graph and added negative mutations plus pure helper canaries."
    suggested_encoding: "Keep scripts/verify-soft-factory.mjs and the runner-canary root recipe authoritative."
    fp: "d1415ee8798c"
    disposition: fixed-now
    system:
      compound:
        status: encoded
        source: agent-self
        first_seen_at: "2026-08-14T00:28:07.072Z"
  - id: COORD-001
    kind: coordination
    description: "The API host exposed skill content but no direct host skill invocation tool for the required implementation seam attempt."
    target: tooling
    workaround: "Recorded the unavailable mechanism rather than fabricating a skill envelope and encoded the required seams in APS process calls."
    suggested_encoding: "Expose a first-class host skill invocation tool in API agent sessions."
    fp: "2aa845952d4a"
    disposition: deferred
    system:
      compound:
        status: suggested
        source: agent-self
        first_seen_at: "2026-08-14T03:03:04.795Z"
  - id: DL-001
    kind: difficulty
    description: "The documented apply_patch editing helper was not available in this configured tool surface."
    target: tooling
    severity: degrading
    workaround: "Used explicit local file rewrites and reviewed the resulting Git diff."
    suggested_encoding: "Provide apply_patch in the configured agent toolchain."
    fp: "33565ee7e72f"
    disposition: deferred
    system:
      compound:
        status: suggested
        source: agent-self
        first_seen_at: "2026-08-14T03:04:08.042Z"
---

# Retro — Issue 3 Runner integration repair

The highest-leverage repair was encoding reachability and helper semantics as deterministic checks instead of relying on matching instruction phrases.
