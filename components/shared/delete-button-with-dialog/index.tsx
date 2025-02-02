"use client";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { cn } from "@/utils/common";
import { Trash2 } from "lucide-react";

type Props = {
  dialogTitle: string;
  dialogDescription: string;
  onDelete: () => void;
  className?: string;
};

export const DeleteButtonWithDialog = ({
  dialogTitle,
  dialogDescription,
  onDelete,
  className,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className={cn("", className)}>
          <Trash2 />
          削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => onDelete()} variant="destructive">
              削除
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
