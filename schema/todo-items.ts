import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { todoLists } from "./todo-lists";

export const todoItems = pgTable("todo_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  todoListId: integer().references(() => todoLists.id),
  title: varchar({ length: 256 }).notNull(),
  isCompleted: boolean().notNull().default(false),
  ...timestamps,
});
