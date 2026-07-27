"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COMMAND = "~/bettinageorge $ whoami";
const OUTPUT = [
  { label: "role    ", value: "AI Engineer" },
  { label: "focus   ", value: "ML · product · design" },
  { label: "status  ", value: "open to work" },
];

type Phase = "typing" | "outputting" | "done";

export function TechHero() {
  const [commandDisplayed, setCommandDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const type = setInterval(() => {
      i++;
      setCommandDisplayed(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(type);
        setTimeout(() => {
          setPhase("outputting");
          OUTPUT.forEach((_, idx) => {
            setTimeout(() => {
              setOutputCount(idx + 1);
              if (idx === OUTPUT.length - 1) {
                setTimeout(() => setPhase("done"), 400);
              }
            }, idx * 180);
          });
        }, 350);
      }
    }, 45);
    return () => clearInterval(type);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16 overflow-hidden"
      style={{ background: "#080810", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      {/* dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1a2a2a 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.6,
        }}
      />
      {/* ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-6xl w-full mx-auto"
      >
        {/* bento grid */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">

          {/* LEFT: Name — spans 2 rows on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="md:row-span-2 flex flex-col justify-center p-8 md:p-12"
            style={{ border: "1px solid #1a1a2e" }}
          >
            <h1
              className="font-bold leading-none select-none"
              style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", color: "#fff" }}
            >
              BETTINA<br />
              <span style={{ color: "#00f5d4" }}>GEORGE</span>
            </h1>
          </motion.div>

          {/* RIGHT TOP: Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="overflow-hidden"
            style={{ border: "1px solid #1a1a2e" }}
          >
            {/* window chrome */}
            <div
              className="flex items-center gap-1.5 px-4 py-2.5"
              style={{ background: "#111122", borderBottom: "1px solid #1a1a2e" }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
              <span className="ml-auto text-[11px]" style={{ color: "#333355" }}>
                bettinageorge — zsh
              </span>
            </div>

            {/* terminal body */}
            <div className="p-5 text-[13px] space-y-1" style={{ background: "#0a0a14" }}>
              <p style={{ color: "#00f5d4" }}>
                {commandDisplayed}
                {phase === "typing" && <span className="cursor-blink">█</span>}
              </p>

              {phase !== "typing" && (
                <>
                  <p style={{ color: "#222244" }}>──────────────────────</p>
                  {OUTPUT.slice(0, outputCount).map((line, i) => (
                    <p key={i} style={{ color: "#a0a0c0" }}>
                      <span style={{ color: "#555577" }}>{line.label}</span>
                      {line.value}
                    </p>
                  ))}
                  {phase === "done" && (
                    <p style={{ color: "#00f5d4", marginTop: 8 }}>
                      ~/bettinageorge ${" "}
                      <span className="cursor-blink">█</span>
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* RIGHT BOTTOM: Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            <div
              className="flex flex-col justify-center p-4"
              style={{ border: "1px solid #1a1a2e" }}
            >
              <p className="text-[10px] tracking-widest mb-1" style={{ color: "#333355" }}>
                CURRENT
              </p>
              <p className="text-xs font-bold" style={{ color: "#00f5d4" }}>
                AI/ML Fellow
              </p>
              <p className="text-[11px]" style={{ color: "#555577" }}>
                Break Through Tech
              </p>
            </div>
            <div
              className="flex flex-col justify-center p-4"
              style={{ border: "1px solid #1a1a2e" }}
            >
              <p className="text-[10px] tracking-widest mb-1" style={{ color: "#333355" }}>
                EDUCATION
              </p>
              <p className="text-xs font-bold" style={{ color: "#00f5d4" }}>
                UNC Chapel Hill
              </p>
              <p className="text-[11px]" style={{ color: "#555577" }}>
                CS + Info Science
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-2"
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 text-sm font-bold tracking-widest transition-colors duration-200"
            style={{ background: "#00f5d4", color: "#080810", fontFamily: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#00d4b8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00f5d4")}
          >
            [ VIEW WORK ]
          </button>
          <a
            href="/img/resume.pdf"
            target="_blank"
            rel="noopener"
            className="px-6 py-3 text-sm tracking-widest transition-colors duration-200"
            style={{
              border: "1px solid rgba(0,245,212,0.35)",
              color: "#00f5d4",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,245,212,0.07)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            [ RÉSUMÉ ]
          </a>

          <div className="flex gap-4 ml-auto">
            <a
              href="https://github.com/BettinaGeorge"
              target="_blank"
              rel="noopener"
              className="text-xs tracking-widest transition-colors"
              style={{ color: "#555577" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5d4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555577")}
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/bettina-george/"
              target="_blank"
              rel="noopener"
              className="text-xs tracking-widest transition-colors"
              style={{ color: "#555577" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5d4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555577")}
            >
              linkedin
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
