type Sample = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSampleResponseBody = Sample;
export type GetSampleResponseBody = Sample;
export type GetSamplesResponseBody = {
  samples: Sample[];
  total: number;
  page: number;
  limit: number;
};
export type UpdateSampleResponseBody = Sample;
export type DeleteSampleResponseBody = void;
