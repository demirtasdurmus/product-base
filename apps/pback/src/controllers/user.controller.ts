import { User } from 'better-auth';
import { RequestHandler } from 'express';
import { ServerResponse } from '@product-base/shared';
import { sendSuccessResponse } from '../utils/send-success-response.js';

export const getMe: RequestHandler<
  unknown,
  ServerResponse<User> | ServerResponse,
  unknown,
  unknown
> = (req, res) => {
  return sendSuccessResponse({ res, statusCode: 200, payload: req.user });
};
