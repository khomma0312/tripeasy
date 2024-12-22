import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";

export const todoLists = pgTable("todo_lists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  title: varchar({ length: 256 }).notNull(),
  ...timestamps,
});
