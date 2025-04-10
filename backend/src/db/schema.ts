// schema.ts
import { pgTable, uuid, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "mobs", "armor", "weapon", "food", "misc",
]);

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  category: categoryEnum("category").notNull(),
  modelUrl: varchar("model_url", { length: 255 }).notNull(),
  dateAdded: timestamp("date_added").defaultNow().notNull(),
});



// Types for TypeScript
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

