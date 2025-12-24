import { Router } from 'express';

import {
  createSampleRequestBodySchema,
  deleteSampleRequestParamsSchema,
  getSampleRequestParamsSchema,
  getSamplesRequestQuerySchema,
  updateSampleRequestBodySchema,
  updateSampleRequestParamsSchema
} from '@product-base/shared';
import {
  createSampleController,
  deleteSampleController,
  getSampleController,
  getSamplesController,
  updateSampleController
} from '../controllers/sample.controller.js';
import { authenticate } from '../middleware/authenticate.middleware.js';
import { protect } from '../middleware/protect.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const sampleRouter = Router().use(authenticate, protect);

sampleRouter
  .post(
    '/',
    validate({ validationMap: 'body', schema: createSampleRequestBodySchema }),
    createSampleController
  )
  .get(
    '/:id',
    validate({ validationMap: 'params', schema: getSampleRequestParamsSchema }),
    getSampleController
  )
  .get(
    '/',
    validate({ validationMap: 'query', schema: getSamplesRequestQuerySchema }),
    getSamplesController
  )
  .patch(
    '/:id',
    validate({ validationMap: 'params', schema: updateSampleRequestParamsSchema }),
    validate({ validationMap: 'body', schema: updateSampleRequestBodySchema }),
    updateSampleController
  )
  .delete(
    '/:id',
    validate({ validationMap: 'params', schema: deleteSampleRequestParamsSchema }),
    deleteSampleController
  );

export { sampleRouter };
