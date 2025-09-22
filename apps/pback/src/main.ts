/* prettier-ignore */ /* This order should be respected for env validation */
import { config } from './config/index.js';

import { createServer } from 'http';
import { app } from './app.js';

const host = config.PBACK_HOST;
const port = config.PBACK_PORT;

const server = createServer(app);

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on('error', (error) => {
  console.error(`[ error ] ${error.message}`);
});
