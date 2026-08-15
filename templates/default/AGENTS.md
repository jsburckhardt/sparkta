# Starter agent guidance

This directory is a complete standalone generated-frontend boundary.

- Use the dependencies already bundled in `package.json`: React, TypeScript, Vite, Tailwind CSS, Lucide, Radix/shadcn-style source components and utilities, and Recharts when charts are needed.
- Do **not** install arbitrary packages. A dependency may be added only after an explicitly adopted architecture change adds it to the approved allowlist.
- Keep the application frontend-only. Use local source, fixtures, or mock data; do not add a backend, database, authentication, external infrastructure, runtime fetch, or external data requirement.
- Preserve the direct contracts `npm run build` and `npm run dev -- --host 0.0.0.0 --port <PORT>`.
- Extend source-owned primitives under `src/components/ui/` before inventing another component system.
