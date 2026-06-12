import { supabase } from "../lib/supabase";
import type { Post } from "../components/types";

export const getPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, perfiles!publicado_por(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as Post;
};
