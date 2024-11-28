import Link from "next/link";
import { MenuSheet } from "../menu-sheet";
import { Briefcase, Hotel, ListChecks, Plane } from "lucide-react";
import { LoginLink } from "@/components/shared/login-link";
import { RegisterLink } from "@/components/shared/register-link";

const menus = [
  {
    href: "/trips",
    label: "旅行計画",
    icon: <Plane size={20} />,
  },
  {
    href: "/todos",
    label: "TODOリスト",
    icon: <ListChecks size={20} />,
  },
  {
    href: "/packing-item-lists",
    label: "持ち物リスト",
    icon: <Briefcase size={20} />,
  },
  {
    href: "/accomodations",
    label: "宿泊施設",
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
        <LoginLink />
        <RegisterLink />
      </div>
    </div>
  );
};
