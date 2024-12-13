import { signIn } from "next-auth/react";

export const useAuth = () => {
  const authenticateByOAuth =
    (provider: string) => async (event: React.MouseEvent) => {
      event.preventDefault();
      await signIn(provider, { redirectTo: "/" });
    };

  return {
    authenticateByOAuth,
  };
};
