# ADR-260812-foundation-stack: Sparkta Foundation Stack

## Status

Accepted

## Context

Sparkta has product requirements and delivery workflow material but no application package manifest, source, tests, or JavaScript toolchain. The foundation must support rapid local UI prototyping, provide a reproducible clean-checkout workflow, and remain small enough that Prototype 0 and the generated-application starter stay owned by later issues. The configured development environment currently provides neither Node.js nor npm.

## Decision

Use Node.js 24 LTS and strict TypeScript for application code. Organize the repository as a private npm-workspace monorepo with minimal `apps/web` and `apps/server` workspaces. Use React with Vite for the web foundation, Fastify for the local server foundation, and Vitest for workspace tests. Use ESLint and Prettier for static standards, commit one root `package-lock.json`, and provision Node.js 24 plus the existing `just` runner in the devcontainer.

The web and server workspaces establish only buildable, runnable package boundaries and bootstrap entry points. They do not implement the Sparkta control UI, Prototype 0 behavior, agent integration, generated-app lifecycle, or the blessed generated-app starter.

## Alternatives

What other options were considered? Why were they rejected?

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Use pnpm workspaces | Efficient dependency storage and strong workspace support | Adds an unapproved package manager and another provisioned tool | npm workspaces are explicitly approved and sufficient for the initial package graph |
| Use one root package | Smallest initial file count | Blurs browser and server boundaries and complicates independent builds | Separate web and server runtimes are already part of the approved foundation |
| Scaffold the full PRD package graph and generated-app starter | Pre-creates future product boundaries | Implements or constrains child-issue scope before feasibility work | Bootstrap must remain foundational and leave Prototype 0 to its ordered child issues |
| Use Jest or Node test runner | Familiar alternatives | Diverges from the approved test runner | Vitest is explicitly approved and integrates with Vite and TypeScript |

## Consequences

What becomes easier or harder as a result of this decision?

### Positive
- One lockfile and npm workspace commands provide a reproducible operating surface.
- Browser and server code can evolve independently while sharing one repository lifecycle.
- Vite and Vitest share TypeScript-friendly tooling.
- Devcontainer provisioning closes the current Node.js and npm availability gap.

### Negative
- The repository carries separate workspace configuration before product behavior exists.
- Node.js major-version upgrades require coordinated devcontainer, engine, and documentation changes.
- ESLint, Prettier, and Vitest add bootstrap dependencies.

### Neutral
- Additional packages are introduced only when later issues establish concrete boundaries.
- The generated-application stack remains a separate future decision and artifact.

## Related Issues

- [#1](https://github.com/jsburckhardt/sparkta/issues/1)
- [#4](https://github.com/jsburckhardt/sparkta/issues/4)

## References

- [Sparkta PRD](../../../PRD.md)
- [Project Command Interface](../core-components/CORE-COMPONENT-260806-project-command-interface.md)
- [Issue 1 research brief](../../work-items/1-bootstrap-sparkta-and-coordinate-prototype-0/research/00-research.md)
