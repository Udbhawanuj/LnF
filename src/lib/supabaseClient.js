import { createClient } from "@supabase/supabase-js"

// Read from environment variables (Vite style)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Helpful error for dev mode
  console.error(
    "[Supabase] Missing configuration. " +
      "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  )
  // You *could* throw here, but logging is enough for most dev cases
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
