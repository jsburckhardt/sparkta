import { describe, expect, it } from "vitest";

import { getFoundationMessage } from "./foundation";

describe("getFoundationMessage", () => {
  it("identifies the Sparkta bootstrap without exposing feature behavior", () => {
    expect(getFoundationMessage()).toBe(
      "Sparkta is ready for rapid UI prototyping foundation work.",
    );
  });
});
