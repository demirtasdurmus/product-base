import { DrizzleError, DrizzleQueryError } from 'drizzle-orm';
import { $ZodIssue } from 'zod/v4/core';
import { BaseErrorIssue, DatabaseErrorCause } from '@product-base/shared';
import { BaseError } from './error.js';

export function isBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}

export function isDrizzleQueryError(error: unknown): error is DrizzleQueryError {
  return error instanceof DrizzleQueryError;
}

export function isDrizzleError(error: unknown): error is DrizzleError {
  return error instanceof DrizzleError;
}

export function isNativeError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Converts a Zod issue to a BaseErrorIssue.
 * @param issue - The Zod issue to convert.
 * @returns The BaseErrorIssue.
 */
export function fromZodIssueToBaseErrorIssue(issue: $ZodIssue): BaseErrorIssue {
  return {
    field: issue.path.join('.'),
    detail: issue.message
  };
}

/**
 * Converts a DatabaseErrorCause to a BaseErrorIssue.
 * @param cause - The DatabaseErrorCause to convert.
 * @returns The BaseErrorIssue.
 */
export function fromDatabaseErrorCauseToBaseErrorIssue(cause: DatabaseErrorCause): BaseErrorIssue {
  return {
    field: cause.column ?? '',
    detail: cause.detail ?? ''
  };
}
