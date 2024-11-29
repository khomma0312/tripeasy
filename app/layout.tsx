import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, satoshi } from "@/styles/fonts";
import { cn } from "@/utils/common";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.SITE_NAME}`,
    default: `Home | ${process.env.SITE_NAME}`,
  },
  description: "旅行の準備を管理しましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // RootのlayoutにはProviderなどを入れておく
  return (
    <html lang="ja" className={cn(inter.variable, satoshi.variable)}>
      <body className="font-default antialiased">{children}</body>
    </html>
  );
}
