import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CenteredContentLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center max-w-xl h-full mx-auto px-6 pt-12 pb-40">
      {children}
    </div>
  );
};
