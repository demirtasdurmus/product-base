import express, { Application } from 'express';
import { sampleRoutes } from './routes/sample.route.js';
import { notFoundHandler } from './middleware/not-found-handler.middleware.js';
import { errorHandler } from './middleware/error-handler.middleware.js';

const app: Application = express();

app.use('/api/samples', sampleRoutes);

app.use(errorHandler);
app.all(/.*/, notFoundHandler);

export { app };
