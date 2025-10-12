import { DrizzleQueryError } from 'drizzle-orm';
import {
  BadRequestError,
  BaseError,
  ConflictError,
  InternalServerError,
  isBaseError,
  isDrizzleError,
  isDrizzleQueryError,
  isNativeError,
  isTransactionRollbackError
} from '@product-base/backend';

export function serializeError(err: unknown): BaseError {
  let error: BaseError;

  if (isBaseError(err)) {
    error = err;
  } else if (isTransactionRollbackError(err)) {
    error = new InternalServerError(
      err.message,
      {
        stack: err.stack,
        originalError: err
      },
      false
    );
  } else if (isDrizzleQueryError(err)) {
    error = serializeDrizzleQueryError(err);
  } else if (isDrizzleError(err)) {
    error = new InternalServerError(
      err.message,
      {
        stack: err.stack,
        originalError: err
      },
      false
    );
  } else if (isNativeError(err)) {
    error = new InternalServerError(
      err.message,
      {
        stack: err.stack
      },
      false
    );
  } else {
    error = new InternalServerError('An unexpected error occurred', { originalError: err }, false);
  }

  return error;
}

/**
 * TODO: Work on this function more, improve in terms of security and detail leakage.
 * Introduce isOperational=false flag if necessary and sanitize response data if needed.
 */
function serializeDrizzleQueryError(err: DrizzleQueryError): BaseError {
  // Check if we have a cause with error code (PostgreSQL error)
  if (err.cause && typeof err.cause === 'object' && 'code' in err.cause) {
    const cause = err.cause as {
      code: string;
      constraint?: string;
      detail?: string;
      column?: string;
    };

    switch (cause.code) {
      case '23505': // Unique constraint violation
        return new ConflictError('A record with this value already exists', {
          issues: [
            {
              constraint: cause.constraint,
              detail: cause.detail,
              code: cause.code,
              column: cause.column,
              type: 'unique_constraint_violation'
            }
          ]
        });

      case '23503': // Foreign key constraint violation
        return new BadRequestError('Referenced record does not exist', {
          issues: [
            {
              constraint: cause.constraint,
              detail: cause.detail,
              code: cause.code,
              column: cause.column,
              type: 'foreign_key_violation'
            }
          ]
        });

      case '23502': // Not null constraint violation
        return new BadRequestError('Required field cannot be null', {
          issues: [
            {
              constraint: cause.constraint,
              detail: cause.detail,
              code: cause.code,
              column: cause.column,
              type: 'not_null_violation'
            }
          ]
        });

      case '23514': // Check constraint violation
        return new BadRequestError('Value violates check constraint', {
          issues: [
            {
              constraint: cause.constraint,
              detail: cause.detail,
              code: cause.code,
              column: cause.column,
              type: 'check_constraint_violation'
            }
          ]
        });

      case '23506': // Exclusion constraint violation
        return new ConflictError('Value violates exclusion constraint', {
          issues: [
            {
              constraint: cause.constraint,
              detail: cause.detail,
              code: cause.code,
              column: cause.column,
              type: 'exclusion_constraint_violation'
            }
          ]
        });

      default:
        return new InternalServerError(err.message, {
          stack: err.stack,
          originalError: err
        });
    }
  }

  return new InternalServerError(
    err.message,
    {
      stack: err.stack,
      originalError: err
    },
    false
  );
}
