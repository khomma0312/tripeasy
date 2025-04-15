"use client";

import { Button, buttonVariants } from "@/components/shadcn/button";
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
import { VariantProps } from "class-variance-authority";

type Props = {
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription?: string;
  className?: string;
  buttonSize?: VariantProps<typeof buttonVariants>["size"];
  buttonIcon?: React.ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  Form: React.ReactNode;
};

export const ButtonWithFormDialog = ({
  buttonLabel,
  dialogTitle,
  dialogDescription,
  className,
  buttonSize,
  buttonIcon,
  variant,
  Form,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("", className)}
          size={buttonSize}
          variant={variant}
        >
          {buttonIcon}
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
