import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";

export const accommodationForListSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  address: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  bookingUrl: z.string().optional(),
  bookingId: z.string().optional(),
});

export const accommodationForDetailSchema = z.object({
  id: z.number(),
  tripId: z.number(),
  name: z.string(),
  image: z.string(),
  address: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  reservationPrice: z.number().optional(),
  notes: z.string().optional(),
  bookingUrl: z.string().optional(),
  tripAdvisorUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
});

// 宿泊施設を全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 単一の宿泊施設を返すGET APIのinputパラメータのスキーマ
export const apiGetInputSchema = z.object({ id: z.number() });

// 宿泊施設を全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  accommodations: z.array(accommodationForListSchema),
  totalPages: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

// 単一の宿泊施設を返すGET APIの成功時に返却されるoutputのスキーマ
export const apiGetOutputSchema = z.object({
  accommodation: accommodationForDetailSchema,
});
export type ApiGetOutputType = z.infer<typeof apiGetOutputSchema>;

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

// 宿泊施設を全て返すGET APIのスキーマ
export const accommodationsGetApiSchema: RouteConfig = {
  method: "get",
  path: "/accommodations/{id}",
  summary: "単一の宿泊施設の取得",
  tags: ["accommodations"],
  request: {
    params: apiGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "予約した宿泊施設取得成功",
      content: {
        "application/json": { schema: apiGetOutputSchema },
      },
    },
    404: {
      description: "宿泊施設が存在しないので取得失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
