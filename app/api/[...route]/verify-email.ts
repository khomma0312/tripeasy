import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import {
  apiInputSchema,
  ApiErrorType,
  ApiOutputType,
} from "@/lib/zod/schema/verify-email";
import { db } from "@/lib/drizzle/db";
import { users } from "@/schema/users";
import { getVerificationTokenByToken } from "@/lib/auth/token";
import { getLogger } from "@/lib/logger";
import { getUserbyEmail } from "@/lib/auth/user";
import { verificationTokens } from "@/schema";

const logger = getLogger("api/verify-email");

const app = new Hono().post(
  "/",
  zValidator("json", apiInputSchema),
  async (c) => {
    const values = c.req.valid("json");
    const { token } = values;

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      logger.error("The submitted token is not found on DB.");
      return c.json<ApiErrorType>(
        { message: "送信されたトークンが誤っています" },
        400
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      logger.error("The submitted token has expired.");
      return c.json<ApiErrorType>(
        { message: "トークンの検証期限が過ぎています" },
        400
      );
    }

    const exisitingUser = await getUserbyEmail(existingToken.email);

    if (!exisitingUser) {
      logger.error("The user is not found on DB.");
      return c.json<ApiErrorType>(
        {
          message: "登録されたユーザーが見つかりませんでした",
        },
        404
      );
    }

    const [user] = await db
      .update(users)
      .set({ email_verified: new Date() })
      .where(eq(users.id, exisitingUser.id))
      .returning({ email: users.email });

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));

    return c.json<ApiOutputType>({ user });
  }
);

export default app;
