import { NextFunction, Request, RequestHandler, Response } from 'express';
import { pinoHttp } from 'pino-http';

import { logger } from '../utils/logger.js';

export function httpLogger({
  isProdLikeEnvironment,
  skipPaths
}: {
  isProdLikeEnvironment: boolean;
  skipPaths?: string[];
}): RequestHandler {
  return isProdLikeEnvironment
    ? pinoHttp({
        logger,
        genReqId: (_req: Request, res: Response) => {
          const id = crypto.randomUUID();
          res.setHeader('X-Request-Id', id);
          return id;
        },
        customLogLevel: (req, res, err) => {
          if (skipPaths?.some((path) => req.url?.includes(path))) return 'debug';
          if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
          if (res.statusCode >= 500 || err) return 'error';
          return 'info';
        },
        customProps: (req: Request, res: Response) => {
          const props = {
            session: req?.session?.id,
            user: req?.user?.id,
            error: res.locals?.error
          };
          return props;
        }
      })
    : devHttpLogger;
}

/**
 * Simple development HTTP logger
 */
function devHttpLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;

    const message = `${method} ${url} - ${status} (${duration}ms)`;

    if (status >= 500) {
      logger.error({ error: res.locals?.error }, message);
    } else if (status >= 400) {
      logger.warn({ error: res.locals?.error }, message);
    } else {
      logger.info(message);
    }
  });

  next();
}
