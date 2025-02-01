import { File } from "buffer";
import { Hono } from "hono";
import { put } from "@vercel/blob";
import {
  accommodationInputSchema,
  ApiAllGetOutputType,
  ApiGetOutputType,
  ApiPostOutputType,
  ApiSearchGetOutputType,
} from "@/lib/zod/schema/accommodations";
import { db } from "@/lib/drizzle/db";
import { accommodations as accommodationsTable } from "@/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { paginationDefaultLimit } from "@/consts/common";
import { zValidator } from "@hono/zod-validator";
import { getLatLngFromAddress } from "@/services/api/externals/server/google-maps/fetcher";
import { getAccommodationSuggestionsByQuery } from "@/services/api/externals/server/rakuten-travel/fetcher";

const logger = getLogger("api/accommodations");

const app = new Hono()
  .post("/", zValidator("form", accommodationInputSchema), async (c) => {
    const session = await auth();
    const {
      name,
      address,
      checkIn,
      checkOut,
      reservationPrice,
      notes,
      image,
      phoneNumber,
      bookingId,
      bookingUrl,
      informationUrl,
      tripId,
    } = c.req.valid("form");
    let url: string | null = null;
    let latLng: { x: number; y: number } | null = null;

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    // reservationPriceはintegerで保存するので数値に変換
    const reservationPriceNum = Number(reservationPrice);

    if (isNaN(reservationPriceNum)) {
      logger.error("reservationPrice should not be NaN.");
      return c.json<ApiErrorType>(
        { message: "予約料金に数字以外の値が入力されています" },
        400
      );
    }

    // 住所が存在すれば、Google Maps APIを使って緯度経度の算出をする
    if (address) {
      try {
        const { lat, lng, isLocationReliable } = await getLatLngFromAddress(
          address
        );
        if (isLocationReliable) latLng = { x: lng, y: lat };
      } catch (e) {
        logger.error(e);
      }
    }

    if (image instanceof File) {
      try {
        logger.info("Uploading image...");
        const { url: uploadedUrl } = await put(
          `/accomodations/${userId}/${image.name}`,
          image,
          {
            access: "public",
          }
        );
        url = uploadedUrl;

        logger.info("Image uploaded successfully.");
      } catch (e) {
        logger.error(e);
        return c.json<ApiErrorType>(
          {
            message: "ファイルのアップロードに失敗しました",
          },
          500
        );
      }
    }

    try {
      const [accommodation] = await db
        .insert(accommodationsTable)
        .values({
          name,
          address: address || null,
          checkIn,
          checkOut,
          reservationPrice:
            reservationPriceNum === 0 ? null : reservationPriceNum,
          notes: notes || null,
          image: url,
          phoneNumber: phoneNumber || null,
          bookingUrl: bookingUrl || null,
          tripAdvisorUrl: informationUrl || null,
          latLng,
          tripId:
            !isNaN(Number(tripId)) && Number(tripId) > 0
              ? Number(tripId)
              : null, // tripIdがfalsyでないかつ、NaNにならない場合はnumberに変換して登録
          bookingId: bookingId || null,
          userId,
        })
        .returning({ id: accommodationsTable.id });
      return c.json<ApiPostOutputType>({ id: accommodation.id });
    } catch (e) {
      logger.error(e);
      return c.json<ApiErrorType>(
        { message: "データの登録に失敗しました" },
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
    const limit = perPage ?? paginationDefaultLimit;
    const offset = limit * (page - 1);

    if (!session?.user) {
      logger.error("User verification failed.");
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const accommodations = await db
      .select({
        id: accommodationsTable.id,
        name: accommodationsTable.name,
        address: accommodationsTable.address,
        checkIn: accommodationsTable.checkIn,
        checkOut: accommodationsTable.checkOut,
        image: accommodationsTable.image,
        bookingUrl: accommodationsTable.bookingUrl,
        bookingId: accommodationsTable.bookingId,
      })
      .from(accommodationsTable)
      .where(eq(accommodationsTable.userId, userId))
      .offset(offset)
      .limit(limit)
      .orderBy(desc(accommodationsTable.id));

    const [totalCount] = await db
      .select({
        totalItem: count(accommodationsTable.id),
      })
      .from(accommodationsTable)
      .where(eq(accommodationsTable.userId, userId));

    const totalPages = Math.ceil(totalCount.totalItem / limit);

    return c.json<ApiAllGetOutputType>({
      accommodations: accommodations.map((accommodation) => ({
        ...accommodation,
        image: accommodation.image ?? undefined,
        address: accommodation.address ?? undefined,
        bookingUrl: accommodation.bookingUrl ?? undefined,
        bookingId: accommodation.bookingId ?? undefined,
      })),
      totalPages,
    });
  })
  .get("/search", async (c) => {
    const lat = Number(c.req.query("lat"));
    const lng = Number(c.req.query("lng"));
    const page = Number(c.req.query("page"));

    if (isNaN(lat) || isNaN(lng) || isNaN(page)) {
      return c.json<ApiErrorType>(
        {
          message: "検索クエリに正しい値を入力してください",
        },
        400
      );
    }

    const result = await getAccommodationSuggestionsByQuery({ lat, lng, page });

    const accommodations = result.hotels.map((hotel) => ({
      id: hotel.hotel[0].hotelBasicInfo.hotelNo,
      name: hotel.hotel[0].hotelBasicInfo.hotelName,
      address:
        hotel.hotel[0].hotelBasicInfo.address1 +
        hotel.hotel[0].hotelBasicInfo.address2,
      reviewAverage: hotel.hotel[0].hotelBasicInfo.reviewAverage,
      informationUrl: hotel.hotel[0].hotelBasicInfo.hotelInformationUrl,
      phoneNumber: hotel.hotel[0].hotelBasicInfo.telephoneNo,
      hotelImageUrl: hotel.hotel[0].hotelBasicInfo.hotelImageUrl,
      reviewCount: hotel.hotel[0].hotelBasicInfo.reviewCount,
    }));

    return c.json<ApiSearchGetOutputType>({
      accommodations,
      pageCount: result.pagingInfo.pageCount,
      currentPage: result.pagingInfo.page,
    });
  })
  .get("/:id", async (c) => {
    const session = await auth();
    // NOTE: zValidatorを使うとrouteが正しく認識されなくなるので、c.req.paramで取得している
    const accommodationId = Number(c.req.param("id"));

    if (!session?.user) {
      return c.json<ApiErrorType>(
        { message: "ユーザー認証されていません" },
        403
      );
    }

    const userId = session.user.id ?? "";

    const [accommodation] = await db
      .select()
      .from(accommodationsTable)
      .where(
        and(
          eq(accommodationsTable.id, accommodationId),
          eq(accommodationsTable.userId, userId)
        )
      );

    if (!accommodation) {
      return c.json<ApiErrorType>(
        { message: "対象IDのTODOリストが存在しません" },
        404
      );
    }

    return c.json<ApiGetOutputType>({
      accommodation: {
        ...accommodation,
        tripId: accommodation.tripId ?? undefined,
        image: accommodation.image ?? undefined,
        address: accommodation.address ?? undefined,
        reservationPrice: accommodation.reservationPrice ?? undefined,
        notes: accommodation.notes ?? undefined,
        bookingUrl: accommodation.bookingUrl ?? undefined,
        informationUrl: accommodation.tripAdvisorUrl ?? undefined,
        phoneNumber: accommodation.phoneNumber ?? undefined,
        bookingId: accommodation.bookingId ?? undefined,
      },
    });
  });

export default app;
