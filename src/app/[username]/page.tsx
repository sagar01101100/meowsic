"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ParticleAnimations from "@/components/ParticleAnimations";
import { FaPlus, FaListUl } from "react-icons/fa";

// Song type definition
type Song = {
  _id: string;
  title: string;
  url: string;
};

export default function MusicPlayerPage() {
  const params = useParams();
  const username = params?.username as string;

  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [animationType, setAnimationType] = useState(0);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`/api/songs/${username}`);
        const data = await res.json();
        setSongs(data.songs || []);
        if (data.songs?.length) {
          setAudioSrc(`http://localhost:4000/api/stream?url=${encodeURIComponent(data.songs[0].url)}`);
        }
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };
    fetchSongs();
  }, [username]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const playRandom = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    onSongClick(randomIndex);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const track = trackRef.current;
    if (!audio || !track || !isFinite(duration) || duration === 0) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    if (isFinite(newTime)) {
      audio.currentTime = newTime;
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  const playNext = () => {
    if (currentSongIndex + 1 < songs.length) {
      const next = currentSongIndex + 1;
      setCurrentSongIndex(next);
      setAudioSrc(`http://localhost:4000/api/stream?url=${encodeURIComponent(songs[next].url)}`);
    }
  };

  const playPrevious = () => {
    if (currentSongIndex > 0) {
      const prev = currentSongIndex - 1;
      setCurrentSongIndex(prev);
      setAudioSrc(`http://localhost:4000/api/stream?url=${encodeURIComponent(songs[prev].url)}`);
    }
  };

  const onSongClick = (index: number) => {
    setCurrentSongIndex(index);
    setAudioSrc(`http://localhost:4000/api/stream?url=${encodeURIComponent(songs[index].url)}`);
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    audio?.addEventListener("timeupdate", updateProgress);
    return () => {
      audio?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handleAddSong = async () => {
    if (!url) return alert("Please enter the YouTube URL");
    if (!username) return alert("Invalid user");

    setLoading(true);
    try {
      const res = await fetch("/api/add-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, addedBy: username }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Song added successfully!");
        setUrl("");
        setShowAddForm(false);
        const songsRes = await fetch(`/api/songs/${username}`);
        const songsData = await songsRes.json();
        setSongs(songsData.songs || []);
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("❌ Failed to add song");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <main className="relative h-screen bg-black text-white flex overflow-hidden">
      <ParticleAnimations type={animationType} enabled={animationEnabled} />

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 rounded-2xl backdrop-blur-md shadow-lg overflow-hidden w-[360px] h-[620px] z-20">
        <img
          src="/Images/cute_cat.jpg"
          alt="Wallpaper"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative z-10 p-4 h-full flex flex-col justify-end">
          <h2 className="text-xl font-bold mb-2">
            {currentSong?.title || "🎵 No song playing"}
          </h2>

          {audioSrc && (
            <audio
              ref={audioRef}
              src={audioSrc}
              autoPlay
              loop={loop}
              className="hidden"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}

          <div className="flex items-center justify-between text-xs text-white/80 mb-1">
            <span>{formatTime((progress / 100) * duration || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* 🎯 Draggable + Clickable Track Line */}
          <div
            ref={trackRef}
            onClick={handleSeek}
            className="relative w-full h-6 cursor-pointer"
          >
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white/20 rounded-full transform -translate-y-1/2" />
            <div
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[3px] absolute top-1/2 left-0 rounded-full transform -translate-y-1/2"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-pink-400 text-sm text-white flex items-center justify-center animate-pulse cursor-grab active:cursor-grabbing z-10"
              style={{ left: `calc(${progress}% - 10px)` }}
              onMouseDown={(e) => {
                const audio = audioRef.current;
                const track = trackRef.current;
                if (!audio || !track || !isFinite(duration)) return;

                const onMouseMove = (moveEvent: MouseEvent) => {
                  const rect = track.getBoundingClientRect();
                  const moveX = moveEvent.clientX - rect.left;
                  const percent = Math.min(Math.max(moveX / rect.width, 0), 1);
                  audio.currentTime = percent * duration;
                  setProgress(percent * 100);
                };

                const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              }}
            >
              💖
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 mb-3 text-sm mt-3">
            <button onClick={playPrevious} className="px-2 py-1 bg-gray-800 rounded">⏮</button>
            <button onClick={togglePlay} className="px-2 py-1 bg-gray-800 rounded">{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={playNext} className="px-2 py-1 bg-gray-800 rounded">⏭</button>
            <button onClick={stopAudio} className="px-2 py-1 bg-gray-800 rounded">⏹ Stop</button>
            <button onClick={playRandom} className="px-2 py-1 bg-gray-800 rounded">🔀 Random</button>
            <button onClick={() => setLoop(!loop)} className="px-2 py-1 bg-gray-800 rounded">{loop ? "🔁 On" : "🔁 Off"}</button>
            <button onClick={() => setShowAddForm(true)} className="px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded flex items-center gap-1">
              <FaPlus /> Add
            </button>
            <button onClick={() => setShowPlaylist(!showPlaylist)} className="px-2 py-1 bg-purple-700 hover:bg-purple-600 rounded flex items-center gap-1">
              <FaListUl /> Playlist
            </button>
          </div>

          {/* Add Song Form */}
          {showAddForm && (
            <div className="mb-2">
              <input
                type="text"
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mb-2 px-2 py-1 w-full text-black rounded"
              />
              <button
                onClick={handleAddSong}
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded"
              >
                {loading ? "Adding..." : "Add Song"}
              </button>
            </div>
          )}

          {/* Playlist */}
          {showPlaylist && (
            <div className="absolute right-2 top-2 w-72 h-60 bg-black/20 rounded-xl p-3 backdrop-blur-md overflow-y-scroll no-scrollbar z-30">
              <ul className="space-y-1">
                {songs.map((song, i) => (
                  <li
                    key={song._id}
                    onClick={() => onSongClick(i)}
                    className={`p-1 cursor-pointer rounded bg-opacity-60 ${i === currentSongIndex ? "bg-pink-700" : "hover:bg-gray-700"}`}
                  >
                    <div className="whitespace-nowrap overflow-x-auto no-scrollbar animate-marquee text-sm">
                      {song.title}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Volume */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            onChange={handleVolume}
            className="w-full"
          />

          {/* Animations */}
          <div className="flex justify-between mt-3 text-sm">
            <button
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              {animationEnabled ? "Disable" : "Enable"} Anim
            </button>
            <button
              onClick={() => setAnimationType((prev) => (prev + 1) % 8)}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              Change Anim
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
