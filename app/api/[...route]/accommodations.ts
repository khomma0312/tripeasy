import { Hono } from "hono";
import { ApiAllGetOutputType } from "@/lib/zod/schema/accommodations";
import { db } from "@/lib/drizzle/db";
import { accommodations as accommodationsTable } from "@/schema";
import { count, eq } from "drizzle-orm";
import { getLogger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { ApiErrorType } from "@/lib/zod/schema/common";
import { paginationDefaultLimit } from "@/consts/common";
// import { zValidator } from "@hono/zod-validator";

const logger = getLogger("api/accommodations");

const app = new Hono().get("/", async (c) => {
  const session = await auth();
  const page = c.req.query("page") ? Number(c.req.query("page")) : 1;
  const perPage = c.req.query("perPage")
    ? Number(c.req.query("perPage"))
    : undefined;
  const limit = perPage ?? paginationDefaultLimit;
  const offset = limit * (page - 1);

  if (!session?.user) {
    logger.error("User verification failed.");
    return c.json<ApiErrorType>({ message: "ユーザー認証されていません" }, 403);
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
    .limit(limit);

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
      address: accommodation.address ?? undefined,
      bookingUrl: accommodation.bookingUrl ?? undefined,
      bookingId: accommodation.bookingId ?? undefined,
    })),
    totalPages,
  });
});

export default app;
