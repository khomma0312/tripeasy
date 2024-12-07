import { pgTable, integer, varchar, text, date } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { users } from "./users";

export const trips = pgTable("trips", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  user_id: integer().references(() => users.id),
  title: varchar({ length: 256 }).notNull(),
  description: text(),
  startDate: date(),
  endDate: date(),
  ...timestamps,
});
