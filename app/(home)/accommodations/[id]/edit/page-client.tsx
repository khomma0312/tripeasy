"use client";

import { HandleError } from "@/components/shared/handle-error";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";

const AccommodationEditPage = dynamic(
  () =>
    import("@/features/accommodations/components/accommodation-edit-page").then(
      (mod) => mod.AccommodationEditPage
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

type Props = {
  id: number;
};

export function PageClient({ id }: Props) {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <AccommodationEditPage id={id} />
    </HandleError>
  );
}
