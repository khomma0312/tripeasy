import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accommodationFormSchema } from "@/lib/zod/schema/accommodations";
import { parse } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import {
  AccommodationFormDefaultValues,
  AccommodationFormFieldValues,
} from "../types";

export const useAccommodationForm = (
  defaultValues?: AccommodationFormDefaultValues
) => {
  const form = useForm<AccommodationFormFieldValues>({
    resolver: zodResolver(accommodationFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      address: defaultValues?.address ?? "",
      checkIn: defaultValues?.checkIn
        ? parse(defaultValues?.checkIn, dateFormatStrForParse, new Date())
        : undefined,
      checkOut: defaultValues?.checkOut
        ? parse(defaultValues?.checkOut, dateFormatStrForParse, new Date())
        : undefined,
      reservationPrice: defaultValues?.reservationPrice
        ? String(defaultValues?.reservationPrice)
        : "",
      notes: defaultValues?.notes ?? "",
      image: defaultValues?.image ?? "",
      phoneNumber: defaultValues?.phoneNumber ?? "",
      bookingId: defaultValues?.bookingId ?? "",
      bookingUrl: defaultValues?.bookingUrl ?? "",
      informationUrl: defaultValues?.informationUrl
        ? defaultValues?.informationUrl
        : "",
      tripId: defaultValues?.tripId ? String(defaultValues?.tripId) : undefined,
    },
  });

  return {
    form,
  };
};
