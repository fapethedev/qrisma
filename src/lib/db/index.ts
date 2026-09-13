import { Pool } from 'pg';

// Singleton Pool pour PostgreSQL (compatible Dev & Prod)
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForDb.pgPool ||
  new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      'postgresql://qrcraft:qrcraft_secret@localhost:5432/qrcraft_db?schema=public',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgPool = pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development' && duration > 200) {
    console.warn(`[DB Slow Query] ${duration}ms: ${text}`);
  }
  return res.rows;
}
