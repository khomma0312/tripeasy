import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull(),
  password: varchar({ length: 256 }).notNull(),
  ...timestamps,
});
