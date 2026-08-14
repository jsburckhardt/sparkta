# Repository skills

GitHub Copilot discovers committed skills locally without a machine-global skill directory or temporary installer source.

## Engineering harness skills

Engineering-harness validation checks these non-empty skill entry points under `.agents/skills/`:

- [`eng-harness-0-harnessability-assessment`](../../.agents/skills/eng-harness-0-harnessability-assessment/SKILL.md)
- [`eng-harness-flow`](../../.agents/skills/eng-harness-flow/SKILL.md)
- [`grill-agent-done`](../../.agents/skills/grill-agent-done/SKILL.md)

[`.harness/skills.lock.json`](../../.harness/skills.lock.json) records project-scope packaged-source provenance only; it does not authorize additional engineering-harness names. Cold agents use these committed entry points directly. Validation ignores and preserves unrelated sibling skill directories. Do not rerun broad skill installation when it would restore excluded engineering-harness entries.

Start engineering-harness work with `harness instructions`, [the governance contract](../../.harness/engineering-harness.md), and the `eng-harness-flow` skill for RPIV seam hooks.

## Separately governed Soft Factory skill

- [`soft-factory`](../../.agents/skills/soft-factory/SKILL.md) — official Runner protocol-1 operation skill governed by the Soft Factory Runner component.

Install or upgrade this package-owned asset only through Runner directly. Engineering-harness validation does not enumerate, inspect, require, or modify it.

## Agnostic Prompt Standard skill

- [`agnostic-prompt-standard`](agnostic-prompt-standard/SKILL.md) — APS v1.2.2 reference and authoring guidance.
