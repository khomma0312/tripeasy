import { users } from "@/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";

export const getUserbyEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
};
