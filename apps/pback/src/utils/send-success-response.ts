import { Response } from 'express';
import { ServerResponse } from '@product-base/shared';

/**
 * Create and send a success response
 * @param res - The response object
 * @param statusCode - The status code
 * @param payload - The payload
 */
export function sendSuccessResponse<T extends Record<string, unknown>>({
  res,
  statusCode = 200,
  payload
}: {
  res: Response;
  statusCode?: number;
  payload?: T;
}): void {
  const response: ServerResponse<T> = {
    success: true,
    payload: payload ?? null
  };

  res.status(statusCode).json(response);
}
