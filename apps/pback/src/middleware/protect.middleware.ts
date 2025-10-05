import { RequestHandler } from 'express';

export const protect: RequestHandler = (req, res, next) => {
  if (!req.user && !req.session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
