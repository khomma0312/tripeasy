import { registerPostApiSchema } from "./register";
import { requestTokenPostApiSchema } from "./request-token";
import {
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsDeleteApiSchema,
} from "./todo-items";
import { todoListGetApiSchema } from "./todo-lists";
import { verifyEmailPostApiSchema } from "./verify-email";

// APIパスを追加するごとに、この変数にzodスキーマを追加する
export const pathSchemas = [
  registerPostApiSchema,
  verifyEmailPostApiSchema,
  requestTokenPostApiSchema,
  todoItemsPostApiSchema,
  todoItemsPatchApiSchema,
  todoItemsDeleteApiSchema,
  todoListGetApiSchema,
];
