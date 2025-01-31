import { cn } from "@/utils/common";
import { ReactNode } from "react";

export const TitleHeading = ({
  children,
  className,
}: {
  children: string | ReactNode;
  className?: string | undefined;
}) => {
  return (
    <h1 className={cn("text-center text-2xl font-bold", className)}>
      {children}
    </h1>
  );
};
