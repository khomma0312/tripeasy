import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { todoListTemplates } from "./todo-list-templates";

export const todoListTemplateItems = pgTable("todo_list_template_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  todoListId: integer().references(() => todoListTemplates.id),
  title: varchar({ length: 256 }).notNull(),
});
