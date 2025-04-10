import { Hono } from "hono";
import {
  ApiAllGetOutputType,
  ApiDeleteOutputType,
  ApiGetOutputType,
  apiPostInputSchema,
  ApiPostOutputType,
  tripDaySchema,
  tripForDetailSchema,
} from "@/lib/zod/schema/trips";
import { db } from "@/lib/drizzle/db";
import {
  trips as tripsTable,
  tripDaySegments as tripDaySegmentsTable,
  tripRoutePoints as tripRoutePointsTable,
  destinations as destinationsTable,
  todoLists as todoListsTable,
  accommodations as accommodationsTable,
} from "@/schema";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { paginationDefaultLimit } from "@/consts/common";
import { del } from "@vercel/blob";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { differenceInDays } from "date-fns";
import { format, addDays } from "date-fns";

const logger = getLogger("api/trips");

const app = new Hono()
  .post("/", zValidator("json", apiPostInputSchema), async (c) => {
    const session = await auth();
    const { trip } = c.req.valid("json");

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    try {
      const [addedTrip] = await db
        .insert(tripsTable)
        .values({
          ...trip,
          userId,
        })
        .returning({ id: tripsTable.id });

      // tripDayも旅行日数分追加しておく
      // 旅行日数はtripのstartDateとendDateから計算する
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      const diffDays = differenceInDays(endDate, startDate);

      // 単一のクエリで複数レコードを挿入
      const tripDaysToInsert = Array.from({ length: diffDays }, (_, i) => ({
        tripId: addedTrip.id,
        dayOrder: i + 1,
        dayDate: format(addDays(startDate, i), "yyyy-MM-dd"),
        userId,
      }));

      await db.insert(tripDaySegmentsTable).values(tripDaysToInsert);

      return c.json<ApiPostOutputType>({ id: addedTrip.id });
    } catch (e) {
      logger.error(e);
      return c.json<ApiErrorType>(
        { message: "データの登録に失敗しました" },
        500
      );
    }
  })
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
        : await baseQuery
            .offset(offset)
            .limit(limit)
            .orderBy(desc(tripsTable.id));

    const totalCount = trips.length;
    const totalPages = limit === -1 ? 1 : Math.ceil(totalCount / limit);

    // TODO: 東北、関東、関西などエリアに分けて適当に所定の画像を返すようにしてもいいかも
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
  })
  .get("/:id", async (c) => {
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

    // tripに紐づくtodoとaccommodationのIDを取得
    const tripRows = await db
      .select({
        todoId: todoListsTable.id,
        accommodationId: accommodationsTable.id,
      })
      .from(tripsTable)
      .leftJoin(todoListsTable, eq(tripsTable.id, todoListsTable.tripId))
      .leftJoin(
        accommodationsTable,
        eq(tripsTable.id, accommodationsTable.tripId)
      )
      .where(and(eq(tripsTable.id, tripId), eq(tripsTable.userId, userId)));

    const accommodationIds = tripRows
      .map((trip) => trip.accommodationId)
      .filter((id) => id !== null);
    const todoIds = tripRows
      .map((trip) => trip.todoId)
      .filter((id) => id !== null);

    // 目的地のルートポイントを取得
    const destinationRoutePoints = await db
      .select({
        id: tripRoutePointsTable.id,
        name: destinationsTable.name,
        address: destinationsTable.address,
        latLng: destinationsTable.latLng,
        visitOrder: tripRoutePointsTable.visitOrder,
        arrivalTime: tripRoutePointsTable.arrivalTime,
        departureTime: tripRoutePointsTable.departureTime,
        tripDaySegmentId: tripRoutePointsTable.tripDaySegmentId,
        imageUrl: destinationsTable.imageUrl,
        accommodationId: tripRoutePointsTable.accommodationId, // HACK: 必ずnullになる想定だが型を合わせるために取得している
      })
      .from(tripRoutePointsTable)
      .innerJoin(
        destinationsTable,
        eq(tripRoutePointsTable.destinationId, destinationsTable.id)
      )
      .where(
        and(
          eq(tripRoutePointsTable.userId, userId),
          isNotNull(tripRoutePointsTable.destinationId)
        )
      );

    // 宿泊施設のルートポイントを取得
    const accommodationRoutePoints = await db
      .select({
        id: tripRoutePointsTable.id,
        name: accommodationsTable.name,
        address: accommodationsTable.address,
        latLng: accommodationsTable.latLng,
        visitOrder: tripRoutePointsTable.visitOrder,
        arrivalTime: tripRoutePointsTable.arrivalTime,
        departureTime: tripRoutePointsTable.departureTime,
        tripDaySegmentId: tripRoutePointsTable.tripDaySegmentId,
        imageUrl: accommodationsTable.image,
        accommodationId: tripRoutePointsTable.accommodationId,
      })
      .from(tripRoutePointsTable)
      .innerJoin(
        accommodationsTable,
        eq(tripRoutePointsTable.accommodationId, accommodationsTable.id)
      )
      .where(
        and(
          eq(tripRoutePointsTable.userId, userId),
          isNotNull(tripRoutePointsTable.accommodationId)
        )
      );

    // 両方の結果をマージ
    const allRoutePoints = [
      ...destinationRoutePoints,
      ...accommodationRoutePoints,
    ];

    // tripとそれに紐づくtripDayを取得
    const tripAndDays = await db
      .select({
        trip: tripsTable,
        tripDays: tripDaySegmentsTable,
      })
      .from(tripsTable)
      .leftJoin(
        tripDaySegmentsTable,
        eq(tripsTable.id, tripDaySegmentsTable.tripId)
      )
      .where(and(eq(tripsTable.id, tripId), eq(tripsTable.userId, userId)));

    // 結果を整形するための構造を作成
    const result = tripAndDays.map((item) => ({
      trip: item.trip,
      tripDays: item.tripDays,
      tripRoutePoints:
        allRoutePoints.find(
          (point) => point.tripDaySegmentId === item.tripDays?.id
        ) || null,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const reducedResultSchema = tripForDetailSchema.extend({
      tripDays: z.record(z.number(), tripDaySchema),
    });

    type ReducedResult = z.infer<typeof reducedResultSchema>;

    // tripのデータをレスポンス用に整形
    const trip = result.reduce(
      (acc, cur) => {
        const tripInfo = {
          id: cur.trip.id,
          title: cur.trip.title,
          startDate: cur.trip.startDate,
          endDate: cur.trip.endDate,
          todoIds: todoIds ?? undefined,
          accommodationIds: accommodationIds ?? undefined,
          destination: cur.trip.destination ?? undefined,
          image: cur.trip.image ?? undefined,
        };

        if (!cur.tripDays) {
          return {
            ...tripInfo,
            tripDays: { ...acc.tripDays },
          };
        }

        // 現在の日付に関連するすべてのルートポイントを取得
        const dayRoutePoints = cur.tripDays
          ? allRoutePoints.filter(
              (point) => point.tripDaySegmentId === cur.tripDays?.id
            )
          : [];

        return {
          ...tripInfo,
          tripDays: {
            ...acc.tripDays,
            [cur.tripDays.id]: {
              dayOrder: cur.tripDays.dayOrder,
              dayDate: cur.tripDays.dayDate,
              tripDayId: cur.tripDays.id,
              tripRoutePoints:
                dayRoutePoints.length > 0
                  ? dayRoutePoints.map((point) => ({
                      id: point.id,
                      name: point.name ?? "",
                      visitOrder: point.visitOrder,
                      arrivalTime: point.arrivalTime,
                      departureTime: point.departureTime,
                      address: point.address ?? undefined,
                      latLng: point.latLng ?? undefined,
                      imageUrl: point.imageUrl ?? undefined,
                      accommodationId: point.accommodationId ?? undefined,
                    }))
                  : acc.tripDays?.[cur.tripDays.id]?.tripRoutePoints ?? [],
            },
          },
        };
      },
      { tripDays: {} } as ReducedResult
    );

    // tripRoutePointsのvisitOrderの昇順でソート
    trip.tripDays = Object.values(trip.tripDays).map((tripDay) => ({
      ...tripDay,
      tripRoutePoints: tripDay.tripRoutePoints?.sort(
        (a, b) => a.visitOrder - b.visitOrder
      ),
    }));

    return c.json<ApiGetOutputType>({
      trip: { ...trip, tripDays: Object.values(trip.tripDays) },
    });
  });

export default app;
