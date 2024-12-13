"use client";

import { AuthLayout } from "@/components/layout/auth-layout";
import { SignInForm } from "@/features/login/components/signin-form";

const Login = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default Login;
