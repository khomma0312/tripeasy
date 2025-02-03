import { pgTable, integer, varchar, text, date } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { users } from "./auth";

export const trips = pgTable("trips", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  userId: text()
    .notNull()
    .references(() => users.id),
  title: varchar({ length: 256 }).notNull(),
  image: text(),
  destination: text(),
  startDate: date().notNull(),
  endDate: date().notNull(),
  ...timestamps,
});
