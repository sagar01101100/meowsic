// src/zustand/playerStore.ts

import { create } from "zustand";
import { Song } from "@/types/song";

interface PlayerState {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),
}));

export default usePlayerStore;
