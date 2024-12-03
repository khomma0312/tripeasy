import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { apiOutputSchema, apiInputSchema } from "@/lib/zod/schema/register";
import { db } from "@/lib/drizzle/db";
import { users } from "@/schema/users";
import { getHashedPassword } from "@/utils/auth";

const app = new Hono().post(
  "/",
  zValidator("json", apiInputSchema),
  async (c) => {
    const values = c.req.valid("json");
    const hashedPassword = await getHashedPassword(values.password);

    // メールアドレスに重複がないかを確認する
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email));

    if (foundUsers.length > 0) {
      return c.json({ error: "すでに登録済みのメールアドレスです" }, 409);
    }

    const [user] = await db
      .insert(users)
      .values({
        ...values,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
      });

    const data = apiOutputSchema.parse(user);

    return c.json({ data });
  }
);

export default app;
