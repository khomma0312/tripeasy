"use client";

import { HandleError } from "@/components/shared/handle-error";
import { EmailVerification } from "@/features/verify-email/components/email-verification";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export const PageClient = () => {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <Suspense
        fallback={
          <div className="w-full h-full grid place-items-center">
            <LoaderCircle className="size-10 animate-spin" />
          </div>
        }
      >
        <EmailVerification />
      </Suspense>
    </HandleError>
  );
};
