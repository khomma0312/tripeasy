import { Hono } from "hono";
import { db } from "@/lib/drizzle/db";
import {
  tripRoutePoints as tripRoutePointsTable,
  destinations as destinationsTable,
} from "@/schema";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { zValidator } from "@hono/zod-validator";
import {
  apiPostInputSchema,
  ApiPostOutputType,
} from "@/lib/zod/schema/trip-route-points";
import { eq, inArray, sql } from "drizzle-orm";
import { getLatLngFromAddress } from "@/services/api/externals/server/google-maps/fetcher";
import { convertTimeToDate } from "@/features/trips/utils";

const logger = getLogger("api/trip-route-points");

const app = new Hono().post(
  "/",
  zValidator("json", apiPostInputSchema),
  async (c) => {
    const session = await auth();
    const { tripRoutePoint } = c.req.valid("json");
    const {
      name,
      address,
      latLng: latLngInput,
      imageUrl,
      arrivalTime,
      departureTime,
      tripDayId,
    } = tripRoutePoint;

    let latLng: { x: number; y: number } | null = latLngInput
      ? { x: latLngInput.lng, y: latLngInput.lat }
      : null;

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    try {
      // 住所から緯度経度を取得
      const { lat, lng, isLocationReliable } = await getLatLngFromAddress(
        address
      );
      if (isLocationReliable && !latLng) latLng = { x: lng, y: lat };
    } catch (e) {
      logger.error(e);
    }

    try {
      const savedTripRoutePoints = await db
        .select()
        .from(tripRoutePointsTable)
        .where(eq(tripRoutePointsTable.tripDaySegmentId, tripDayId));

      const tripRoutePointVisitOrders = savedTripRoutePoints.map(
        (tripRoutePoint) => ({
          id: tripRoutePoint.id,
          arrivalTime: convertTimeToDate(
            new Date(),
            tripRoutePoint.arrivalTime
          ),
          visitOrder: tripRoutePoint.visitOrder,
        })
      );

      const newTripRoutePoint = {
        id: null,
        arrivalTime: convertTimeToDate(new Date(), `${arrivalTime}:00`),
      };

      // 新規tripRoutePointを追加して、arrivalTimeの早い順にvisitOrderを振り直す
      const sortedTripRoutePointVisitOrders = [
        newTripRoutePoint,
        ...tripRoutePointVisitOrders,
      ]
        .sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime())
        .map((tripRoutePoint, index) => ({
          ...tripRoutePoint,
          visitOrder: index + 1,
        }));

      const newVisitOrder = sortedTripRoutePointVisitOrders.find(
        (tripRoutePoint) => tripRoutePoint.id === null
      )?.visitOrder;

      if (!newVisitOrder) {
        throw new Error("visitOrderが取得できませんでした");
      }

      // name, address, latLngからdestinationを作成
      const [addedDestination] = await db
        .insert(destinationsTable)
        .values({
          name,
          address,
          latLng,
          imageUrl,
          userId,
        })
        .returning({ id: destinationsTable.id });

      const [addedTripRoutePoint] = await db
        .insert(tripRoutePointsTable)
        .values({
          arrivalTime,
          departureTime,
          userId,
          destinationId: addedDestination.id,
          tripDaySegmentId: tripDayId,
          visitOrder: newVisitOrder,
        })
        .returning({ id: tripRoutePointsTable.id });

      const updatedVisitOrders = sortedTripRoutePointVisitOrders.filter(
        (point) => point.id !== null
      );

      if (updatedVisitOrders.length > 0) {
        const ids = updatedVisitOrders.map((item) => item.id);

        // 既存のvisitOrderを更新する
        let caseExpression = sql`CASE `;
        updatedVisitOrders.forEach((item) => {
          caseExpression = sql`${caseExpression} WHEN ${tripRoutePointsTable.id} = ${item.id} THEN ${item.visitOrder}`;
        });
        caseExpression = sql`${caseExpression} ELSE ${tripRoutePointsTable.visitOrder} END`;
        await db
          .update(tripRoutePointsTable)
          .set({
            visitOrder: caseExpression,
          })
          .where(inArray(tripRoutePointsTable.id, ids));
      }

      return c.json<ApiPostOutputType>({ id: addedTripRoutePoint.id });
    } catch (e) {
      logger.error(e);
      return c.json<ApiErrorType>(
        { message: "データの登録に失敗しました" },
        500
      );
    }
  }
);

export default app;
