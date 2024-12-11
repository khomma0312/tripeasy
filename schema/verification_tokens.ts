import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    email: varchar({ length: 256 }).notNull(),
    token: text().notNull(),
    expires: timestamp().notNull(),
  },
  (t) => [unique().on(t.email, t.token)]
);
