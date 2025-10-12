import { Response } from 'express';
import {
  BadRequestError,
  BaseError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError
} from '@product-base/backend';
import { sendErrorResponse } from './send-error-response.js';

// Mock Express Response object
const createMockResponse = (): jest.Mocked<Response> => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as unknown as jest.Mocked<Response>;

  return res;
};

describe('sendErrorResponse', () => {
  let mockRes: jest.Mocked<Response>;

  beforeEach(() => {
    mockRes = createMockResponse();
    jest.clearAllMocks();
  });

  it('should send 4xx error response in development environment', () => {
    const error = new BadRequestError('Invalid input');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'BAD_REQUEST',
        statusCode: 400,
        message: 'Invalid input'
      }
    });
  });

  it('should send 4xx error response in production environment', () => {
    const error = new UnauthorizedError('Access denied');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: true
    });

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'UNAUTHORIZED',
        statusCode: 401,
        message: 'Access denied'
      }
    });
  });

  it('should send 5xx error response with full details in development', () => {
    const error = new InternalServerError('Database connection failed');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: 'Database connection failed'
      }
    });
  });

  it('should send 5xx error response with generic message in production', () => {
    const error = new InternalServerError('Sensitive internal error details', {
      issues: [{ field: 'secret', message: 'sensitive data' }]
    });

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: true
    });

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: 'An unexpected error occurred. Please try again later.',
        issues: [{ field: 'secret', message: 'sensitive data' }]
      }
    });
  });

  it('should include error data when present for 4xx errors', () => {
    const errorData = {
      issues: [
        { field: 'email', message: 'Email must be valid format' },
        { field: 'password', message: 'Password too weak' }
      ]
    };
    const error = new UnprocessableEntityError('Validation failed', errorData);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'UNPROCESSABLE_ENTITY',
        statusCode: 422,
        message: 'Validation failed',
        issues: [
          { field: 'email', message: 'Email must be valid format' },
          { field: 'password', message: 'Password too weak' }
        ]
      }
    });
  });

  it('should include error data when present for 5xx errors in development', () => {
    const errorData = {
      originalError: 'Connection timeout',
      stack: 'Error: Connection timeout\n    at DatabaseService.connect'
    };
    const error = new InternalServerError('Service unavailable', errorData);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: 'Service unavailable',
        originalError: 'Connection timeout',
        stack: 'Error: Connection timeout\n    at DatabaseService.connect'
      }
    });
  });

  it('should not include stack and originalError for 5xx errors in production', () => {
    const errorData = {
      originalError: 'SELECT * FROM sensitive_table',
      stack: 'sensitive stack trace',
      issues: [{ field: 'visible', message: 'this will be visible' }]
    };
    const error = new InternalServerError('Query failed', errorData);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: true
    });

    const response = mockRes.json.mock.calls[0][0];
    expect(response.error).not.toHaveProperty('originalError');
    expect(response.error).not.toHaveProperty('stack');
    expect(response.error).toHaveProperty('issues'); // This will still be present
    expect(response.error.message).toBe('An unexpected error occurred. Please try again later.');
  });

  it('should handle errors without data property', () => {
    const error = new NotFoundError('Resource not found');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'NOT_FOUND',
        statusCode: 404,
        message: 'Resource not found'
      }
    });
  });

  it('should handle errors with undefined data', () => {
    const error = new ConflictError('Resource conflict', undefined);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'CONFLICT',
        statusCode: 409,
        message: 'Resource conflict'
      }
    });
  });

  it('should include stack trace only for 5xx errors', () => {
    const testCases = [
      { error: new BadRequestError('Bad request'), shouldHaveStack: false },
      { error: new NotFoundError('Not found'), shouldHaveStack: false },
      { error: new UnprocessableEntityError('Validation error'), shouldHaveStack: false },
      {
        error: new InternalServerError('Server error', { stack: 'Error: Test stack trace' }),
        shouldHaveStack: true
      }
    ];

    testCases.forEach(({ error, shouldHaveStack }) => {
      const mockResponse = createMockResponse();

      sendErrorResponse({
        error,
        res: mockResponse,
        isProdLikeEnvironment: false
      });

      const response = mockResponse.json.mock.calls[0][0];
      if (shouldHaveStack) {
        expect(response.error).toHaveProperty('stack', 'Error: Test stack trace');
      } else {
        expect(response.error).not.toHaveProperty('stack');
      }
    });
  });

  it('should handle boundary status codes correctly', () => {
    const boundaryTests = [
      { error: new BadRequestError('Client error'), isProd: false, expectGeneric: false },
      { error: new InternalServerError('Server error'), isProd: false, expectGeneric: false },
      { error: new InternalServerError('Server error'), isProd: true, expectGeneric: true }
    ];

    boundaryTests.forEach(({ error, isProd, expectGeneric }) => {
      const mockResponse = createMockResponse();

      sendErrorResponse({
        error,
        res: mockResponse,
        isProdLikeEnvironment: isProd
      });

      const response = mockResponse.json.mock.calls[0][0];
      if (expectGeneric) {
        expect(response.error.message).toBe(
          'An unexpected error occurred. Please try again later.'
        );
      } else {
        expect(response.error.message).toBe(error.message);
      }
    });
  });

  it('should always include success: false in response', () => {
    const error = new BadRequestError('Test message');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    const response = mockRes.json.mock.calls[0][0];
    expect(response).toHaveProperty('success', false);
  });

  it('should always include error object in response', () => {
    const error = new InternalServerError('Test message');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: true
    });

    const response = mockRes.json.mock.calls[0][0];
    expect(response).toHaveProperty('error');
    expect(response.error).toHaveProperty('name');
    expect(response.error).toHaveProperty('statusCode');
    expect(response.error).toHaveProperty('message');
  });

  it('should handle complex nested error data', () => {
    const complexData = {
      issues: [
        { field: 'email', message: 'Invalid format' },
        { field: 'password', message: 'Too weak' }
      ],
      originalError: 'Validation pipeline failed'
    };
    const error = new UnprocessableEntityError('Multiple validation errors', complexData);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    const response = mockRes.json.mock.calls[0][0];
    expect(response.error.issues).toEqual(complexData.issues);
    expect(response.error.originalError).toEqual(complexData.originalError);
  });

  it('should call status() and json() methods correctly', () => {
    const error = new BadRequestError('Test error');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
  });

  it('should handle errors with empty string messages', () => {
    const error = new BadRequestError('');

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'BAD_REQUEST',
        statusCode: 400,
        message: ''
      }
    });
  });

  it('should handle errors with special characters in messages', () => {
    const specialMessage = 'Error with special chars: àáâãäåæçèéêë & symbols: !@#$%^&*() 🚀';
    const error = new BadRequestError(specialMessage);

    sendErrorResponse({
      error,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'BAD_REQUEST',
        statusCode: 400,
        message: specialMessage
      }
    });
  });

  it('should handle custom BaseError instances', () => {
    const customError = new BaseError('CUSTOM_ERROR', 418, 'I am a teapot', true, {
      originalError: 'Custom error data'
    });

    sendErrorResponse({
      error: customError,
      res: mockRes,
      isProdLikeEnvironment: false
    });

    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        name: 'CUSTOM_ERROR',
        statusCode: 418,
        message: 'I am a teapot',
        originalError: 'Custom error data'
      }
    });
  });
});
