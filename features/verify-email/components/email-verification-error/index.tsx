import Link from "next/link";
import { TitleHeading } from "@/components/shared/title-heading";
import { paths } from "@/consts/common";
import { PostVerifyEmail400, PostVerifyEmail404 } from "@/services/api/model";
import { AxiosError } from "axios";

type Props = { error: AxiosError<PostVerifyEmail400 | PostVerifyEmail404> };

export const EmailVerificationError = ({ error }: Props) => {
  return (
    <div className="h-full grid grid-rows-[1fr_200px]">
      <div className="flex flex-col items-center gap-4">
        <TitleHeading>メールの検証に失敗しました😢</TitleHeading>
        <div>
          <p>{error?.response?.data.message}</p>
          <p>他の登録方法もお試しください。</p>
        </div>
      </div>
      <div>
        <Link
          href={paths.register.pathname}
          className="text-primary hover:text-primary/65"
        >
          ←新規登録画面に戻る
        </Link>
      </div>
    </div>
  );
};
