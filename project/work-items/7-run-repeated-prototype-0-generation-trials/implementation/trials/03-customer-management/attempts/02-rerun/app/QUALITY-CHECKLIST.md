# Generated frontend quality checklist

Evaluation is source-backed inference plus the recorded assigned-port HTTP load in `../evidence.md`; no real-browser, screenshot, DOM-event, console, or viewport automation is claimed. Stack adherence, build success, and runtime startup are mandatory.

## Design quality

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-5:** The rendered interface avoids giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace. | PASS | `src/index.css:18-175` uses a restrained green/neutral system, 6-9px radii, subtle shadows, purposeful table/panel grouping, and compact spacing; source-backed CSS inference only. |
| **AC-5:** The rendered interface demonstrates clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content appropriate to its domain. | PASS | `src/App.tsx:517-585` and `src/index.css:45-212` provide list/detail hierarchy, dense tables, selected/hover states, mobile navigation, narrow-width column reduction, responsive grids/forms, and realistic CRM content; HTTP load passed. |

## Instruction quality

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-1:** The implementation follows `AGENTS.md` and delivers a frontend-only prototype with domain-specific simulated data and independently runnable output. | PASS | Copied `AGENTS.md`; local `customersSeed` in `src/App.tsx:73-221`; locked install, build, and standard runtime PASS in `../evidence.md`. |
| **AC-2:** Requested or contextually relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes behave plausibly; irrelevant controls were not added for catalogue coverage. | FAIL | Prompt-major search/filter/sort/detail/tab/create/edit traces PASS in `../evidence.md`; secondary sidebar/global/help/edit-note/new-order/new-invoice/record-chevron controls are inert and explicitly indexed as unmet. |
| **AC-3:** Applicable loading, empty, error, success, disabled, hover, and selected states are represented and understandable. | PASS | Empty-filter and empty-record states `src/App.tsx:416-418,576`; create/edit success toast `486-515,584`; required/disabled form and pagination states `314-324,578`; selected tabs and hover/mobile states in `src/index.css:28-31,51-55,66,82-106,120-123,176-212`. Loading and remote-error states are inapplicable because all data/actions are synchronous and local. |
| **AC-4:** The implementation obeys the instruction prohibitions against services and external requirements. | PASS | `../evidence.md` frontend-only audit PASS; source and package scan found no backend, database, Docker, auth, external API, runtime fetch, or external-data requirement. |

## Stack adherence

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-4:** The application uses the bundled React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style, and Recharts-capable stack without arbitrary packages. | PASS | Canonical `package.json`/lock hash retained, dependency allowlist PASS, React/TypeScript/Lucide imports in `src/App.tsx`, Tailwind directives in `src/index.css`, and bundled source primitives/chart support remain present. |
| **AC-1, AC-4:** The application is frontend-only and has no backend services, databases, Docker, authentication infrastructure, external infrastructure, external data, runtime fetch, or external API requirement. | PASS | `../evidence.md` prohibited dependency/source scan and local simulated-domain marker both PASS. |

## Mock-data quality

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-1, AC-5:** Simulated data uses realistic domain-specific names, values, statuses, and timestamps with coherent relationships and useful variation. | PASS | `src/App.tsx:73-221` defines eight named accounts across regions, tiers and health states with coherent spend, orders, invoices, notes, and dated activities. |
| Placeholder prose, lorem ipsum, generic numbered identities, arbitrary metrics, and repeated filler values are absent. | PASS | Source review of `src/App.tsx:73-221` found domain-specific names and account narratives; displayed summaries derive from the local customer records at `536-540`. |

## Build success

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-1, AC-6:** A locked clean copy installs and `npm run build` succeeds. | PASS | `../evidence.md`: clean inventory `22603a...92eb5`, unchanged lock `ea6516...02a7`, install exit 0, build exit 0, and proved `dist/index.html`. |

## Runtime startup

| Check | Outcome | Required evidence |
| --- | --- | --- |
| **AC-1, AC-6:** `npm run dev -- --host 0.0.0.0 --port <PORT>` starts on an assigned port and serves browser-loadable HTML. | PASS | `../evidence.md`: exact command on port 33709, HTTP 200, `text/html`, customer marker, owned process cleanup, and released-port proof all PASS. |
