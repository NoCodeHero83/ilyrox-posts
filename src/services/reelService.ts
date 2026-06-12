import { supabase } from "../lib/supabase";
import type { Reel } from "../components/types";

export const getReelById = async (id: string): Promise<Reel | null> => {
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching reel:", error);
    return null;
  }

  return data as Reel;
};
