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

type Props = {
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription?: string;
  className?: string;
  buttonSize?: "sm" | "default" | "lg" | "icon" | null;
  Form: React.ReactNode;
};

export const ButtonWithFormDialog = ({
  buttonLabel,
  dialogTitle,
  dialogDescription,
  className,
  buttonSize,
  Form,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("", className)} size={buttonSize}>
          <Plus />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {Form}
      </DialogContent>
    </Dialog>
  );
};

export const CloseButton = () => {
  return (
    <DialogClose asChild>
      <Button variant="outline">キャンセル</Button>
    </DialogClose>
  );
};
