import React from 'react'

export default function page() {
  return (
    <div>
      Welcome to MyMusic
    </div>
  )
}



// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function Home() {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isRepeat, setIsRepeat] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [floatingParticles, setFloatingParticles] = useState<
//     { left: number; delay: string; type: "heart" | "flower" }[]
//   >([]);
//   const [waveHeights, setWaveHeights] = useState<number[]>([]);

//   useEffect(() => {
//     const hearts = Array.from({ length: 15 }).map((_, i) => ({
//       left: Math.random() * 100,
//       delay: `${i * 0.5}s`,
//       type: Math.random() > 0.5 ? "heart" : "flower",
//     }));
//     setFloatingParticles(hearts);

//     // Generate consistent waveform bars
//     const heights = Array.from({ length: 40 }, () => Math.random() * 10 + 4);
//     setWaveHeights(heights);
//   }, []);

//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateProgress = () => {
//       if (audio && audio.duration && !isDragging) {
//         const current = audio.currentTime;
//         const percent = (current / audio.duration) * 100;
//         setProgress(percent);
//         setCurrentTime(current);
//         setDuration(audio.duration);
//       }
//     };

//     audio?.addEventListener("timeupdate", updateProgress);
//     return () => audio?.removeEventListener("timeupdate", updateProgress);
//   }, [isDragging]);

//   const handlePlayPause = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (audio.paused) {
//       audio.play();
//       setIsPlaying(true);
//     } else {
//       audio.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
//     const bar = e.currentTarget.getBoundingClientRect();
//     const clickedX = e.clientX - bar.left;
//     const newProgress = (clickedX / bar.width) * 100;
//     setProgress(newProgress);

//     if (audioRef.current && duration) {
//       audioRef.current.currentTime = (newProgress / 100) * duration;
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   };

//   const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging) return;
//     const bar = e.currentTarget.getBoundingClientRect();
//     const draggedX = e.clientX - bar.left;
//     let newProgress = (draggedX / bar.width) * 100;
//     newProgress = Math.min(Math.max(newProgress, 0), 100);
//     setProgress(newProgress);

//     if (audioRef.current && duration) {
//       audioRef.current.currentTime = (newProgress / 100) * duration;
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   };

//   const toggleRepeat = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     audio.loop = !audio.loop;
//     setIsRepeat(audio.loop);
//   };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const vol = parseFloat(e.target.value);
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol;
//     }
//   };

//   const formatTime = (sec: number) => {
//     const minutes = Math.floor(sec / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor(sec % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <main className="min-h-screen w-screen overflow-hidden bg-[#0d1524] flex items-center justify-center relative p-2 sm:p-4">
//       {/* Floating particles now in front */}
//       <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
//         {floatingParticles.map((item, i) => (
//           <div
//             key={i}
//             className={`absolute text-2xl ${
//               item.type === "heart" ? "text-pink-400" : "text-yellow-300"
//             } animate-fall`}
//             style={{
//               left: `${item.left}%`,
//               animationDelay: item.delay,
//             }}
//           >
//             {item.type === "heart" ? "💖" : "🌸"}
//           </div>
//         ))}
//       </div>

//       {/* Player Container */}
//       <div className="w-full max-w-md sm:w-[90vw] h-[80vh] sm:aspect-[3/4] rounded-3xl overflow-hidden bg-black/10 backdrop-blur-md shadow-xl z-10 relative">
//         {/* Background Image */}
//         <div className="relative w-full h-full z-0">
//           <img
//             src="/Images/Cat.jpg"
//             alt="Music Cover"
//             className="absolute w-full h-full object-cover"
//           />
//         </div>

//         {/* Overlay controls */}
//         <div className="absolute bottom-0 left-0 right-0 text-white px-4 py-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10">
//           <h1 className="text-center font-bold text-lg mb-2">
//             Chaar Kadam
//           </h1>

//           <div className="text-xs flex justify-between text-white/70 mb-1">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>

//           {/* Waveform & needle */}
//           <div
//             className="relative w-full h-4 rounded-full mb-4 cursor-pointer"
//             onClick={handleSeek}
//             onMouseMove={handleDrag}
//             onMouseUp={() => setIsDragging(false)}
//             onMouseLeave={() => setIsDragging(false)}
//           >
//             <div className="absolute inset-0 flex items-end justify-between px-1 z-0 animate-pulse">
//               {waveHeights.map((h, i) => (
//                 <div
//                   key={i}
//                   className="w-[2px] bg-white/80 rounded"
//                   style={{ height: `${h}px` }}
//                 />
//               ))}
//             </div>

//             <div
//               className={`absolute -top-6 z-20 transition-all duration-75 ${
//                 isPlaying ? "animate-ping" : ""
//               }`}
//               style={{ left: `calc(${progress}% - 12px)` }}
//               onMouseDown={() => setIsDragging(true)}
//             >
//               <div className="w-6 h-6 relative">
//                 <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 left-[3px]" />
//                 <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 left-[9px]" />
//                 <div className="absolute w-3 h-3 bg-red-500 rotate-45 top-[5px] left-[6px]" />
//               </div>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center justify-between gap-3 text-white/80">
//             <button
//               onClick={handlePlayPause}
//               className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-full font-medium shadow"
//             >
//               {isPlaying ? "⏸" : "▶"}
//             </button>
//             <button
//               onClick={toggleRepeat}
//               className={`p-2 rounded-full shadow text-sm ${
//                 isRepeat
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-700 hover:bg-gray-600"
//               }`}
//               title="Repeat"
//             >
//               ⟳
//             </button>
//             <div className="flex items-center gap-1 w-full">
//               <span className="text-sm">🔊</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="w-full accent-green-400"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hidden Audio */}
//       <audio ref={audioRef} style={{ display: "none" }}>
//         <source src="/Chaar_Kadam.mp3" type="audio/mpeg" />
//       </audio>

//       {/* Keyframes */}
//       <style jsx>{`
//         @keyframes fall {
//           0% {
//             transform: translateY(-10px) scale(1);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh) scale(1.4);
//             opacity: 0;
//           }
//         }
//         .animate-fall {
//           animation: fall 6s ease-in infinite;
//         }
//       `}</style>
//     </main>
//   );
// }
