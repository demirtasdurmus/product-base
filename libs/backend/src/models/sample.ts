import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const sample = pgTable('sample', {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});
