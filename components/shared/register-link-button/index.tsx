import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { paths } from "@/consts/common";

type Props = {
  isLink?: boolean;
  onClick?: () => void;
};

export const RegisterLinkButton = ({ isLink = false, onClick }: Props) => {
  if (isLink) {
    return (
      <Button size="sm" className="font-semibold">
        <Link href={paths.register.pathname}>{paths.register.label}</Link>
      </Button>
    );
  }

  return (
    <Button size="sm" className="font-semibold" onClick={onClick}>
      {paths.register.label}
    </Button>
  );
};
