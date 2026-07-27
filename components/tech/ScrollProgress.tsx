"use client";

import { useScroll, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: 2,
        height: "100vh",
        background: "linear-gradient(to bottom, #00f5d4, #ff2d78)",
        scaleY: scrollYProgress,
        transformOrigin: "top",
        zIndex: 100,
        opacity: 0.7,
      }}
    />
  );
}
