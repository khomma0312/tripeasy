import { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
