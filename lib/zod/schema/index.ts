import { registerPostApiSchema } from "./register";
import { requestTokenPostApiSchema } from "./request-token";
import {
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsDeleteApiSchema,
  todoItemsPatchIsCompletedApiSchema,
} from "./todo-items";
import { todoListAllGetApiSchema, todoListGetApiSchema } from "./todo-lists";
import { verifyEmailPostApiSchema } from "./verify-email";

// NOTE: APIパスを追加するごとに、この変数にzodスキーマを追加する
export const pathSchemas = [
  registerPostApiSchema,
  verifyEmailPostApiSchema,
  requestTokenPostApiSchema,
  // Todoアイテム用API
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsPatchIsCompletedApiSchema,
  todoItemsDeleteApiSchema,
  todoListAllGetApiSchema,
  todoListGetApiSchema,
];
