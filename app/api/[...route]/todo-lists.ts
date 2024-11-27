import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "Todo Lists" });
  })
  .post("/:id", async () => {})
  .patch("/:id", async () => {})
  .delete("/:id", async () => {});

export default app;
