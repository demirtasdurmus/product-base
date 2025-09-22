import { models } from '@product-base/backend';
import { shared } from '@product-base/shared';
import { db } from '../utils/db.js';

/**
 * Simulate using models from the backend library and a utility from the shared library
 */
export function calculateSample() {
  db.select()
    .from(models.sample)
    .then((samples) => {
      console.log(samples);
    });

  const sharedValue = shared();
  return `Hello, ${sharedValue}!`;
}
