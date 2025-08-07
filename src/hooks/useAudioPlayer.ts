import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const play = (url: string) => {
    if (!audioRef.current) return;

    if (currentSrc !== url) {
      audioRef.current.src = url;
      setCurrentSrc(url);
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return { play, pause, isPlaying, currentSrc };
}
