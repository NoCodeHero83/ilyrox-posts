import { supabase } from "../lib/supabase";
import type { perfiles } from "../components/types";

export const getProfileById = async (id: string): Promise<perfiles | null> => {
  const { data, error } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data as perfiles;
};
