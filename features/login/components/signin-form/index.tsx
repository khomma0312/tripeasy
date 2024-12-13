"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { LoaderCircle } from "lucide-react";
import { useSignInForm } from "../../hooks/use-signin-form";
import { AuthForm } from "@/features/auth/components/auth-form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import { RHFPasswordField } from "@/components/shared/rhf-password-field";
import { AlertDestructive } from "@/components/shared/alert-destructive";
import { GoogleOAuthButton } from "@/features/auth/components/google-oauth-button";

export const SignInForm = () => {
  const { form, signInByEmail, isEmailSignIning } = useSignInForm();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col gap-7">
      {error && (
        <AlertDestructive
          title="ログインに失敗しました。"
          description="もう一度お試しいただくか、別の方法をお試しください。"
        />
      )}
      <div>
        <AuthForm title="ログイン" form={form} onSubmit={signInByEmail}>
          <RHFInputField
            control={form.control}
            name="email"
            label="メールアドレス"
            placeholder="trippy@example.com"
          />
          <RHFPasswordField
            control={form.control}
            name="password"
            label="パスワード"
            placeholder="半角英数字記号で入力"
          />
          <Button type="submit" disabled={isEmailSignIning} className="w-full">
            {isEmailSignIning && <LoaderCircle className="animate-spin" />}
            ログイン
          </Button>
        </AuthForm>
        <GoogleOAuthButton />
      </div>
    </div>
  );
};
