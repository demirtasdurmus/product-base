import { expo } from '@better-auth/expo';
import { APIError, betterAuth, Status } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import httpStatus from 'http-status';
import { BaseError, models } from '@product-base/backend';
import { env } from '../env/index.js';
import { db } from './db.js';
import { isProdLikeEnvironment } from './server-utils/index.js';

/**
 * @see https://www.better-auth.com/docs/integrations/express
 */
export const auth = betterAuth({
  appName: 'Product Base',
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
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [expo()],
  trustedOrigins: ['pmobile://'],
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
