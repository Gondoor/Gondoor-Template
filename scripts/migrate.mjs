#!/usr/bin/env node
// GONDOOR_ORPHAN_SQL_MIGRATION_GUARD
// Apply Drizzle migrations against the Neon Postgres database for this tenant.
//
// Drizzle only applies files listed in lib/db/migrations/meta/_journal.json.
// Generated SaaS tasks can add SQL files without updating that journal; apply
// those orphan files after the normal migrator so deploys do not skip schema
// changes and fail later at runtime.

import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

const DATABASE_URL = process.env.DATABASE_URL;
const MIGRATIONS_FOLDER = 'lib/db/migrations';
const JOURNAL_PATH = join(MIGRATIONS_FOLDER, 'meta', '_journal.json');

if (!DATABASE_URL) {
  console.error('migrate: DATABASE_URL is required');
  process.exit(1);
}

async function readSqlMigrationFiles() {
  try {
    const entries = await readdir(MIGRATIONS_FOLDER, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
      .map((entry) => entry.name)
      .sort();
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function readJournalTags() {
  try {
    const raw = await readFile(JOURNAL_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const entries = Array.isArray(parsed.entries) ? parsed.entries : [];
    return new Set(
      entries
        .map((entry) => (entry && typeof entry.tag === 'string' ? entry.tag : null))
        .filter(Boolean),
    );
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      return new Set();
    }
    throw err;
  }
}

async function ensureMigrationTable(pool) {
  await pool.query('CREATE SCHEMA IF NOT EXISTS drizzle');
  await pool.query(
    'CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (id serial PRIMARY KEY, hash text NOT NULL, created_at bigint)',
  );
}

async function appliedMigrationCount(pool) {
  const result = await pool.query('SELECT id FROM drizzle.__drizzle_migrations ORDER BY id');
  return result.rowCount ?? result.rows.length;
}

async function appliedMigrationHashes(pool) {
  const result = await pool.query('SELECT hash FROM drizzle.__drizzle_migrations');
  return new Set(
    result.rows
      .map((row) => (row && typeof row.hash === 'string' ? row.hash : null))
      .filter(Boolean),
  );
}

function splitSqlStatements(sql) {
  return sql
    .split('--> statement-breakpoint')
    .map((statement) => statement.trim())
    .filter(Boolean);
}

async function readSqlMigrationFile(fileName) {
  const sql = await readFile(join(MIGRATIONS_FOLDER, fileName), 'utf8');
  return {
    fileName,
    hash: createHash('sha256').update(sql).digest('hex'),
    statements: splitSqlStatements(sql),
  };
}

async function applySqlMigrationFile(pool, migration) {
  const { fileName, hash, statements } = migration;
  if (statements.length === 0) return;

  console.log('migrate: applying untracked SQL migration ' + fileName);
  await pool.query('BEGIN');
  try {
    for (const statement of statements) {
      await pool.query(statement);
    }
    await pool.query('INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES ($1, $2)', [
      hash,
      Date.now(),
    ]);
    await pool.query('COMMIT');
  } catch (err) {
    await pool.query('ROLLBACK').catch(() => undefined);
    throw err;
  }
}

async function applyUntrackedSqlMigrations(pool) {
  await ensureMigrationTable(pool);
  const files = await readSqlMigrationFiles();
  if (files.length === 0) return;

  const journalTags = await readJournalTags();
  const untracked =
    journalTags.size > 0
      ? files.filter((fileName) => !journalTags.has(fileName.replace(/\.sql$/, '')))
      : files.slice(await appliedMigrationCount(pool));

  const appliedHashes = await appliedMigrationHashes(pool);
  for (const fileName of untracked) {
    const migration = await readSqlMigrationFile(fileName);
    if (appliedHashes.has(migration.hash)) continue;
    await applySqlMigrationFile(pool, migration);
    appliedHashes.add(migration.hash);
  }
}

const pool = new Pool({ connectionString: DATABASE_URL });

try {
  console.log('migrate: applying migrations from lib/db/migrations...');
  await migrate(drizzle(pool), { migrationsFolder: MIGRATIONS_FOLDER });
  await applyUntrackedSqlMigrations(pool);
  console.log('migrate: ok');
} catch (err) {
  console.error('migrate: failed');
  console.error(err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
