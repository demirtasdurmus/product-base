import express, { Application } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { sampleRouter } from './routes/sample.router.js';
import { notFoundHandler } from './middleware/not-found-handler.middleware.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { auth } from './utils/auth.js';
import { userRouter } from './routes/user.router.js';

const app: Application = express();

/**
 * @see https://www.better-auth.com/docs/integrations/express
 */
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/samples', sampleRouter);

app.use(errorHandler);
app.all(/.*/, notFoundHandler);

export { app };
