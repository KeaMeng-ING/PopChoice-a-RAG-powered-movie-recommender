import PopChoiceHeader from "./PopChoiceHeader.jsx";

export default function LoadingView() {
  return (
    <div className="w-full max-w-90 bg-[#0a1147] rounded-md p-10 flex flex-col items-center gap-6 font-serif">
      <PopChoiceHeader />

      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-12 h-12 border-4 border-[#4a5285] border-t-[#7cd992] rounded-full animate-spin" />
        <p className="text-white text-[15px] text-center">
          Picking out your next favorite movie&hellip;
        </p>
      </div>
    </div>
  );
}
