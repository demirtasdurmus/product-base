import { User } from 'better-auth';
import { RequestHandler } from 'express';

export const getMe: RequestHandler<unknown, User | null, unknown, unknown> = (req, res) => {
  res.status(200).send(req.user);
};
