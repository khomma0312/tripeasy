import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { paths } from "@/consts/common";

export const RegisterLink = () => {
  return (
    <Button size="sm" className="font-semibold">
      <Link href={paths.register.pathname}>{paths.register.label}</Link>
    </Button>
  );
};
