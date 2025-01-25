"use client";

import { HandleError } from "@/components/shared/handle-error";
import { SignInForm } from "@/features/login/components/signin-form";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export const PageClient = () => {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <Suspense fallback={<LoaderCircle className="size-10 animate-spin" />}>
        <SignInForm />
      </Suspense>
    </HandleError>
  );
};
