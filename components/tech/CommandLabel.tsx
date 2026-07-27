"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function CommandLabel({ command }: { command: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(id);
  }, [isInView, command]);

  return (
    <div ref={ref} className="mb-2">
      <p
        className="text-xs tracking-widest"
        style={{ color: "#00f5d4", fontFamily: "var(--font-jetbrains-mono), monospace" }}
      >
        {displayed}
        {!done && <span className="cursor-blink">█</span>}
      </p>
      <div style={{ height: 1, background: "#1a1a2e", marginTop: 8, marginBottom: 32 }} />
    </div>
  );
}
