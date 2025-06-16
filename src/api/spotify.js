import axios from "axios";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let token = "";
let tokenExpiry = 0;

const customPlaylists = {
  happy: {
    id: "37i9dQZF1EIfPJlPqfLhbI",
    name: "Your Custom Happy Vibes 🎉",
  },
  excited: {
    id: "41Xbvx4P0iT5OwCMz0inaN",
    name: "Custom Excitement Boost ⚡",
  },
  reflective: {
    id: "5jpKYt0ErjQ95a4vLmhLkC",
    name: "Reflective Roots & Soul 🌿🎧",
  },
};

export const getSpotifyToken = async () => {
  const now = Date.now();
  if (token && now < tokenExpiry) return token;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
    }
  );

  token = response.data.access_token;
  tokenExpiry = now + response.data.expires_in * 1000;
  return token;
};

export const searchPlaylistByEmotion = async (emotion) => {
  try {
    const token = await getSpotifyToken();

    if (customPlaylists[emotion]) {
      return customPlaylists[emotion];
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        emotion
      )}&type=playlist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );

    const items = response.data.playlists.items;
    if (items && items.length > 0) {
      return {
        id: items[0].id,
        name: items[0].name,
      };
    } else {
      throw new Error("No playlist found");
    }
  } catch (err) {
    console.error("Spotify API error:", err.message);
    return {
      id: "37i9dQZF1DX3rxVfibe1L0", // Fallback
      name: "Mood Booster",
    };
  }
};
