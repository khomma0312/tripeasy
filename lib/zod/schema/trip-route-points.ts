import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";

export const tripRoutePointFormSchema = z.object({
  name: z.string(),
  address: z.string(),
  latLng: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  arrivalTime: z.date(),
  departureTime: z.date(),
  tripDayId: z.number(),
});

export const tripRoutePointInputSchema = tripRoutePointFormSchema.extend({
  arrivalTime: z.string(),
  departureTime: z.string(),
});

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
