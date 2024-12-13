"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { LoginLinkButton } from "@/components/shared/login-link-button";
import { RegisterLinkButton } from "@/components/shared/register-link-button";
import { useRouter } from "next/navigation";
import { paths } from "@/consts/common";

type Props = {
  menus: {
    href: string;
    label: string;
    icon?: ReactNode;
  }[];
};

export const MenuSheet = ({ menus }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu size={25} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="pt-7">
          <SheetTitle>メニュー</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-1 py-5">
          {menus.map((menu) => (
            <li
              key={menu.href}
              className="p-3 rounded-md text-accent-foreground hover:bg-gray-100"
            >
              <Link href={menu.href} className="flex items-center gap-3">
                {menu.icon}
                <span className="text-sm">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <LoginLinkButton
            onClick={() => handleNavigation(paths.login.pathname)}
          />
          <RegisterLinkButton
            onClick={() => handleNavigation(paths.register.pathname)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
