// "use client";

// import React from "react";
// import { Song } from "@/types/song";

// interface MusicPlayerProps {
//   songs: Song[];
// }

// const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Music Player</h2>
      
//     </div>
//   );
// };

// export default MusicPlayer;




// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import usePlayerStore from "@/zustand/PlayStore";
// import AudioElement from "./MusicPlayerComponents/AudioElement";
// import SongTrack from "./Dashboard/SongTrack";
// import Playlist from "./Dashboard/Playlist";
// import { Song } from "@/types/song";
// import LogoutButton from "./LogoutButton";
// import AddSongForm from "./Dashboard/AddSongForm";


// export default function MusicPlayer({ songs }: { songs: Song[] }) {
//   const { currentSong, setCurrentSong } = usePlayerStore();
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const params = useParams();
//   const username = params?.username as string;

//   const [audioSrc, setAudioSrc] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [loop, setLoop] = useState(false);
//   const [showPlaylist, setShowPlaylist] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [allSongs, setAllSongs] = useState<Song[]>(songs);

//   useEffect(() => {
//     if (songs.length > 0 && !currentSong) {
//       setCurrentSong(songs[0]);
//     }
//   }, [songs, currentSong, setCurrentSong]);

//   useEffect(() => {
//     if (!currentSong) {
//       setAudioSrc(null);
//       return;
//     }

//     const encodedURL = encodeURIComponent(currentSong.url);
//     const streamUrl = `http://localhost:4000/api/stream?url=${encodedURL}`;
//     setAudioSrc(streamUrl);
//     setProgress(0);
//     setIsPlaying(false);
//     setShowPlaylist(false);
//   }, [currentSong]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateProgress = () => {
//       if (audio.duration) {
//         setProgress(audio.currentTime);
//         setDuration(audio.duration);
//       }
//     };

//     audio.addEventListener("timeupdate", updateProgress);
//     return () => audio.removeEventListener("timeupdate", updateProgress);
//   }, []);

//   useEffect(() => {
//     if (audioRef.current && audioSrc) {
//       audioRef.current.load();
//       audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
//     }
//   }, [audioSrc]);

//   const togglePlay = async () => {
//     if (!audioRef.current) return;
//     try {
//       if (audioRef.current.paused) {
//         await audioRef.current.play();
//         setIsPlaying(true);
//       } else {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       }
//     } catch (err) {
//       console.error("Playback error:", err);
//     }
//   };

//   const toggleLoop = () => {
//     if (audioRef.current) {
//       audioRef.current.loop = !loop;
//       setLoop(!loop);
//     }
//   };

//   const handleSeek = (time: number) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = time;
//       setProgress(time);
//     }
//   };

//   const handleNext = () => {
//     if (!currentSong || allSongs.length === 0) return;
//     const currentIndex = allSongs.findIndex((s) => s.id === currentSong.id);
//     const nextIndex = (currentIndex + 1) % allSongs.length;
//     setCurrentSong(allSongs[nextIndex]);
//   };

//   const handlePrev = () => {
//     if (!currentSong || allSongs.length === 0) return;
//     const currentIndex = allSongs.findIndex((s) => s.id === currentSong.id);
//     const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
//     setCurrentSong(allSongs[prevIndex]);
//   };

//   const handleAddSong = async (url: string) => {
//     try {
//       const res = await axios.post("/api/add-song", {
//         url,
//         addedBy: username,
//       });
//       const newSong = res.data;
//       setAllSongs((prev) => [...prev, newSong]);
//       setShowAddForm(false);
//     } catch (error) {
//       console.error("Failed to add song:", error);
//     }
//   };

//   return (
//     <div className="gap-6">
//       {showPlaylist && (
//         <div className="absolute top-4 left-4 z-50 w-72 bg-gray-800 p-4 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
//           <Playlist songs={allSongs} onSelectSong={(song) => setCurrentSong(song)} />
//         </div>
//       )}

//       <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
//         {(
//           <>
//             <div className="w-full flex justify-center mb-4">
//               <img
//                 src="/Images/cute_cat.jpg"
//                 alt="cover"
//                 className="rounded-xl w-40 h-40 object-cover shadow-md"
//               />
//             </div>

//             <h2 className="text-xl font-bold text-center mb-4">
//               {currentSong ? currentSong.title : "No song selected"}
//             </h2>

//             {audioSrc && <AudioElement audioRef={audioRef} src={audioSrc} />}

//             <div className="mb-4">
//               <SongTrack
//                 duration={duration}
//                 currentTime={progress}
//                 onSeek={handleSeek}
//               />
//             </div>

