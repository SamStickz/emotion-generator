import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const emotions = ["happy", "sad", "angry", "excited", "calm", "reflective"];
  const firstRow = emotions.slice(0, 3);
  const secondRow = emotions.slice(3, 6);

  const handleSelect = (emotion) => {
    navigate("/results", { state: { emotion } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">
        How Are You Feeling Today?
      </h1>
      <p className="mb-10 text-slate-400 text-center max-w-md">
        Pick an emotion and get a personalized playlist, art, and quote.
      </p>

      {/* Emotion Grid */}
      <div className="flex flex-col items-center gap-6">
        {/* First row (3 emotions) */}
        <div className="flex gap-4">
          {firstRow.map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleSelect(emotion)}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-lg capitalize transition"
            >
              {emotion}
            </button>
          ))}
        </div>

        {/* Second row (3 emotions) */}
        <div className="flex gap-4 justify-center">
          {secondRow.map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleSelect(emotion)}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-lg capitalize transition"
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
