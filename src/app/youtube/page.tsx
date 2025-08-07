import React from 'react'

export default function page() {
  return (
    <div>
      Play YT music directly....
    </div>
  )
}


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Playlist from "@/components/Dashboard/Playlist";

// export default function Home() {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [youtubeURL, setYoutubeURL] = useState("");
//   const [audioSrc, setAudioSrc] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);

//   // Play/Pause logic
//   const togglePlay = () => {
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

//   // Handle audio updates
//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateProgress = () => {
//       if (audio && audio.duration) {
//         setProgress((audio.currentTime / audio.duration) * 100);
//         setDuration(audio.duration);
//       }
//     };

//     audio?.addEventListener("timeupdate", updateProgress);
//     return () => {
//       audio?.removeEventListener("timeupdate", updateProgress);
//     };
//   }, []);

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const newTime = (parseFloat(e.target.value) / 100) * duration;
//     audio.currentTime = newTime;
//   };

//   const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (audioRef.current) {
//       audioRef.current.volume = parseFloat(e.target.value);
//     }
//   };

//   const startStream = () => {
//     if (!youtubeURL.trim()) return;
//     const encodedURL = encodeURIComponent(youtubeURL.trim());
//     setAudioSrc(`http://localhost:4000/api/stream?url=${encodedURL}`);
//     setIsPlaying(true);
//   };

//   return (
//     <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-2xl font-bold mb-4">🎵 YouTube Audio Player</h1>

//       <input
//         type="text"
//         placeholder="Enter YouTube URL"
//         className="w-full max-w-md p-2 rounded bg-gray-800 border border-gray-600 text-white mb-4"
//         value={youtubeURL}
//         onChange={(e) => setYoutubeURL(e.target.value)}
//       />

//       <button
//         onClick={startStream}
//         className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
//       >
//         Load & Play
//       </button>

//       {/* Audio Controls */}
//       {audioSrc && (
//         <div className="w-full max-w-md space-y-4">
//           <audio ref={audioRef} autoPlay>
//             <source src={audioSrc} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>

//           <div className="flex justify-between items-center">
//             <button
//               onClick={togglePlay}
//               className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded"
//             >
//               {isPlaying ? "Pause" : "Play"}
//             </button>

//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={progress}
//               onChange={handleSeek}
//               className="w-2/3"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <span>🔊</span>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               defaultValue="1"
//               onChange={handleVolume}
//               className="w-full"
//             />
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
