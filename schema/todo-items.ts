import {
  pgTable,
  integer,
  varchar,
  boolean,
  date,
  text,
} from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { todoLists } from "./todo-lists";
import { users } from "./auth";

export const todoItems = pgTable("todo_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  todoListId: integer().references(() => todoLists.id),
  title: varchar({ length: 256 }).notNull(),
  dueDate: date(),
  isCompleted: boolean().notNull().default(false),
  order: integer().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
