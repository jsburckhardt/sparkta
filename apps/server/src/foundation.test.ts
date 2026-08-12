import { describe, expect, it } from "vitest";

import { getServerIdentity } from "./foundation.js";

describe("getServerIdentity", () => {
  it("exposes only the minimal Sparkta foundation identity", () => {
    expect(getServerIdentity()).toEqual({ name: "Sparkta", stage: "foundation" });
  });
});
