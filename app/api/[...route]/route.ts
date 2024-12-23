import { Hono } from "hono";
import { handle } from "hono/vercel";
import todoLists from "./todo-lists";
import todoItems from "./todo-items";
import register from "./register";
import verifyEmail from "./verify-email";
import requestToken from "./request-token";

const app = new Hono().basePath("/api");

app.route("/todo-lists", todoLists);
app.route("/todo-items", todoItems);
app.route("/register", register);
app.route("/verify-email", verifyEmail);
app.route("/request-token", requestToken);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
