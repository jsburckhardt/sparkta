# `harness checks` — agent briefing

## What this verb computes

`harness checks` and `harness checks full` invoke exactly one child command: `just verify`. `harness checks focused [target]` invokes exactly one child command: `just verify-focused [target]`, forwarding a supplied target as one argument. The envelope reports the delegated command, argv, exit code, duration, and bounded output.

The root `justfile` remains authoritative. This extension contains no npm, Vitest, lint, format, type-check, build, or diff-integrity command body.

## Your role

Read the delegated command and exit code before deciding whether the check is usable. On failure, fix the root-recipe result and rerun the same harness check. Use focused checks while implementing and full checks only when the planned change is ready for the complete gate.

## Watch out for

- A successful wrapper proves only that the root recipe invocation reported success; review its bounded output for the expected target.
- Do not bypass the wrapper by copying recipe internals into another harness extension.
- Keep an optional focused target to one repository-relative argument.
