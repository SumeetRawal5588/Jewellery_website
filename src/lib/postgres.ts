import { Pool } from "pg";

const DEFAULT_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/varahi";

const connectionString = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export const pool = global.__dbPool || new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = pool;
}

let initialized = false;

export async function initializeDb() {
  if (initialized) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC NOT NULL,
      weight NUMERIC NOT NULL DEFAULT 0,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      badge TEXT,
      createdAt TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS catalogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      coverImage TEXT NOT NULL,
      pdfUrl TEXT,
      productIds JSONB NOT NULL DEFAULT '[]'::jsonb,
      createdAt TEXT NOT NULL
    );
  `);

  initialized = true;
}
