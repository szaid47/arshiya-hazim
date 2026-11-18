import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  type: "dust" | "leaf";
  rotateStart: number;
}

export const FloatingElements: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles once component mounts
    const generated: Particle[] = Array.from({ length: 22 }).map((_, i) => {
      const left = Math.random() * 100; // random horizontal percentage
      const size = Math.random() * (i % 3 === 0 ? 12 : 4) + 2; // dust is small (2-6px), leaves are larger (8-14px)
      const delay = Math.random() * 10; // delay up to 10s
      const duration = 12 + Math.random() * 16; // duration between 12s and 28s
      const opacity = 0.2 + Math.random() * 0.45; // opacity 20% - 65%
      const type = i % 4 === 0 ? "leaf" : "dust";
      const rotateStart = Math.random() * 360;

      return {
        id: i,
        left: `${left}%`,
        size,
        delay: `${delay}s`,
        duration: `${duration}s`,
        opacity,
        type,
        rotateStart,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => {
        if (p.type === "leaf") {
          return (
            <svg
              key={p.id}
              className="absolute bottom-[-50px] fill-[#D4AF6A] animate-float-slow opacity-0 pointer-events-none"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                opacity: p.opacity,
                transform: `rotate(${p.rotateStart}deg)`,
              }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ornate organic petal shape */}
              <path d="M12,2 C12,2 17,7 17,12 C17,17 12,22 12,22 C12,22 7,17 7,12 C7,7 12,2 M12,4 C9,8 9,12 12,20 C15,12 15,8 12,4 Z" />
            </svg>
          );
        } else {
          return (
            <div
              key={p.id}
              className="absolute bottom-[-20px] rounded-full bg-gradient-to-tr from-[#B88B4A] to-[#E6C587] animate-float-slow opacity-0 pointer-events-none shadow-[0_0_8px_rgba(212,175,106,0.6)]"
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: p.delay,
                animationDuration: p.duration,
                opacity: p.opacity,
              }}
            />
          );
        }
      })}
    </div>
  );
};
export default FloatingElements;
