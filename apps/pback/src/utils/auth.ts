import { expo } from '@better-auth/expo';
import { betterAuth, BetterAuthPlugin } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { models } from '@product-base/backend';
import { config } from '../config/index.js';
import { db } from './db.js';

export const auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,
  url: config.BETTER_AUTH_URL,
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
  /**
   * @see https://github.com/better-auth/better-auth/issues/1974
   */
  plugins: [expo() as BetterAuthPlugin],
  trustedOrigins: ['pmobile://']
});
