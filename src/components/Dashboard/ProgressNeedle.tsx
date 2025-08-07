"use client";

interface ProgressNeedleProps {
  progress: number;
  isPlaying: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ProgressNeedle({
  progress,
  isPlaying,
  onMouseDown,
}: ProgressNeedleProps) {
  return (
    <div
      className={`absolute -top-6 z-20 transition-all duration-75 ${
        isPlaying ? "animate-ping" : ""
      }`}
      style={{ left: `calc(${progress}% - 12px)` }}
      onMouseDown={onMouseDown}
    >
      <div className="w-6 h-6 relative">
        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 left-[3px]" />
        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 left-[9px]" />
        <div className="absolute w-3 h-3 bg-red-500 rotate-45 top-[5px] left-[6px]" />
      </div>
    </div>
  );
}




// "use client";
// import { useRef } from "react";

// export default function SongTrack({
//   duration,
//   currentTime,
//   onSeek,
// }: {
//   duration: number;
//   currentTime: number;
//   onSeek: (time: number) => void;
// }) {
//   const trackRef = useRef<HTMLDivElement>(null);

//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = trackRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     const clickX = e.clientX - rect.left;
//     const newTime = (clickX / rect.width) * duration;
//     onSeek(newTime);
//   };

//   const progressPercent = (currentTime / duration) * 100;

//   return (
//     <div
//       ref={trackRef}
//       onClick={handleClick}
//       className="track w-full h-2 bg-white/30 rounded cursor-pointer"
//     >
//       <div
//         className="h-full bg-pink-500 rounded"
//         style={{ width: `${progressPercent}%` }}
//       />
//     </div>
//   );
// }




// "use client";

// import { useRef, useEffect } from "react";

// interface Props {
//   progress: number;
//   isPlaying: boolean;
//   onDrag: (percent: number) => void;
// }

// export default function ProgressNeedle({ progress, isPlaying, onDrag }: Props) {
//   const needleRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const needle = needleRef.current;
//     if (!needle) return;

//     const handleMove = (e: MouseEvent) => {
//       const parent = needle.parentElement;
//       if (!parent) return;
//       const rect = parent.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
//       onDrag(percent);
//     };

//     const handleUp = () => {
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("mouseup", handleUp);
//     };

//     const handleDown = () => {
//       window.addEventListener("mousemove", handleMove);
//       window.addEventListener("mouseup", handleUp);
//     };

//     needle.addEventListener("mousedown", handleDown);
//     return () => {
//       needle.removeEventListener("mousedown", handleDown);
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("mouseup", handleUp);
//     };
//   }, [onDrag]);

//   return (
//     <div
//       ref={needleRef}
//       className={`absolute -top-3 z-30 cursor-pointer transition-all duration-75`}
//       style={{ left: `calc(${progress}% - 6px)` }}
//     >
//       <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow" />
//     </div>
//   );
// }
