# Sparkta boot lifecycle — agent briefing

## What these verbs compute

- `harness boot --json` reconciles only verified ownership in `.harness/temp/boot/`, refuses unknown listeners on ports 5173 and `PORT` or 3000, spawns exactly `just run` in an owned process group, polls the Vite foundation marker and `GET /api/readiness`, then composes `harness checks full --json`. Success leaves the owned foundation running.
- `harness readiness --json` rechecks both service verdicts only when Linux `/proc` proves the live PID start time, `just run` command, and process-group membership still match recorded ownership.
- `harness stop --json` revalidates that complete identity immediately before every negative process-group signal, waits for release, removes ownership state, and is idempotent. A process-group mismatch is stale state and is removed without signalling the recorded group.

The envelopes include ownership ID, PID and process group, delegated commands, service URLs, probe statuses and durations, composed check results, cleanup details, and repository-relative evidence paths. Runtime state and logs are transient under `.harness/temp/boot/`; no harness state is written under `.sparkta/`.

## Your role

Read `harness instructions` and `harness doctor --json` first. Before interaction, require both service probes and the composed full check to be successful. Inspect only the named bounded evidence and log paths. Run `harness stop --json` when finished, after a failed probe, or before changing `PORT`.

The already-configured ambient harness CLI is not installed by repository npm setup. The root `justfile` remains authoritative for startup and validation.

## Configuration and bounds

- Web uses fixed port 5173.
- Server uses `PORT` when set, otherwise 3000. It must differ from 5173.
- Boot readiness defaults to 60000 ms. `--timeout-ms` accepts 1000 through 120000 for bounded diagnostics and negative controls.
- A port conflict is never resolved by killing its unknown owner. Stop or reconfigure that process yourself.

## Watch out for

- Never edit ownership metadata to claim an unknown process. PID reuse and a forged process-group value are rejected using the recorded start time, `just run` command, and live process-group membership.
- `harness readiness` does not start services and `harness stop` does not kill an unverified process.
- Successful stop removes ownership, but the latest transient evidence and boot log remain inspectable until the next boot.
