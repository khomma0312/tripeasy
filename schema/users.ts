import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/drizzle/columns-helpers";

// 認証情報系のデータはAuth.js or Clerk側に持たせる
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar({ length: 256 }).notNull(),
  ...timestamps,
});
