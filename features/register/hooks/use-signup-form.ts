import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod/schema/register";
import { usePostRegister } from "@/services/api/endpoints/register/register";
import { isAxiosError } from "axios";
import { useRegisterContext } from "@/features/register/context/register-context";
import { useErrorToast } from "@/hooks/common/use-error-toast";

export const useSignUpForm = () => {
  const { setStep } = useRegisterContext();
  const { errorToast } = useErrorToast();
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

          errorToast("アカウントの作成に失敗しました。", message);
        },
      }
    );
  }

  return {
    form,
    mutation,
    onSubmit,
  };
};
