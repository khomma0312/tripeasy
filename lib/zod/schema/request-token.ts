import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema } from "./common";

// フォームの入力項目のスキーマ
export const requestTokenSchema = z
  .object({
    email: z.string().email({
      message: "メールアドレスの形式で入力してください",
    }),
  })
  .required();

// APIのinputパラメータのスキーマ
export const apiInputSchema = z.object({
  email: z.string(),
});

export type ApiInputType = z.infer<typeof apiInputSchema>;

// APIの成功時に返却されるoutputのスキーマ
export const apiOutputSchema = z.object({
  message: z.string(),
});

export type ApiOutputType = z.infer<typeof apiOutputSchema>;

// POST APIのスキーマ
export const requestTokenPostApiSchema: RouteConfig = {
  method: "post",
  path: "/request-token",
  summary: "トークンの再発行API",
  tags: ["request-token"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiInputSchema },
      },
    },
  },
  responses: {
    200: {
      description: "トークンの発行成功",
      content: {
        "application/json": { schema: apiOutputSchema },
      },
    },
    400: {
      description: "メールアドレスがすでに認証済みのため失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    404: {
      description: "メールアドレスが未登録のため失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    500: {
      description: "トークンの生成に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
