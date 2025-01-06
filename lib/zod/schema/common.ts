import { z } from "zod";

// APIのエラー時に返却されるoutputのスキーマ
export const apiErrorSchema = z.object({ message: z.string() });
export type ApiErrorType = z.infer<typeof apiErrorSchema>;

export const commonResponseConfig = {
  403: {
    description: "ユーザー検証に失敗",
    content: {
      "application/json": { schema: apiErrorSchema },
    },
  },
};
