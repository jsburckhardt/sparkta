---
record_kind: "retro"
harness_version: "0.13.0"
branch: "feat/7-run-repeated-prototype-0-generation-trials"
repo: "https://github.com/jsburckhardt/sparkta.git"
created_at: "2026-08-18T05:41:40.204Z"
agent: "github-copilot"
plan_id: "7-run-repeated-prototype-0-generation-trials"
schema_version: "1.2"
retro_id: "2026-08-18T05:41:40Z-github-copilot-f2ffed7c0c5e"
started_at: "2026-08-18T05:27:22.641Z"
ended_at: "2026-08-18T05:42:00Z"
summary: "Corrected durable trial result normalization, adopted direct-generation guidance, and completed the single affected customer-management rerun with full operational evidence."
entries:
  - id: DL-001
    kind: difficulty
    description: "Harness doctor reported capture liveness absent and git-ai hooks unavailable due to global trace2 configuration."
    target: tooling
    severity: degrading
    workaround: "Proceeded because attribution-at-risk was clean and retained Doctor remediation."
    suggested_encoding: "Expose a non-destructive repository-local collector remediation path."
    fp: "c9978c0a87a6"
    disposition: deferred
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:27:22.641Z" } }
  - id: DL-002
    kind: difficulty
    description: "Raw Copilot result capture preserved trailing spaces, so merge-base diff integrity failed after an otherwise complete trial run."
    target: tooling
    severity: degrading
    workaround: "Normalized trailing horizontal whitespace without changing semantic text."
    suggested_encoding: "Normalize result lines in trial-tool capture and add a negative regression fixture."
    fp: "f2ffed7c0c5e"
    disposition: fixed-now
    system: { compound: { status: encoded, source: agent-self, first_seen_at: "2026-08-18T05:28:53.748Z", resolved_by: "issue-7 correction commit" } }
  - id: DL-003
    kind: difficulty
    description: "The documented execution environment suggested python, but only python3 is installed, causing the first deterministic edit command to fail and require a retry."
    target: tooling
    severity: annoying
    workaround: "Retried repository-local edit scripts with python3."
    suggested_encoding: "Align tool documentation with the available interpreter name or provide a python shim."
    fp: "2fae1998a882"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:30:08.376Z" } }
  - id: DL-004
    kind: difficulty
    description: "Delegated focused checks emit repeated /etc/bash.bashrc PS1-unbound warnings even though the authoritative recipe passes, obscuring the bounded verdict output."
    target: tooling
    severity: annoying
    workaround: "Used harness envelope exit_code and delegated command fields as the deterministic verdict."
    suggested_encoding: "Make delegated noninteractive shells avoid sourcing prompt-only PS1 setup."
    fp: "00d091726c99"
    disposition: deferred
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:31:19.400Z" } }
  - id: DL-005
    kind: difficulty
    description: "A scripted trials-check edit failed on nested JavaScript escape quoting before changing the file, requiring a smaller retry strategy."
    target: tooling
    severity: annoying
    workaround: "Split the edit into simpler Python replacements with triple-quoted literals."
    suggested_encoding: "Provide a structured patch/edit tool for repository files."
    fp: "cc9560309b86"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:31:47.191Z" } }
  - id: DL-006
    kind: difficulty
    description: "The required one-shot customer-management Copilot rerun required an extended bounded wait, with no intermediate deterministic progress signal before the final generation verdict."
    target: tooling
    severity: degrading
    workaround: "Waited for the root trial-generate recipe finite outcome without retrying."
    suggested_encoding: "Expose safe bounded generation progress or phase heartbeat evidence while preserving one-shot semantics."
    fp: "fb6cbd8c353e"
    disposition: kept
    system: { compound: { status: open, source: agent-self, first_seen_at: "2026-08-18T05:36:21.028Z" } }
  - id: DL-007
    kind: difficulty
    description: "The first mechanical normalization command used an over-escaped newline literal, so the strengthened trials-check correctly still rejected initial evidence lines 40-41."
    target: tooling
    severity: annoying
    workaround: "Applied regex-based normalization and reran the root evidence check."
    suggested_encoding: "Keep normalization in the shared tested trial-record helper and use it for all future writes."
    fp: "ec2c2c762606"
    disposition: fixed-now
    system: { compound: { status: encoded, source: agent-self, first_seen_at: "2026-08-18T05:38:20.476Z", resolved_by: "issue-7 correction commit" } }
---

# Retro — Issue 7 Implement correction

The highest-value improvement was encoded immediately: durable trial writes now normalize trailing horizontal whitespace, the evidence checker rejects regressions with exact line numbers, and focused tests cover both normalization and negative detection.
