import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yzmwlcjulmpjbyqrizwa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bXdsY2p1bG1wamJ5cXJpendhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDE0NTg4MywiZXhwIjoyMDE1NzIxODgzfQ.6gzYXj0VG-PNmbMQ95aerOGoESKGLs_yerIpZ9HvOZI'
export const supabase = createClient(supabaseUrl, supabaseKey)