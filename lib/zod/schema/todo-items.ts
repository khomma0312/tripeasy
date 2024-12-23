import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// TODOアイテム新規追加フォームの項目
export const todoItemAddSchema = z.object({
  title: z.string().min(1, "やることを入力してください"),
  dueDate: z.date().optional(),
});

// TODOアイテムが持つ項目
export const todoItemSchema = z.object({
  id: z.number().nullable(),
  title: z.string(),
  dueDate: z.string().optional(),
  isCompleted: z.boolean(),
  order: z.number(),
});

// POST APIのinputパラメータのスキーマ
export const apiPostInputSchema = z.object({
  todoListId: z.number(),
  todoItem: todoItemSchema.omit({ id: true }),
});
export type ApiPostInputType = z.infer<typeof apiPostInputSchema>;

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// APIのエラー時に返却されるoutputのスキーマ
export const apiErrorSchema = z.object({ message: z.string() });
export type ApiErrorType = z.infer<typeof apiErrorSchema>;

// POST APIのスキーマ
export const todoItemsPostApiSchema: RouteConfig = {
  method: "post",
  path: "/todo-items",
  summary: "TODOアイテム新規作成、更新API",
  tags: ["todo-items"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiPostInputSchema },
      },
    },
  },
  responses: {
    200: {
      description: "TODOアイテム作成、更新成功",
      content: {
        "application/json": { schema: apiPostOutputSchema },
      },
    },
    500: {
      description: "TODOアイテム作成、更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
