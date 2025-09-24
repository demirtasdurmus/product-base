import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

export default defineConfig({
  out: './migrations',
  schema: './libs/backend/dist/models/index.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});
