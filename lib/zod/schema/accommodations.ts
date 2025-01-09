import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonResponseConfig } from "./common";

// 宿泊施設を全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 宿泊施設を全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  accommodations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      address: z.string().optional(),
      checkIn: z.string(),
      checkOut: z.string(),
      image: z.string(),
      bookingUrl: z.string().optional(),
      bookingId: z.string().optional(),
    })
  ),
  totalPages: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

// 宿泊施設を全て返すGET APIのスキーマ
export const accommodationsAllGetApiSchema: RouteConfig = {
  method: "get",
  path: "/accommodations",
  summary:
    "ログイン中のユーザーに紐づく全ての予約した宿泊施設の取得(ページネーションもあり)",
  tags: ["accommodations"],
  request: {
    query: apiAllGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "予約した宿泊施設取得成功",
      content: {
        "application/json": { schema: apiAllGetOutputSchema },
      },
    },
  },
};
