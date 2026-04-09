import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy-init the Neon client + Drizzle handle so that importing this module
// does NOT throw at build time when DATABASE_URL is unset. Next.js's
// "Collecting page data" step imports every route module to extract metadata,
// which previously caused `next build` to fail with
//   Error: No database connection string was provided to `neon()`
// any time the build environment didn't have DATABASE_URL set (e.g. inside
// the Gondoor agent's Blaxel sandbox build verification step, or any local
// `pnpm build` without a .env file).
//
// The proxy below defers the `neon(process.env.DATABASE_URL)` call until
// the FIRST property access on `db`, which only happens at request time.
// At that point DATABASE_URL is guaranteed to be set on Cloudflare Pages
// (seeded by the Gondoor provisioning step) or in a local .env.

type Schema = typeof schema;
type DrizzleDb = NeonHttpDatabase<Schema>;

let _db: DrizzleDb | null = null;

function getDb(): DrizzleDb {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. The Neon connection string must be provided " +
        "via environment variables before any database query runs.",
    );
  }
  const sql: NeonQueryFunction<false, false> = neon(url);
  _db = drizzle(sql, { schema });
  return _db;
}

// Proxy `db` so every access (db.query.user.findFirst, db.select(), etc.) goes
// through getDb() — but the proxy itself can be safely imported at module-load
// time without triggering the connection.
export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
}) as DrizzleDb;
