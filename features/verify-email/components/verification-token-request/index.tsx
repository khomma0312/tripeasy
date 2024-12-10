"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useVerificationTokenRequest } from "../../hooks/use-verification-token-request";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { paths } from "@/consts/common";

export const VerificationTokenRequest = () => {
  const { form, mutation, onSubmit } = useVerificationTokenRequest();

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            正しい認証トークンではありません
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ご使用のメール認証リンクが無効であるか、期限切れのようです。
            正しい認証トークンを入力するか、新しい認証トークンをリクエストしてください。
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="tripeasy@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                新しいトークンをリクエストする
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Link
            href={paths.login.pathname}
            className="mt-4 text-sm text-primary hover:text-primary/65"
          >
            ログイン画面へ
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
