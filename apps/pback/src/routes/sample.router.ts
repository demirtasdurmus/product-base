import { Router } from 'express';
import { sampleController } from '../controllers/sample.controller.js';
import { sample } from '../middleware/sample.middleware.js';

const router = Router();

router.get('/', sample, sampleController);

export { router as sampleRouter };
