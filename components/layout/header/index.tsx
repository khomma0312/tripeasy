import Link from "next/link";
import { MenuSheet } from "../menu-sheet";
import { Briefcase, Hotel, ListChecks, Plane } from "lucide-react";
import { LoginLinkButton } from "@/components/shared/login-link-button";
import { RegisterLinkButton } from "@/components/shared/register-link-button";
import { paths } from "@/consts/common";

const menus = [
  {
    href: paths.trips.pathname,
    label: paths.trips.label,
    icon: <Plane size={20} />,
  },
  {
    href: paths.todoLists.pathname,
    label: paths.todoLists.label,
    icon: <ListChecks size={20} />,
  },
  {
    href: paths.packingItemLists.pathname,
    label: paths.packingItemLists.label,
    icon: <Briefcase size={20} />,
  },
  {
    href: paths.accommodations.pathname,
    label: paths.accommodations.label,
    icon: <Hotel size={20} />,
  },
];

export const Header = () => {
  return (
    <div className="sticky flex justify-between items-center px-8 py-3 border-b border-b-gray-400 shadow">
      <div className="flex justify-between items-center grow">
        <div>Logo</div>
        <MenuSheet menus={menus} />
        <div className="hidden md:block">
          <ul className="flex gap-4 px-7">
            {menus.map((menu) => (
              <li
                key={menu.href}
                className="text-sm text-accent-foreground hover:text-accent-foreground/70"
              >
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <LoginLinkButton isLink />
        <RegisterLinkButton isLink />
      </div>
    </div>
  );
};
