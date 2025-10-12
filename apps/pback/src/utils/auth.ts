import { expo } from '@better-auth/expo';
import { betterAuth, BetterAuthPlugin } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { models } from '@product-base/backend';
import { env } from '../env/index.js';
import { db } from './db.js';

/**
 * @see https://www.better-auth.com/docs/integrations/express
 */
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  url: env.BETTER_AUTH_URL,
  logger: {
    disabled: true
  },
  emailAndPassword: {
    enabled: true
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: models
  }),
  advanced: {
    database: {
      useNumberId: true
    }
  },
  /**
   * @see https://github.com/better-auth/better-auth/issues/1974
   */
  plugins: [expo() as BetterAuthPlugin],
  trustedOrigins: ['pmobile://']
});
