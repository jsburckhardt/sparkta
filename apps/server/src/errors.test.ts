import { describe, expect, it } from "vitest";

import { ApplicationError, normalizeError, translateError } from "./errors.js";

describe("ApplicationError", () => {
  it("preserves the lower-level cause", () => {
    const cause = new Error("disk unavailable");
    const error = new ApplicationError({
      cause,
      code: "FOUNDATION_UNAVAILABLE",
      message: "The Sparkta foundation is unavailable.",
      statusCode: 503,
    });

    expect(error.cause).toBe(cause);
  });
});

describe("normalizeError", () => {
  it("normalizes unknown thrown values and retains them as causes", () => {
    const thrownValue = { secret: "internal value" };
    const error = normalizeError(thrownValue);

    expect(error).toBeInstanceOf(Error);
    expect(error.cause).toBe(thrownValue);
  });
});

describe("translateError", () => {
  it("returns stable known-error fields and explicitly safe context", () => {
    const translated = translateError(
      new ApplicationError({
        code: "FOUNDATION_UNAVAILABLE",
        message: "The Sparkta foundation is unavailable.",
        safeContext: { retryable: true },
        statusCode: 503,
      }),
    );

    expect(translated).toMatchObject({
      body: {
        error: {
          code: "FOUNDATION_UNAVAILABLE",
          context: { retryable: true },
          message: "The Sparkta foundation is unavailable.",
        },
      },
      expected: true,
      statusCode: 503,
    });
  });

  it("redacts unknown failure details from the response", () => {
    const translated = translateError(new Error("secret path: /private/workspace"));

    expect(translated.body).toEqual({
      error: {
        code: "INTERNAL_ERROR",
        message: "An internal error occurred.",
      },
    });
    expect(JSON.stringify(translated.body)).not.toContain("/private/workspace");
    expect(translated.statusCode).toBe(500);
  });
});
