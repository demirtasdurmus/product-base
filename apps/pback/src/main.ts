/* This order should be respected for environment variables validation */
/* prettier-ignore */
import { config } from './config/index.js';

import { createServer } from 'http';
import { app } from './app.js';
import { logger } from './utils/logger.js';
import { shutdownGracefully } from './utils/shutdown-gracefully.js';

const host = config.PBACK_HOST;
const port = config.PBACK_PORT;

const server = createServer(app);

server.listen(port, host, () => {
  logger.info(`[ ready ] http://${host}:${port}`);
});

server.on('error', (error) => {
  logger.error(error);
});

process.on('SIGINT', () => shutdownGracefully(server, 'SIGINT'));
process.on('SIGTERM', () => shutdownGracefully(server, 'SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.error(error, 'Uncaught Exception');
  shutdownGracefully(server, 'uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason, 'Unhandled Rejection at:', promise);
  shutdownGracefully(server, 'unhandledRejection');
});
