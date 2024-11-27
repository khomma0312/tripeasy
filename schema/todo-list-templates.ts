import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";

export const todoListTemplates = pgTable("todo_list_templates", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  title: varchar({ length: 256 }).notNull(),
  description: text(),
});
