import PopChoiceHeader from "./PopChoiceHeader.jsx";

export default function MovieOutputView({
  onGoAgain,
  recommendation,
  title,
  releaseYear,
}) {
  return (
    <div className="w-full max-w-90 bg-[#0a1147] rounded-md p-10 flex flex-col gap-6 font-serif">
      <PopChoiceHeader />

      <div className="flex flex-col gap-4">
        <h2 className="text-white text-2xl m-0">
          {title} ({releaseYear})
        </h2>
        <p className="text-white text-[15px] leading-relaxed m-0">
          {recommendation}
        </p>
      </div>

      <button
        onClick={onGoAgain}
        className="bg-[#7cd992] hover:bg-[#6bc981] border-none rounded-lg text-[#0a1147] font-bold text-xl p-4.5 cursor-pointer"
      >
        Go Again
      </button>
    </div>
  );
}
