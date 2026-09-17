"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Circle = {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
};

function makeCircles(count: number): Circle[] {
  return Array.from({ length: count }, (_, i) => {
    const startX = (Math.random() - 0.5) * 520;
    const startY = (Math.random() - 0.5) * 320;
    return {
      id: i,
      startX,
      startY,
      midX: startX + (Math.random() - 0.5) * 240,
      midY: startY + (Math.random() - 0.5) * 180,
      endX: startX + (Math.random() - 0.5) * 300,
      endY: startY + (Math.random() - 0.5) * 220,
      size: 5 + Math.random() * 10,
      delay: Math.random() * 0.25,
    };
  });
}

export function RoamingCircles() {
  // Randomized client-side only (post-mount) to avoid an SSR/client
  // hydration mismatch — same reasoning as NameGlitterReveal.
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    setCircles(makeCircles(18));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      {circles.map((c) => (
        <motion.span
          key={c.id}
          initial={{ opacity: 0, x: c.startX, y: c.startY, scale: 0.3 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [c.startX, c.midX, c.endX],
            y: [c.startY, c.midY, c.endY],
            scale: [0.3, 1, 0.5],
          }}
          transition={{
            duration: 1.1,
            delay: c.delay,
            ease: "easeInOut",
            times: [0, 0.55, 1],
          }}
          className="absolute rounded-full"
          style={{
            width: c.size,
            height: c.size,
            background: "#fff3b8",
            boxShadow: "0 0 8px rgba(255,243,184,0.85), 0 0 18px rgba(255,224,130,0.5)",
          }}
        />
      ))}
    </div>
  );
}
