import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function searchArticles(query) {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return articles;
}
