import { toNodeHandler } from 'better-auth/node';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { httpLogger } from './middleware/http-logger.middleware.js';
import { notFoundHandler } from './middleware/not-found-handler.middleware.js';
import { sampleRouter } from './routers/sample.router.js';
import { userRouter } from './routers/user.router.js';
import { auth } from './utils/auth.js';
import { isProdLikeEnvironment } from './utils/server-utils/index.js';

const app: Application = express();

app.use(httpLogger({ isProdLikeEnvironment, skipPaths: ['/health'] }));

app.use(helmet());

/**
 * @see https://www.better-auth.com/docs/integrations/express
 */
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/samples', sampleRouter);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);
app.all(/.*/, notFoundHandler);

export { app };
