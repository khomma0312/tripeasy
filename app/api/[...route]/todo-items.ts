import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle/db";
import { ApiErrorType } from "@/lib/zod/schema/common";
import {
  ApiDeleteOutputType,
  apiPatchInputSchema,
  apiPatchIsCompletedInputSchema,
  ApiPatchOutputType,
  apiPostInputSchema,
  ApiPostOutputType,
} from "@/lib/zod/schema/todo-items";
import { todoItems } from "@/schema";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .post("/", zValidator("json", apiPostInputSchema), async (c) => {
    const session = await auth();
    const { todoListId, todoItem } = c.req.valid("json");

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    // todoListIdに紐付けて新規追加を行う
    const [addedTodo] = await db
      .insert(todoItems)
      .values({ ...todoItem, todoListId, userId })
      .returning({ id: todoItems.id });

    if (!addedTodo) {
      return c.json<ApiErrorType>({ message: "項目の追加に失敗しました" }, 500);
    }

    return c.json<ApiPostOutputType>({ id: addedTodo.id });
  })
  .patch("/:id", zValidator("json", apiPatchInputSchema), async (c) => {
    const session = await auth();
    const id = Number(c.req.param("id"));
    const { title, dueDate } = c.req.valid("json");

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const [updatedTodo] = await db
      .update(todoItems)
      .set({ title, dueDate })
      .where(and(eq(todoItems.id, id), eq(todoItems.userId, userId)))
      .returning({ id: todoItems.id });

    if (!updatedTodo) {
      return c.json<ApiErrorType>(
        { message: "更新対象の項目が見つかりませんでした" },
        404
      );
    }

    return c.json<ApiPatchOutputType>({ id: updatedTodo.id });
  })
  .patch(
    "/is-completed/:id",
    zValidator("json", apiPatchIsCompletedInputSchema),
    async (c) => {
      const session = await auth();
      const id = Number(c.req.param("id"));
      const { isCompleted } = c.req.valid("json");

      if (!session?.user) {
        return c.json<ApiErrorType>(
          { message: "ユーザー認証されていません" },
          403
        );
      }

      const userId = session.user.id ?? "";

      const [updatedTodo] = await db
        .update(todoItems)
        .set({ isCompleted })
        .where(and(eq(todoItems.id, id), eq(todoItems.userId, userId)))
        .returning({ id: todoItems.id });

      if (!updatedTodo) {
        return c.json<ApiErrorType>(
          { message: "更新対象の項目が見つかりませんでした" },
          404
        );
      }

      return c.json<ApiPatchOutputType>({ id: updatedTodo.id });
    }
  )
  .delete("/:id", async (c) => {
    const session = await auth();
    const id = Number(c.req.param("id"));

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const [deletedTodo] = await db
      .delete(todoItems)
      .where(and(eq(todoItems.id, id), eq(todoItems.userId, userId)))
      .returning({ id: todoItems.id });

    if (!deletedTodo) {
      return c.json<ApiErrorType>(
        { message: "削除対象の項目が見つかりませんでした" },
        404
      );
    }

    return c.json<ApiDeleteOutputType>({ id: deletedTodo.id });
  });

export default app;
