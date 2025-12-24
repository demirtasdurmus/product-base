import { Response } from 'express';

import { sendSuccessResponse } from './send-success-response.js';

const createMockResponse = (): jest.Mocked<Response> => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as unknown as jest.Mocked<Response>;

  return res;
};

describe('sendSuccessResponse', () => {
  let mockRes: jest.Mocked<Response>;

  beforeEach(() => {
    mockRes = createMockResponse();
    jest.clearAllMocks();
  });

  it('should send a success response with default status code 200', () => {
    const payload = { message: 'Success' };

    sendSuccessResponse({
      res: mockRes,
      payload
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: { message: 'Success' }
    });
  });

  it('should send a success response with custom status code', () => {
    const payload = { id: 1, name: 'John' };
    const statusCode = 201;

    sendSuccessResponse({
      res: mockRes,
      statusCode,
      payload
    });

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: { id: 1, name: 'John' }
    });
  });

  it('should handle undefined payload by setting it to null', () => {
    sendSuccessResponse({
      res: mockRes
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: null
    });
  });

  it('should handle explicitly passed undefined payload', () => {
    sendSuccessResponse({
      res: mockRes,
      payload: undefined
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: null
    });
  });

  it('should handle empty object payload', () => {
    const payload = {};

    sendSuccessResponse({
      res: mockRes,
      payload
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: {}
    });
  });

  it('should handle complex nested object payload', () => {
    const payload = {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'dark',
          notifications: true
        }
      },
      metadata: {
        timestamp: '2023-10-01T10:00:00Z',
        version: '1.0.0'
      }
    };

    sendSuccessResponse({
      res: mockRes,
      payload
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload
    });
  });

  it('should handle array-like payload', () => {
    const payload = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      total: 2,
      page: 1
    };

    sendSuccessResponse({
      res: mockRes,
      payload
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload
    });
  });

  it('should handle various success status codes', () => {
    const testCases = [
      { statusCode: 200, description: 'OK' },
      { statusCode: 201, description: 'Created' },
      { statusCode: 202, description: 'Accepted' },
      { statusCode: 204, description: 'No Content' },
      { statusCode: 206, description: 'Partial Content' }
    ];

    testCases.forEach(({ statusCode }) => {
      const mockResponse = createMockResponse();
      const payload = { result: 'success' };

      sendSuccessResponse({
        res: mockResponse,
        statusCode,
        payload
      });

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        payload
      });
    });
  });

  it('should always include success: true in response', () => {
    sendSuccessResponse({
      res: mockRes,
      payload: { test: 'data' }
    });

    const responseCall = mockRes.json.mock.calls[0][0];
    expect(responseCall).toHaveProperty('success', true);
  });

  it('should always include payload property in response', () => {
    sendSuccessResponse({
      res: mockRes
    });

    const responseCall = mockRes.json.mock.calls[0][0];
    expect(responseCall).toHaveProperty('payload');
  });

  it('should maintain response structure with different payload types', () => {
    const testPayloads = [
      { data: 'string value' },
      { count: 42 },
      { active: true },
      { items: [] },
      { nested: { deep: { value: 'test' } } }
    ];

    testPayloads.forEach((payload) => {
      const mockResponse = createMockResponse();

      sendSuccessResponse({
        res: mockResponse,
        payload
      });

      const responseCall = mockResponse.json.mock.calls[0][0];
      expect(responseCall).toEqual({
        success: true,
        payload
      });
    });
  });

  it('should call status() and json() methods correctly', () => {
    sendSuccessResponse({
      res: mockRes,
      statusCode: 201,
      payload: { id: 1 }
    });

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: { id: 1 }
    });
  });

  it('should handle special characters in payload', () => {
    const payload = {
      message: 'Special chars: àáâãäåæçèéêë',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
      unicode: '🚀 🎉 ✨'
    };

    sendSuccessResponse({
      res: mockRes,
      payload
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload
    });
  });

  it('should handle large objects', () => {
    const largePayload = {
      data: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`.repeat(10)
      }))
    };

    sendSuccessResponse({
      res: mockRes,
      payload: largePayload
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload: largePayload
    });
  });

  it('should maintain type safety with typed payload', () => {
    interface UserPayload extends Record<string, unknown> {
      id: number;
      name: string;
      email: string;
    }

    const payload: UserPayload = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    };

    sendSuccessResponse<UserPayload>({
      res: mockRes,
      payload
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      payload
    });
  });
});
