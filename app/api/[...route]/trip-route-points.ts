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
import { eq, max } from "drizzle-orm";
import { getLatLngFromAddress } from "@/services/api/externals/server/google-maps/fetcher";

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
      // tripDayIdに紐づくtripRoutePointsの中で、visitOrderが最大のものを取得
      const [maxVisitOrder] = await db
        .select({ visitOrder: max(tripRoutePointsTable.visitOrder) })
        .from(tripRoutePointsTable)
        .where(eq(tripRoutePointsTable.tripDaySegmentId, tripDayId));

      const visitOrder = maxVisitOrder.visitOrder
        ? maxVisitOrder.visitOrder + 1
        : 1;

      // name, address, latLngからdestinationを作成
      const [addedDestination] = await db
        .insert(destinationsTable)
        .values({
          name,
          address,
          latLng,
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
          visitOrder,
        })
        .returning({ id: tripRoutePointsTable.id });
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
