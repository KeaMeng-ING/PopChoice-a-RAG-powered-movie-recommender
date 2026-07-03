export async function createEmbedding(gemini, input) {
  const embeddingResponse = await gemini.models.embedContent({
    model: "gemini-embedding-001",
    contents: input,
  });
  return embeddingResponse.embeddings[0].values;
}
