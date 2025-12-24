import { ErrorRequestHandler } from 'express';

import { sendErrorResponse, serializeError } from '@product-base/backend-core';
import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { isProdLikeEnvironment } from '../utils/index.js';

export const errorHandler: ErrorRequestHandler<
  unknown,
  ServerResponse<ErrorResponseDetails>,
  unknown,
  unknown
> = (err, _req, res, _next) => {
  const error = serializeError(err);

  res.locals.error = {
    name: error.name,
    statusCode: error.statusCode,
    message: error.message,
    ...(error.data ? { ...error.data } : {})
  };

  return sendErrorResponse({
    error,
    res,
    isProdLikeEnvironment
  });
};
