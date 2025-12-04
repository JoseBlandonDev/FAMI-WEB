import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client even with empty strings to avoid build errors
// Runtime checks should handle missing credentials
export const supabase = createClient(supabaseUrl, supabaseKey);

