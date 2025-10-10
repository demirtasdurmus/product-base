import { RequestHandler } from 'express';
import { UnauthorizedError } from '@product-base/backend';

export const protect: RequestHandler = (req, _res, next) => {
  if (!req.user && !req.session) {
    throw new UnauthorizedError('Authentication required to access this resource');
  }
  next();
};
