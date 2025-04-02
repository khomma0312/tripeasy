import { useForm } from "react-hook-form";
import { TripRoutePointFormDestinationFieldValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripRoutePointFormDestinationSchema } from "@/lib/zod/schema/trip-route-points";

export const useTripRoutePointRegisterForm = (
  name: string,
  address: string,
  latLng: { lat: number; lng: number } | undefined,
  imageUrl: string | undefined,
  tripDayId: number
) => {
  const form = useForm<TripRoutePointFormDestinationFieldValues>({
    resolver: zodResolver(tripRoutePointFormDestinationSchema),
    defaultValues: {
      name,
      address,
      latLng,
      imageUrl,
      arrivalTime: "09:00",
      departureTime: "10:00",
      tripDayId,
    },
  });
  return { form };
};
