import { Router } from 'express';
import { getMe } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.middleware.js';

const router = Router().use(authenticate);

router.get('/me', getMe);

export { router as userRouter };
