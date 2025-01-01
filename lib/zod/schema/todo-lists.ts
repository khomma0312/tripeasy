import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { todoItemSchema } from "./todo-items";
import { apiErrorSchema, commonResponseConfig } from "./common";

// Todoリストを全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

// Todoリストを全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  startDate: z.string().optional(),
  totalTasks: z.number(),
  completedTasks: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

// 単一のTodoリストを返すGET APIのinputパラメータのスキーマ
export const apiGetInputSchema = z.object({ id: z.number() });

// 単一のTodoリストを返すGET APIの成功時に返却されるoutputのスキーマ
export const apiGetOutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  tripId: z.number(),
  tripTitle: z.string(),
  tripDate: z.string().optional(),
  items: z.array(todoItemSchema),
});
export type ApiGetOutputType = z.infer<typeof apiGetOutputSchema>;

// Todoリストを全て返すGET APIのスキーマ
export const todoListAllGetApiSchema: RouteConfig = {
  method: "get",
  path: "/todo-lists",
  summary:
    "ログイン中のユーザーに紐づく全てのTODOリストの取得(ページネーションもあり)",
  tags: ["todo-lists"],
  request: {
    query: apiAllGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOリスト取得成功",
      content: {
        "application/json": { schema: apiAllGetOutputSchema },
      },
    },
  },
};

// 単一のTodoリストを返すGET APIのスキーマ
export const todoListGetApiSchema: RouteConfig = {
  method: "get",
  path: "/todo-lists/{id}",
  summary: "単一のTODOリストの取得",
  tags: ["todo-lists"],
  request: {
    params: apiGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOリスト取得成功",
      content: {
        "application/json": { schema: apiGetOutputSchema },
      },
    },
    404: {
      description: "TODOリストが存在しないので取得失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
