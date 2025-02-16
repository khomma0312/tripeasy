import {
  tripDaySchema,
  tripForDetailSchema,
  tripForListSchema,
  tripFormSchema,
  tripRoutePointSchema,
} from "@/lib/zod/schema/trips";
import { z } from "zod";

export type TripForList = z.infer<typeof tripForListSchema>;

export type Trip = z.infer<typeof tripForDetailSchema>;

export type TripDay = z.infer<typeof tripDaySchema>;

export type TripRoutePoint = z.infer<typeof tripRoutePointSchema>;

export type TripFormFieldValues = z.infer<typeof tripFormSchema>;

export type TripFormDefaultValues = Partial<Trip>;
