import { RequestHandler } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../utils/auth.js';

export const authenticate: RequestHandler = async (req, _res, next) => {
  const authSession = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  if (authSession) {
    req.session = authSession.session;
    req.user = authSession.user;
  }
  next();
};
