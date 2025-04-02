"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/shadcn/toaster";

const queryClient = new QueryClient();

export const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
};
