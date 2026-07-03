"use client";
import { useState } from "react";
import PopChoiceHeader from "./PopChoiceHeader.jsx";

export default function QuestionsView({ onSubmit }) {
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [movieMood, setMovieMood] = useState("");
  const [movieTone, setMovieTone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(favoriteMovie, movieMood, movieTone);
  };

  return (
    <div className="w-full max-w-90 bg-[#0a1147] rounded-md p-10 flex flex-col gap-6 font-serif">
      <PopChoiceHeader />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-white text-[15px]">
            What's your favorite movie and why?
          </label>
          <textarea
            rows={3}
            placeholder="The Shawshank Redemption&#10;Because it taught me to never give up hope no matter how hard life gets"
            onChange={(e) => setFavoriteMovie(e.target.value)}
            className="bg-[#4a5285] border-none rounded-lg text-white text-sm p-3 resize-none placeholder:text-[#8890b8] focus:outline-2 focus:outline-[#7cd992]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-[15px]">
            Are you in the mood for something new or a classic?
          </label>
          <textarea
            rows={2}
            placeholder="I want to watch movies that were released after 1990"
            onChange={(e) => setMovieMood(e.target.value)}
            className="bg-[#4a5285] border-none rounded-lg text-white text-sm p-3 resize-none placeholder:text-[#8890b8] focus:outline-2 focus:outline-[#7cd992]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-[15px]">
            Do you wanna have fun or do you want something serious?
          </label>
          <textarea
            rows={2}
            placeholder="I want to watch something stupid and fun"
            onChange={(e) => setMovieTone(e.target.value)}
            className="bg-[#4a5285] border-none rounded-lg text-white text-sm p-3 resize-none placeholder:text-[#8890b8] focus:outline-2 focus:outline-[#7cd992]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#7cd992] hover:bg-[#6bc981] border-none rounded-lg text-[#0a1147] font-bold text-xl p-4.5 cursor-pointer mt-5"
        >
          Let's Go
        </button>
      </form>
    </div>
  );
}
