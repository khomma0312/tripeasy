"use client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";

export type MenuItem = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isDialogTrigger?: boolean;
};

type Props = {
  dialogTitle: string;
  dialogDescription?: string;
  className?: string;
  menuItems: MenuItem[];
  DropdownTrigger: React.ReactNode;
  Form: React.ReactNode;
};

export const DropdownWithFormDialog = ({
  dialogTitle,
  dialogDescription,
  menuItems,
  DropdownTrigger,
  Form,
}: Props) => {
  return (
    <Dialog>
      <DropdownMenu>
        {DropdownTrigger}
        <DropdownMenuContent align="end">
          {menuItems.map((menuItem, index) => {
            if (menuItem.isDialogTrigger) {
              return (
                <DialogTrigger asChild key={index}>
                  <DropdownMenuItem key={index} onClick={menuItem?.onClick}>
                    {menuItem.icon}
                    {menuItem.label}
                  </DropdownMenuItem>
                </DialogTrigger>
              );
            }
            return (
              <DropdownMenuItem key={index} onClick={menuItem?.onClick}>
                {menuItem.icon}
                {menuItem.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
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
