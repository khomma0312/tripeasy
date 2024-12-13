import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod/schema/signin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/shadcn/use-toast";
import { useErrorToast } from "@/hooks/common/use-error-toast";

export const useSignInForm = () => {
  const [isEmailSignIning, setIsEmailSignIning] = useState(false);
  const router = useRouter();
  const { errorToast } = useErrorToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInByEmail = async (data: z.infer<typeof signInSchema>) => {
    setIsEmailSignIning(true);
    const result = await signIn("credentials", { redirect: false, ...data });
    setIsEmailSignIning(false);

    if (result?.error) {
      errorToast("ログインに失敗しました。");
      return;
    }

    toast({ title: "ログインに成功しました！" });
    router.push("/");
  };

  return {
    form,
    signInByEmail,
    isEmailSignIning,
  };
};
