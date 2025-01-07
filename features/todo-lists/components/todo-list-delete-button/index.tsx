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
import { Trash2 } from "lucide-react";

type Props = {
  onDelete: () => void;
};

export const TodoListDeleteButton = ({ onDelete }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="px-3">
          <Trash2 />
          削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Todoリストを削除</DialogTitle>
          <DialogDescription>
            Todoリストを削除してもよろしいですか？
          </DialogDescription>
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
