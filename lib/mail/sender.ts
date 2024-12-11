import { Resend } from "resend";
import { EmailTemplate } from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: `メール認証のお願い - ${process.env.SITE_NAME}`,
    react: EmailTemplate({ confirmationLink }),
  });

  return { error };
};
