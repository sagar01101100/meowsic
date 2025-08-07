// components/ParticleAnimations.tsx
"use client";

import { useEffect, useState } from "react";

const particleSets = [
  { symbol: "💖", className: "text-pink-400" },
  { symbol: "🌸", className: "text-yellow-300" },
  { symbol: "🎶", className: "text-blue-400" },
  { symbol: "✨", className: "text-purple-300" },
  { symbol: "🔥", className: "text-red-500" },
  { symbol: "❄️", className: "text-blue-200" },
  { symbol: "🪐", className: "text-indigo-400" },
  { symbol: "🍁", className: "text-orange-400" },
];

export default function ParticleAnimations({ type, enabled }: { type: number; enabled: boolean }) {
  const [floatingParticles, setFloatingParticles] = useState<{
    left: number;
    delay: string;
  }[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: `${i * 0.4}s`,
    }));
    setFloatingParticles(newParticles);
  }, [type, enabled]);

  if (!enabled) return null;

  const selected = particleSets[type % particleSets.length];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingParticles.map((item, i) => (
        <div
          key={i}
          className={`absolute text-2xl animate-fall ${selected.className}`}
          style={{ left: `${item.left}%`, animationDelay: item.delay }}
        >
          {selected.symbol}
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(1.4);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 6s ease-in infinite;
        }
      `}</style>
    </div>
  );
}
