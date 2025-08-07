"use client";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      <button onClick={onPrev} className="hover:scale-110 transition">
        <FaStepBackward size={20} />
      </button>
      <button
        onClick={onPlayPause}
        className="p-3 bg-pink-600 hover:bg-pink-500 rounded-full shadow-lg hover:scale-110 transition"
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <button onClick={onNext} className="hover:scale-110 transition">
        <FaStepForward size={20} />
      </button>
    </div>
  );
}
