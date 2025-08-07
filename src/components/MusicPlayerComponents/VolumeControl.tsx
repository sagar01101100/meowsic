"use client";
import React from "react";

interface VolumeControlProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VolumeControl({ onChange }: VolumeControlProps) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <span>🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}
