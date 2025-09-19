import express, { Application } from 'express';
import { sampleRoutes } from './routes/sample.route';
import { notFoundHandler } from './middleware/not-found-handler.middleware';
import { errorHandler } from './middleware/error-handler.middleware';

const app: Application = express();

app.get('/', (_req, res) => {
  res.send({ message: 'Hello API' });
});
app.use('/api/samples', sampleRoutes);

app.use(errorHandler);
app.all(/.*/, notFoundHandler);

export { app };
