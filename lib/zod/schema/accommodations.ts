import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { apiErrorSchema, commonResponseConfig } from "./common";

const imageSizeLimit = 500000;
const imageTypes = ["image/png", "image/jpg", "image/jpeg"];

// 宿泊施設の新規追加フォームの項目
export const accommodationFormSchema = z.object({
  name: z.string().min(1, "施設名を入力してください"),
  address: z.string().optional(),
  checkIn: z.date({ message: "チェックインの日付を入力してください" }),
  checkOut: z.date({ message: "チェックアウトの日付を入力してください" }),
  reservationPrice: z
    .string()
    .regex(/^-?\d+(\.\d+)?$/, "数字で入力してください")
    .or(z.literal("")),
  notes: z.string().optional(),
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0 && files.length <= 1, {
      message: "添付できる画像ファイルは1枚までです",
    })
    .refine(
      (files) =>
        files && Array.from(files).every((file) => file.size < imageSizeLimit),
      { message: "添付できる画像ファイルは5MBまでです" }
    )
    .refine(
      (files) =>
        files &&
        Array.from(files).every((file) => imageTypes.includes(file.type)),
      { message: "添付できる画像ファイルはjpegかpngです" }
    )
    .or(z.literal(""))
    .nullable(),
  phoneNumber: z.string().optional(),
  bookingId: z.string().optional(),
  bookingUrl: z.string().url("URL形式で入力してください").or(z.literal("")),
  tripAdvisorUrl: z.string().url("URL形式で入力してください").or(z.literal("")),
  tripId: z.string().optional(),
});

export const accommodationInputSchema = accommodationFormSchema.extend({
  checkIn: z.string(),
  checkOut: z.string(),
  reservationPrice: z.string().optional(),
  image: z.instanceof(Blob).or(z.literal("")),
  bookingUrl: z.string().optional(),
  tripAdvisorUrl: z.string().optional(),
});

// 宿泊施設検索ページのフォームの項目
export const accommodationsSearchFormSchema = z.object({
  place: z.object(
    {
      lat: z.number().optional(),
      lng: z.number().optional(),
    },
    { message: "緯度経度が正しく入力されていません" }
  ),
});

export const accommodationForListSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().optional(),
  address: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  bookingUrl: z.string().optional(),
  bookingId: z.string().optional(),
});

export const accommodationForDetailSchema = z.object({
  id: z.number(),
  tripId: z.number().optional(),
  name: z.string(),
  image: z.string().optional(),
  address: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  reservationPrice: z.number().optional(),
  notes: z.string().optional(),
  bookingUrl: z.string().optional(),
  tripAdvisorUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
  bookingId: z.string().optional(),
});

export const accommodationForSearchResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  reviewAverage: z.number(),
  informationUrl: z.string(),
  image: z.string(),
  reviewCount: z.number(),
});

export const apiPostInputSchema = z.object({
  accommodation: accommodationInputSchema,
});
export type ApiPostInputType = z.infer<typeof apiPostInputSchema>;

// 宿泊施設を全て返すGET APIのinputパラメータのスキーマ
export const apiAllGetInputSchema = z.object({
  page: z.number(),
  perPage: z.number().optional(),
});

// 単一の宿泊施設を返すGET APIのinputパラメータのスキーマ
export const apiGetInputSchema = z.object({ id: z.number() });

// 宿泊施設を検索するGET APIのinputパラメータのスキーマ
export const apiSearchGetInputSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// POST APIの成功時に返却されるoutputのスキーマ
export const apiPostOutputSchema = z.object({
  id: z.number(),
});
export type ApiPostOutputType = z.infer<typeof apiPostOutputSchema>;

// 宿泊施設を全て返すGET APIの成功時に返却されるoutputのスキーマ
export const apiAllGetOutputSchema = z.object({
  accommodations: z.array(accommodationForListSchema),
  totalPages: z.number(),
});
export type ApiAllGetOutputType = z.infer<typeof apiAllGetOutputSchema>;

// 単一の宿泊施設を返すGET APIの成功時に返却されるoutputのスキーマ
export const apiGetOutputSchema = z.object({
  accommodation: accommodationForDetailSchema,
});
export type ApiGetOutputType = z.infer<typeof apiGetOutputSchema>;

// 宿泊施設の検索結果を返すGET APIの成功時に返却されるoutputのスキーマ
export const apiSearchGetOutputSchema = z.object({
  accommodations: z.array(accommodationForSearchResultSchema),
});
export type ApiSearchGetOutputType = z.infer<typeof apiSearchGetOutputSchema>;

// POST APIのスキーマ
export const accommodationsPostApiSchema: RouteConfig = {
  method: "post",
  path: "/accommodations",
  summary: "宿泊施設新規作成API",
  tags: ["accommodations", "orval-exclude"],
  request: {
    body: {
      content: {
        "multipart/form-data": { schema: apiPostInputSchema },
      },
    },
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "宿泊施設作成成功",
      content: {
        "application/json": { schema: apiPostOutputSchema },
      },
    },
    500: {
      description: "宿泊施設作成に失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// 宿泊施設を全て返すGET APIのスキーマ
export const accommodationsAllGetApiSchema: RouteConfig = {
  method: "get",
  path: "/accommodations",
  summary:
    "ログイン中のユーザーに紐づく全ての予約した宿泊施設の取得(ページネーションもあり)",
  tags: ["accommodations"],
  request: {
    query: apiAllGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "予約した宿泊施設取得成功",
      content: {
        "application/json": { schema: apiAllGetOutputSchema },
      },
    },
  },
};

// 宿泊施設を全て返すGET APIのスキーマ
export const accommodationsGetApiSchema: RouteConfig = {
  method: "get",
  path: "/accommodations/{id}",
  summary: "単一の宿泊施設の取得",
  tags: ["accommodations"],
  request: {
    params: apiGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "予約した宿泊施設取得成功",
      content: {
        "application/json": { schema: apiGetOutputSchema },
      },
    },
    404: {
      description: "宿泊施設が存在しないので取得失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};

// 宿泊施設の検索結果を返すGET APIのスキーマ
export const accommodationsSearchGetApiSchema: RouteConfig = {
  method: "get",
  path: "/accommodations/search",
  summary: "外部APIから検索した宿泊施設の取得",
  tags: ["accommodations"],
  request: {
    query: apiSearchGetInputSchema,
  },
  responses: {
    ...commonResponseConfig,
    200: {
      description: "宿泊施設取得成功",
      content: {
        "application/json": { schema: apiSearchGetOutputSchema },
      },
    },
    404: {
      description: "宿泊施設が存在しないので取得失敗",
      content: {
        "application/json": { schema: apiErrorSchema },
      },
    },
  },
};
