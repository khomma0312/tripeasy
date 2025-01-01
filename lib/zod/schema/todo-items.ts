import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";

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

// PATCH APIのinputパラメータのスキーマ
export const apiPatchInputSchema = todoItemSchema.pick({
  title: true,
  dueDate: true,
});
export type ApiPatchInputType = z.infer<typeof apiPatchInputSchema>;

// isCompletedを変更するPATCH APIのinputパラメータのスキーマ
export const apiPatchIsCompletedInputSchema = todoItemSchema.pick({
  isCompleted: true,
});
export type ApiPatchIsCompletedInputType = z.infer<
  typeof apiPatchIsCompletedInputSchema
>;

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// PATCH APIの成功時に返却されるoutputのスキーマ
export const apiPatchOutputSchema = z.object({
  id: z.number(),
});
export type ApiPatchOutputType = z.infer<typeof apiPatchOutputSchema>;

// DELETE APIの成功時に返却されるoutputのスキーマ
export const apiDeleteOutputSchema = z.object({
  id: z.number(),
});
export type ApiDeleteOutputType = z.infer<typeof apiDeleteOutputSchema>;

// POST APIのスキーマ
export const todoItemsPostApiSchema: RouteConfig = {
  method: "post",
  path: "/todo-items",
  summary: "TODOアイテム新規作成API",
  tags: ["todo-items"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiPostInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOアイテム作成成功",
      content: {
        "application/json": { schema: apiPostOutputSchema },
      },
    },
    500: {
      description: "TODOアイテム作成に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// PATCH APIのスキーマ
export const todoItemsPatchApiSchema: RouteConfig = {
  method: "patch",
  path: "/todo-items/{id}",
  summary: "TODOアイテム更新API",
  tags: ["todo-items"],
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
      description: "TODOアイテム更新成功",
      content: {
        "application/json": { schema: apiPatchOutputSchema },
      },
    },
    500: {
      description: "TODOアイテム更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// isCompletedを変更するPATCH APIのスキーマ
export const todoItemsPatchIsCompletedApiSchema: RouteConfig = {
  method: "patch",
  path: "/todo-items/is-completed/{id}",
  summary: "TODOアイテムのisCompletedの更新API",
  tags: ["todo-items"],
  request: {
    params: z.object({ id: z.number() }),
    body: {
      content: {
        "application/json": { schema: apiPatchIsCompletedInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOアイテム更新成功",
      content: {
        "application/json": { schema: apiPatchOutputSchema },
      },
    },
    500: {
      description: "TODOアイテム更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// DELETE APIのスキーマ
export const todoItemsDeleteApiSchema: RouteConfig = {
  method: "delete",
  path: "/todo-items/{id}",
  summary: "TODOアイテム削除API",
  tags: ["todo-items"],
  request: {
    params: z.object({ id: z.number() }),
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "TODOアイテム削除成功",
      content: {
        "application/json": { schema: apiDeleteOutputSchema },
      },
    },
    500: {
      description: "TODOアイテム削除に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
