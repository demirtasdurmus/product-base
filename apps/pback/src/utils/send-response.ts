import { Response } from 'express';
import { BaseError } from '@product-base/backend';
import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';

/**
 * Create and send a success response
 * @param res - The response object
 * @param statusCode - The status code
 * @param payload - The payload
 */
export function sendSuccessResponse<T extends Record<string, unknown>>({
  res,
  statusCode = 200,
  payload
}: {
  res: Response;
  statusCode?: number;
  payload?: T;
}): void {
  const response: ServerResponse<T> = {
    success: true,
    payload: payload ?? null
  };

  res.status(statusCode).json(response);
}

/**
 * Create and send an error response
 * @param error - The error object
 * @param res - The response object
 * @param isProdLikeEnvironment - Whether the environment is production-like
 */
export function sendErrorResponse({
  error,
  res,
  isProdLikeEnvironment
}: {
  error: BaseError;
  res: Response;
  isProdLikeEnvironment: boolean;
}): void {
  const response: ServerResponse<ErrorResponseDetails> = {
    success: false,
    error: {
      name: error.name,
      statusCode: error.statusCode,
      message: error.message,
      ...(error.data ? { ...error.data } : {}),
      ...(error.statusCode >= 500 ? { stack: error.stack } : {})
    }
  };

  if (isProdLikeEnvironment && error.statusCode >= 500) {
    res.status(error.statusCode).json({
      ...response,
      error: {
        name: error.name,
        statusCode: error.statusCode,
        message: 'An unexpected error occurred. Please try again later.'
      }
    });
    return;
  }

  res.status(error.statusCode).json(response);
}
