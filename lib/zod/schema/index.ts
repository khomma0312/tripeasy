import { registerPostApiSchema } from "./register";

// APIパスを追加するごとに、この変数にzodスキーマを追加する
export const pathSchemas = [registerPostApiSchema];
