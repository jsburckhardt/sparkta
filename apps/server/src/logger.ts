import type { LoggerOptions } from "pino";

export const loggerOptions: LoggerOptions = {
  base: { service: "sparkta-server" },
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    censor: "[Redacted]",
    paths: [
      "authorization",
      "cookie",
      "token",
      "secret",
      "prompt",
      "conversation",
      "source",
      "generatedSource",
      "req.headers.authorization",
      "req.headers.cookie",
      "headers.authorization",
      "headers.cookie",
    ],
  },
};

export type EventOutcome = "failure" | "success";

export interface OperationalEventInput {
  appId?: string;
  event: string;
  operation: string;
  outcome: EventOutcome;
  requestId?: string;
}

export interface OperationalEvent {
  appId?: string;
  event: string;
  operation: string;
  outcome: EventOutcome;
  requestId?: string;
}

export const createOperationalEvent = (input: OperationalEventInput): OperationalEvent => {
  const event: OperationalEvent = {
    event: input.event,
    operation: input.operation,
    outcome: input.outcome,
  };

  if (input.appId !== undefined) {
    event.appId = input.appId;
  }

  if (input.requestId !== undefined) {
    event.requestId = input.requestId;
  }

  return event;
};
