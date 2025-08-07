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
//       className="w-full h-2 bg-white/30 rounded cursor-pointer"
//     >
//       <div
//         className="h-full bg-pink-500 rounded"
//         style={{ width: `${progressPercent}%` }}
//       />
//     </div>
//   );
// }




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

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <div className="flex items-center justify-between text-sm text-white w-full">
//       {/* Current Time */}
//       <span className="min-w-[40px] text-xs">{formatTime(currentTime)}</span>

//       {/* Track */}
//       <div
//         ref={trackRef}
//         onClick={handleClick}
//         className="flex-grow h-2 bg-white/30 rounded cursor-pointer mx-2 relative"
//       >
//         <div
//           className="h-full bg-pink-500 rounded"
//           style={{ width: `${progressPercent}%` }}
//         />
//       </div>

//       {/* Total Duration */}
//       <span className="min-w-[40px] text-xs">{formatTime(duration)}</span>
//     </div>
//   );
// }


  "use client";

  import { useRef, useEffect, useState } from "react";

  interface SongTrackWithNeedleProps {
    duration: number;
    currentTime: number;
    onSeek: (time: number) => void;
    isPlaying: boolean;
  }

  export default function SongTrack({
    duration,
    currentTime,
    onSeek,
    isPlaying,
  }: SongTrackWithNeedleProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState<number | null>(null);

    const progressPercent = isDragging && dragPercent !== null
      ? dragPercent
      : (currentTime / duration) * 100;

    // Format time as mm:ss
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    const updateProgressFromClientX = (clientX: number) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
      return percent;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      const percent = updateProgressFromClientX(e.clientX);
      onSeek((percent / 100) * duration);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsDragging(true);
      const newPercent = updateProgressFromClientX(e.clientX);
      setDragPercent(newPercent);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPercent = updateProgressFromClientX(e.clientX);
        setDragPercent(newPercent);
      }
    };

    const handleMouseUp = () => {
      if (isDragging && dragPercent !== null) {
        const newTime = (dragPercent / 100) * duration;
        onSeek(newTime);
      }
      setIsDragging(false);
      setDragPercent(null);
    };

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, dragPercent]);

    return (
      <div className="flex items-center justify-between text-sm text-white w-full">
        {/* Current Time */}
        <span className="min-w-[40px] text-xs">{formatTime(currentTime)}</span>

        {/* Track */}
        <div
          ref={trackRef}
          onClick={handleSeek}
          className="relative flex-grow h-2 bg-white/30 rounded cursor-pointer mx-2"
        >
          {/* Progress bar */}
          <div
            className="h-full bg-pink-500 rounded"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Needle */}
          <div
            onMouseDown={handleMouseDown}
            className={`absolute -top-3 z-30 cursor-pointer transition-all duration-75 ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ left: `calc(${progressPercent}% - 6px)` }}
          >
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow" />
          </div>
        </div>

        {/* Duration */}
        <span className="min-w-[40px] text-xs">{formatTime(duration)}</span>
      </div>
    );
  }









