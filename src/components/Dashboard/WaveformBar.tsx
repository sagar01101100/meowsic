"use client";

interface WaveformBarProps {
  waveHeights: number[];
}

export default function WaveformBar({ waveHeights }: WaveformBarProps) {
  return (
    <div className="absolute inset-0 flex items-end justify-between px-1 z-0 animate-pulse">
      {waveHeights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] bg-white/80 rounded"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}