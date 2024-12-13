import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { paths } from "@/consts/common";

type Props = {
  isLink?: boolean;
  onClick?: () => void;
};

export const LoginLinkButton = ({ isLink = false, onClick }: Props) => {
  if (isLink) {
    return (
      <Button variant="ghost" size="sm">
        <Link href={paths.login.pathname}>{paths.login.label}</Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      {paths.login.label}
    </Button>
  );
};
