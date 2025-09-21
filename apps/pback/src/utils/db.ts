import { drizzle } from 'drizzle-orm/node-postgres';
/**
 * TODO: Find a way to strictly type process env values
 * Adding global.d.ts to tsconfig.app.json breaks build for some reason
 */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(process.env.DATABASE_URL!);
