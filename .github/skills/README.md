# Repository skills

GitHub Copilot discovers committed skills locally without a machine-global skill directory or temporary installer source.

## Engineering harness skills

The ambient harness 0.13.0 packaged source installed this complete repository-local set under `.agents/skills/`:

- [`builder`](../../.agents/skills/builder/SKILL.md)
- [`eng-harness-0-harnessability-assessment`](../../.agents/skills/eng-harness-0-harnessability-assessment/SKILL.md)
- [`eng-harness-flow`](../../.agents/skills/eng-harness-flow/SKILL.md)
- [`eng-harness-in-a-box`](../../.agents/skills/eng-harness-in-a-box/SKILL.md)
- [`grill-agent-done`](../../.agents/skills/grill-agent-done/SKILL.md)
- [`plan-0-v2-constitution`](../../.agents/skills/plan-0-v2-constitution/SKILL.md)
- [`plan-v2-extract-domain`](../../.agents/skills/plan-v2-extract-domain/SKILL.md)
- [`the-flow`](../../.agents/skills/the-flow/SKILL.md)
- [`validate-v2`](../../.agents/skills/validate-v2/SKILL.md)

[`.harness/skills.lock.json`](../../.harness/skills.lock.json) is the canonical project-scope `github-copilot` and `packaged` declaration. Cold agents use these committed entry points directly; they do not rerun installation and do not depend on extraction paths or repository npm state.

Start engineering-harness work with `harness instructions`, [the governance contract](../../.harness/engineering-harness.md), and the `eng-harness-flow` skill for RPIV seam hooks.

## Agnostic Prompt Standard skill

- [`agnostic-prompt-standard`](agnostic-prompt-standard/SKILL.md) — APS v1.2.2 reference and authoring guidance.
