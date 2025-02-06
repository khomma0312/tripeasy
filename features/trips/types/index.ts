import {
  tripForDetailSchema,
  tripForListSchema,
  tripFormSchema,
} from "@/lib/zod/schema/trips";
import { z } from "zod";

export type TripForList = z.infer<typeof tripForListSchema>;

export type Trip = z.infer<typeof tripForDetailSchema>;

export type TripFormFieldValues = z.infer<typeof tripFormSchema>;

export type TripFormDefaultValues = Partial<Trip>;
