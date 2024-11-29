import { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainLayout } from "@/components/layout/main-layout";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main>
        <MainLayout>{children}</MainLayout>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
