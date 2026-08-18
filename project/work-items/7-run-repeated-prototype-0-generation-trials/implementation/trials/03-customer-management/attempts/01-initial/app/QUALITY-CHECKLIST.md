# Generated frontend quality checklist

Evaluate every row independently. Record `PASS` or `FAIL` and replace each evidence prompt with an inspectable source path, rendered behavior, command output, or runtime artifact. `N/A` is allowed only for the two explicitly conditional interaction/state rows and requires a request-specific rationale. Stack adherence, build success, and runtime startup are mandatory. Do not calculate an aggregate score.

## Design quality

| Check                                                                                                                                                                                                                                            | Outcome     | Required evidence                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| **AC-5:** The rendered interface avoids giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace.                            | FAIL | Generation timed out; no completed visual or responsive review is claimed. |
| **AC-5:** The rendered interface demonstrates clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content appropriate to its domain. | FAIL | Generation timed out; hierarchy and responsive quality are not accepted from a partial result. |

## Instruction quality

| Check                                                                                                                                                                                                   | Outcome                          | Required evidence                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1:** The implementation follows `AGENTS.md` and delivers a frontend-only prototype with domain-specific simulated data and independently runnable output.                                          | FAIL | Agent result is TIMEOUT, so independently runnable completion is unproved. |
| **AC-2:** Requested or contextually relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes behave plausibly; irrelevant controls were not added for catalogue coverage. | FAIL | Partial source contains controls, but the timed-out result received no operational/source-backed acceptance review. |
| **AC-3:** Applicable loading, empty, error, success, disabled, hover, and selected states are represented and understandable.                                                                           | FAIL | Applicable states are not accepted from an incomplete timed-out result. |
| **AC-4:** The implementation obeys the instruction prohibitions against services and external requirements.                                                                                             | FAIL | Frontend-only completion audit was blocked by generation TIMEOUT. |

## Stack adherence

| Check                                                                                                                                                                                                               | Outcome     | Required evidence                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| **AC-4:** The application uses the bundled React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style, and Recharts-capable stack without arbitrary packages.                                         | FAIL | Locked dependency and completed stack adherence were not validated after TIMEOUT. |
| **AC-1, AC-4:** The application is frontend-only and has no backend services, databases, Docker, authentication infrastructure, external infrastructure, external data, runtime fetch, or external API requirement. | FAIL | No complete frontend-only validation was run after TIMEOUT. |

## Mock-data quality

| Check                                                                                                                                                   | Outcome     | Required evidence                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| **AC-1, AC-5:** Simulated data uses realistic domain-specific names, values, statuses, and timestamps with coherent relationships and useful variation. | FAIL | Partial fixture source exists, but coherent completed mock-data behavior was not validated. |
| Placeholder prose, lorem ipsum, generic numbered identities, arbitrary metrics, and repeated filler values are absent.                                  | FAIL | Placeholder and filler audit was not completed after TIMEOUT. |

## Build success

| Check                                                                      | Outcome     | Required evidence                                                                                        |
| -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** A locked clean copy installs and `npm run build` succeeds. | FAIL | Locked install and build were skipped because generation timed out. |

## Runtime startup

| Check                                                                                                                      | Outcome     | Required evidence                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** `npm run dev -- --host 0.0.0.0 --port <PORT>` starts on an assigned port and serves browser-loadable HTML. | FAIL | Runtime startup and HTTP load were skipped because generation timed out. |
