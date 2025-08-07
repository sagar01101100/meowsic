

// // app/dashboard/[username]/page.tsx
// "use client";

// import { useParams } from "next/navigation";
// import useUserSongs from "@/hooks/useUserSongs";
// import Playlist from "@/components/Dashboard/Playlist";
// import MusicPlayer from "@/components/MusicPlayer";

// export default function AudioPlayer() {
//   const { username } = useParams();
//   const { songs, loading } = useUserSongs(username);

//   if (loading) return <p className="text-white text-center mt-10">Loading songs...</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[20%_80%] gap-6 items-start">
//         {/* Playlist - 20% */}
//         <div className="bg-gray-800 p-4 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
//           <Playlist songs={songs} />
//         </div>

//         {/* Music Player - 80% */}
//         <div className="bg-gray-800 p-6 rounded-xl shadow-lg sticky top-6">
//           <MusicPlayer />
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import useUserSongs from "@/hooks/useUserSongs";
import MusicPlayer from "@/components/MusicPlayer";

export default function AudioPlayer() {
  const { username } = useParams();
  const { songs, loading } = useUserSongs(username);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg">Loading songs...</p>
      </div>
    );

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="w-full h-full">
        <MusicPlayer songs={songs} />
      </div>
    </div>
  );
}
