import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { apiInputSchema, ApiOutputType } from "@/lib/zod/schema/register";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { db } from "@/lib/drizzle/db";
import { users } from "@/schema";
import { getHashedPassword } from "@/utils/auth";
import { generateVerificationToken } from "@/lib/auth/token";
import { sendVerificationEmail } from "@/lib/mail/sender";
import { getLogger } from "@/lib/logger";

const logger = getLogger("api/register");

const app = new Hono().post(
  "/",
  zValidator("json", apiInputSchema),
  async (c) => {
    const values = c.req.valid("json");
    const { email, password } = values;
    const hashedPassword = await getHashedPassword(password);

    // メールアドレスに重複がないかを確認する
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (foundUsers.length > 0) {
      logger.error("The target email address is already registered.");
      return c.json<ApiErrorType>(
        { message: "すでに登録済みのメールアドレスです" },
        409
      );
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

    const verificationToken = await generateVerificationToken(email);

    if (!verificationToken) {
      logger.error("verificationToken may be null or undefined.");
      return c.json<ApiErrorType>(
        {
          message: "メール認証用トークンの生成に失敗しました",
        },
        500
      );
    }

    const { error } = await sendVerificationEmail(email, verificationToken);

    if (error) {
      logger.error(error.message);
      return c.json<ApiErrorType>({ message: "メール送信に失敗しました" }, 500);
    }

    return c.json<ApiOutputType>({ user });
  }
);

export default app;
