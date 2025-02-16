import { pgTable, integer, text, time } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { tripDaySegments } from "./trip-day-segments";
import { users } from "./auth";
import { destinations } from "./destinations";

export const tripRoutePoints = pgTable("trip_route_points", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  visitOrder: integer("visit_order").notNull(),
  arrivalTime: time("arrival_time").notNull(),
  departureTime: time("departure_time").notNull(),
  tripDaySegmentId: integer("trip_day_segment_id")
    .notNull()
    .references(() => tripDaySegments.id),
  destinationId: integer("destination_id")
    .notNull()
    .references(() => destinations.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
