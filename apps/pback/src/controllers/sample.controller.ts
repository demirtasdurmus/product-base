import { RequestHandler } from 'express';
import { calculateSample } from '../services/sample.service.js';

export const sampleController: RequestHandler<unknown, string, unknown, unknown> = async (
  _req,
  res
) => {
  const sample = await calculateSample();
  res.status(200).send(sample);
};
