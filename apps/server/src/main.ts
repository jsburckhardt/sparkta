import { createServer } from "./app.js";
import { normalizeError } from "./errors.js";
import { createOperationalEvent } from "./logger.js";

const server = createServer();
const host = "0.0.0.0";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
let stopping = false;

const stop = async (signal: NodeJS.Signals): Promise<void> => {
  if (stopping) {
    return;
  }

  stopping = true;
  server.log.info(
    {
      ...createOperationalEvent({
        event: "server.stopping",
        operation: "server.shutdown",
        outcome: "success",
      }),
      signal,
    },
    "Sparkta server stopping",
  );

  try {
    await server.close();
  } catch (value: unknown) {
    server.log.error(
      {
        ...createOperationalEvent({
          event: "server.stop_failed",
          operation: "server.shutdown",
          outcome: "failure",
        }),
        err: normalizeError(value),
      },
      "Sparkta server failed to stop",
    );
    process.exitCode = 1;
  }
};

const start = async (): Promise<void> => {
  try {
    await server.listen({ host, port });
    server.log.info(
      {
        ...createOperationalEvent({
          event: "server.started",
          operation: "server.startup",
          outcome: "success",
        }),
        port,
      },
      "Sparkta server started",
    );

    process.once("SIGINT", () => void stop("SIGINT"));
    process.once("SIGTERM", () => void stop("SIGTERM"));
  } catch (value: unknown) {
    server.log.error(
      {
        ...createOperationalEvent({
          event: "server.start_failed",
          operation: "server.startup",
          outcome: "failure",
        }),
        err: normalizeError(value),
      },
      "Sparkta server failed to start",
    );
    process.exitCode = 1;
  }
};

void start();
