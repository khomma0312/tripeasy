import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { todoItemSchema } from "./todo-items";

// GET APIの成功時に返却されるoutputのスキーマ
export const apiGetOutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  tripId: z.number(),
  tripTitle: z.string(),
  tripDate: z.string().optional(),
  items: z.array(todoItemSchema),
});
export type ApiGetOutputType = z.infer<typeof apiGetOutputSchema>;

// APIのエラー時に返却されるoutputのスキーマ
export const apiErrorSchema = z.object({ message: z.string() });
export type ApiErrorType = z.infer<typeof apiErrorSchema>;

// GET APIのスキーマ
export const todoListGetApiSchema: RouteConfig = {
  method: "get",
  path: "/todo-lists/{id}",
  summary: "単一のTODOリストの取得",
  tags: ["todo-lists"],
  request: {
    params: z.object({ id: z.number() }),
  },
  responses: {
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
