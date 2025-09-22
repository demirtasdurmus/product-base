import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './libs/backend/dist/models/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    /**
     * TODO: Typing Nodejs env variables, find a way for root and all apps
     * Same issue in backend app
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.DATABASE_URL!
  }
});
