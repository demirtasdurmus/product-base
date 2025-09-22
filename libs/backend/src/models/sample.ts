import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const sample = pgTable('sample', {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull()
});
