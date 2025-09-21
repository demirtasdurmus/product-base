import { RequestHandler } from 'express';
import { calculateSample } from '../services/sample.service';

export const sampleController: RequestHandler<unknown, string, unknown, unknown> = (_req, res) => {
  const sample = calculateSample();
  res.status(200).send(sample);
};
