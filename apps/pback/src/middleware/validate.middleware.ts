import { RequestHandler } from 'express';
import { z } from 'zod';

type TValidationMap = 'params' | 'query' | 'body';
type TValidateOptions<T> = {
  validationMap: TValidationMap;
  schema: z.ZodSchema<T>;
};

export function validate<T>({ validationMap, schema }: TValidateOptions<T>): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[validationMap]);

    if (parsed.error) {
      res.status(400).json(parsed.error);
      return;
    }

    if (parsed.data) {
      if (validationMap === 'query') {
        /**
         * Express 5: req.query is a getter; use this hack to modify it
         * @see https://stackoverflow.com/questions/79597051/express-v5-is-there-any-way-to-modify-req-query
         */
        Object.defineProperty(req, 'query', {
          ...Object.getOwnPropertyDescriptor(req, 'query'),
          value: req.query,
          writable: true
        });
      }
      req[validationMap] = parsed.data;
    }

    return next();
  };
}
