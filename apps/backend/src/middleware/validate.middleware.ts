import { RequestHandler } from 'express';
import { z } from 'zod';

import { fromZodIssueToBaseErrorIssue, UnprocessableEntityError } from '@product-base/backend-core';
import { parseObjectWithZod } from '@product-base/shared';

type TValidationMap = 'params' | 'query' | 'body';
type TValidateOptions<T> = {
  validationMap: TValidationMap;
  schema: z.ZodSchema<T>;
};

export function validate<T>({ validationMap, schema }: TValidateOptions<T>): RequestHandler {
  return (req, _res, next) =>
    parseObjectWithZod({
      object: req[validationMap],
      schema,
      onError: (error) => {
        throw new UnprocessableEntityError('Validation failed', {
          issues: error.issues.map(fromZodIssueToBaseErrorIssue)
        });
      },
      onSuccess: (data) => {
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
        req[validationMap] = data;
        next();
      }
    });
}
