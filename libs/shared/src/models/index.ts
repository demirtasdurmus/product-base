import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

export const samplesTable = pgTable('samples', {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull()
});
