// schema.ts
import { pgTable, varchar, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(),
  modelUrl: varchar('model_url', { length: 255 }).notNull(),
  dateAdded: timestamp('date_added').defaultNow().notNull(),
});


// Types for TypeScript
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

