import { expo } from '@better-auth/expo';
import { APIError, betterAuth, Status } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import httpStatus from 'http-status';
import { BaseError, models } from '@product-base/backend-core';
import { BACKEND_SERVICE_NAME, MOBILE_SERVICE_NAME } from '@product-base/shared';
import { env } from '../env/index.js';
import { db } from './db.js';
import { isProdLikeEnvironment } from './server-utils/index.js';

/**
 * @see https://www.better-auth.com/docs/integrations/express
 */
export const auth = betterAuth({
  appName: BACKEND_SERVICE_NAME,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: models
  }),
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true
  },
  socialProviders: {
    /**
     * @see https://www.better-auth.com/docs/authentication/google
     */
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    },
    /**
     * @see https://www.better-auth.com/docs/authentication/github
     */
    github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET }
  },
  /**
   * @see https://www.better-auth.com/docs/integrations/expo
   */
  plugins: [expo()],
  trustedOrigins: [
    `${MOBILE_SERVICE_NAME}://`,
    ...(env.NODE_ENV === 'development'
      ? [
          'exp://*/*', // Trust all Expo development URLs
          'exp://10.0.0.*:*/*', // Trust 10.0.0.x IP range
          'exp://192.168.*.*:*/*', // Trust 192.168.x.x IP range
          'exp://172.*.*.*:*/*', // Trust 172.x.x.x IP range
          'exp://localhost:*/*' // Trust localhost
        ]
      : [])
  ],
  logger: {
    disabled: true
  },
  /**
   * @see https://github.com/better-auth/better-auth/issues/1974
   */
  onAPIError: {
    onError(error, _ctx) {
      if (error instanceof APIError) {
        throw new BaseError(
          httpStatus[`${error.statusCode as Status}_NAME`],
          error.statusCode,
          error.body?.message ?? 'An unexpected authentication error occurred',
          false
        );
      }
      throw error;
    }
  },
  advanced: {
    disableOriginCheck: !isProdLikeEnvironment,
    database: {
      useNumberId: true
    }
  }
});
