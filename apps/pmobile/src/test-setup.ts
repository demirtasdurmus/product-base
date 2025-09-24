/* eslint-disable @typescript-eslint/no-explicit-any */
// Set Expo environment variables for Jest
global.process.env.EXPO_OS = 'ios';
global.process.env.EXPO_PLATFORM = 'ios';

// Mock Expo Router for tests
jest.mock('expo-router', () => ({
  Link: ({ children, href, ...props }: any) => {
    const React = require('react');
    const { TouchableOpacity } = require('react-native');
    return React.createElement(TouchableOpacity, { ...props, testID: href }, children);
  },
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn()
  },
  Slot: ({ children }: any) => children
}));
