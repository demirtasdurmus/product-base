import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from './utils/timestamps.js';

export const sample = pgTable('sample', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  ...timestamps
});
