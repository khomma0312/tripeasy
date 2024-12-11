import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return <div className="flex flex-col max-w-xl mx-auto">{children}</div>;
};
