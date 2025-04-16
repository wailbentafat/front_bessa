// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vsckwiekzblfszkwqpyz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2t3aWVremJsZnN6a3dxcHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTEyMTIsImV4cCI6MjA2MDM4NzIxMn0.ItEa7Fj7BYYko6PE7VsFBIo7DFtqwaOxJDBPdxTZW9Q"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


