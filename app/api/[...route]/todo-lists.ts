import { Hono } from "hono";
import { ApiErrorType, ApiGetOutputType } from "@/lib/zod/schema/todo-lists";
import { db } from "@/lib/drizzle/db";
import { todoItems as todoItemsTable, todoLists, trips } from "@/schema";
import { eq } from "drizzle-orm";
import { getLogger } from "@/lib/logger";

const logger = getLogger("api/todo-lists");

const app = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "Todo Lists" });
  })
  .get("/:id", async (c) => {
    const todoListId = Number(c.req.param("id"));

    const [todoList] = await db
      .select()
      .from(todoLists)
      .where(eq(todoLists.id, todoListId));

    if (!todoList) {
      return c.json<ApiErrorType>(
        { message: "対象IDのTODOリストが存在しません" },
        404
      );
    }

    const [trip] = await db
      .select({ id: trips.id, title: trips.title, date: trips.startDate })
      .from(trips)
      .where(eq(trips.todoListId, todoList.id));

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
  .patch("/:id", async () => {})
  .delete("/:id", async () => {});

export default app;
