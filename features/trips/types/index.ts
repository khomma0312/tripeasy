import {
  destinationSchema,
  destinationSearchFormSchema,
} from "@/lib/zod/schema/destinations";
import {
  tripRoutePointAccommodationInputSchema,
  tripRoutePointDestinationInputSchema,
  tripRoutePointFormAccommodationSchema,
  tripRoutePointFormDestinationSchema,
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

export type TripRoutePointFormDestinationFieldValues = z.infer<
  typeof tripRoutePointFormDestinationSchema
>;

export type TripRoutePointFormAccommodationFieldValues = z.infer<
  typeof tripRoutePointFormAccommodationSchema
>;

export type TripRoutePointInputValues = z.infer<
  typeof tripRoutePointInputSchema
>;

export type TripRoutePointAccommodationInputValues = z.infer<
  typeof tripRoutePointAccommodationInputSchema
>;

export type TripRoutePointDestinationInputValues = z.infer<
  typeof tripRoutePointDestinationInputSchema
>;

export type Destination = z.infer<typeof destinationSchema>;

export type DestinationSearchFormFieldValues = z.infer<
  typeof destinationSearchFormSchema
>;

export type TripRoutePointPlaceType = "accommodation" | "destination";
