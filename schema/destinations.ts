import { pgTable, integer, text, point } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";
import { users } from "./auth";

export const destinations = pgTable("destinations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: text().notNull(),
  address: text(),
  imageUrl: text("image_url"),
  latLng: point("lat_lng", { mode: "xy" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});
