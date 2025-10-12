export type BaseErrorIssue = {
  field?: string;
  detail?: string;
};

export type BaseErrorData = {
  issues?: BaseErrorIssue[];
  stack?: string;
  originalError?: unknown;
};

export type DatabaseErrorCause = {
  code: string;
  constraint?: string;
  detail?: string;
  column?: string;
};

export type ErrorResponseDetails = {
  name: string;
  statusCode: number;
  message: string;
  issues?: BaseErrorData['issues'];
  stack?: BaseErrorData['stack'];
  originalError?: BaseErrorData['originalError'];
};

export type ServerResponse<T extends Record<string, unknown> = Record<string, unknown>> =
  | {
      success: true;
      payload: T | null;
    }
  | {
      success: false;
      error: T;
    };
