import { calculateSample } from './sample.service.js';

describe('Sample Service', () => {
  describe('calculateSample', () => {
    it('should calculate sample with shared value', () => {
      const result = calculateSample();

      expect(result).toBe('Hello, shared!');
    });
  });
});
