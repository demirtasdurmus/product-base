import { NextFunction, Request, Response } from 'express';
import { pinoHttp } from 'pino-http';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

const isDevLike = ['development', 'test'].includes(config.NODE_ENV);

export const httpLogger = isDevLike
  ? devHttpLogger
  : pinoHttp({
      logger,
      customLogLevel: (req, res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
        if (res.statusCode >= 500 || err) return 'error';
        if (req.url?.includes('/health')) return 'debug';
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
    });

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
