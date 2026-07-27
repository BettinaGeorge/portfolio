"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleField } from "./ParticleField";

export function LandingClient() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const enter = (path: string) => {
    setLeaving(true);
    setTimeout(() => router.push(path), 700);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.main
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: "url('/img/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/45"
            style={{ zIndex: 0 }}
          />

          {/* particles */}
          <ParticleField />

          {/* content */}
          <div
            className="relative flex flex-col items-center gap-10 px-6 text-center"
            style={{ zIndex: 2 }}
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="leading-none tracking-wide text-[#f0e6d3] drop-shadow-lg select-none"
              style={{
                fontFamily: "var(--font-luxurious-script)",
                fontSize: "clamp(3.5rem, 12vw, 9rem)",
              }}
            >
              Bettina George
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => enter("/tech")}
                className="px-7 py-2.5 text-xs tracking-[0.25em] uppercase border text-[#ff2d55] border-[#ff2d55]/40 hover:bg-[#ff2d55]/10 hover:border-[#ff2d55] transition-all duration-300"
                style={{ fontFamily: "monospace" }}
              >
                ⚡ Tech Mode
              </button>

              <span className="text-[#8b4444] text-xl select-none">|</span>

              <button
                onClick={() => enter("/creator")}
                className="px-7 py-2.5 text-xs tracking-[0.25em] uppercase border text-[#f0c0c8] border-[#cc2233]/40 hover:bg-[#cc2233]/10 hover:border-[#cc2233] transition-all duration-300"
                style={{ fontFamily: "monospace" }}
              >
                ✦ Creator
              </button>
            </motion.div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
