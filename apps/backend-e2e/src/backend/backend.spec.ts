import axios from 'axios';

describe('GET /api/samples', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/samples`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual('Hello, shared!');
  });
});
