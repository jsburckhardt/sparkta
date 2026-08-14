# Repository skills

GitHub Copilot discovers committed skills locally without a machine-global skill directory or temporary installer source.

## Engineering harness skills

Engineering-harness validation checks these non-empty skill entry points under `.agents/skills/`:

- [`eng-harness-0-harnessability-assessment`](../../.agents/skills/eng-harness-0-harnessability-assessment/SKILL.md)
- [`eng-harness-flow`](../../.agents/skills/eng-harness-flow/SKILL.md)
- [`grill-agent-done`](../../.agents/skills/grill-agent-done/SKILL.md)

[`.harness/skills.lock.json`](../../.harness/skills.lock.json) records project-scope packaged-source provenance only; it does not authorize additional engineering-harness names. Cold agents use these committed entry points directly. Do not rerun broad skill installation when it would restore excluded engineering-harness entries.

Start engineering-harness work with `harness instructions`, [the governance contract](../../.harness/engineering-harness.md), and the `eng-harness-flow` skill for RPIV seam hooks.

## Runner dispatcher

Soft Factory uses the user- and model-invocable [`runner-dispatcher`](../agents/runner-dispatcher.agent.md) APS v1.2.2 VS Code agent. It is not a skill and does not expand the three-skill engineering-harness inventory.

## Agnostic Prompt Standard skill

- [`agnostic-prompt-standard`](agnostic-prompt-standard/SKILL.md) — APS v1.2.2 reference and authoring guidance.
