import { z } from "zod";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { apiErrorSchema } from "./common";

// 目的地のスキーマ
export const destinationSchema = z.object({
  name: z.string(),
  address: z.string(),
  imageUrl: z.string().optional(),
  placeId: z.string().optional(),
  latLng: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

// 目的地検索ページのフォームの項目
export const destinationSearchFormSchema = z.object({
  searchTerm: z.string({ message: "目的地を入力してください" }),
});

// 目的地の検索結果を返すGET APIのinputパラメータのスキーマ
export const apiSearchGetInputSchema = z.object({
  searchTerm: z.string(),
  searchByPlaceId: z.boolean(),
});

export type ApiSearchGetInputType = z.infer<typeof apiSearchGetInputSchema>;

// 目的地の検索結果を返すGET APIの成功時に返却されるoutputのスキーマ
export const apiSearchGetOutputSchema = z.object({
  destinations: z.array(destinationSchema),
  nextPageToken: z.string().optional(),
});
export type ApiSearchGetOutputType = z.infer<typeof apiSearchGetOutputSchema>;

// 目的地の検索結果を返すGET APIのスキーマ
export const destinationsSearchGetApiSchema: RouteConfig = {
  method: "get",
  path: "/destinations/search",
  summary: "外部APIを使用して目的地の検索結果の取得",
  tags: ["destinations", "orval-exclude"],
  request: {
    query: apiSearchGetInputSchema,
  },
  responses: {
    200: {
      description: "目的地検索結果取得成功",
      content: {
        "application/json": { schema: apiSearchGetOutputSchema },
      },
    },
    400: {
      description: "不正なリクエストのため失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
