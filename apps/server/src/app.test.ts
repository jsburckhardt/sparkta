import { afterEach, describe, expect, it } from "vitest";

import { createServer } from "./app.js";
import { ApplicationError } from "./errors.js";

const servers: ReturnType<typeof createServer>[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(async (server) => server.close()));
});

describe("createServer readiness", () => {
  it("reports the stable non-sensitive server foundation verdict", async () => {
    const server = createServer({ logger: false });
    servers.push(server);

    const response = await server.inject({
      headers: { "x-request-id": "readiness-test" },
      method: "GET",
      url: "/api/readiness",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      foundation: "sparkta-server",
      status: "ready",
    });
    expect(Object.keys(response.json())).toEqual(["foundation", "status"]);
    expect(response.body).not.toMatch(
      /pid|path|environment|stack|secret|prompt|source|process|request-id/i,
    );
  });
});

describe("createServer error boundary", () => {
  it("translates a known error once into its safe response", async () => {
    const server = createServer({ logger: false });
    servers.push(server);
    server.get("/known", async () => {
      throw new ApplicationError({
        code: "FOUNDATION_UNAVAILABLE",
        message: "The Sparkta foundation is unavailable.",
        statusCode: 503,
      });
    });

    const response = await server.inject({ method: "GET", url: "/known" });

    expect(response.statusCode).toBe(503);
    expect(response.json()).toEqual({
      error: {
        code: "FOUNDATION_UNAVAILABLE",
        message: "The Sparkta foundation is unavailable.",
      },
    });
  });

  it("does not expose unknown error details at the HTTP boundary", async () => {
    const server = createServer({ logger: false });
    servers.push(server);
    server.get("/unknown", async () => {
      throw new Error("secret path: /private/workspace");
    });

    const response = await server.inject({ method: "GET", url: "/unknown" });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      error: { code: "INTERNAL_ERROR", message: "An internal error occurred." },
    });
    expect(response.body).not.toContain("/private/workspace");
  });
});
