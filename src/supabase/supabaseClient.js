import { createClient } from "@supabase/supabase-js";

const supaBaseUrl = "https://ogenjzlynipqfugjlnbj.supabase.co";
const supaBaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZW5qemx5bmlwcWZ1Z2psbmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4OTc2NDQsImV4cCI6MTk2MTQ3MzY0NH0.GSx_vFUXm6chpsVVsZrfEdXF28C2ltfQaT2YS-39KBo";

const supabase = createClient(supaBaseUrl, supaBaseKey);

export default supabase;