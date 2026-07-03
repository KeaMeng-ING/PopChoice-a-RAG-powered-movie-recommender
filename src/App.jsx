import { useState } from "react";
import QuestionsView from "./components/QuestionsView.jsx";
import MovieOutputView from "./components/MovieOutputView.jsx";
import LoadingView from "./components/LoadingView.jsx";
import { gemini, supabase } from "./config/browserConfig.js";
import { createEmbedding } from "./lib/embeddings.js";
import { findNearestMatch } from "./lib/findNearestMatch.js";
import { getChatCompletion } from "./lib/geminiResponse.js";

export default function App() {
  const [view, setView] = useState("questions");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const handleSubmit = async (favoriteMovie, movieMood, movieTone) => {
    try {
      setLoading(true);
      const userInput = `Favorite movie: ${favoriteMovie}\nMood: ${movieMood}\nTone: ${movieTone}`;
      const userInputEmbed = await createEmbedding(gemini, userInput);

      // Find similar in supabase and get context
      const matches = await findNearestMatch(supabase, userInputEmbed);
      const match = matches?.[0];

      if (!match) {
        throw new Error("No matching movie found in Supabase.");
      }

      const result = await getChatCompletion(
        gemini,
        match.content,
        `This is user preference: ${userInput}`,
      );

      setTitle(match.title);
      setReleaseYear(match.releaseyear);
      setRecommendation(result);
    } catch (error) {
      console.error("Error during recommendation process:", error);
    } finally {
      setLoading(false);
      setView("output");
    }
  };

  function handleGoAgain() {
    setView("questions");
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#e5e5e5] p-10">
      {loading ? (
        <LoadingView />
      ) : view === "questions" ? (
        <QuestionsView onSubmit={handleSubmit} />
      ) : (
        <MovieOutputView
          onGoAgain={handleGoAgain}
          recommendation={recommendation}
          title={title}
          releaseYear={releaseYear}
        />
      )}
    </div>
  );
}
