import * as React from "react";

interface EmailTemplateProps {
  confirmationLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmationLink,
}) => (
  <div>
    <p>
      <a href={confirmationLink}>こちら</a>
      をクリックしてメール認証を完了させてください。
    </p>
  </div>
);
