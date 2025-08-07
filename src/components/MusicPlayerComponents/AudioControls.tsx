"use client";
import React from "react";

interface AudioControlsProps {
  isPlaying: boolean;
  progress: number;
  isLooping: boolean;
  onTogglePlay: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onLoop: () => void;
}

export default function AudioControls({
  isPlaying,
  progress,
  isLooping,
  onTogglePlay,
  onSeek,
  onNext,
  onLoop,
}: AudioControlsProps) {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="flex justify-center items-center space-x-4">
        <button onClick={onTogglePlay} className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-500">
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>

        <button onClick={onNext} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
          ⏭ Next
        </button>

        <button
          onClick={onLoop}
          className={`px-4 py-2 rounded ${isLooping ? "bg-green-600" : "bg-gray-600"} hover:bg-green-500`}
        >
          🔁 Loop {isLooping ? "On" : "Off"}
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={onSeek}
        className="w-full"
      />
    </div>
  );
}
