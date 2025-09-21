import { shared } from '@nx-example-two/shared';

export function calculateSample() {
  const sharedValue = shared();
  return `Hello, ${sharedValue}!`;
}
