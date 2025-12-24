import { $ZodIssue } from 'zod/v4/core';

import { fromDatabaseErrorCauseToBaseErrorIssue, fromZodIssueToBaseErrorIssue } from './utils.js';

describe('error utils', () => {
  it('fromZodIssueToBaseErrorIssue maps path to dotted field and message to detail', () => {
    const issue: $ZodIssue = {
      path: ['user', 'email'],
      message: 'Invalid email',
      code: 'invalid_type',
      expected: 'string'
    };

    expect(fromZodIssueToBaseErrorIssue(issue)).toEqual({
      field: 'user.email',
      detail: 'Invalid email'
    });
  });

  it('fromDatabaseErrorCauseToBaseErrorIssue maps column/detail and falls back to empty strings', () => {
    expect(
      fromDatabaseErrorCauseToBaseErrorIssue({
        code: '23505',
        column: 'email',
        detail: 'duplicate key'
      })
    ).toEqual({ field: 'email', detail: 'duplicate key' });

    expect(fromDatabaseErrorCauseToBaseErrorIssue({ code: '23505' })).toEqual({
      field: '',
      detail: ''
    });
  });
});
