import { v4 as uuidv4 } from "uuid";
import { db } from "../drizzle/db";
import { verificationTokens } from "@/schema";
import { eq } from "drizzle-orm";

export const generateVerificationToken = async (email: string) => {
  // トークンを生成
  const token = uuidv4();
  // 有効期限を1時間に設定
  const expires = new Date().getTime() + 1000 * 60 * 60;

  // 同じメールアドレス向けにすでに存在するトークンがあれば、削除する
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }

  const verificationToken = await insertVerificationToken(
    email,
    token,
    expires
  );

  return verificationToken;
};

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email));

    return verificationToken;
  } catch (e) {
    console.error(e);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return verificationToken;
  } catch (e) {
    console.error(e);
  }
};

const deleteVerificationToken = async (id: number) => {
  try {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
  } catch (e) {
    console.error(e);
  }
};

const insertVerificationToken = async (
  email: string,
  token: string,
  expires: number
) => {
  try {
    const [insertedToken] = await db
      .insert(verificationTokens)
      .values({
        email,
        token,
        expires: new Date(expires),
      })
      .returning({ token: verificationTokens.token });

    return insertedToken.token;
  } catch (e) {
    console.error(e);
  }
};
