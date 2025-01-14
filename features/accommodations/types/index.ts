import { z } from "zod";
import {
  accommodationForDetailSchema,
  accommodationForListSchema,
} from "@/lib/zod/schema/accommodations";

export type AccommodationForCard = z.infer<typeof accommodationForListSchema>;

export type Accommodation = z.infer<typeof accommodationForDetailSchema>;
