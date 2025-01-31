import { Button } from "@/components/shadcn/button";
import { LucideProps } from "lucide-react";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
  Icon?: React.ComponentType<LucideProps>;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export const ButtonWithLink = ({ label, href, Icon, variant }: Props) => {
  return (
    <Link href={href}>
      <Button variant={variant} className="flex items-center">
        {Icon && <Icon />}
        {label}
      </Button>
    </Link>
  );
};
