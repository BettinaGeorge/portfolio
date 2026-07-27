"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const sections = ["about", "projects", "experience", "contact"] as const;

export function TechNav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,16,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,212,0.08)" : "none",
        fontFamily: "var(--font-jetbrains-mono), monospace",
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="text-sm tracking-widest transition-opacity hover:opacity-60"
        style={{ color: "#00f5d4" }}
      >
        BG<span style={{ color: "#ff2d78" }}>.</span>
      </button>

      <div className="flex items-center gap-6">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-[#00f5d4]"
            style={{ color: "#888aaa", fontFamily: "inherit" }}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => router.push("/")}
          className="ml-4 px-3 py-1 text-[10px] tracking-widest uppercase transition-all duration-200 hover:border-[#cc2233] hover:text-[#f0c0c8]"
          style={{
            border: "1px solid #333355",
            color: "#555577",
            fontFamily: "inherit",
          }}
        >
          ← switch mode
        </button>
      </div>
    </motion.nav>
  );
}
