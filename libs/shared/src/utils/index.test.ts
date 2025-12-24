import { z } from 'zod';

import { parseObjectWithZod } from './index.js';

describe('parseObjectWithZod', () => {
  it('calls onSuccess with parsed data when object is valid', () => {
    const schema = z.object({ PORT: z.string().min(1) });
    const object = { PORT: '3000' };
    const onSuccess = jest.fn();
    const onError = jest.fn();

    parseObjectWithZod({ object, schema, onError, onSuccess });

    expect(onError).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith({ PORT: '3000' });
    const successArg = onSuccess.mock.calls[0][0];
    expect(successArg).toEqual({ PORT: '3000' });
  });

  it('calls onError with ZodError when object is invalid', () => {
    const schema = z.object({ PORT: z.string().min(1) });
    const object = { PORT: '' };
    const onSuccess = jest.fn();
    const onError = jest.fn();

    parseObjectWithZod({ object, schema, onError, onSuccess });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    const errorArg = onError.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(z.ZodError);
  });
});
