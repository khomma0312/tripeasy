import { Hono } from "hono";
import { handle } from "hono/vercel";
import register from "./register";
import verifyEmail from "./verify-email";
import requestToken from "./request-token";
import todoLists from "./todo-lists";
import todoItems from "./todo-items";
import accommodations from "./accommodations";
import trips from "./trips";
import tripRoutePoints from "./trip-route-points";
import destinations from "./destinations";

const app = new Hono().basePath("/api");

app.route("/register", register);
app.route("/verify-email", verifyEmail);
app.route("/request-token", requestToken);
app.route("/todo-lists", todoLists);
app.route("/todo-items", todoItems);
app.route("/accommodations", accommodations);
app.route("/trips", trips);
app.route("/trip-route-points", tripRoutePoints);
app.route("/destinations", destinations);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
