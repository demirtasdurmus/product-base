import { RequestHandler } from 'express';
import { z } from 'zod';
import { UnprocessableEntityError } from '@product-base/backend';

type TValidationMap = 'params' | 'query' | 'body';
type TValidateOptions<T> = {
  validationMap: TValidationMap;
  schema: z.ZodSchema<T>;
};

export function validate<T>({ validationMap, schema }: TValidateOptions<T>): RequestHandler {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req[validationMap]);

    if (parsed.error) {
      throw new UnprocessableEntityError('Validation failed', {
        issues: parsed.error.issues
      });
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
