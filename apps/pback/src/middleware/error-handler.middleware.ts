import { ErrorRequestHandler } from 'express';
import { BaseError, InternalServerError, isBaseError } from '@product-base/backend';
import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { config } from '../config/index.js';
import { sendErrorResponse } from '../utils/send-response.js';

export const errorHandler: ErrorRequestHandler<
  unknown,
  ServerResponse<ErrorResponseDetails>,
  unknown,
  unknown
> = (err, _req, res, _next) => {
  const error = serializeError(err);

  /**
   * Write the error to the response locals for logging purposes
   */
  res.locals.error = error;

  return sendErrorResponse({
    error,
    res,
    isProdLikeEnvironment: config.NODE_ENV === 'production'
  });
};

export function serializeError(err: unknown): BaseError {
  let error: BaseError;

  if (isBaseError(err)) {
    error = err;
  } else if (err instanceof Error) {
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
