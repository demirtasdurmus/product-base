import { sampleService } from './sample.service.js';

describe('Sample Service', () => {
  describe('sampleService', () => {
    it('should pass', async () => {
      const result = sampleService();

      expect(result).toBe('sampleService');
    });
  });
});
