import { Plus } from "lucide-react";
import { TitleHeading } from "@/components/shared/title-heading";
import { ButtonWithLink } from "../button-with-link";

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
      <ButtonWithLink href={linkForButton} label={labelForButton} Icon={Plus} />
    </div>
  );
};
