import { ErrorRequestHandler } from 'express';

import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { sendErrorResponse } from '../utils/server-utils/send-error-response.js';
import { serializeError } from '../utils/server-utils/serialize-error.js';

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
    res
  });
};
