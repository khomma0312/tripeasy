"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { useSignUpForm } from "@/features/register/hooks/use-signup-form";
import { AuthForm } from "@/features/auth/components/auth-form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import { RHFPasswordField } from "@/components/shared/rhf-password-field";
import { GoogleOAuthButton } from "@/features/auth/components/google-oauth-button";

export const SignUpForm = () => {
  const { form, mutation, onSubmit } = useSignUpForm();

  return (
    <div>
      <AuthForm title="アカウント作成" form={form} onSubmit={onSubmit}>
        <RHFInputField
          control={form.control}
          name="name"
          label="ユーザー名"
          placeholder="ユーザー名"
        />
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
        <RHFPasswordField
          control={form.control}
          name="confirmPassword"
          label="確認用パスワード"
          placeholder="上と同じパスワードを入力"
        />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending && <LoaderCircle className="animate-spin" />}
          アカウントを作成
        </Button>
      </AuthForm>
      <GoogleOAuthButton />
    </div>
  );
};
