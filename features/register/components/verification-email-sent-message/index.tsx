import { TitleHeading } from "@/components/shared/title-heading";

export const VerificationEmailSentMessage = () => {
  return (
    <div className="flex flex-col gap-3 text-center">
      <TitleHeading>アカウントの登録が完了しました🎉</TitleHeading>
      <div>
        <p>入力したメールアドレスに認証用URLを送信しました。</p>
        <p>メール内のリンクをクリックして認証を完了させてください。</p>
      </div>
    </div>
  );
};
