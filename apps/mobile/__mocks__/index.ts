import { jest } from '@jest/globals';

jest.mock('@rn-primitives/slot', () => require('./@react-primitives/slot'));
jest.mock('@rn-primitives/checkbox', () => require('./@react-primitives/checkbox'));
jest.mock('@rn-primitives/separator', () => require('./@react-primitives/separator'));

jest.mock('../src/lib/auth-client.ts', () => ({
  authClient: {
    useSession: jest.fn().mockReturnValue({ data: null, isPending: false }),
    signIn: {
      email: jest.fn()
    },
    signOut: jest.fn()
  }
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn()
  },
  useNavigationContainerRef: jest.fn().mockReturnValue({
    isReady: jest.fn().mockReturnValue(true)
  })
}));
