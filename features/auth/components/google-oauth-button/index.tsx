import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/shadcn/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const GoogleOAuthButton = () => {
  const { authenticateByOAuth } = useAuth();

  return (
    <Button
      onClick={authenticateByOAuth("google")}
      variant="outline"
      className="w-full bg-white text-gray-600 rounded-lg px-4 py-2 mt-3"
    >
      <FcGoogle />
      Googleでログイン
    </Button>
  );
};
