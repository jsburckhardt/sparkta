# Generated frontend quality checklist

Evaluate every row independently. Record `PASS` or `FAIL` and replace each evidence prompt with an inspectable source path, rendered behavior, command output, or runtime artifact. `N/A` is allowed only for the two explicitly conditional interaction/state rows and requires a request-specific rationale. Stack adherence, build success, and runtime startup are mandatory. Do not calculate an aggregate score.

## Design quality

| Check                                                                                                                                                                                                                                            | Outcome     | Required evidence                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| **AC-5:** The rendered interface avoids giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace.                            | PASS / FAIL | Viewport(s) reviewed and concise observations for each prohibited pattern.                |
| **AC-5:** The rendered interface demonstrates clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content appropriate to its domain. | PASS / FAIL | Viewport(s), responsive widths, and concise observations using every named quality trait. |

## Instruction quality

| Check                                                                                                                                                                                                   | Outcome                          | Required evidence                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1:** The implementation follows `AGENTS.md` and delivers a frontend-only prototype with domain-specific simulated data and independently runnable output.                                          | PASS / FAIL                      | Instruction path plus generated source paths demonstrating compliance.                                                                                   |
| **AC-2:** Requested or contextually relevant navigation, filters, search, sorting, tabs, dialogs, forms, and state changes behave plausibly; irrelevant controls were not added for catalogue coverage. | PASS / FAIL / N/A with rationale | Rendered behavior and source path for each relevant interaction, or a request-specific rationale naming why the interaction catalogue is not applicable. |
| **AC-3:** Applicable loading, empty, error, success, disabled, hover, and selected states are represented and understandable.                                                                           | PASS / FAIL / N/A with rationale | Rendered state and source path for each applicable state, or a request-specific rationale naming why the state catalogue is not applicable.              |
| **AC-4:** The implementation obeys the instruction prohibitions against services and external requirements.                                                                                             | PASS / FAIL                      | Relevant source/dependency inspection and any isolation output.                                                                                          |

## Stack adherence

| Check                                                                                                                                                                                                               | Outcome     | Required evidence                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| **AC-4:** The application uses the bundled React, strict TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style, and Recharts-capable stack without arbitrary packages.                                         | PASS / FAIL | `package.json`, lockfile, and source import paths.         |
| **AC-1, AC-4:** The application is frontend-only and has no backend services, databases, Docker, authentication infrastructure, external infrastructure, external data, runtime fetch, or external API requirement. | PASS / FAIL | Dependency and source scan output; this row cannot be N/A. |

## Mock-data quality

| Check                                                                                                                                                   | Outcome     | Required evidence                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| **AC-1, AC-5:** Simulated data uses realistic domain-specific names, values, statuses, and timestamps with coherent relationships and useful variation. | PASS / FAIL | Fixture or source paths and representative rendered values. |
| Placeholder prose, lorem ipsum, generic numbered identities, arbitrary metrics, and repeated filler values are absent.                                  | PASS / FAIL | Source search output and inspected mock-data paths.         |

## Build success

| Check                                                                      | Outcome     | Required evidence                                                                                        |
| -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** A locked clean copy installs and `npm run build` succeeds. | PASS / FAIL | Command output, clean-copy path, lockfile checksum, and built `dist/index.html`; this row cannot be N/A. |

## Runtime startup

| Check                                                                                                                      | Outcome     | Required evidence                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1, AC-6:** `npm run dev -- --host 0.0.0.0 --port <PORT>` starts on an assigned port and serves browser-loadable HTML. | PASS / FAIL | Exact command, assigned port, HTTP 200, `text/html`, expected page marker, owned process cleanup, and released-port proof; this row cannot be N/A. |
