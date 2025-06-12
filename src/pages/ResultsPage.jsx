import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { FiShare2, FiDownload } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import { searchPlaylistByEmotion } from "../api/spotify";
import { fetchEmotionImage } from "../api/image";
import { fetchQuoteByEmotion } from "../api/quote";

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const emotion = state?.emotion || "Unknown";

  const [playlist, setPlaylist] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const result = await searchPlaylistByEmotion(emotion);
        setPlaylist(result);
      } catch (error) {
        console.error("Spotify error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (emotion !== "Unknown") fetchPlaylist();
  }, [emotion]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const img = await fetchEmotionImage(emotion);
        setImageUrl(img);
      } catch (err) {
        console.error("Image error:", err.message);
      }
    };

    fetchImage();
  }, [emotion]);

  useEffect(() => {
    const getQuote = async () => {
      const q = await fetchQuoteByEmotion(emotion);
      setQuote(q);
    };

    getQuote();
  }, [emotion]);

  const handleDownload = () => {
    const node = document.getElementById("result-section");
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `emotion-${emotion}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Download error:", err);
      });
  };

  const handleShare = () => {
    const shareText = `I'm feeling ${emotion} \uD83C\uDFA7✨ Check out my personalized emotion experience!`;
    const url = window.location.origin;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#1e1e2f] via-[#302b63] to-[#1f1f2e] text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 py-4 shadow-sm">
        <motion.h2
          className="text-center text-xl md:text-2xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You're feeling <span className="text-emerald-300">{emotion}</span>
        </motion.h2>
      </header>

      <div
        id="result-section"
        className="relative flex flex-col items-center justify-start px-6 py-10"
      >
        <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl opacity-20 top-[-150px] left-[-100px] z-0"></div>
        <div className="absolute w-[300px] h-[300px] bg-emerald-500 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-80px] z-0"></div>

        <motion.p
          className="text-center text-slate-300 mb-10 max-w-xl z-10 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Here's your custom playlist, visual art, and quote to match your mood.
        </motion.p>

        {loading ? (
          <motion.div
            className="w-full max-w-2xl h-60 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center text-xl text-slate-300 shadow-lg z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Loading music...
          </motion.div>
        ) : playlist ? (
          <motion.div
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 rounded-xl text-white text-center border border-white/10 shadow-lg z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xl mb-4">
              Playlist for <strong>{emotion}</strong>: <em>{playlist.name}</em>
            </p>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <a
              href={`https://open.spotify.com/playlist/${playlist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-emerald-400 hover:underline"
            >
              Open in Spotify for full control
            </a>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-2xl h-60 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 flex items-center justify-center text-center p-6 shadow-lg z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Sorry, no playlist found.
          </motion.div>
        )}

        {imageUrl && (
          <motion.div
            className="w-full max-w-4xl mt-16 rounded-xl overflow-hidden shadow-lg z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <img
              src={imageUrl}
              alt={`Art for ${emotion}`}
              className="w-full object-cover rounded-xl"
            />
            <p className="mt-2 text-sm text-center text-slate-400">
              AI art inspired by <strong>{emotion}</strong>
            </p>
          </motion.div>
        )}

        {quote && (
          <motion.div
            className="mt-12 max-w-3xl text-center text-slate-300 px-4 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xl italic text-white">
              <Typewriter
                words={[`“${quote.content}”`]}
                loop={1}
                cursor
                typeSpeed={45}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </p>
            <p className="mt-2 text-sm text-slate-400">— {quote.author}</p>
          </motion.div>
        )}

        <motion.div
          className="mt-10 flex gap-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/10 hover:bg-white/20 rounded-xl transition"
          >
            <FiShare2 />
            Share Emotion
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/10 hover:bg-white/20 rounded-xl transition"
          >
            <FiDownload />
            Download Image
          </button>
        </motion.div>

        <p className="mt-6 text-sm text-slate-500 z-10">
          Created with 💙 by SamStickz [byteWizard]
        </p>

        <motion.button
          className="mt-10 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl hover:bg-white/20 hover:shadow-pink-400/30 transition z-10"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
        >
          Pick Another Emotion
        </motion.button>

        <footer className="mt-10 text-sm text-slate-500 z-10 mb-10">
          Emotion-Based Generator © 2025
        </footer>
      </div>
    </div>
  );
};

export default ResultsPage;
