import { User } from 'better-auth';
import { RequestHandler } from 'express';

import { sendSuccessResponse } from '@product-base/backend-core';
import { ServerResponse } from '@product-base/shared';

export const getMe: RequestHandler<
  unknown,
  ServerResponse<User> | ServerResponse,
  unknown,
  unknown
> = (req, res) => {
  return sendSuccessResponse({ res, statusCode: 200, payload: req.user });
};
