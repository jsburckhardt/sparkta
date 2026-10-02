# ADR-261002-node-react-vite-toolchain: Node React Vite Toolchain

## Status

Accepted

## Context

Sparkta needs a browser UI development foundation that works locally in devcontainers and GitHub Codespaces, supports rapid prototyping, and gives RPIV agents deterministic automated validation. Bootstrap must establish the foundation without implementing product behavior.

## Decision

Use Node.js 24 and pnpm for the project runtime and dependency management. Build the frontend with React, strict TypeScript, and Vite, with Tailwind CSS for styling. Use Vitest for automated tests, ESLint for static analysis, Prettier for formatting, and the root justfile as the operating interface.

The scaffold is intentionally limited to a startup screen and foundation test. Product capabilities, including real GitHub Copilot CLI generation, require reviewed issue-level architecture and delivery.

## Alternatives

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Next.js | Integrated application framework | Adds server and routing decisions before product requirements are planned | Exceeds the approved frontend foundation |
| Plain JavaScript | Less configuration | Gives weaker contracts for agent-authored changes | Strict TypeScript was explicitly selected |
| npm as project package manager | Bundled with Node.js | Less strict dependency workflow than the selected pnpm setup | pnpm was explicitly selected |

## Consequences

### Positive
- Fast local development and production builds use a mainstream React toolchain.
- Strict types, linting, formatting, and deterministic tests are available from initialization.
- The dependency graph is reproducible through the committed pnpm lockfile.

### Negative
- Node.js 24 and pnpm are required for application development.
- Product runtime boundaries remain to be designed through reviewed issues.

### Neutral
- The toolchain does not select a persistence engine, session manager, process scheduler, or backend.

## Related Issues

- None; created from the explicitly approved project bootstrap.

## References

- [Vite documentation](https://vite.dev/)
- [React documentation](https://react.dev/)
- [Tailwind CSS documentation](https://tailwindcss.com/)
