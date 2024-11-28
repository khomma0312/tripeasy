import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { paths } from "@/consts/common";

export const LoginLink = () => {
  return (
    <Button variant="ghost" size="sm">
      <Link href={paths.login}>ログイン</Link>
    </Button>
  );
};
