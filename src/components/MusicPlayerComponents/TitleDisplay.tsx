import { Song } from "@/types/song";

export default function TitleDisplay({ currentSong }: { currentSong: Song | null }) {
  return (
    <h2 className="text-xl font-bold text-center mb-4">
      {currentSong ? currentSong.title : "No song selected"}
    </h2>
  );
}
