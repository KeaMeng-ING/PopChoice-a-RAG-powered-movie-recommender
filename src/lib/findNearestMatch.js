export async function findNearestMatch(supabase, embedding) {
  const { data } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_threshold: 0.5,
    match_count: 1,
  });
  console.log("Nearest match from Supabase:", data);
  return data;
}
