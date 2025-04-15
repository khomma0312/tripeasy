import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";
import { convertTimeToDate } from "@/features/trips/utils";
import { tripRoutePointSchema } from "./trips";

const tripRoutePointFormDestinationBaseSchema = z.object({
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
});

const tripRoutePointFormTimeValidation = {
  check: (data: { arrivalTime: string; departureTime: string }) => {
    // 時間文字列を比較して、到着時間が出発時間より後になっていないことを確認
    const arrivalTime = convertTimeToDate(new Date(), `${data.arrivalTime}:00`);
    const departureTime = convertTimeToDate(
      new Date(),
      `${data.departureTime}:00`
    );
    return arrivalTime.getTime() <= departureTime.getTime();
  },
  message: {
    message: "到着時間は出発時間より前に設定してください",
    path: ["arrivalTime"],
  },
};

// 新規作成用のinputのスキーマ
export const tripRoutePointDestinationInputSchema =
  tripRoutePointFormDestinationBaseSchema;

export const tripRoutePointFormDestinationSchema =
  tripRoutePointFormDestinationBaseSchema.refine(
    tripRoutePointFormTimeValidation.check,
    tripRoutePointFormTimeValidation.message
  );

const tripRoutePointFormAccommodationBaseSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  latLng: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  imageUrl: z.string().optional(),
  accommodationId: z.string().optional(),
  arrivalTime: z.string(),
  departureTime: z.string(),
  tripDayId: z.number(),
});

export const tripRoutePointAccommodationInputSchema =
  tripRoutePointFormAccommodationBaseSchema.extend({
    accommodationId: z.number().optional(),
  });

export const tripRoutePointFormAccommodationSchema =
  tripRoutePointFormAccommodationBaseSchema.refine(
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

// 新規作成用のinputのスキーマ
export const tripRoutePointInputSchema = z.object({
  destination: tripRoutePointDestinationInputSchema.optional(),
  accommodation: tripRoutePointAccommodationInputSchema.optional(),
});

// ========== 更新フォーム関連のスキーマ ==========
// destinationとaccommodationの共通スキーマ
export const tripRoutePointUpdateFormCommonSchema =
  tripRoutePointFormDestinationBaseSchema
    .pick({
      name: true,
      arrivalTime: true,
      departureTime: true,
    })
    .extend({
      id: z.number(),
    })
    .refine(
      tripRoutePointFormTimeValidation.check,
      tripRoutePointFormTimeValidation.message
    );

export const tripRoutePointUpdateInputCommonSchema =
  tripRoutePointUpdateFormCommonSchema;

// 更新用のinputのスキーマ
export const tripRoutePointUpdateInputSchema = z.object({
  destination: tripRoutePointUpdateInputCommonSchema.optional(),
  accommodation: tripRoutePointUpdateInputCommonSchema.optional(),
});

// ========== API定義関連のスキーマ ==========
export const apiPostInputSchema = z.object({
  tripRoutePoint: tripRoutePointInputSchema,
});
export type ApiPostInputType = z.infer<typeof apiPostInputSchema>;

export const apiReorderPatchInputSchema = z.object({
  tripRoutePoints: z.array(tripRoutePointSchema),
});
export type ApiReorderPatchInputType = z.infer<
  typeof apiReorderPatchInputSchema
>;

export const apiPatchInputSchema = z.object({
  tripRoutePoint: tripRoutePointUpdateInputSchema,
});
export type ApiPatchInputType = z.infer<typeof apiPatchInputSchema>;

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// 並び替え更新のPATCH APIの成功時に返却されるoutputのスキーマ
export const apiReorderPatchOutputSchema = z.object({
  ids: z.array(z.number()),
});
export type ApiReorderPatchOutputType = z.infer<
  typeof apiReorderPatchOutputSchema
>;

// 単一の旅行地点の更新のPATCH APIの成功時に返却されるoutputのスキーマ
export const apiPatchOutputSchema = z.object({
  id: z.number(),
});
export type ApiPatchOutputType = z.infer<typeof apiPatchOutputSchema>;

// path paramsのinputスキーマ
export const apiParamsInputSchema = z.object({ id: z.number() });

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

// 並び替え更新のPATCH APIのスキーマ
export const tripRoutePointsReorderPatchApiSchema: RouteConfig = {
  method: "patch",
  path: "/trip-route-points/reorder",
  summary: "目的地の訪問順序・時間の一括更新API",
  tags: ["trip-route-points"],
  request: {
    body: {
      content: {
        "application/json": { schema: apiReorderPatchInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "目的地の訪問順序・時間の一括更新成功",
      content: {
        "application/json": { schema: apiReorderPatchOutputSchema },
      },
    },
    400: {
      description: "目的地の訪問順序・時間の一括更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    404: {
      description: "更新対象のデータが見つからない",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    500: {
      description: "目的地の訪問順序・時間の一括更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// 単一のtripRoutePointのPATCH APIのスキーマ
export const tripRoutePointsPatchApiSchema: RouteConfig = {
  method: "patch",
  path: "/trip-route-points/{id}",
  summary: "単一の旅行地点の更新API",
  tags: ["trip-route-points"],
  request: {
    params: apiParamsInputSchema,
    body: {
      content: {
        "application/json": { schema: apiPatchInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "目的地の訪問順序・時間の一括更新成功",
      content: {
        "application/json": { schema: apiPatchOutputSchema },
      },
    },
    400: {
      description: "目的地の訪問順序・時間の一括更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    404: {
      description: "更新対象のデータが見つからない",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
    500: {
      description: "目的地の訪問順序・時間の一括更新に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
