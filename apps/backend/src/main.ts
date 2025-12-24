import { createServer } from 'http';

import { BACKEND_SERVICE_NAME } from '@product-base/shared';
import { app } from './app.js';
import { env } from './env/index.js';
import { logger } from './utils/logger.js';
import { shutdownGracefully } from './utils/shutdown-gracefully.js';

const host = env.BACKEND_HOST;
const port = env.BACKEND_PORT;

const server = createServer(app);

server.listen(port, host, () => {
  logger.info(`[${BACKEND_SERVICE_NAME}] is now ready at http://${host}:${port}`);
});

/**
 * Attach shutdown handlers to the process only if not in test environment
 */
if (env.NODE_ENV !== 'test') {
  process.on('SIGINT', () => shutdownGracefully({ signalOrEvent: 'SIGINT', server }));
  process.on('SIGTERM', () => shutdownGracefully({ signalOrEvent: 'SIGTERM', server }));

  process.on('uncaughtException', (error) => {
    shutdownGracefully({ signalOrEvent: 'uncaughtException', server, error });
  });

  process.on('unhandledRejection', (reason, promise) => {
    shutdownGracefully({ signalOrEvent: 'unhandledRejection', server, reason, promise });
  });
}
