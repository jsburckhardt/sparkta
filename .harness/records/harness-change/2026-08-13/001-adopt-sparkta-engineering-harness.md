---
record_kind: "harness-change"
harness_version: "0.13.0"
branch: "issue-2-adopt-engineering-harness"
repo: "https://github.com/jsburckhardt/sparkta.git"
created_at: "2026-08-13T06:28:32.147Z"
agent: null
plan_id: null
schema_version: "1.0"
resolves: "issues/2"
change_type: "new-command"
target: "Sparkta checks, boot, readiness, and stop harness extensions"
---

# Harness change — encode Sparkta validation and owned runtime commands


Added repository extensions that delegate focused/full checks to the root just recipes and own a bounded `just run` lifecycle. Validation covered exact delegation spies, live dual-service readiness, stale ownership, occupied unknown ports, failed readiness, failed composed checks, idempotent stop, and root focused/full checks.
