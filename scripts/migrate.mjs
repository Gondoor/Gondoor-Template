#!/usr/bin/env node
// Apply Drizzle migrations against the Neon Postgres database for this tenant.
//
// Why this exists: `drizzle-kit migrate` auto-picks drivers when multiple
// Postgres drivers are installed. Use the explicit Neon WebSocket migrator so
// CI deploys avoid direct TCP access to Neon port 5432 while keeping Drizzle's
// transactional migration path.

import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

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
