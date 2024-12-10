import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull().unique(),
  email_verified: timestamp(),
  password: varchar({ length: 256 }).notNull(),
  ...timestamps,
});
