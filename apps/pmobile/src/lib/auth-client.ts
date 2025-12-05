import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import { env } from '../env';
import { STORAGE_PREFIX } from './constants';

/**
 * @see https://www.better-auth.com/docs/integrations/expo
 */
export const authClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  plugins: [
    expoClient({
      scheme: 'pmobile',
      storagePrefix: STORAGE_PREFIX,
      storage: SecureStore
    })
  ]
});
