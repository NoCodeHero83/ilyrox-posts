import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
).trim();

if (!supabaseUrl || !supabaseAnonKey) {
  //console.error("Error con la comunicación al servidor");
} else {
  // console.log("Supabase config loaded:", {
  //   urlLength: supabaseUrl.length,
  //   keyLength: supabaseAnonKey.length,
  //   urlStart: supabaseUrl.substring(0, 8) + "...",
  // });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== "undefined" ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
