import { Hono } from "hono";
import {
  ApiAllGetOutputType,
  ApiDeleteOutputType,
} from "@/lib/zod/schema/trips";
import { db } from "@/lib/drizzle/db";
import { trips as tripsTable } from "@/schema";
import { and, eq } from "drizzle-orm";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { paginationDefaultLimit } from "@/consts/common";
import { del } from "@vercel/blob";
// import { zValidator } from "@hono/zod-validator";

const logger = getLogger("api/trips");

const app = new Hono()
  .delete("/:id", async (c) => {
    const session = await auth();
    const tripId = Number(c.req.param("id"));

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    try {
      // 画像のURLを取得する
      const [trip] = await db
        .select({
          image: tripsTable.image,
        })
        .from(tripsTable)
        .where(and(eq(tripsTable.id, tripId), eq(tripsTable.userId, userId)));

      if (trip.image && trip.image.includes("public.blob.vercel-storage.com")) {
        logger.info("Deleting image...");
        await del(trip.image);
        logger.info("Image deleted successfully.");
      }
    } catch (e) {
      logger.error(e);
      return c.json<ApiErrorType>(
        {
          message: "画像の削除に失敗しました",
        },
        500
      );
    }

    try {
      const [deleted] = await db
        .delete(tripsTable)
        .where(and(eq(tripsTable.id, tripId), eq(tripsTable.userId, userId)))
        .returning({ id: tripsTable.id });
      return c.json<ApiDeleteOutputType>({ id: deleted.id });
    } catch (e) {
      logger.error(e);
      return c.json<ApiErrorType>(
        { message: "データの削除に失敗しました" },
        500
      );
    }
  })
  .get("/", async (c) => {
    const session = await auth();
    const page = c.req.query("page") ? Number(c.req.query("page")) : 1;
    const perPage = c.req.query("perPage")
      ? Number(c.req.query("perPage"))
      : undefined;
    // perPageに-1が指定された場合はすべて取得するので、デフォルト件数の適用から除外する
    const limit = perPage || perPage === -1 ? perPage : paginationDefaultLimit;
    const offset = limit * (page - 1);

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const baseQuery = db
      .select({
        id: tripsTable.id,
        title: tripsTable.title,
        image: tripsTable.image,
        destination: tripsTable.destination,
        startDate: tripsTable.startDate,
        endDate: tripsTable.endDate,
      })
      .from(tripsTable)
      .where(eq(tripsTable.userId, userId));

    // limitが-1の時はユーザーに紐づくtripsを全件取得、それ以外はoffset, limitに合わせて取得
    const trips =
      limit === -1
        ? await baseQuery
        : await baseQuery.offset(offset).limit(limit);

    const totalCount = trips.length;
    const totalPages = limit === -1 ? 1 : Math.ceil(totalCount / limit);

    return c.json<ApiAllGetOutputType>({
      trips: trips.map((trip) => ({
        ...trip,
        image: trip.image ?? undefined,
        destination: trip.destination ?? undefined,
        startDate: trip.startDate ?? undefined,
        endDate: trip.endDate ?? undefined,
      })),
      totalPages,
    });
  });

export default app;
