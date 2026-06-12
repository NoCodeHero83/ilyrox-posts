import { supabase } from "../lib/supabase";
import type { Property } from "../components/types";

export const getPropertyById = async (id: string): Promise<Property | null> => {
  const { data, error } = await supabase
    .from("propiedades")
    .select("*, operaciones_propiedad(*)")
    .eq("codigo_propiedad", id)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }

  return data as Property;
};

export const getAmenitiesByPropertyId = async (propertyId: string) => {
  const { data, error } = await supabase
    .from("propiedad_amenidades")
    .select("*, catalogo_amenidades(*)")
    .eq("propiedad_id", propertyId);

  if (error) {
    console.error("Error fetching amenities:", error);
    return [];
  }

  return data;
};
