import { ReactNode } from "react";

export const TitleHeading = ({
  children,
}: {
  children: string | ReactNode;
}) => {
  return <h1 className="text-center text-2xl font-bold">{children}</h1>;
};
