import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const HorizontallyCenteredContentLayout = ({ children }: Props) => {
  return (
    <div className="max-w-xl h-full mx-auto px-6 pt-12 pb-12">{children}</div>
  );
};
