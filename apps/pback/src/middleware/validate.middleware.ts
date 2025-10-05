import { RequestHandler } from 'express';
import { z } from 'zod';

type TValidationMap = 'params' | 'query' | 'body';
type TValidateOptions = {
  validationMap: TValidationMap;
  schema: z.ZodSchema;
};

export function validate({ validationMap, schema }: TValidateOptions): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[validationMap]);

    if (parsed.error) {
      res.status(400).json(parsed.error);
      return;
    }

    if (parsed.data) {
      if (validationMap === 'query') {
        res.locals.query = parsed.data; // Express 5: req.query is a getter; use locals
      } else {
        req[validationMap] = parsed.data;
      }
    }

    return next();
  };
}
