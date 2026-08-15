# ADR-260815-blessed-frontend-starter: Blessed Frontend Starter Architecture

## Status

Accepted

## Context

Prototype 0 needs a known-good generated-application starting point, but the repository contains only the Sparkta web/server foundation. The starter must make the approved frontend stack available, copy cleanly, run without Sparkta services, and remain reproducible without becoming another package in the Sparkta application workspace. The existing architecture deliberately leaves the generated-application stack and its lockfile boundary to this issue.

## Decision

Store the canonical starter at `templates/default/` as a repository-owned, independently installable frontend package. Keep it outside the root npm workspace graph and give it its own package manifest and lockfile so copying that directory yields a complete deterministic application boundary.

Use React, strict TypeScript, Vite, Tailwind CSS, Lucide icons, Radix primitives, shadcn-style source-owned components and utilities, and a bundled Recharts dependency. A clean starter need not render a chart, but copied applications can use Recharts without installing another package. Keep the starter frontend-only and self-contained with local or mock data.

The starter must expose the direct generated-application contracts `npm run build` and `npm run dev -- --host 0.0.0.0 --port <PORT>`. Root `justfile` validation must copy the starter to a temporary directory, install from its lockfile, build it, start it on an assigned port, and prove its page is browser-loadable.

## Alternatives

| Alternative                              | Pros                             | Cons                                                                                              | Why Rejected                                                                               |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Reuse `apps/web` as the starter          | Avoids another package           | Couples generated apps to the Sparkta control foundation and server-oriented root commands        | The foundation ADR explicitly separates `apps/web` from the generated-application artifact |
| Add the starter as a root npm workspace  | One workspace graph and lockfile | A copied directory would lose root lockfile ownership and would not be independently reproducible | Clean copies must install and run on their own                                             |
| Generate from an empty directory         | Minimal repository footprint     | Repeats setup work and creates dependency and runtime variance                                    | The PRD requires a known-good starter                                                      |
| Omit Recharts until a chart is requested | Smaller initial dependency graph | Requires arbitrary installation during generation                                                 | Chart support must be bundled and available where needed                                   |

## Consequences

### Positive

- A single copied directory has deterministic dependencies and direct build/runtime contracts.
- Agents can focus on UI behavior instead of framework and package selection.
- Starter validation does not require the Sparkta server or root workspace installation.

### Negative

- The repository maintains a second lockfile for the intentionally independent generated-app boundary.
- Bundled chart and component dependencies increase starter installation size even when unused.
- Dependency upgrades require validating both the root foundation and the standalone starter.

### Neutral

- `.sparkta/apps/` remains the destination for future durable generated copies; the canonical template remains under `templates/default/`.
- The starter page demonstrates the component and styling baseline but is not a generated product demo.

## Related Issues

- [#5](https://github.com/jsburckhardt/sparkta/issues/5)
- [#4](https://github.com/jsburckhardt/sparkta/issues/4)

## References

- [Sparkta PRD](../../../PRD.md)
- [Sparkta Foundation Stack](ADR-260812-foundation-stack.md)
- [Filesystem State Boundary](ADR-260812-filesystem-state-boundary.md)
