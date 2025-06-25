import { createClient } from '@supabase/supabase-js';

var supabaseURL = import.meta.env.VITE_SUPABASE_URL;
var supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export default createClient( supabaseURL, supabaseKey )