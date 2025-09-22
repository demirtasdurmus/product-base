import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db.js';
import { models } from '@product-base/backend';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: models
  })
});
