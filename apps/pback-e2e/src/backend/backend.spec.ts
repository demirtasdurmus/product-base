import axios, { AxiosError } from 'axios';

describe('GET /api/samples', () => {
  it('should return 401 if not authenticated', async () => {
    try {
      await axios.get(`/api/samples?page=1&limit=10`);
    } catch (error) {
      expect((error as AxiosError)?.response?.status).toBe(401);
      expect((error as AxiosError)?.response?.data).toEqual({
        success: false,
        error: {
          name: 'UNAUTHORIZED',
          statusCode: 401,
          message: 'Authentication required to access this resource'
        }
      });
    }
  });
});
