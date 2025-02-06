import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CardListColumn = ({ children }: Props) => {
  return <div className="grid grid-cols-1 gap-6">{children}</div>;
};
