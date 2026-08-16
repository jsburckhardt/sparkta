# Starter agent guidance

This directory is a complete standalone generated-frontend boundary.

## Stack and standalone boundary

- Build a **frontend-only** prototype with domain-specific simulated data held in local source, fixtures, or mock-data modules.
- Use the dependencies already bundled in `package.json`: React, TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style source components and utilities, and Recharts when charts are needed.
- Do **not** install arbitrary packages. A dependency may be added only after an explicitly adopted architecture change adds it to the approved allowlist.
- Preserve the independently runnable contracts `npm run build` and `npm run dev -- --host 0.0.0.0 --port <PORT>`.
- Extend source-owned primitives under `src/components/ui/` before inventing another component system.

Do **not** add or require backend services, databases, Docker, authentication infrastructure, external infrastructure, external data, runtime fetches, or external APIs. The copied frontend must install, build, start, and demonstrate its complete experience without any of them.

## Interaction and state behavior

Implement plausible behavior for **navigation, filters, search, sorting, tabs, dialogs, forms, and state changes** when each is requested or contextually relevant. Controls must affect visible data or workflow state rather than act as decoration. Do not add irrelevant controls solely to satisfy this catalogue.

Represent **loading, empty, error, success, disabled, hover, and selected states** where each is applicable to the requested experience. Make state transitions understandable and preserve useful recovery paths. Do not invent inapplicable states solely to satisfy this catalogue.

## Simulated data

Use realistic domain-specific names, values, statuses, and timestamps. Keep relationships and totals internally coherent, provide enough variation to exercise relevant behavior and states, and use concise content that resembles the requested product. Avoid placeholder prose, lorem ipsum, generic numbered identities such as "User 1" or "Project 2", arbitrary metrics, and repeated filler values.

## Visual quality

Avoid stereotypical AI-interface patterns: **giant gradients, card-enclosing every element, huge radii, excessive shadows, meaningless statistics, random purple accents, generic hero sections, and excessive whitespace**.

Build an interface with **clear hierarchy, purposeful density, coherent spacing, strong typography, subtle interaction, useful information architecture, responsive layout, and realistic content** appropriate to the requested domain. Use emphasis intentionally, align related content, keep controls visually subordinate to the work they enable, and verify the layout remains legible at narrow and wide viewport sizes. These qualities require contextual review; satisfying a vocabulary check alone does not establish visual quality.
