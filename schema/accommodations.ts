import {
  pgTable,
  integer,
  varchar,
  text,
  date,
  point,
} from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { trips } from "./trips";
import { users } from "./auth";

export const accommodations = pgTable("accommodations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar({ length: 256 }).notNull(),
  image: text().notNull(),
  address: text(),
  checkIn: date().notNull(),
  checkOut: date().notNull(),
  reservationPrice: integer(),
  notes: text(),
  bookingUrl: text(),
  tripAdvisorUrl: text(),
  phoneNumber: varchar({ length: 256 }),
  latLng: point("latLng", { mode: "xy" }),
  tripId: integer()
    .notNull()
    .references(() => trips.id),
  userId: text()
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
