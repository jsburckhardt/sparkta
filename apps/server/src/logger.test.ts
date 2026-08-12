import { Writable } from "node:stream";

import pino from "pino";
import { describe, expect, it } from "vitest";

import { createOperationalEvent, loggerOptions } from "./logger.js";

describe("createOperationalEvent", () => {
  it("provides stable event, operation, outcome, and correlation fields", () => {
    expect(
      createOperationalEvent({
        appId: "foundation-app",
        event: "foundation.checked",
        operation: "foundation.check",
        outcome: "success",
        requestId: "request-1",
      }),
    ).toEqual({
      appId: "foundation-app",
      event: "foundation.checked",
      operation: "foundation.check",
      outcome: "success",
      requestId: "request-1",
    });
  });
});

describe("loggerOptions", () => {
  it("redacts sensitive operational fields", async () => {
    const chunks: string[] = [];
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk.toString());
        callback();
      },
    });
    const logger = pino(loggerOptions, stream);

    logger.info({
      authorization: "Bearer top-secret",
      conversation: "private conversation",
      cookie: "session=private",
      generatedSource: "private source",
      prompt: "private prompt",
      safe: "visible",
      token: "private token",
    });

    await new Promise<void>((resolve) => setImmediate(resolve));
    const record = chunks.join("");

    expect(record).toContain("visible");
    expect(record).toContain("[Redacted]");
    expect(record).not.toContain("top-secret");
    expect(record).not.toContain("private prompt");
    expect(record).not.toContain("private source");
    expect(record).not.toContain("private token");
    expect(record).not.toContain("private conversation");
  });
});
