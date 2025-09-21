import { shared } from '@nx-example-two/shared';

export function sendGreeting() {
  shared();
  return 'Hello, World!';
}
