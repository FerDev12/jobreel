import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

export function getTransactionalClient() {
  const pool = new Pool({ connectionString: process.env.DB_URL });
  const db = drizzle(pool, { schema });

  return { db, pool };
}
