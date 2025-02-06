"use client";

import { MapPin } from "lucide-react";
import { Form } from "@/components/shadcn/form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import { RHFDatePickerField } from "@/components/shared/rhf-date-picker-field";
import { TripFormFieldValues } from "@/features/trips/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/shadcn/button";

type Props = {
  form: UseFormReturn<TripFormFieldValues>;
  isPending: boolean;
  onSubmit: (trip: TripFormFieldValues) => void;
  RegisterButton?: React.ComponentType;
  CloseButton?: React.ComponentType;
};

export const TripForm = ({
  form,
  isPending,
  onSubmit,
  RegisterButton,
  CloseButton,
}: Props) => {
  return (
    <div className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="title"
                label="旅行名"
                isRequired
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <RHFInputField
                control={form.control}
                name="destination"
                label="目的地"
                Icon={MapPin}
                disabled={isPending}
              />
            </div>
            <div className="flex items-center gap-2">
              <RHFDatePickerField
                control={form.control}
                name="startDate"
                label="開始日"
                isRequired
              />
              <RHFDatePickerField
                control={form.control}
                name="endDate"
                label="終了日"
                isRequired
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {RegisterButton ? (
              <RegisterButton />
            ) : (
              <Button type="submit">作成する</Button>
            )}
            {CloseButton ? (
              <CloseButton />
            ) : (
              <Button variant="outline">キャンセル</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
