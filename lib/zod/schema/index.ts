import { registerPostApiSchema } from "./register";
import { verifyEmailPostApiSchema } from "./verify-email";

// APIパスを追加するごとに、この変数にzodスキーマを追加する
export const pathSchemas = [registerPostApiSchema, verifyEmailPostApiSchema];
