import { Hono } from "hono";
import { handle } from "hono/vercel";
import todoLists from "./todo-lists";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/todo-lists", todoLists);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
