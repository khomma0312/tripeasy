import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { trips } from "./trips";
import { users } from "./auth";

export const todoLists = pgTable("todo_lists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  title: varchar({ length: 256 }).notNull(),
  tripId: integer()
    .notNull()
    .references(() => trips.id),
  userId: text()
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