//             <div className="flex flex-wrap gap-4 items-center justify-between">
//               <button
//                 onClick={toggleLoop}
//                 className={`px-4 py-2 rounded ${
//                   loop ? "bg-pink-600" : "bg-gray-700"
//                 } hover:bg-pink-500`}
//               >
//                 Loop
//               </button>

//               <button
//                 onClick={handlePrev}
//                 className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
//               >
//                 Prev
//               </button>

//               <button
//                 onClick={togglePlay}
//                 className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded"
//               >
//                 {isPlaying ? "Pause" : "Play"}
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
//               >
//                 Next
//               </button>

//               <button
//                 onClick={() => setShowPlaylist((prev) => !prev)}
//                 className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
//               >
//                 Playlist
//               </button>

//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="text-white bg-pink-600 w-10 h-10 text-xl rounded-full flex items-center justify-center hover:bg-pink-500"
//               >
//                 +
//               </button>
//               <LogoutButton/>
//             </div>

//             {showAddForm && (
//               <AddSongForm onAdd={handleAddSong} onCancel={() => setShowAddForm(false)} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




//v2
//v2


"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import usePlayerStore from "@/zustand/PlayStore";
import AudioElement from "./MusicPlayerComponents/AudioElement";
import SongTrack from "./Dashboard/SongTrack";
import Playlist from "./Dashboard/Playlist";
import { Song } from "@/types/song";
import LogoutButton from "./LogoutButton";
import AddSongForm from "./Dashboard/AddSongForm";

export default function MusicPlayer({ songs: initialSongs }: { songs: Song[] }) {
  const { currentSong, setCurrentSong } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const params = useParams();
  const username = params?.username as string;

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [allSongs, setAllSongs] = useState<Song[]>(initialSongs);

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`/api/songs/${username}`);
      setAllSongs(res.data.songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleAddSong = async (url: string) => {
    try {
      await axios.post("/api/add-song", {
        url,
        addedBy: username,
      });
      console.log("Song is added successfully.....")
       await fetchSongs();
       console.log("Playlist refreshed....")
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add song:", error);
    }
  };


  useEffect(() => {
    if (initialSongs.length > 0 && !currentSong) {
      setCurrentSong(initialSongs[0]);
    }
  }, [initialSongs, currentSong, setCurrentSong]);
  
  //stream music
  useEffect(() => {
    if (!currentSong) {
      setAudioSrc(null);
      return;
    }

    const encodedURL = encodeURIComponent(currentSong.url);
    const streamUrl = `http://localhost:4000/api/stream?url=${encodedURL}`;
    setAudioSrc(streamUrl);
    setProgress(0);
    setDuration(currentSong.duration)
    setIsPlaying(false);
    setShowPlaylist(false);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && audioSrc) {
        try {
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay blocked or interrupted:", err);
        }
      }
    };
    playAudio();
  }, [audioSrc]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      const newLoop = !loop;
      audioRef.current.loop = newLoop;
      setLoop(newLoop);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 text-white relative overflow-hidden">
      {showPlaylist && (
        <div className="absolute top-4 left-4 z-50 w-72 bg-gray-800 p-4 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
          <Playlist
              songs={allSongs}
              currentSongId={currentSong?._id || null}
              onSelectSong={(song) => setCurrentSong(song)}
          />

        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="flex-grow flex flex-col items-center justify-center px-4 pt-4">
          <img
            src="/Images/cute_cat.jpg"
            alt="cover"
            className="w-full max-w-2xl h-full max-h-[60vh] object-cover rounded-xl shadow-md"
          />

          <h2 className="text-2xl font-bold text-center mt-4">
            {currentSong ? currentSong.title : "No song selected"}
          </h2>
        </div>

        <div className="p-6 bg-gray-800 rounded-t-xl shadow-inner">
          {audioSrc && <AudioElement audioRef={audioRef} src={audioSrc} />}

          <div className="mb-4 relative">
            <SongTrack
              duration={duration}
              currentTime={progress}
              onSeek={handleSeek}
              isPlaying={isPlaying}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={toggleLoop}
              className={`px-4 py-2 rounded ${
                loop ? "bg-pink-600" : "bg-gray-700"
              } hover:bg-pink-500`}
            >
              Loop
            </button>

            <button
              className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
            >
              Prev
            </button>

            <button
              onClick={togglePlay}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
            >
              Next
            </button>

            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="px-4 py-2 bg-gray-700 hover:bg-pink-500 rounded"
            >
              Playlist
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="text-white bg-pink-600 w-10 h-10 text-xl rounded-full flex items-center justify-center hover:bg-pink-500"
            >
              +
            </button>

            <LogoutButton />
          </div>

          {showAddForm && (
            <AddSongForm onAdd={handleAddSong} onCancel={() => setShowAddForm(false)} />
          )}
        </div>
      </div>
    </div>
  );
}





