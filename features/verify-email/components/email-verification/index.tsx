"use client";

import { TitleHeading } from "@/components/shared/title-heading";
import { usePostVerifyEmail } from "@/services/api/endpoints/verify-email/verify-email";
import { isValidUUID } from "@/utils/common";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { VerificationTokenRequest } from "@/features/verify-email/components/verification-token-request";
import { EmailVerificationSuccess } from "../email-verification-success";
import { EmailVerificationError } from "../email-verification-error";

export const EmailVerification = () => {
  // メール認証のAPIエンドポイントにリクエストを投げる
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { mutate, isSuccess, isError, error } = usePostVerifyEmail();

  const verifyEmail = useCallback(() => {
    if (isSuccess || isError) {
      return;
    }

    if (!isValidUUID(token)) {
      return;
    }

    mutate({ data: { token } });
  }, [token, mutate, isSuccess, isError]);

  useEffect(() => {
    verifyEmail();
  }, []);

  // 有効なトークンがなければ、トークンのリクエストフォームを表示
  if (!isValidUUID(token)) {
    return <VerificationTokenRequest />;
  }

  // 成功したら、メール認証に成功したメッセージ、ログイン画面へのリンクを表示
  if (isSuccess) {
    return <EmailVerificationSuccess />;
  }

  // 失敗したら、失敗したことを示すメッセージを表示
  if (isError) {
    return <EmailVerificationError error={error} />;
  }

  // 認証中であることを示すローディング画面を表示する
  return (
    <div className="h-full flex flex-col items-center gap-4">
      <TitleHeading>メールの検証中です...</TitleHeading>
      <LoaderCircle className="size-10 animate-spin" />
    </div>
  );
};
