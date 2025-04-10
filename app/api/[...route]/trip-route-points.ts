import { Hono } from "hono";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { zValidator } from "@hono/zod-validator";
import {
  apiPatchInputSchema,
  ApiPatchOutputType,
  apiPostInputSchema,
  ApiPostOutputType,
} from "@/lib/zod/schema/trip-route-points";
import { getLatLngFromAddress } from "@/services/api/externals/server/google-maps/fetcher";
import {
  addNewAccommodation,
  addNewDestination,
  addNewTripRoutePoint,
  calculateNewRoutePointVisitOrder,
  updateReorderedTripRoutePoints,
  updateTripRoutePointVisitOrder,
} from "@/utils/api/trip-route-points";

const logger = getLogger("api/trip-route-points");

const app = new Hono()
  .post("/", zValidator("json", apiPostInputSchema), async (c) => {
    const session = await auth();
    const { tripRoutePoint } = c.req.valid("json");
    const { destination, accommodation } = tripRoutePoint;

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    // destinationがinputにある場合
    if (destination) {
      const {
        name,
        address,
        latLng: latLngInput,
        imageUrl,
        tripDayId,
        arrivalTime,
        departureTime,
      } = destination;

      let latLng: { x: number; y: number } | undefined = latLngInput
        ? { x: latLngInput.lng, y: latLngInput.lat }
        : undefined;

      try {
        // 住所から緯度経度を取得
        const { lat, lng, isLocationReliable } = await getLatLngFromAddress(
          address
        );
        if (isLocationReliable && !latLng) latLng = { x: lng, y: lat };
      } catch (e) {
        // 緯度経度取得に失敗した場合はlatLngをundefinedにしてログ出力
        logger.error(e);
      }

      try {
        const { newVisitOrder, sortedTripRoutePointVisitOrders } =
          await calculateNewRoutePointVisitOrder(tripDayId, arrivalTime);

        // name, address, latLngからdestinationを作成
        const addedDestination = await addNewDestination(
          {
            name,
            address,
            latLng,
            imageUrl,
          },
          userId
        );

        const newTripRoutePoint = {
          arrivalTime,
          departureTime,
          userId,
          destinationId: addedDestination.id,
          tripDaySegmentId: tripDayId,
          visitOrder: newVisitOrder,
        };

        const addedTripRoutePoint = await addNewTripRoutePoint(
          newTripRoutePoint
        );

        await updateTripRoutePointVisitOrder(sortedTripRoutePointVisitOrders);

        return c.json<ApiPostOutputType>({ id: addedTripRoutePoint.id });
      } catch (e) {
        logger.error(e);
        return c.json<ApiErrorType>(
          { message: "データの登録に失敗しました" },
          500
        );
      }
    }

    // accommodationがinputにある場合
    if (accommodation) {
      try {
        let accommodationId: number | undefined = undefined;
        const {
          arrivalTime,
          departureTime,
          tripDayId,
          accommodationId: accommodationIdInput,
        } = accommodation;

        if (accommodationIdInput) {
          accommodationId = accommodationIdInput;
        } else {
          // name, address, latLngからdestinationを作成
          const addedAccommodation = await addNewAccommodation(
            accommodation,
            userId
          );
          accommodationId = addedAccommodation.id;
        }

        const { newVisitOrder, sortedTripRoutePointVisitOrders } =
          await calculateNewRoutePointVisitOrder(tripDayId, arrivalTime);

        const newTripRoutePoint = {
          arrivalTime,
          departureTime,
          userId,
          accommodationId,
          tripDaySegmentId: tripDayId,
          visitOrder: newVisitOrder,
        };

        const addedTripRoutePoint = await addNewTripRoutePoint(
          newTripRoutePoint
        );

        await updateTripRoutePointVisitOrder(sortedTripRoutePointVisitOrders);

        return c.json<ApiPostOutputType>({ id: addedTripRoutePoint.id });
      } catch (e) {
        logger.error(e);
        return c.json<ApiErrorType>(
          { message: "データの登録に失敗しました" },
          500
        );
      }
    }

    logger.error("destinationまたはaccommodationが存在しません");
    return c.json<ApiErrorType>({ message: "データの登録に失敗しました" }, 500);
  })
  .patch("/reorder", zValidator("json", apiPatchInputSchema), async (c) => {
    const session = await auth();
    const { tripRoutePoints } = c.req.valid("json");

    if (!session?.user) {
      logger.error("ユーザー認証に失敗しました");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    // 入力データの基本検証
    if (!tripRoutePoints || tripRoutePoints.length === 0) {
      logger.error("並び替えるポイントが指定されていません");
      return c.json<ApiErrorType>(
        { message: "並び替えるポイントが指定されていません" },
        400
      );
    }

    try {
      // データ所有権の確認を含む更新処理
      const updatedIds = await updateReorderedTripRoutePoints(
        tripRoutePoints,
        userId
      );

      if (!updatedIds || updatedIds.length === 0) {
        return c.json<ApiErrorType>(
          { message: "更新対象のデータが見つかりませんでした" },
          404
        );
      }

      return c.json<ApiPatchOutputType>({
        ids: updatedIds,
      });
    } catch (e) {
      logger.error(`並び順更新中にエラーが発生しました: ${e}`);
      return c.json<ApiErrorType>(
        { message: "データの更新に失敗しました" },
        500
      );
    }
  });

export default app;
