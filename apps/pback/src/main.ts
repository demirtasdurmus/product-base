import { createServer } from 'http';
import { app } from './app.js';
import { env } from './env/index.js';
import { logger } from './utils/logger.js';
import { shutdownGracefully } from './utils/server-utils/shutdown-gracefully.js';

const host = env.PBACK_HOST;
const port = env.PBACK_PORT;

const server = createServer(app);

server.listen(port, host, () => {
  logger.info(`[ ready ] http://${host}:${port}`);
});

server.on('error', (error) => {
  logger.error(error);
});

process.on('SIGINT', () => shutdownGracefully({ signalOrEvent: 'SIGINT', server }));
process.on('SIGTERM', () => shutdownGracefully({ signalOrEvent: 'SIGTERM', server }));

process.on('uncaughtException', (error) => {
  shutdownGracefully({ signalOrEvent: 'uncaughtException', server, error });
});

process.on('unhandledRejection', (reason, promise) => {
  shutdownGracefully({ signalOrEvent: 'unhandledRejection', server, reason, promise });
});
