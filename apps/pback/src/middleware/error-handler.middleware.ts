import { ErrorRequestHandler } from 'express';
import { ErrorResponseDetails, ServerResponse } from '@product-base/shared';
import { isProdLikeEnvironment } from '../utils/server-utils/index.js';
import { sendErrorResponse } from '../utils/server-utils/send-error-response.js';
import { serializeError } from '../utils/server-utils/serialize-error.js';

export const errorHandler: ErrorRequestHandler<
  unknown,
  ServerResponse<ErrorResponseDetails>,
  unknown,
  unknown
> = (err, _req, res, _next) => {
  const error = serializeError(err);

  res.locals.error = error;

  return sendErrorResponse({
    error,
    res,
    isProdLikeEnvironment
  });
};
