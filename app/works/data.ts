import { supabase } from "../utils/supabase";

export interface Work {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  tags: string[];
  year: string;
  embedUrl?: string;
}

export async function fetchWorks(): Promise<Work[]> {
  const { data, error } = await supabase.from("works").select("*");
  if (error) {
    console.error("Error fetching works:", error);
    return [];
  }
  return data.map((row: any) => ({
    title: row.title,
    slug: row.slug,
    description: row.description,
    imageUrl: row.image_url,
    tags: row.tags,
    year: row.year,
    embedUrl: row.embed_url,
  }));
}
