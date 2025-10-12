import { DrizzleError, DrizzleQueryError, TransactionRollbackError } from 'drizzle-orm';
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

export function isTransactionRollbackError(error: unknown): error is TransactionRollbackError {
  return error instanceof TransactionRollbackError;
}

export function isNativeError(error: unknown): error is Error {
  return error instanceof Error;
}
