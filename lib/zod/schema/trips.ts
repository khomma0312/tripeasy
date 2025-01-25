import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonResponseConfig } from "./common";

export const tripsForListSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// 旅行情報を全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 旅行情報を全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  trips: z.array(tripsForListSchema),
  totalPages: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

// 旅行情報を全て返すGET APIのスキーマ
export const tripsAllGetApiSchema: RouteConfig = {
  method: "get",
  path: "/trips",
  summary: "ログイン中のユーザーに紐づく全ての旅行情報の取得",
  tags: ["trips"],
  request: {
    query: apiAllGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "旅行情報取得成功",
      content: {
        "application/json": { schema: apiAllGetOutputSchema },
      },
    },
  },
};
