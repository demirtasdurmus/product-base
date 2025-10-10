import { $ZodIssue } from 'zod/v4/core';

export type BaseErrorData = {
  issues?: $ZodIssue[] | Record<string, unknown>[];
  stack?: string;
  originalError?: unknown;
};

export type ErrorResponseDetails = {
  name: string;
  statusCode: number;
  message: string;
  issues?: BaseErrorData['issues'];
  stack?: BaseErrorData['stack'];
  originalError?: BaseErrorData['originalError'];
};

export type ServerResponse<T extends Record<string, unknown> = Record<string, unknown>> =
  | {
      success: true;
      payload: T | null;
    }
  | {
      success: false;
      error: T;
    };
