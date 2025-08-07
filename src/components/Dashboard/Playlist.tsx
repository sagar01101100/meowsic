// "use client";

// import { FC } from "react";

// type Song = {
//   title: string;
//   url: string;
//   addedBy: string;
//   createdAt: string;
// };

// interface PlaylistProps {
//   songs: Song[];
//   onSelectSong: (index: number) => void;
// }

// const Playlist: FC<PlaylistProps> = ({ songs, onSelectSong }) => {
//   if (songs.length === 0) {
//     return <p className="text-gray-400">No songs found.</p>;
//   }

//   return (
//     <div className="grid gap-4">
//       {songs.map((song, index) => (
//         <div
//           key={index}
//           onClick={() => onSelectSong(index)}
//           className="group p-4 rounded-xl bg-gradient-to-br from-[#1e1e2f] to-[#14141f] shadow-lg hover:shadow-xl transition-shadow border border-gray-700 hover:border-purple-500 cursor-pointer"
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
//                 🎵 {song.title}
//               </p>
//               <a
//                 href={song.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm text-blue-400 underline break-all"
//               >
//                 {song.url}
//               </a>
//             </div>
//             <div className="text-right text-xs text-gray-400">
//               {new Date(song.createdAt).toLocaleString()}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Playlist;


// components/Dashboard/Playlist.tsx

// src/components/Dashboard/Playlist.tsx





"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/song";
import usePlayerStore from "@/zustand/PlayStore";

interface PlaylistProps {
  songs: Song[];
}

export default function Playlist({ songs }: PlaylistProps) {
  const { currentSong, setCurrentSong } = usePlayerStore();
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentId(currentSong?._id || null);
  }, [currentSong]);

  return (
    <div className="space-y-2 p-4 bg-gray-800 rounded-lg shadow-md text-white w-64">
      <h2 className="text-2xl font-semibold mb-4">🎶 Playlist</h2>
      {songs.length === 0 ? (
        <div className="text-gray-400">No songs added yet.</div>
      ) : (
        songs.map((song) => (
          <div
            key={song._id}
            onClick={() => setCurrentSong(song)}
            className={`cursor-pointer p-3 rounded transition duration-200 ${
              song._id === currentId
                ? "bg-pink-600 text-white font-bold"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {song._id === currentId ? "▶️" : "🎵"} {song.title}
          </div>
        ))
      )}
    </div>
  );
}
