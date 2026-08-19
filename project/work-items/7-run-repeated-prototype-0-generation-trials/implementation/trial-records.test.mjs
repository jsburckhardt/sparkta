import { describe, expect, it } from "vitest";

import {
  adoptedTrialIds,
  boundedDurableOutput,
  normalizeDurableText,
  trailingWhitespaceLines,
} from "./trial-records.mjs";

describe("durable trial result records", () => {
  it("removes only trailing horizontal whitespace from raw output", () => {
    const raw = "**Issue:** #7  \ninternal  spacing\tstays\t  \nnext\r\n";

    expect(normalizeDurableText(raw)).toBe("**Issue:** #7\ninternal  spacing\tstays\nnext\r\n");
  });

  it("normalizes after bounding so truncation cannot leave trailing whitespace", () => {
    expect(boundedDurableOutput("value    more", 8)).toBe("value");
  });

  it("extracts affected trials only from adopted finding sections", () => {
    const findings = `## Finding F-1\n\n- Disposition: ADOPTED\n- Affected Trials: \`03-customer-management\`\n\n## Finding F-2\n\n- Disposition: PROPOSED\n- Affected Trials: \`01-engineering-productivity\``;

    expect([...adoptedTrialIds(findings)]).toEqual(["03-customer-management"]);
  });

  it("reports exact offending lines for negative evidence", () => {
    expect(trailingWhitespaceLines("clean\nbad  \nalso-bad\t\nclean")).toEqual([2, 3]);
    expect(trailingWhitespaceLines(normalizeDurableText("clean\nbad  \n"))).toEqual([]);
  });
});
