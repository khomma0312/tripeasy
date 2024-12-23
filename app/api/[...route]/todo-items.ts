import { db } from "@/lib/drizzle/db";
import {
  apiPostInputSchema,
  ApiPostOutputType,
} from "@/lib/zod/schema/todo-items";
import { todoItems } from "@/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono()
  .post("/", zValidator("json", apiPostInputSchema), async (c) => {
    const { todoListId, todoItem } = c.req.valid("json");

    // todoListIdに紐付けて新規追加を行う
    const [{ id }] = await db
      .insert(todoItems)
      .values({ ...todoItem, todoListId })
      .returning({ id: todoItems.id });

    return c.json<ApiPostOutputType>({ id });
  })
  .delete("/:id", async () => {});

export default app;
