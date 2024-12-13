import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email({
      message: "メールアドレスの形式で入力してください",
    }),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!-\/:-@[-`{-~])[!-~]+$/,
        "パスワードは半角英数字記号混合で入力してください"
      ),
  })
  .required();
