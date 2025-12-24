import { count, eq, sql } from 'drizzle-orm';
import { RequestHandler } from 'express';

import { models, NotFoundError } from '@product-base/backend-core';
import {
  CreateSampleRequestBody,
  CreateSampleResponseBody,
  DeleteSampleRequestParams,
  GetSampleRequestParams,
  GetSampleResponseBody,
  GetSamplesRequestQuery,
  GetSamplesResponseBody,
  ServerResponse,
  UpdateSampleRequestBody,
  UpdateSampleRequestParams,
  UpdateSampleResponseBody
} from '@product-base/shared';
import { db } from '../utils/db.js';
import { sendSuccessResponse } from '../utils/server-utils/send-success-response.js';

export const createSampleController: RequestHandler<
  unknown,
  ServerResponse<CreateSampleResponseBody>,
  CreateSampleRequestBody,
  unknown
> = async (req, res) => {
  const [sample] = await db
    .insert(models.sample)
    .values({ name: req.body.name })
    .returning({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    });

  return sendSuccessResponse({ res, statusCode: 201, payload: sample });
};

export const getSampleController: RequestHandler<
  unknown,
  ServerResponse<GetSampleResponseBody>,
  unknown,
  unknown
> = async (req, res) => {
  const [sample] = await db
    .select({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    })
    .from(models.sample)
    .where(eq(models.sample.id, (req.params as GetSampleRequestParams).id));

  if (!sample) {
    throw new NotFoundError('Sample not found');
  }

  return sendSuccessResponse({ res, statusCode: 200, payload: sample });
};

export const getSamplesController: RequestHandler<
  unknown,
  ServerResponse<GetSamplesResponseBody>,
  unknown,
  GetSamplesRequestQuery
> = async (req, res) => {
  const { page = 1, limit = 10 } = req.query as GetSamplesRequestQuery;

  const samplesPromise = db
    .select({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    })
    .from(models.sample)
    .limit(limit)
    .offset((page - 1) * limit);

  const totalPromise = db.select({ count: count() }).from(models.sample);
  const [samples, [{ count: total }]] = await Promise.all([samplesPromise, totalPromise]);

  return sendSuccessResponse({
    res,
    statusCode: 200,
    payload: { samples, total, page, limit }
  });
};

export const updateSampleController: RequestHandler<
  unknown,
  ServerResponse<UpdateSampleResponseBody>,
  UpdateSampleRequestBody,
  unknown
> = async (req, res) => {
  const [sample] = await db
    .update(models.sample)
    .set({ name: req.body.name })
    .where(eq(models.sample.id, (req.params as UpdateSampleRequestParams).id))
    .returning({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    });

  if (!sample) {
    throw new NotFoundError('Sample not found');
  }

  return sendSuccessResponse({ res, statusCode: 200, payload: sample });
};

export const deleteSampleController: RequestHandler<
  unknown,
  ServerResponse,
  unknown,
  unknown
> = async (req, res) => {
  const [sample] = await db
    .delete(models.sample)
    .where(eq(models.sample.id, (req.params as DeleteSampleRequestParams).id))
    .returning({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    });

  if (!sample) {
    throw new NotFoundError('Sample not found');
  }

  return sendSuccessResponse({
    res,
    statusCode: 200
  });
};
