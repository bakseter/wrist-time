import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseUrl) throw new Error('Missing SUPABASE_URL environment variable.');

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseAnonKey) throw new Error('Missing SUPABASE_ANON_KEY environment variable.');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
