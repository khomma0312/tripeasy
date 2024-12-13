import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { users } from "@/schema";

export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
      },
      async authorize(credentials) {
        const email = credentials.email ? (credentials?.email as string) : "";
        const password = credentials?.password
          ? (credentials?.password as string)
          : "";

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) {
          return null;
        }

        const passwordCorrect = await compare(password, user.password);

        if (passwordCorrect) {
          return {
            id: user.id.toString(), // idをstring型に変換
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
