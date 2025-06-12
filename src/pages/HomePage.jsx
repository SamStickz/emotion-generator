import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  const emotions = ["happy", "sad", "angry", "excited", "calm"];
  const firstRow = emotions.slice(0, 3);
  const secondRow = emotions.slice(3);

  const handleSelect = (emotion) => {
    navigate("/results", { state: { emotion } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 py-10">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How Are You Feeling Today?
      </motion.h1>

      <motion.p
        className="mb-10 text-slate-400 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Pick an emotion and get a personalized playlist, art, and quote.
      </motion.p>

      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-4">
          {firstRow.map((emotion) => (
            <motion.button
              key={emotion}
              onClick={() => handleSelect(emotion)}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-lg capitalize transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {emotion}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-4 justify-center">
          {secondRow.map((emotion) => (
            <motion.button
              key={emotion}
              onClick={() => handleSelect(emotion)}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-lg capitalize transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {emotion}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
