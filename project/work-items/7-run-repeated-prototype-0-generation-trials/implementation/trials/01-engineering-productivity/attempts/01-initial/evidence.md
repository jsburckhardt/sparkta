# Attempt evidence

- Trial ID: `01-engineering-productivity`
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

added 179 packages in 15s

28 packages are looking for funding
  run `npm fund` for details
npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn allow-scripts   esbuild@0.28.1 (postinstall: node install.js)
npm warn allow-scripts
npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.

```

## Frontend-only audit

- Outcome: PASS
- Simulated domain marker: /engineering|repository/i
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
✓ 2167 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.43 kB │ gzip:   0.28 kB
dist/assets/index-BtOR6jmc.css   24.45 kB │ gzip:   5.05 kB
dist/assets/index-C7H6AFeV.js   600.88 kB │ gzip: 179.87 kB
✓ built in 8.24s

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.

```

## Runtime port

- Outcome: PASS
- Assigned Port: 36583
- Command: `npm run dev -- --host 0.0.0.0 --port 36583`

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

- Post-generation app inventory SHA-256: `5048343b7975b8533d8456d5b6f306bb82ebe46bb8929843496079154824282d`

## Prompt-major controls

| Prompt-major control | Source handler or state | Visible effect | Verdict |
| --- | --- | --- | --- |
| Team filter | `App.tsx:128,136,206` — `setTeam` and derived `repositories` | Repository count and rows narrow to the selected team | PASS |
| Time period | `App.tsx:127,212,220` — `setPeriod` | KPI value changes for the selected period | PASS |
| Repository search | `App.tsx:129,137,272` — `setQuery` | Matching rows and empty result message update | PASS |
| Repository sorting | `App.tsx:130,138,273` — `setSortKey` | Rows reorder by PR volume, cycle time, or success rate | PASS |
| Dashboard navigation | `App.tsx:126,162,200` — `setActiveView` | Selected navigation styling and visible page heading change | PASS |

The traces are source-backed inference combined with successful HTTP load; no DOM-event or screenshot automation is claimed.

## Unmet checks

- None blocking. Real-browser viewport and DOM-event automation are unavailable; responsive and visual judgments are bounded source/CSS review rather than automated rendering evidence.

## Attempt verdict

- Operational Validation: PASS
- Product Quality Bar: PASS
- Build: PASS
- Start: PASS
- Visually represents request: PASS — engineering executive hierarchy, repository portfolio metrics, trends, and team comparisons are present.
- Major controls plausible: PASS — all five traces above connect controls to state and visible effects.
- Story-supporting data: PASS — named repositories, teams, technologies, trends, statuses, and dates are coherent and varied.
- Not unfinished scaffold: PASS — generated dashboard replaces the neutral starter with responsive navigation, charts, KPIs, tables, empty state, and interaction styles.
- Attempt Verdict: PASS
- Blocker: None
