"use client";

import { useMemo } from "react";
import { Trip } from "@/features/trips/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import {
  DollarSign,
  MapPin,
  Phone,
  Globe,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { Form } from "@/components/shadcn/form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import { RHFTextareaField } from "@/components/shared/rhf-textarea-field";
import { RHFDatePickerField } from "@/components/shared/rhf-date-picker-field";
import { RHFFileField } from "@/components/shared/rhf-file-field";
import {
  RHFSelectField,
  SelectItem,
} from "@/components/shared/rhf-select-field";
import { AccommodationFormFieldValues } from "../../types";
import { UseFormReturn } from "react-hook-form";

type Props = {
  formTitle: string;
  trips: Trip[];
  form: UseFormReturn<AccommodationFormFieldValues>;
  isPending: boolean;
  onSubmit: (accommodation: AccommodationFormFieldValues) => void;
};

export const AccommodationForm = ({
  formTitle,
  trips,
  form,
  isPending,
  onSubmit,
}: Props) => {
  const router = useRouter();
  const tripItems: SelectItem[] = useMemo(() => {
    return trips.map((trip) => ({ value: String(trip.id), label: trip.title }));
  }, [trips]);
  const currentValues = form.getValues();

  return (
    <div className="max-w-screen-lg h-full mx-auto px-6 pt-12 pb-12">
      <h1 className="text-2xl font-semibold mb-6">{formTitle}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg border shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="name"
                label="施設名"
                isRequired
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="address"
                label="住所"
                Icon={MapPin}
              />
            </div>
            <div className="space-y-2">
              <RHFDatePickerField
                control={form.control}
                name="checkIn"
                label="チェックイン日"
                isRequired
              />
            </div>
            <div className="space-y-2">
              <RHFDatePickerField
                control={form.control}
                name="checkOut"
                label="チェックアウト日"
                isRequired
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="reservationPrice"
                label="予約料金"
                Icon={DollarSign}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="phoneNumber"
                label="電話番号"
                Icon={Phone}
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="bookingUrl"
                label="予約URL"
                type="url"
                Icon={Globe}
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="informationUrl"
                label="TripAdvisorの宿泊先情報URL"
                type="url"
                Icon={Globe}
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="bookingId"
                label="予約サイトの予約ID"
                placeholder="ABC-001"
              />
            </div>
            <div className="space-y-2">
              <RHFFileField
                control={form.control}
                name="image"
                label="画像"
                currentValue={currentValues.image}
              />
            </div>
          </div>
          <div className="space-y-2">
            <RHFSelectField
              control={form.control}
              label="紐づく旅行予定"
              name="tripId"
              items={tripItems}
            />
          </div>
          <div className="space-y-2">
            <RHFTextareaField
              control={form.control}
              name="notes"
              label="備考"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/accommodations")}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderCircle className="animate-spin" />}
              <FileText className="h-4 w-4" />
              登録
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
