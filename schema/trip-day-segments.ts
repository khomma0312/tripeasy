import { pgTable, integer, text, date } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { users } from "./auth";
import { trips } from "./trips";

export const tripDaySegments = pgTable("trip_day_segments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  dayOrder: integer("day_order").notNull(),
  dayDate: date("day_date").notNull(),
  description: text(),
  tripId: integer("trip_id")
    .notNull()
    .references(() => trips.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
