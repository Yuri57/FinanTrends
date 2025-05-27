import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://oupodhxjdvrqidagryoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cG9kaHhqZHZycWlkYWdyeW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTU2NzAsImV4cCI6MjA1MTc3MTY3MH0._dVd9rWzJczJtYV2XDKV2Mt9f0ewdKWk20LcqrkmSDY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
