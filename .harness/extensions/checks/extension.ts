import { defineExtension, type V2VerbContext } from "@ai-substrate/engineering-harness/contract";

const OUTPUT_LIMIT = 8_000;

function tail(value: string): string {
  return value.length <= OUTPUT_LIMIT ? value : value.slice(-OUTPUT_LIMIT);
}

async function delegate(
  ctx: V2VerbContext,
  recipe: "verify" | "verify-focused",
  target?: string,
) {
  const args = target === undefined ? [recipe] : [recipe, target];
  const delegatedCommand = ["just", ...args].join(" ");
  const startedAt = Date.now();
  const result = await ctx.exec("just", args, { timeoutMs: 900_000 });
  const durationMs = Date.now() - startedAt;
  const output = {
    delegated_command: delegatedCommand,
    argv: args,
    exit_code: result.code,
    duration_ms: durationMs,
    stdout: tail(result.stdout),
    stderr: tail(result.stderr),
  };

  return result.ok
    ? ctx.ok(output, {
        evidence: [{ label: "bounded delegated command output", none: true }],
      })
    : ctx.error("E_CHECKS_FAILED", delegatedCommand + " failed (exit " + result.code + ")", {
        details: output,
        next_action: "Fix the authoritative root recipe failure, then rerun this harness check.",
      });
}

export default defineExtension({
  name: "checks",
  summary: "Delegates focused and full validation to the authoritative root just recipes.",
  verbs: {
    checks: {
      summary: "Runs the full authoritative root validation by default.",
      async run(ctx) {
        return delegate(ctx, "verify");
      },
      sub: {
        focused: {
          summary: "Delegates to just verify-focused with an optional single target.",
          args: [
            {
              name: "[target]",
              description: "Optional test target forwarded as exactly one argument.",
            },
          ],
          async run(ctx) {
            const target = ctx.args.target;
            return delegate(ctx, "verify-focused", typeof target === "string" ? target : undefined);
          },
        },
        full: {
          summary: "Delegates to just verify.",
          async run(ctx) {
            return delegate(ctx, "verify");
          },
        },
      },
    },
  },
});
