/* This order should be respected for environment variables validation */
/* prettier-ignore */
import { config } from './config/index.js';

import { createServer } from 'http';
import { app } from './app.js';
import { shutdownGracefully } from './utils/shutdown-gracefully.js';

const host = config.PBACK_HOST;
const port = config.PBACK_PORT;

const server = createServer(app);

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on('error', (error) => {
  console.error(`[ error ] ${error.message}`);
});

process.on('SIGINT', () => shutdownGracefully(server, 'SIGINT'));
process.on('SIGTERM', () => shutdownGracefully(server, 'SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  shutdownGracefully(server, 'uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdownGracefully(server, 'unhandledRejection');
});
