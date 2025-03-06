import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";
import { convertTimeToDate } from "@/features/trips/utils";

export const tripRoutePointFormSchema = z
  .object({
    name: z.string(),
    address: z.string(),
    latLng: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    imageUrl: z.string().optional(),
    arrivalTime: z.string(),
    departureTime: z.string(),
    tripDayId: z.number(),
  })
  .refine(
    (data) => {
      // 時間文字列を比較して、到着時間が出発時間より後になっていないことを確認
      const arrivalTime = convertTimeToDate(
        new Date(),
        `${data.arrivalTime}:00`
      );
      const departureTime = convertTimeToDate(
        new Date(),
        `${data.departureTime}:00`
      );
      return arrivalTime.getTime() <= departureTime.getTime();
    },
    {
      message: "到着時間は出発時間より前である必要があります",
      path: ["arrivalTime", "departureTime"],
    }
  );

export const tripRoutePointInputSchema = tripRoutePointFormSchema;

export const apiPostInputSchema = z.object({
  tripRoutePoint: tripRoutePointInputSchema,
});
export type ApiPostInputType = z.infer<typeof apiPostInputSchema>;

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// POST APIのスキーマ
export const tripRoutePointsPostApiSchema: RouteConfig = {
  method: "post",
  path: "/trip-route-points",
  summary: "目的地新規作成API",
  tags: ["trip-route-points"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiPostInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "目的地作成成功",
      content: {
        "application/json": { schema: apiPostOutputSchema },
      },
    },
    500: {
      description: "目的地作成に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
