import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhseqzovowlatskxmbha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoc2Vxem92b3dsYXRza3htYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTI3OTQsImV4cCI6MjA0ODM2ODc5NH0.KDLOzv0IiURzesIMdWLto2yXG1qqSmCBddXWf554MXI';

export const supabase = createClient(supabaseUrl, supabaseKey);