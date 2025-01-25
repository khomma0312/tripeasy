import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { accommodationFormSchema } from "@/lib/zod/schema/accommodations";
import { usePostAccommodations } from "@/services/api/custom/endpoints/accommodations";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";

export const useAddAccommodation = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof accommodationFormSchema>>({
    resolver: zodResolver(accommodationFormSchema),
    defaultValues: {
      name: "",
      address: "",
      checkIn: undefined,
      checkOut: undefined,
      reservationPrice: "",
      notes: "",
      image: "",
      phoneNumber: "",
      bookingId: "",
      bookingUrl: "",
      tripAdvisorUrl: "",
      tripId: undefined,
    },
  });
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePostAccommodations({
    mutation: {
      onSuccess: () => {
        toast({ title: "宿泊施設情報を追加しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/accommodations`],
        });
        form.reset();
      },
      onError: () => {
        errorToast("宿泊施設情報の追加に失敗しました");
      },
    },
  });

  const addAccommodation = (
    accommodation: z.infer<typeof accommodationFormSchema>
  ) => {
    // mutateの引数の型に合わせるため、型を変換
    const typeConvertedAccommodation = {
      ...accommodation,
      checkIn: format(accommodation.checkIn, dateFormatStrForParse),
      checkOut: format(accommodation.checkOut, dateFormatStrForParse),
    };

    mutate({
      data: {
        accommodation: typeConvertedAccommodation,
      },
    });
  };

  const onSubmit = (accommodation: z.infer<typeof accommodationFormSchema>) => {
    addAccommodation(accommodation);
  };

  return {
    form,
    isPending,
    onSubmit,
  };
};
