"use client";

import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { useSignUpForm } from "../../hooks/use-signup-form";
import { AuthForm } from "@/components/auth/auth-form";
import { RHFInputField } from "@/components/shared/rhf-input-field";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="半角英数字記号で入力"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>確認用パスワード</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="上と同じパスワードを入力"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        Googleでログイン
      </Button>
    </div>
  );
};
