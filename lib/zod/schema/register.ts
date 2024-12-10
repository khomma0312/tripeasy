import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// フォームの入力項目のスキーマ
export const signUpSchema = z
  .object({
    name: z.string(),
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
    confirmPassword: z.string(),
  })
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });

// APIのinputパラメータのスキーマ
export const apiInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type ApiInputType = z.infer<typeof apiInputSchema>;

// APIの成功時に返却されるoutputのスキーマ
export const apiOutputSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type ApiOutputType = z.infer<typeof apiOutputSchema>;

// APIのエラー時に返却されるoutputのスキーマ
export const apiErrorSchema = z.object({ message: z.string() });

export type ApiErrorType = z.infer<typeof apiErrorSchema>;

// export const registerComponentSchemas = [
//   {
//     name: "AuthParams",
//     properties: apiInputSchema,
//   },
//   {
//     name: "User",
//     properties: apiOutputSchema,
//   },
//   {
//     name: "Response409",
//     properties: apiErrorSchema,
//   },
// ];

// POST APIのスキーマ
export const registerPostApiSchema: RouteConfig = {
  method: "post",
  path: "/register",
  summary: "新規ユーザー登録API",
  tags: ["register"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiInputSchema },
      },
    },
  },
  responses: {
    200: {
      description: "新規ユーザー登録成功",
      content: {
        "application/json": { schema: apiOutputSchema },
      },
    },
    409: {
      description: "登録済みのメールアドレスにつき登録失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
