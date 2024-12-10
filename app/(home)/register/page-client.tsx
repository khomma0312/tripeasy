import {
  RegisterProvider,
  useRegisterContext,
} from "@/features/register/context/register-context";
import { SignUpForm } from "@/features/register/components/signup-form";
import { VerificationEmailSentMessage } from "@/features/register/components/verification-email-sent-message";

const PageClient = () => {
  return (
    <RegisterProvider>
      <RegisterFlow />
    </RegisterProvider>
  );
};

const RegisterFlow = () => {
  const { step } = useRegisterContext();

  if (step === "signup") return <SignUpForm />;
  if (step === "verify") return <VerificationEmailSentMessage />;
};

export default PageClient;
