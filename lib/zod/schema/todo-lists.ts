import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { todoItemSchema } from "./todo-items";
import { apiErrorSchema, commonResponseConfig } from "./common";

// Todoリストを全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 単一のTodoリストを返すGET APIのinputパラメータのスキーマ
export const apiGetInputSchema = z.object({ id: z.number() });

// PATCH APIのinputパラメータのスキーマ
export const apiPatchInputSchema = z.object({ title: z.string() });
export type ApiPatchInputType = z.infer<typeof apiPatchInputSchema>;

// Todoリストを全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  todoLists: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      startDate: z.string().optional(),
      totalTasks: z.number(),
      completedTasks: z.number(),
    })
  ),
  totalPages: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

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

// PATCH APIの成功時に返却されるoutputのスキーマ
export const apiPatchOutputSchema = z.object({
  id: z.number(),
});
export type ApiPatchOutputType = z.infer<typeof apiPatchOutputSchema>;

// Todoリストを全て返すGET APIのスキーマ
export const todoListsAllGetApiSchema: RouteConfig = {
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
export const todoListsGetApiSchema: RouteConfig = {
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

// PATCH APIのスキーマ
export const todoListsPatchApiSchema: RouteConfig = {
  method: "patch",
  path: "/todo-lists/{id}",
  summary: "TODOリスト更新API",
  tags: ["todo-lists"],
  request: {
    params: z.object({ id: z.number() }),
    body: {
      content: {
        "application/json": { schema: apiPatchInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOリスト更新成功",
      content: {
        "application/json": { schema: apiPatchOutputSchema },
      },
    },
    500: {
      description: "TODOリスト更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
