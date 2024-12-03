import { Hono } from "hono";
import { handle } from "hono/vercel";
import todoLists from "./todo-lists";
import register from "./register";

const app = new Hono().basePath("/api");

app.route("/todo-lists", todoLists);
app.route("/register", register);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
