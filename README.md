## Relevant Files

- [wrangler.toml](./wrangler.toml)
- [src/edgedb.ts](./src/edgedb.ts)

## Setup

- `npm install`
- `edgedb project init` — (cannot be a local instance due to a temporary bug from Cloudflare Workers)
- Configure `.dev.vars` — (see below)

#### .dev.vars

```sh
EDGEDB_INSTANCE = "<username>/<name>"
EDGEDB_SECRET_KEY = "<secret key>"
```

## Development

- `npm run generate`
- `npm run dev`

## Deployment

- `npx wrangler secret put EDGEDB_INSTANCE`
- `npx wrangler secret put EDGEDB_SECRET_KEY`
- `npm run deploy`

## References

- [Hono Quickstart](https://hono.dev)
- [EdgeDB Quickstart](https://www.edgedb.com/docs/clients/js/index#quickstart)
- [Cloudflare Workers – Node Compatibility](https://developers.cloudflare.com/workers/wrangler/configuration/#node-compatibility)
