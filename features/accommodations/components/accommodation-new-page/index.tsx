"use client";

import { AccommodationRegisterFormContainer } from "@/features/accommodations/components/accommodation-register-form-container";
import { useSearchParams } from "next/navigation";
import { AccommodationForSearchResult } from "../../types";

export const AccommodationNewPage = () => {
  const searchParams = useSearchParams();
  const encodedJsonStr = searchParams.get("data");
  const jsonStr = encodedJsonStr
    ? decodeURIComponent(encodedJsonStr)
    : undefined;
  const autoCompleteFormData: AccommodationForSearchResult | undefined = jsonStr
    ? JSON.parse(jsonStr)
    : undefined;

  return (
    <AccommodationRegisterFormContainer defaultValues={autoCompleteFormData} />
  );
};
