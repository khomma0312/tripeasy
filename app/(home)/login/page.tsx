"use client";

import { CenteredContentLayout } from "@/components/layout/centered-content-layout";
import { SignInForm } from "@/features/login/components/signin-form";

const Login = () => {
  return (
    <CenteredContentLayout>
      <SignInForm />
    </CenteredContentLayout>
  );
};

export default Login;
