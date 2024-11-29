import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-12 pb-32">{children}</div>
  );
};
