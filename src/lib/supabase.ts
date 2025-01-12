import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Please click the "Connect to Supabase" button in the top right corner to set up your Supabase project.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);