# ShapeShift Website Backend

Strapi 5 CMS backend powering the ShapeShift website.

## Requirements

- Node 24 — use `nvm use` or `fnm use` (see `.nvmrc`)
- [Corepack](https://nodejs.org/api/corepack.html) for Yarn 4 — run once: `corepack enable`

## First-time Setup

```bash
# 1. Install dependencies
yarn install

# 2. Configure environment
cp .env.example .env
# Edit .env and fill in the required values (see Environment section below)

# 3. Generate TypeScript types from content schemas
yarn types
```

## Development

```bash
yarn develop
```

Starts Strapi with auto-reload enabled. The admin panel is available at `http://localhost:1337/admin`.

On first run, Strapi will prompt you to create an admin account.

## Production

```bash
# Build the admin panel (required before starting)
yarn build

# Start the server
yarn start
```

## Scripts

| Command | Description |
|---|---|
| `yarn develop` | Start with auto-reload (development) |
| `yarn build` | Build the admin panel |
| `yarn start` | Start without auto-reload (production) |
| `yarn types` | Regenerate TypeScript types from content-type schemas |
| `yarn clean` | Remove all generated files and node_modules for a fresh install |

## Database

**Development** uses SQLite by default — no configuration needed, the database file is created at `.tmp/data.db`.

**Production** (Railway) uses PostgreSQL. Set `DATABASE_CLIENT=postgres` and `DATABASE_URL` to the connection string provided by the Railway Postgres plugin.

SSL is configured via the connection string directly. Append `?sslmode=require` to `DATABASE_URL` if connecting over a public URL rather than Railway's private networking.

## Content Types

After modifying content-type schemas in the Strapi admin or in `src/api/`, regenerate TypeScript types:

```bash
yarn types
```

Generated types are written to `types/generated/` and should not be committed.
