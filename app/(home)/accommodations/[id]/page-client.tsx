"use client";

import { HandleError } from "@/components/shared/handle-error";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

const AccommodationPageContainer = dynamic(
  () =>
    import(
      "@/features/accommodations/components/accommodation-page-container"
    ).then((mod) => mod.AccommodationPageContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full grid place-items-center">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    ),
  }
);

type Props = {
  id: number;
};

export function PageClient({ id }: Props) {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <AccommodationPageContainer id={id} />
    </HandleError>
  );
}
