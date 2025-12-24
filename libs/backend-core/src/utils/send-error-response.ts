import { Response } from 'express';

import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { BaseError } from '../errors/index.js';

/**
 * Create and send an error response
 * @param error - The error object
 * @param res - The response object
 * @param isProdLikeEnvironment - Whether the environment is production-like
 * @param genericErrorMessage - The generic error message to use if the environment is production-like and the error status code is 500 or higher
 * @returns void
 */
export function sendErrorResponse({
  error,
  res,
  isProdLikeEnvironment,
  genericErrorMessage = 'An unexpected error occurred. Please try again later.'
}: {
  error: BaseError;
  res: Response;
  isProdLikeEnvironment: boolean;
  genericErrorMessage?: string;
}): void {
  const response: ServerResponse<ErrorResponseDetails> = {
    success: false,
    error: {
      name: error.name,
      statusCode: error.statusCode,
      message: error.message,
      ...(error.data ? { ...error.data } : {})
    }
  };

  if (isProdLikeEnvironment && error.statusCode >= 500) {
    delete response.error.stack;
    delete response.error.originalError;
    response.error.message = genericErrorMessage;
  }

  res.status(error.statusCode).json(response);
}
