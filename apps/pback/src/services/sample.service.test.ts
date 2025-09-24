import { calculateSample } from './sample.service.js';

describe('Sample Service', () => {
  describe('calculateSample', () => {
    it('should calculate sample with shared value', async () => {
      const result = await calculateSample();

      expect(result).toBe('Hello, shared!');
    });
  });
});
