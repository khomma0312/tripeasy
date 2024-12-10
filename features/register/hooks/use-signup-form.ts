import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod/schema/register";
import { signIn } from "next-auth/react";
import { usePostRegister } from "@/services/api/endpoints/register/register";
import { isAxiosError } from "axios";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useRegisterContext } from "@/features/register/context/register-context";

export const useSignUpForm = () => {
  const { setStep } = useRegisterContext();
  const { toast } = useToast();
  const mutation = usePostRegister();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const errorToast = (message: string) =>
    toast({
      variant: "destructive" as const,
      title: "アカウントの作成に失敗しました。",
      description: message,
    });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    mutation.mutate(
      { data },
      {
        onSuccess: async () => {
          setStep("verify");
        },
        onError: (e) => {
          const message = isAxiosError(e)
            ? (e.response?.data as unknown as Error).message
            : (e as Error).message;

          errorToast(message);
        },
      }
    );
  }

  const signUpByOAuth =
    (provider: string) => async (event: React.MouseEvent) => {
      event.preventDefault();
      await signIn(provider, { redirectTo: "/" });
    };

  return {
    form,
    mutation,
    onSubmit,
    signUpByOAuth,
  };
};
