import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.middleware.js';
import { getMe } from '../controllers/user.controller.js';

const router = Router().use(authenticate);

router.get('/me', getMe);

export { router as userRouter };
