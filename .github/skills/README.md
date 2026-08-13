# Repository skills

GitHub Copilot discovers committed skills locally without a machine-global skill directory or temporary installer source.

## Engineering harness skills

Exactly these engineering-harness skills are allowed under `.agents/skills/`:

- [`eng-harness-0-harnessability-assessment`](../../.agents/skills/eng-harness-0-harnessability-assessment/SKILL.md)
- [`eng-harness-flow`](../../.agents/skills/eng-harness-flow/SKILL.md)
- [`grill-agent-done`](../../.agents/skills/grill-agent-done/SKILL.md)

[`.harness/skills.lock.json`](../../.harness/skills.lock.json) records project-scope packaged-source provenance only; it does not authorize additional skill names. Cold agents use these committed entry points directly. Do not rerun broad skill installation when it would restore entries outside this allowlist.

Start engineering-harness work with `harness instructions`, [the governance contract](../../.harness/engineering-harness.md), and the `eng-harness-flow` skill for RPIV seam hooks.

## Separately governed Soft Factory skill

- [`soft-factory`](../../.agents/skills/soft-factory/SKILL.md) — official Runner protocol-1 operation skill governed by the Soft Factory Runner component.

This is the only fourth `.agents/skills/` directory. Install or upgrade it only through the root Runner asset recipe; the engineering-harness allowlist remains exactly the three names above.

## Agnostic Prompt Standard skill

- [`agnostic-prompt-standard`](agnostic-prompt-standard/SKILL.md) — APS v1.2.2 reference and authoring guidance.
