import { Hono } from "hono";
import * as edgedb from "edgedb";
import e from "../dbschema/edgeql-js";

const route = new Hono();

route.get("/", async (c) =>
{
  // using cloud EdgeDB instance
  const client = edgedb.createHttpClient({
    instanceName: (c.env as any).EDGEDB_INSTANCE,
    secretKey: (c.env as any).EDGEDB_SECRET_KEY,
  });

  const query = "SELECT 1 + 1";

  return c.text(`${query} = ${await client.query(query)}`);
});

route.get("/add-person", async (c) =>
{
  const client = edgedb.createHttpClient({
    instanceName: (c.env as any).EDGEDB_INSTANCE,
    secretKey: (c.env as any).EDGEDB_SECRET_KEY,
  });

  const query = e.insert(e.Person, {
    name: `Person #${Date.now()}`,
  });

  return c.json(await query.run(client));
});

route.get("/persons", async (c) =>
{
  const client = edgedb.createHttpClient({
    instanceName: (c.env as any).EDGEDB_INSTANCE,
    secretKey: (c.env as any).EDGEDB_SECRET_KEY,
  });

  const query = e.select(e.Person, () => ({
    ...e.Person["*"]
  }));

  return c.json(await query.run(client));
});

// #region Failed Attempts
// createClient
route.get("/1", async (c) =>
{
  // STATUS: Failed
  // EdgeDBError: 'createClient()' cannot be used in browser(or edge runtime) environment, use 'createHttpClient()' API instead
  
  const client = edgedb.createClient();

  return c.json(await client.query("SELECT 1 + 1"));
});

// createHttpClient
route.get("/2", async (c) =>
{
  // STATUS: Failed
  // Client Connection Error: no connection options specified either by arguments to `createClient` API or environment variables; also cannot resolve from edgedb.toml in browser (or edge runtime) environment
  
  const client = edgedb.createHttpClient();

  return c.json(await client.query("SELECT 1 + 1"));
});

// using local EdgeDB instance
route.get("/3", async (c) =>
{
  // STATUS: Failed
  // WARNING: known issue with `fetch()` requests to custom HTTPS ports in published Workers

  const client = edgedb.createHttpClient({
    dsn: "edgedb://edgedb@localhost:10710/edgedb"
  });

  return c.json(await client.query("SELECT 1 + 1"));
});
// #endregion

export default route;
