import { readFileSync } from 'node:fs';
import appRoot from 'app-root-path';
import pino from 'pino';
import { env } from '../env/index.js';
import { isProdLikeEnvironment } from './server-utils/index.js';

/**
 * TODO: Extract this out to a backend lib with a thin wrapper around pino.
 * Logger with environment-specific configuration
 */
export const logger = pino({
  // Environment-based log levels
  level: isProdLikeEnvironment ? 'info' : 'debug',

  base: isProdLikeEnvironment
    ? {
        service: 'pback',
        env: env.NODE_ENV,
        version:
          JSON.parse(readFileSync(`${appRoot.path}/apps/pback/package.json`, 'utf8'))?.version ??
          '0.0.0'
      }
    : {},

  timestamp: pino.stdTimeFunctions.isoTime,

  // Pretty printing for development only
  transport: isProdLikeEnvironment
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          colorize: true,
          singleLine: true
        }
      },
  // Enhanced redaction for security
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.token',
      'user.email',
      'user.password',
      'res.headers["set-cookie"]'
    ],
    censor: '[REDACTED]'
  },

  // Format levels consistently
  formatters: {
    level(label) {
      return { level: label };
    }
  }
});
