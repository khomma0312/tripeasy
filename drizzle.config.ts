import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
