import { z } from "zod";
import {
  accommodationForDetailSchema,
  accommodationForListSchema,
  accommodationFormSchema,
  accommodationForSearchResultSchema,
} from "@/lib/zod/schema/accommodations";

export type AccommodationForCard = z.infer<typeof accommodationForListSchema>;

export type Accommodation = z.infer<typeof accommodationForDetailSchema>;

export type AccommodationForSearchResult = z.infer<
  typeof accommodationForSearchResultSchema
>;

export type AccommodationFormFieldValues = z.infer<
  typeof accommodationFormSchema
>;

export type AccommodationFormDefaultValues = Partial<
  Accommodation & AccommodationForSearchResult
>;
