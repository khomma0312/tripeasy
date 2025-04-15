import { useForm } from "react-hook-form";
import { TripRoutePointUpdateFormFieldValues } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripRoutePointUpdateFormCommonSchema } from "@/lib/zod/schema/trip-route-points";

export const useTripRoutePointUpdateForm = (
  tripRoutePointId: number,
  name: string,
  arrivalTime: string,
  departureTime: string
) => {
  const form = useForm<TripRoutePointUpdateFormFieldValues>({
    resolver: zodResolver(tripRoutePointUpdateFormCommonSchema),
    values: {
      id: tripRoutePointId,
      name,
      arrivalTime,
      departureTime,
    },
  });

  return { form };
};
