"use client";
import React from "react";

interface AudioElementProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  src: string;
}

export default function AudioElement({ audioRef, src }: AudioElementProps) {
  return (
    <audio ref={audioRef} autoPlay>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
