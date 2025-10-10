import { BaseError } from './error.js';

/**
 * Type guard to check if an error is a BaseError
 */
export function isBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}

/**
 * Type guard to check if an error is operational (expected/handled)
 */
export function isOperationalError(error: unknown): boolean {
  if (isBaseError(error)) {
    return error.isOperational;
  }
  return false;
}
