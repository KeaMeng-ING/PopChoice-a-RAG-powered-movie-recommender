import "dotenv/config";
import { gemini, supabase } from "./src/config/config.js";
import movies from "./src/data/content.js";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createEmbedding } from "./src/lib/embeddings.js";
// Embed Movies to Vector and Store in Supabase
// Ask User inputs and embed it to find the nearest match
// Use rpc function to find the nearest match
// Output and pass it to Gemini to generate a response
// Display it

async function splitDocument() {
  const content = movies.map((movie) => ({
    pageContent: movie.content,
    title: movie.title,
    releaseYear: movie.releaseYear,
  }));
  const text = content.map((movie) => {
    return `(${movie.releaseYear}): ${movie.pageContent}`;
  });

  const metaData = content.map((movie) => ({
    title: movie.title,
    releaseYear: movie.releaseYear,
  }));

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 30,
  });

  const output = await splitter.createDocuments(text, metaData);
  return output;
}

async function createAndStoreEmbeddings() {
  const output = await splitDocument();
  await Promise.all(
    output.map(async (chunk) => {
      const embedding = await createEmbedding(gemini, chunk.pageContent);

      const { data, error } = await supabase
        .from("movies")
        .insert([
          {
            content: chunk.pageContent,
            embedding: embedding,
            title: chunk.metadata.title,
            releaseyear: chunk.metadata.releaseYear,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting data into Supabase:", error);
      } else {
        console.log("Inserted data into Supabase:", data);
      }
    }),
  );
}

createAndStoreEmbeddings();
