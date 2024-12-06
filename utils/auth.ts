import bcrypt from "bcryptjs";

export const getHashedPassword = async (password: string) =>
  bcrypt.hash(password, 10);
