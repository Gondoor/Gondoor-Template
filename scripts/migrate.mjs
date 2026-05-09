#!/usr/bin/env node
// Apply Drizzle migrations against the Neon Postgres database for this tenant.
//
// Why this exists: `drizzle-kit migrate` auto-picks the @neondatabase/serverless
// driver when both it and pg are installed, and that path silently exits 1 in
// CI deploys (~0.5s, no logs). Forcing the pg Pool path through the explicit
// drizzle-orm/node-postgres/migrator entry bypasses the picker and gives us
// reliable migrations + readable error output on every deploy.

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('migrate: DATABASE_URL is required');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

try {
  console.log('migrate: applying migrations from lib/db/migrations…');
  await migrate(drizzle(pool), { migrationsFolder: 'lib/db/migrations' });
  console.log('migrate: ok');
} catch (err) {
  console.error('migrate: failed');
  console.error(err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
