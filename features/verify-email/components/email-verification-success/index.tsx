import Link from "next/link";
import { TitleHeading } from "@/components/shared/title-heading";
import { paths } from "@/consts/common";

export const EmailVerificationSuccess = () => {
  return (
    <div className="h-full grid grid-rows-[1fr_200px]">
      <div className="flex flex-col items-center gap-4">
        <TitleHeading>メールの検証に成功しました🎉</TitleHeading>
        <div className="text-center">
          <p>メールの検証が完了しました！</p>
          <p>ログインして旅行の計画を立てましょう🧳</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          href={paths.login.pathname}
          className="text-primary hover:text-primary/65"
        >
          ログインページへ→
        </Link>
      </div>
    </div>
  );
};
