import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // ログインしていない状態で入ろうとした場合はリダイレクトする
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Next.js内部のファイル、ログイン、新規登録ページ、新規登録用APIなどはスキップ
    "/((?!_next|login|api|register|verify-email|api/auth|api/register|api/verify-email|api/request-token|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
