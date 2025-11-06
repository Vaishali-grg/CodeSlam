// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Get the types from the Supabase client
import type { Database } from './types/supabase' // <-- We'll create this next

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)