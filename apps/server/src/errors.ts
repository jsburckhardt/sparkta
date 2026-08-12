export type SafeContextValue = boolean | number | string;

export interface ApplicationErrorOptions {
  cause?: unknown;
  code: string;
  message: string;
  safeContext?: Readonly<Record<string, SafeContextValue>>;
  statusCode?: number;
}

export class ApplicationError extends Error {
  readonly code: string;
  readonly safeContext: Readonly<Record<string, SafeContextValue>> | undefined;
  readonly statusCode: number;

  constructor(options: ApplicationErrorOptions) {
    super(options.message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "ApplicationError";
    this.code = options.code;
    this.safeContext = options.safeContext;
    this.statusCode = options.statusCode ?? 400;
  }
}

export interface ErrorResponse {
  error: {
    code: string;
    context?: Readonly<Record<string, SafeContextValue>>;
    message: string;
  };
}

export interface TranslatedError {
  body: ErrorResponse;
  error: Error;
  expected: boolean;
  statusCode: number;
}

export const normalizeError = (value: unknown): Error => {
  if (value instanceof Error) {
    return value;
  }

  return new Error("A non-Error value was thrown.", { cause: value });
};

export const translateError = (value: unknown): TranslatedError => {
  const error = normalizeError(value);

  if (error instanceof ApplicationError) {
    const responseError: ErrorResponse["error"] = {
      code: error.code,
      message: error.message,
    };

    if (error.safeContext !== undefined) {
      responseError.context = error.safeContext;
    }

    return {
      body: { error: responseError },
      error,
      expected: true,
      statusCode: error.statusCode,
    };
  }

  return {
    body: {
      error: {
        code: "INTERNAL_ERROR",
        message: "An internal error occurred.",
      },
    },
    error,
    expected: false,
    statusCode: 500,
  };
};
