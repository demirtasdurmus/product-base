import { Server } from 'http';
import { pool } from './db.js';

let isShuttingDown = false;

export async function shutdownGracefully(
  server: Server,
  signalOrEvent: NodeJS.Signals | 'uncaughtException' | 'unhandledRejection'
) {
  if (isShuttingDown) {
    console.log(`${signalOrEvent} received again, forcing exit`);
    process.exit(1);
  }

  isShuttingDown = true;
  console.log(`${signalOrEvent} received: starting graceful shutdown`);

  const shutdownTimeout = setTimeout(() => {
    console.error('Graceful shutdown timeout, forcing exit');
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

    console.log('Graceful shutdown completed');
    clearTimeout(shutdownTimeout);
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}
