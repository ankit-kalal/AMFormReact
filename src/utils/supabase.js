import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iycfvzihyxtqdbtjtcyk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y2Z2emloeXh0cWRidGp0Y3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzY3MDQsImV4cCI6MjA3NDMxMjcwNH0.MEb4X9q2vxMPbG03X4jgxFmS1LrYJAexMx3ihWPJCqQ'

export const supabase = createClient(supabaseUrl, supabaseKey)

