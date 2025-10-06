import { RequestHandler } from 'express';
import {
  CreateSampleRequestBody,
  CreateSampleResponseBody,
  DeleteSampleRequestParams,
  DeleteSampleResponseBody,
  GetSampleRequestParams,
  GetSampleResponseBody,
  GetSamplesRequestQuery,
  GetSamplesResponseBody,
  UpdateSampleRequestBody,
  UpdateSampleRequestParams,
  UpdateSampleResponseBody
} from '@product-base/shared';
import {
  createSample,
  deleteSample,
  getSample,
  getSamples,
  updateSample
} from '../services/sample.service.js';

export const createSampleController: RequestHandler<
  unknown,
  CreateSampleResponseBody,
  CreateSampleRequestBody,
  unknown
> = async (req, res) => {
  const sample = await createSample(req.body?.length);
  res.status(200).send(sample);
};

export const getSampleController: RequestHandler<
  unknown,
  GetSampleResponseBody,
  unknown,
  unknown
> = async (req, res) => {
  const sample = await getSample((req.params as GetSampleRequestParams).id);
  res.status(200).send(sample);
};

export const getSamplesController: RequestHandler<
  unknown,
  GetSamplesResponseBody,
  unknown,
  GetSamplesRequestQuery
> = async (req, res) => {
  const samples = await getSamples(req.query?.page, req.query?.limit);
  res.status(200).send(samples);
};

export const updateSampleController: RequestHandler<
  unknown,
  UpdateSampleResponseBody,
  UpdateSampleRequestBody,
  unknown
> = async (req, res) => {
  const sample = await updateSample((req.params as UpdateSampleRequestParams).id, req.body.name);
  res.status(200).send(sample);
};

export const deleteSampleController: RequestHandler<
  unknown,
  DeleteSampleResponseBody,
  unknown,
  unknown
> = async (req, res) => {
  await deleteSample((req.params as DeleteSampleRequestParams).id);
  res.status(200).send();
};
