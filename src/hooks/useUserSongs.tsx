import { useEffect, useState } from "react";
import { Song } from "@/types/song";
import axios from "axios";

export default function useUserSongs(username: string | string[] | undefined) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchSongs = async () => {
      try {
        const res = await axios.get(`/api/songs/${username}`);
        setSongs(res.data); // Make sure API returns correct `Song[]` shape
      } catch (error) {
        console.error("Failed to fetch songs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [username]);

  return { songs, loading };
}
