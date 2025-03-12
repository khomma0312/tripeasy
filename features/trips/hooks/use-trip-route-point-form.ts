import { useForm } from "react-hook-form";
import { TripRoutePointFormFieldValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripRoutePointFormSchema } from "@/lib/zod/schema/trip-route-points";

export const useTripRoutePointForm = (
  name: string,
  address: string,
  latLng: { lat: number; lng: number } | undefined,
  imageUrl: string | undefined,
  tripDayId: number
) => {
  const form = useForm<TripRoutePointFormFieldValues>({
    resolver: zodResolver(tripRoutePointFormSchema),
    defaultValues: {
      name,
      address,
      arrivalTime: "09:00",
      departureTime: "10:00",
      latLng,
      imageUrl,
      tripDayId,
    },
  });
  return { form };
};
