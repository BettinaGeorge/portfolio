"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SPARKLE_CHARS = ["✦", "✧", "⋆", "✺"];

type Sparkle = {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
  char: string;
};

function makeSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      id: i,
      angle,
      distance: 40 + Math.random() * 190,
      size: 8 + Math.random() * 16,
      delay: Math.random() * 0.35,
      duration: 0.7 + Math.random() * 0.6,
      char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
    };
  });
}

export function NameGlitterReveal({ soundSrc }: { soundSrc?: string }) {
  // Sparkle positions are randomized client-side only, generated after mount
  // so the server-rendered markup (which has none) matches the client's
  // first paint and React doesn't throw a hydration mismatch.
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const played = useRef(false);

  useEffect(() => {
    setSparkles(makeSparkles(46));
  }, []);

  useEffect(() => {
    if (played.current || !soundSrc) return;
    played.current = true;
    const audio = new Audio(soundSrc);
    audio.volume = 0.5;
    // Browsers block unmuted autoplay without a prior user gesture, so this
    // may silently fail on first load — that's expected, not a bug.
    audio.play().catch(() => {});
  }, [soundSrc]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 3 }}
      aria-hidden
    >
      {sparkles.map((s) => {
        const x = Math.cos(s.angle) * s.distance;
        const y = Math.sin(s.angle) * s.distance;
        return (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.4], x, y }}
            transition={{
              duration: s.duration,
              delay: 0.3 + s.delay,
              ease: "easeOut",
            }}
            className="absolute select-none"
            style={{
              fontSize: s.size,
              color: "#fff6cf",
              textShadow: "0 0 6px rgba(255,244,190,0.9), 0 0 14px rgba(255,224,130,0.6)",
            }}
          >
            {s.char}
          </motion.span>
        );
      })}
    </div>
  );
}
