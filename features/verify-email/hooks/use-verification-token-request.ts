import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/shadcn/use-toast";
import { requestTokenSchema } from "@/lib/zod/schema/request-token";
import { usePostRequestToken } from "@/services/api/endpoints/request-token/request-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

export const useVerificationTokenRequest = () => {
  const { toast } = useToast();
  const mutation = usePostRequestToken();
  const form = useForm<z.infer<typeof requestTokenSchema>>({
    resolver: zodResolver(requestTokenSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof requestTokenSchema>) => {
    mutation.mutate(
      { data },
      {
        onSuccess: async () => {
          toast({
            title: "メール検証用のリンクを送信しました",
            description:
              "メール検証用のリンクを入力されたメールアドレス宛に送信しました。メールを確認し、認証をお願いします。",
          });
        },
        onError: (e) => {
          const message = isAxiosError(e)
            ? (e.response?.data as unknown as Error).message
            : (e as Error).message;

          toast({
            variant: "destructive",
            title: "トークンの発行に失敗しました",
            description: message,
          });
        },
      }
    );
  };

  return {
    form,
    mutation,
    onSubmit,
  };
};
