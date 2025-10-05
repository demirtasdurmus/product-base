import { ErrorRequestHandler } from 'express';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Internal Server Error';

  if (config.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(500).send({ message });
};
