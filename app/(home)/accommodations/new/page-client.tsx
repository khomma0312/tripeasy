"use client";

import { HandleError } from "@/components/shared/handle-error";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

const AccommodationNewPage = dynamic(
  () =>
    import("@/features/accommodations/components/accommodation-new-page").then(
      (mod) => mod.AccommodationNewPage
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full grid place-items-center">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    ),
  }
);

export function PageClient() {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <AccommodationNewPage />
    </HandleError>
  );
}
