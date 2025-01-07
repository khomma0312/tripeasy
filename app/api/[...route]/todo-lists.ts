import { Hono } from "hono";
import {
  ApiAllGetOutputType,
  ApiDeleteOutputType,
  ApiGetOutputType,
  apiPatchInputSchema,
  ApiPatchOutputType,
} from "@/lib/zod/schema/todo-lists";
import { db } from "@/lib/drizzle/db";
import {
  todoItems as todoItemsTable,
  todoLists as todoListsTable,
  trips,
} from "@/schema";
import { and, count, eq, sql } from "drizzle-orm";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { paginationDefaultLimit } from "@/consts/todo-lists";
import { zValidator } from "@hono/zod-validator";

const logger = getLogger("api/todo-lists");

const app = new Hono()
  .get("/", async (c) => {
    const session = await auth();
    const page = c.req.query("page") ? Number(c.req.query("page")) : 1;
    const perPage = c.req.query("perPage")
      ? Number(c.req.query("perPage"))
      : undefined;
    const limit = perPage ?? paginationDefaultLimit;
    const offset = limit * (page - 1);

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const subquery = db
      .select({
        id: todoListsTable.id,
        tripId: todoListsTable.tripId,
        title: todoListsTable.title,
        totalTasks: count(todoItemsTable).as("totalTasks"),
        completedTasks:
          sql`SUM(CASE WHEN ${todoItemsTable.isCompleted} = true THEN 1 ELSE 0 END)`
            .mapWith(Number)
            .as("completedTasks"),
      })
      .from(todoListsTable)
      .leftJoin(
        todoItemsTable,
        eq(todoListsTable.id, todoItemsTable.todoListId)
      )
      .where(eq(todoListsTable.userId, userId))
      .groupBy(todoListsTable.id)
      .as("tl_and_ti");

    const todoLists = await db
      .select({
        id: subquery.id,
        title: subquery.title,
        startDate: trips.startDate,
        totalTasks: subquery.totalTasks,
        completedTasks: subquery.completedTasks,
      })
      .from(trips)
      .innerJoin(subquery, eq(subquery.tripId, trips.id))
      .offset(offset)
      .limit(limit);

    const [totalCount] = await db
      .select({
        totalItem: count(subquery.id),
      })
      .from(subquery);

    const totalPages = Math.ceil(totalCount.totalItem / limit);

    return c.json<ApiAllGetOutputType>({
      todoLists: todoLists.map((todoList) => ({
        ...todoList,
        startDate: todoList.startDate ?? undefined,
      })),
      totalPages,
    });
  })
  .get("/:id", async (c) => {
    const session = await auth();
    // NOTE: zValidatorを使うとrouteが正しく認識されなくなるので、c.req.paramで取得している
    const todoListId = Number(c.req.param("id"));

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const [todoList] = await db
      .select()
      .from(todoListsTable)
      .where(
        and(
          eq(todoListsTable.id, todoListId),
          eq(todoListsTable.userId, userId)
        )
      );

    if (!todoList) {
      return c.json<ApiErrorType>(
        { message: "対象IDのTODOリストが存在しません" },
        404
      );
    }

    const [trip] = await db
      .select({ id: trips.id, title: trips.title, date: trips.startDate })
      .from(trips)
      .where(eq(trips.id, todoList.tripId));

    const todoItems = await db
      .select({
        id: todoItemsTable.id,
        title: todoItemsTable.title,
        dueDate: todoItemsTable.dueDate,
        isCompleted: todoItemsTable.isCompleted,
        order: todoItemsTable.order,
      })
      .from(todoItemsTable)
      .where(eq(todoItemsTable.todoListId, todoList.id))
      .orderBy(todoItemsTable.order);

    return c.json<ApiGetOutputType>({
      id: todoList.id,
      title: todoList.title,
      tripId: trip.id,
      tripTitle: trip.title,
      tripDate: trip.date ?? undefined,
      items: todoItems.map((item) => ({
        ...item,
        dueDate: item.dueDate ?? undefined,
      })),
    });
  })
  .post("/:id", async () => {})
  .patch("/:id", zValidator("json", apiPatchInputSchema), async (c) => {
    const session = await auth();
    const id = Number(c.req.param("id"));
    const { title } = c.req.valid("json");

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const [updatedTodoList] = await db
      .update(todoListsTable)
      .set({ title })
      .where(and(eq(todoListsTable.id, id), eq(todoListsTable.userId, userId)))
      .returning({ id: todoListsTable.id });

    if (!updatedTodoList) {
      return c.json<ApiErrorType>(
        { message: "更新対象の項目が見つかりませんでした" },
        404
      );
    }

    return c.json<ApiPatchOutputType>({ id: updatedTodoList.id });
  })
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

    const [deletedTodoList] = await db
      .delete(todoListsTable)
      .where(and(eq(todoListsTable.id, id), eq(todoListsTable.userId, userId)))
      .returning({ id: todoListsTable.id });

    if (!deletedTodoList) {
      return c.json<ApiErrorType>(
        { message: "削除対象の項目が見つかりませんでした" },
        404
      );
    }

    return c.json<ApiDeleteOutputType>({ id: deletedTodoList.id });
  });

export default app;
