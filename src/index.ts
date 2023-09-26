import { Hono } from "hono"
import edgedb from "./edgedb";

const app = new Hono();
app.route("/edgedb", edgedb);

app.get("/", (c) => c.text("EdgeDB + Hono + Cloudflare Workers"));

app.onError((err, c) =>
{
  return c.html(`
    <h2 style="color: red;">${err.name}</h2>
    <b>${err.message}</b>
    <pre style="color: gray;">${err.stack}</pre>
  `);
});

export default app;
