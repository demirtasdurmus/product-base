import request from 'supertest';

import { app } from '../../src/app.js';

describe('GET /api/samples', () => {
  it('should return 401 if not authenticated', async () => {
    const response = await request(app).get('/api/samples?page=1&limit=10');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      error: {
        name: 'UNAUTHORIZED',
        statusCode: 401,
        message: 'Authentication required to access this resource'
      }
    });
  });
});
