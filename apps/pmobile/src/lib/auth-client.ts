import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import { MOBILE_SERVICE_NAME } from '@product-base/shared';
import { env } from '../env';

/**
 * @see https://www.better-auth.com/docs/integrations/expo
 */
export const authClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  plugins: [
    expoClient({
      scheme: MOBILE_SERVICE_NAME,
      storagePrefix: MOBILE_SERVICE_NAME,
      storage: SecureStore
    })
  ]
});
