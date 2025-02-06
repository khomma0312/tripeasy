import { z } from "zod";
import {
  todoListForDetailSchema,
  todoListForListSchema,
} from "@/lib/zod/schema/todo-lists";
import { todoItemForDetailSchema } from "@/lib/zod/schema/todo-items";

export type TodoListForCard = z.infer<typeof todoListForListSchema>;

export type TodoList = z.infer<typeof todoListForDetailSchema>;

export type TodoItem = z.infer<typeof todoItemForDetailSchema>;
