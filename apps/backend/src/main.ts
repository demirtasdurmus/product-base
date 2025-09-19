import { createServer } from 'http';
import { app } from './app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = createServer(app);

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on('error', (error) => {
  console.error(`[ error ] ${error.message}`);
});
