import {
  destinationSchema,
  destinationSearchFormSchema,
} from "@/lib/zod/schema/destinations";
import {
  tripRoutePointFormSchema,
  tripRoutePointInputSchema,
} from "@/lib/zod/schema/trip-route-points";
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

export type TripRoutePointFormFieldValues = z.infer<
  typeof tripRoutePointFormSchema
>;

export type TripRoutePointInputValues = z.infer<
  typeof tripRoutePointInputSchema
>;

export type Destination = z.infer<typeof destinationSchema>;

export type DestinationSearchFormFieldValues = z.infer<
  typeof destinationSearchFormSchema
>;
