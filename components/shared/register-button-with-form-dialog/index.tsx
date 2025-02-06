"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { cn } from "@/utils/common";
import { useTripForm } from "@/features/trips/hooks/use-trip-form";
import { TripForm } from "@/features/trips/components/trip-form";
import { useAddTrip } from "@/features/trips/hooks/use-add-trip";

type Props = {
  dialogTitle: string;
  dialogDescription?: string;
  className?: string;
};

export const RegisterButtonWithFormDialog = ({
  dialogTitle,
  dialogDescription,
  className,
}: Props) => {
  const { form } = useTripForm();
  const { isPending, onSubmit } = useAddTrip(form);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("", className)}>
          <Plus />
          新規追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        <DialogDescription>
          旅行の基本情報を入力してください。
        </DialogDescription>
        <TripForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          CloseButton={CloseButton}
        />
      </DialogContent>
    </Dialog>
  );
};

const CloseButton = () => {
  return (
    <DialogClose asChild>
      <Button variant="outline">キャンセル</Button>
    </DialogClose>
  );
};
