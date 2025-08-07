"use client";
import React from "react";

interface NowPlayingInfoProps {
  title: string;
}

export default function NowPlayingInfo({ title }: NowPlayingInfoProps) {
  return <p className="mb-2 text-pink-400">{title}</p>;
}
