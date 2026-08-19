# Generated frontend quality checklist

Evaluate every row independently. Record `PASS` or `FAIL` and replace each evidence prompt with an inspectable source path, rendered behavior, command output, or runtime artifact. `N/A` is allowed only for the two explicitly conditional interaction/state rows and requires a request-specific rationale. Stack adherence, build success, and runtime startup are mandatory. Do not calculate an aggregate score.

## Design quality

| Check                                                                                                                                                                                                                                            | Outcome     | Required evidence                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| **AC-5:** The rendered interface avoids giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace.                            | PASS | Bounded source and responsive CSS review: restrained neutral palette, no giant gradient, limited panels/radii/shadows, purposeful metrics, and no generic hero; no screenshot claim. |
| **AC-5:** The rendered interface demonstrates clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content appropriate to its domain. | PASS | App.tsx and index.css show clear hierarchy, dense work areas, coherent spacing/type scales, subtle hover/focus states, useful navigation, responsive breakpoints, and realistic domain content. |

## Instruction quality

| Check                                                                                                                                                                                                   | Outcome                          | Required evidence                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1:** The implementation follows `AGENTS.md` and delivers a frontend-only prototype with domain-specific simulated data and independently runnable output.                                          | PASS | Copied AGENTS.md; App.tsx and index.css implement a standalone local-data engineering dashboard. |
| **AC-2:** Requested or contextually relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes behave plausibly; irrelevant controls were not added for catalogue coverage. | PASS | Evidence control table traces team/period filters, search, sorting, and navigation to visible state; irrelevant catalogue controls were omitted. |
| **AC-3:** Applicable loading, empty, error, success, disabled, hover, and selected states are represented and understandable.                                                                           | PASS | Empty repository result, selected navigation, hover/focus states are present; loading/error/success/disabled are not applicable to this synchronous read-only dashboard. |
| **AC-4:** The implementation obeys the instruction prohibitions against services and external requirements.                                                                                             | PASS | Frontend-only scan PASS in evidence.md; no service, fetch, external data, or infrastructure requirement. |

## Stack adherence

| Check                                                                                                                                                                                                               | Outcome     | Required evidence                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| **AC-4:** The application uses the bundled React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style, and Recharts-capable stack without arbitrary packages.                                         | PASS | package.json and lockfile match the canonical blessed dependency sets; App.tsx uses React, Lucide, Recharts, and source-owned styling. |
| **AC-1, AC-4:** The application is frontend-only and has no backend services, databases, Docker, authentication infrastructure, external infrastructure, external data, runtime fetch, or external API requirement. | PASS | Dependency and source audit PASS in evidence.md; no prohibited requirement. |

## Mock-data quality

| Check                                                                                                                                                   | Outcome     | Required evidence                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| **AC-1, AC-5:** Simulated data uses realistic domain-specific names, values, statuses, and timestamps with coherent relationships and useful variation. | PASS | App.tsx:48-81 contains coherent named repositories, teams, languages, statuses, weekly values, and trend relationships. |
| Placeholder prose, lorem ipsum, generic numbered identities, arbitrary metrics, and repeated filler values are absent.                                  | PASS | Source review found no lorem ipsum, generic numbered identities, placeholder prose, or repeated filler. |

## Build success

| Check                                                                      | Outcome     | Required evidence                                                                                        |
| -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** A locked clean copy installs and `npm run build` succeeds. | PASS | evidence.md records locked install, unchanged lock hash, successful build, and temporary dist/index.html. |

## Runtime startup

| Check                                                                                                                      | Outcome     | Required evidence                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** `npm run dev -- --host 0.0.0.0 --port <PORT>` starts on an assigned port and serves browser-loadable HTML. | PASS | evidence.md records assigned port 36583, HTTP 200 text/html, trial marker, owned cleanup, and released port. |
