import { Server } from 'http';
import { pool } from '../db.js';
import { logger } from '../logger.js';

let isShuttingDown = false;

export async function shutdownGracefully(
  server: Server,
  signalOrEvent: NodeJS.Signals | 'uncaughtException' | 'unhandledRejection'
) {
  if (isShuttingDown) {
    logger.warn(`${signalOrEvent} received again, forcing exit`);
    process.exit(1);
  }

  isShuttingDown = true;
  logger.warn(`${signalOrEvent} received: starting graceful shutdown`);

  const shutdownTimeout = setTimeout(() => {
    logger.error('Graceful shutdown timeout, forcing exit');
    process.exit(1);
  }, 10000);

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await pool.end();

    logger.warn('Graceful shutdown completed');
    clearTimeout(shutdownTimeout);
    process.exit(0);
  } catch (error) {
    logger.error(error, 'Error during graceful shutdown');
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}
