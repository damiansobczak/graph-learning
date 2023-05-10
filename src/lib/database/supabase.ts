import { createClient } from '@supabase/supabase-js'
import { Database } from '../interfaces/ISupabase'

const supabaseUrl = 'https://gtnegwtaetvnvadfqsfm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bmVnd3RhZXR2bnZhZGZxc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1NTYzMzIsImV4cCI6MTk5OTEzMjMzMn0.INERmbF96ibafjj-RcqoUainKr5OUitmtoErBKbCYBc'
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)