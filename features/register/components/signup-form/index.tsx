"use client";

import { Button } from "@/components/shadcn/button";
import { FcGoogle } from "react-icons/fc";
import { LoaderCircle } from "lucide-react";
import { useSignUpForm } from "../../hooks/use-signup-form";
import { AuthForm } from "@/components/auth/auth-form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import { RHFPasswordField } from "@/components/shared/rhf-password-field";

export const SignUpForm = () => {
  const { form, mutation, onSubmit, signUpByOAuth } = useSignUpForm();

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
      <Button
        onClick={signUpByOAuth("google")}
        variant="outline"
        className="w-full bg-white text-gray-600 rounded-lg px-4 py-2 mt-3"
      >
        <FcGoogle />
        Googleで新規登録
      </Button>
    </div>
  );
};
