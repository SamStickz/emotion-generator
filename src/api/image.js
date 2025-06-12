import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchEmotionImage = async (emotion) => {
  const res = await axios.get("https://api.unsplash.com/photos/random", {
    params: {
      query: emotion,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });

  return res.data.urls.regular;
};
