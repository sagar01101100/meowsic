"use client";

type Particle = { left: number; delay: string; type: "heart" | "flower" };
interface FloatingParticlesProps {
  particles: Particle[];
}

export default function FloatingParticles({ particles }: FloatingParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((item, i) => (
        <div
          key={i}
          className={`absolute text-2xl ${item.type === "heart" ? "text-pink-400" : "text-yellow-300"} animate-fall`}
          style={{ left: `${item.left}%`, animationDelay: item.delay }}
        >
          {item.type === "heart" ? "💖" : "🌸"}
        </div>
      ))}
    </div>
  );
}
