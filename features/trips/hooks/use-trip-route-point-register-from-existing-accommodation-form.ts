import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripRoutePointFormAccommodationSchema } from "@/lib/zod/schema/trip-route-points";
import { TripRoutePointFormAccommodationFieldValues } from "@/features/trips/types";

export const useTripRoutePointRegisterFromExistingAccommodationForm = (
  tripDayId: number
) => {
  const form = useForm<TripRoutePointFormAccommodationFieldValues>({
    resolver: zodResolver(tripRoutePointFormAccommodationSchema),
    values: {
      accommodationId: "",
      arrivalTime: "09:00",
      departureTime: "10:00",
      tripDayId,
    },
  });
  return { form };
};
