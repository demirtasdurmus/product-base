import { Router } from 'express';
import { sample } from '../middleware/sample.middleware.js';
import { sampleController } from '../controllers/sample.controller.js';

const router = Router();

router.get('/', sample, sampleController);

export { router as sampleRouter };
