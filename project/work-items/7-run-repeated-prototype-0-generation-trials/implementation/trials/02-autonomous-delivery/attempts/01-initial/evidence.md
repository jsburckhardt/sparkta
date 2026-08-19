# Attempt evidence

- Trial ID: `02-autonomous-delivery`
- Attempt ID: `01-initial`
- Starter Inventory SHA-256: `2eb1d7b732b0206585e8a6d2ef2dd91782de084d4d2411d2605ab522b33781f5`
- Starter Lock SHA-256: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Clean Copy: PASS — complete starter copy with no node_modules or dist

## Dependency installation

- Outcome: PASS
- Command: `npm ci --include=dev`
- Exit Status: 0
- Lock Before: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Lock After: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Dependency Allowlist: PASS

```text

added 179 packages in 13s

28 packages are looking for funding
  run `npm fund` for details
npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn allow-scripts   esbuild@0.28.1 (postinstall: node install.js)
npm warn allow-scripts
npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.

```

## Frontend-only audit

- Outcome: PASS
- Simulated domain marker: /agent|delivery/i
- Prohibited backend, database, Docker, authentication, external API, and runtime fetch scan: PASS

## Build result

- Outcome: PASS
- Command: `npm run build`
- Exit Status: 0
- Artifact: `app/dist/index.html` proved before owned cleanup

```text

> sparkta-generated-frontend@0.0.0 build
> tsc -b && vite build

vite v7.3.6 building client environment for production...
transforming...
✓ 1579 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.43 kB │ gzip:  0.28 kB
dist/assets/index-D4qeuoqU.css   21.55 kB │ gzip:  4.62 kB
dist/assets/index-DpfUSXIW.js   216.02 kB │ gzip: 67.18 kB
✓ built in 4.84s

```

## Runtime port

- Outcome: PASS
- Assigned Port: 42609
- Command: `npm run dev -- --host 0.0.0.0 --port 42609`

## Browser-load result

- Outcome: PASS
- Evidence Level: HTTP browser-loadability only; no real-browser, DOM-event, screenshot, console, or viewport claim
- HTTP 200: PASS
- Content-Type text/html: PASS
- Trial-specific source marker over Vite HTTP: PASS

## Owned cleanup

- Outcome: PASS
- Process: owned detached process group only
- Released Port: PASS
- Runtime artifacts: node_modules and dist removed after proof

## Generated result hash

- Post-generation app inventory SHA-256: `2435bceb7ca72b6864ddb796c0d5bd4916d23473af35a151b0430cac64f5754f`

## Prompt-major controls

| Prompt-major control | Source handler or state | Visible effect | Verdict |
| --- | --- | --- | --- |
| Agent search | `App.tsx:162,172-175,314` — `setQuery` | Agent list narrows by name, task, repository, or issue | PASS |
| Status filter | `App.tsx:163,171,326` — `setStatus` | Agent list narrows to running, waiting, or reviewing | PASS |
| Elapsed/token sorting | `App.tsx:164,177,331` — `setSortBy` | Agent cards reorder by elapsed minutes or token use | PASS |
| Overview/activity tabs | `App.tsx:166,294-302,337` — `setTab` | Main workspace switches between agent overview and activity | PASS |
| Pause/resume | `App.tsx:165,181-184,383` — `togglePause` | Selected agent status, indicator, and pause/resume icon change | PASS |
| Empty-state recovery | `App.tsx:391-393` — reset query and status | No-results view clears filters and restores agents | PASS |

The traces are source-backed inference combined with successful HTTP load; no DOM-event or screenshot automation is claimed.

## Unmet checks

- None blocking. Real-browser viewport and DOM-event automation are unavailable; responsive and visual judgments are bounded source/CSS review rather than automated rendering evidence.

## Attempt verdict

- Operational Validation: PASS
- Product Quality Bar: PASS
- Build: PASS
- Start: PASS
- Visually represents request: PASS — active agents, tasks, repositories, elapsed time, token consumption, statuses, and recent activity are all represented.
- Major controls plausible: PASS — all six traces above connect controls to state and visible effects.
- Story-supporting data: PASS — named agents, repositories, branches, issues, token limits, statuses, and activity timestamps form a coherent delivery story.
- Not unfinished scaffold: PASS — generated operations workspace replaces the neutral starter with responsive navigation, summaries, agent cards, tabs, filters, progress, and states.
- Attempt Verdict: PASS
- Blocker: None
