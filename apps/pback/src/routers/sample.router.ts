import { Router } from 'express';
import { sampleController } from '../controllers/sample.controller.js';

const router = Router();

router.get('/', sampleController);

export { router as sampleRouter };
