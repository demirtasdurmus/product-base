import { z } from 'zod';

const sampleRequestParamsSchema = z.object({
  id: z.coerce.number().min(1)
});

export const createSampleRequestBodySchema = z.object({
  name: z.string().min(1).max(255)
});

export const getSampleRequestParamsSchema = sampleRequestParamsSchema;

export const getSamplesRequestQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(10).optional()
});

export const updateSampleRequestParamsSchema = sampleRequestParamsSchema;
export const updateSampleRequestBodySchema = z.object({
  name: z.string().min(1).max(255)
});

export const deleteSampleRequestParamsSchema = sampleRequestParamsSchema;

export type CreateSampleRequestBody = z.infer<typeof createSampleRequestBodySchema>;
export type GetSampleRequestParams = z.infer<typeof getSampleRequestParamsSchema>;
export type GetSamplesRequestQuery = z.infer<typeof getSamplesRequestQuerySchema>;
export type UpdateSampleRequestParams = z.infer<typeof updateSampleRequestParamsSchema>;
export type UpdateSampleRequestBody = z.infer<typeof updateSampleRequestBodySchema>;
export type DeleteSampleRequestParams = z.infer<typeof deleteSampleRequestParamsSchema>;
