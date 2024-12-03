import bcrypt from "bcrypt";

export const getHashedPassword = async (password: string) =>
  bcrypt.hash(password, 10);
