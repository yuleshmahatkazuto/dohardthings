import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.SUPABASE_KEY,
  ssl: { rejectUnauthorized: false },
});

export default pool;
