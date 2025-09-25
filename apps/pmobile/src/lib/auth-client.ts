/**
 * This is a hack to fix the authClient type error
 * @see https://github.com/better-auth/better-auth/issues/2123
 */
import type {} from 'better-auth';

import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [
    expoClient({
      scheme: 'pmobile',
      storagePrefix: 'pmobile',
      storage: SecureStore
    })
  ]
});
