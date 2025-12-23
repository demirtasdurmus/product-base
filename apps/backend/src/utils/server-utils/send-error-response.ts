import { Response } from 'express';
import { BaseError } from '@product-base/backend-core';
import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { isProdLikeEnvironment } from './index.js';

/**
 * Create and send an error response
 * @param error - The error object
 * @param res - The response object
 */
export function sendErrorResponse({ error, res }: { error: BaseError; res: Response }): void {
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
    response.error.message = 'An unexpected error occurred. Please try again later.';
  }

  res.status(error.statusCode).json(response);
}
