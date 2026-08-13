import { randomUUID } from "node:crypto";

import Fastify, { type FastifyInstance } from "fastify";

import { translateError } from "./errors.js";
import { createOperationalEvent, loggerOptions } from "./logger.js";

export interface CreateServerOptions {
  logger?: boolean;
}

export const createServer = (options: CreateServerOptions = {}): FastifyInstance => {
  const server = Fastify({
    genReqId: (request) => {
      const requestId = request.headers["x-request-id"];
      return typeof requestId === "string" ? requestId : randomUUID();
    },
    logger: options.logger === false ? false : loggerOptions,
  });

  server.get("/api/readiness", async () => ({
    foundation: "sparkta-server",
    status: "ready",
  }));

  server.setErrorHandler((value, request, reply) => {
    const translated = translateError(value);
    const event = createOperationalEvent({
      event: "request.failed",
      operation: `${request.method} ${request.routeOptions.url}`,
      outcome: "failure",
      requestId: request.id,
    });

    if (translated.expected) {
      request.log.warn(event, "Sparkta request rejected");
    } else {
      request.log.error({ ...event, err: translated.error }, "Sparkta request failed");
    }

    void reply.status(translated.statusCode).send(translated.body);
  });

  return server;
};
