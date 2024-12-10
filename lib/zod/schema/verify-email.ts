import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// APIのinputパラメータのスキーマ
export const apiInputSchema = z.object({
  token: z.string(),
});

export type ApiInputType = z.infer<typeof apiInputSchema>;

// APIの成功時に返却されるoutputのスキーマ
export const apiOutputSchema = z.object({
  user: z.object({
    email: z.string(),
  }),
});

export type ApiOutputType = z.infer<typeof apiOutputSchema>;

// APIのエラー時に返却されるoutputのスキーマ
export const apiErrorSchema = z.object({ message: z.string() });

export type ApiErrorType = z.infer<typeof apiErrorSchema>;

// POST APIのスキーマ
export const verifyEmailPostApiSchema: RouteConfig = {
  method: "post",
  path: "/verify-email",
  summary: "メール検証API",
  tags: ["verify-email"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiInputSchema },
      },
    },
  },
  responses: {
    200: {
      description: "メール検証成功",
      content: {
        "application/json": { schema: apiOutputSchema },
      },
    },
    400: {
      description: "有効なトークンでないので検証失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    404: {
      description: "対象のリソースが見つからないので検証失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
