import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { TitleHeading } from "@/components/shared/title-heading";

type Props = {
  title: string;
  labelForButton: string;
  linkForButton: string;
};

export const ListPageHeader = ({
  title,
  labelForButton,
  linkForButton,
}: Props) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <TitleHeading>{title}</TitleHeading>
      <Link href={linkForButton}>
        <Button className="flex items-center gap-2">
          <Plus />
          {labelForButton}
        </Button>
      </Link>
    </div>
  );
};
