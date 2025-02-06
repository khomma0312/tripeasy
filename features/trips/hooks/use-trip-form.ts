import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parse } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { TripFormDefaultValues, TripFormFieldValues } from "../types";
import { tripFormSchema } from "@/lib/zod/schema/trips";

export const useTripForm = (defaultValues?: TripFormDefaultValues) => {
  const form = useForm<TripFormFieldValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      destination: defaultValues?.destination ?? "",
      startDate: defaultValues?.startDate
        ? parse(defaultValues?.startDate, dateFormatStrForParse, new Date())
        : undefined,
      endDate: defaultValues?.endDate
        ? parse(defaultValues?.endDate, dateFormatStrForParse, new Date())
        : undefined,
    },
  });

  return {
    form,
  };
};
