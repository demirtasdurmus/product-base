import { shared } from '@product-base/shared';

/**
 * Simulate using a utility from the shared library
 */
export async function calculateSample() {
  const sharedValue = shared();
  return Promise.resolve(`Hello, ${sharedValue}!`);
}
