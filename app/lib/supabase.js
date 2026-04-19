import { createClient } from '@supabase/supabase-js';

export function getServerSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export const missingDb = () =>
  Response.json({ error: 'Database not configured' }, { status: 500 });
