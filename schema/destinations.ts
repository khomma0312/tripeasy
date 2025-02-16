import {
  pgTable,
  integer,
  text,
  date,
  varchar,
  point,
} from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { users } from "./auth";

export const destinations = pgTable("destinations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: text().notNull(),
  address: text(),
  googleLocationId: varchar("google_location_id", { length: 256 }),
  latLng: point("lat_lng", { mode: "xy" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
