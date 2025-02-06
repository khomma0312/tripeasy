import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";

export const tripFormSchema = z.object({
  title: z.string(),
  destination: z.string().optional(),
  startDate: z.date({ message: "開始日付を入力してください" }),
  endDate: z.date({ message: "終了日付を入力してください" }),
});

export const tripInputSchema = tripFormSchema.extend({
  startDate: z.string(),
  endDate: z.string(),
});

export const tripForListSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional(),
  destination: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
});

export const tripItemSchema = z.object({});

export const tripForDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional(),
  destination: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  tripItems: z.array(tripItemSchema),
  todoIds: z.array(z.number()),
  accommodationIds: z.array(z.number()),
});

export const apiPostInputSchema = z.object({
  trip: tripInputSchema,
});
export type ApiPostInputType = z.infer<typeof apiPostInputSchema>;

// 旅行情報を全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 単一の旅程情報を返すGET APIのinputパラメータのスキーマ
export const apiParamsInputSchema = z.object({ id: z.number() });

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// DELETE APIの成功時に返却されるoutputのスキーマ
export const apiDeleteOutputSchema = z.object({
  id: z.number(),
});
export type ApiDeleteOutputType = z.infer<typeof apiDeleteOutputSchema>;

// POST APIのスキーマ
export const tripsPostApiSchema: RouteConfig = {
  method: "post",
  path: "/trips",
  summary: "旅程情報新規作成API",
  tags: ["trips"],
  request: {
    params: apiParamsInputSchema,
    body: {
      content: {
        "application/json": { schema: apiPostInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "旅程情報作成成功",
      content: {
        "application/json": { schema: apiPostOutputSchema },
      },
    },
    500: {
      description: "旅程情報作成に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// DELETE APIのスキーマ
export const tripsDeleteApiSchema: RouteConfig = {
  method: "delete",
  path: "/trips/{id}",
  summary: "旅程情報削除API",
  tags: ["trips"],
  request: {
    params: apiParamsInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "旅程情報削除成功",
      content: {
        "application/json": { schema: apiDeleteOutputSchema },
      },
    },
    500: {
      description: "旅程情報削除に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// 旅行情報を全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  trips: z.array(tripForListSchema),
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
