---
record_kind: "retro"
harness_version: "0.13.0"
branch: "feat/5-establish-the-blessed-frontend-starter"
repo: "https://github.com/jsburckhardt/sparkta.git"
created_at: "2026-08-15T09:20:04.497Z"
agent: agent
plan_id: "5-establish-the-blessed-frontend-starter"
schema_version: "1.2"
retro_id: "2026-08-15T09:20:04Z-agent-5starter"
started_at: "2026-08-15T09:02:26.204Z"
ended_at: "2026-08-15T09:23:17.594Z"
summary: "Implemented and proved the standalone frontend starter; captured registry, editing, formatting, and runtime-cleanup friction."
entries:
  - id: DL-001
    kind: difficulty
    description: 'Large mandatory repository maps exceeded the file viewer limit and required ranged rereads'
    target: tooling
    severity: annoying
    workaround: 'Read files in explicit ranges'
    fp: "a4ea119e92d2"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:02:26.204Z"
  - id: DL-002
    kind: difficulty
    description: 'The environment advertised python command support but only python3 was available when creating starter files'
    target: tooling
    severity: degrading
    workaround: 'Retried with python3'
    fp: "889f86e5e482"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:03:03.106Z"
  - id: DL-003
    kind: difficulty
    description: 'Generating the standalone npm lockfile produced no output for more than six minutes and had to be stopped'
    target: infra
    severity: degrading
    workaround: 'Stopped the process and diagnosed registry access'
    fp: "3c332af08507"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:09:35.420Z"
  - id: DL-004
    kind: difficulty
    description: 'npm registry TLS failed while generating the required independent lockfile, revealing an unavailable network prerequisite'
    target: infra
    severity: blocking
    workaround: 'Inspected the existing lockfile for the available package feed'
    fp: "82a5d8d9edb7"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:09:46.131Z"
  - id: DL-005
    kind: difficulty
    description: 'The usable npm registry mirror was only discoverable from existing lockfile resolved URLs rather than npm configuration'
    target: infra
    severity: degrading
    workaround: 'Used the existing Microsoft feed URL explicitly'
    suggested_encoding: 'Provision the repository npm mirror in the development environment'
    fp: "425dabdcc94f"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:10:31.080Z"
  - id: DL-006
    kind: difficulty
    description: 'The file-edit command was blocked because literal shell syntax inside the justfile recipe was misclassified as command expansion'
    target: tooling
    severity: degrading
    workaround: 'Used inert placeholders while writing recipe text'
    fp: "08a066b760f4"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:12:23.799Z"
  - id: DL-007
    kind: difficulty
    description: 'The first runtime smoke check expected a React-rendered marker in Vite source HTML, so the HTTP-only assertion failed before browser execution'
    target: project-sensor
    severity: degrading
    workaround: 'Committed the marker on the HTML root element'
    fp: "09f96058f8b9"
    disposition: fixed-now
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:13:40.891Z"
  - id: DL-008
    kind: difficulty
    description: 'Python standard-library json import was shadowed or unavailable during a package script edit, forcing a deterministic text edit retry'
    target: tooling
    severity: annoying
    workaround: 'Used an exact deterministic text replacement'
    fp: "0e48f390e5a4"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:15:51.413Z"
  - id: SUGG-001
    kind: improvement-suggestion
    description: 'Full validation exposed formatting drift across the new starter and affected docs, but the root interface had only a check recipe and no deterministic formatter'
    target: project
    severity: annoying
    workaround: 'Added a root format recipe matching format-check scope'
    suggested_encoding: 'Keep format and format-check path scopes paired in the root justfile'
    fp: "65679106906a"
    disposition: fixed-now
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:16:22.191Z"
  - id: DL-009
    kind: difficulty
    description: 'A cold-agent map edit treated viewer line-number prefixes as file content, so the intended starter entries were not inserted and a static assertion caught it'
    target: tooling
    severity: degrading
    workaround: 'Edited against actual unnumbered map text'
    fp: "4498cc8887cf"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:17:25.054Z"
  - id: DL-010
    kind: difficulty
    description: 'The owned Vite process stopped but the immediate single-shot port-release assertion raced socket teardown'
    target: project-sensor
    severity: degrading
    workaround: 'Added bounded port-release polling'
    suggested_encoding: 'Use a reusable bounded port-release assertion in runtime smoke recipes'
    fp: "0d3558969d59"
    disposition: fixed-now
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:18:05.107Z"
  - id: INS-001
    kind: insight
    description: 'Full validation took 53 seconds because it performs a clean npm install, build, two runtime smoke paths, and cleanup'
    target: project
    severity: annoying
    workaround: 'Retained the bounded end-to-end proof'
    fp: "e522382a57ae"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:19:44.255Z"
  - id: DL-011
    kind: difficulty
    description: "Managed harness commit connected to the attribution socket but git failed to write the commit object because the agent socket was unavailable"
    target: harness-itself
    severity: blocking
    workaround: "Use the managed buffered-and-named path without bypassing harness commit"
    fp: "commit-socket"
    disposition: kept
    system:
      compound:
        status: open
        source: agent-self
        first_seen_at: "2026-08-15T09:22:49.260Z"
system:
  compound:
    bubble_action: "all-save"
---

# Retro — Issue 5 frontend starter

Post-coding drain saved all observations; small recipe and smoke-proof fixes landed during implementation.
