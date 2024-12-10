import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  apiInputSchema,
  ApiErrorType,
  ApiOutputType,
} from "@/lib/zod/schema/request-token";
import { getLogger } from "@/lib/logger";
import { getUserbyEmail } from "@/lib/auth/user";
import { generateVerificationToken } from "@/lib/auth/token";
import { sendVerificationEmail } from "@/lib/mail/sender";

const logger = getLogger("api/request-token");

const app = new Hono().post(
  "/",
  zValidator("json", apiInputSchema),
  async (c) => {
    const values = c.req.valid("json");
    const { email } = values;

    const exisitingUser = await getUserbyEmail(email);

    if (!exisitingUser) {
      logger.error("The user is not found on DB.");
      return c.json<ApiErrorType>(
        {
          message: "登録されたユーザーが見つかりませんでした",
        },
        404
      );
    }

    if (exisitingUser.emailVerified) {
      logger.error("The email is already verified.");
      return c.json<ApiErrorType>(
        {
          message: "対象のメールは認証済みです",
        },
        400
      );
    }

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

    return c.json<ApiOutputType>({ message: "トークンの生成に成功しました" });
  }
);

export default app;
