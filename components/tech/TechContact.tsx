"use client";

import { motion } from "framer-motion";
import { CommandLabel } from "./CommandLabel";

const contactLines = [
  { label: "email   ", value: "gobetti@unc.edu",          href: "mailto:gobetti@unc.edu" },
  { label: "linkedin", value: "/in/bettina-george",        href: "https://www.linkedin.com/in/bettina-george/" },
  { label: "github  ", value: "/BettinaGeorge",            href: "https://github.com/BettinaGeorge" },
  { label: "located ", value: "Chapel Hill, NC",           href: null },
];

export function TechContact() {
  return (
    <section
      id="contact"
      className="py-28 px-8 md:px-16"
      style={{ background: "#080810", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <div className="max-w-6xl mx-auto">
        <CommandLabel command="$ cat contact.txt" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* left: message */}
          <div>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "#a0a0c0" }}
            >
              Open to internships, research collabs,
              <br />
              and building things that matter.
            </p>

            {/* contact lines */}
            <div className="space-y-3 text-sm">
              {contactLines.map((line) => (
                <div key={line.label} className="flex gap-3">
                  <span style={{ color: "#555577" }}>{line.label}</span>
                  {line.href ? (
                    <a
                      href={line.href}
                      target={line.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      className="transition-colors duration-200"
                      style={{ color: "#e0e0f0" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5d4")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#e0e0f0")}
                    >
                      {line.value}
                    </a>
                  ) : (
                    <span style={{ color: "#e0e0f0" }}>{line.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* right: buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:gobetti@unc.edu"
              className="flex items-center justify-between px-6 py-4 text-sm font-bold tracking-widest transition-colors duration-200"
              style={{ background: "#00f5d4", color: "#080810" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#00d4b8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#00f5d4")}
            >
              <span>[ SEND EMAIL ]</span>
              <span>→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/bettina-george/"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between px-6 py-4 text-sm tracking-widest transition-colors duration-200"
              style={{ border: "1px solid rgba(0,245,212,0.25)", color: "#00f5d4" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,245,212,0.06)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>[ LINKEDIN ]</span>
              <span>↗</span>
            </a>
            <a
              href="https://github.com/BettinaGeorge"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between px-6 py-4 text-sm tracking-widest transition-all duration-200"
              style={{ border: "1px solid #1a1a2e", color: "#555577" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,245,212,0.2)";
                e.currentTarget.style.color = "#a0a0c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1a1a2e";
                e.currentTarget.style.color = "#555577";
              }}
            >
              <span>[ GITHUB ]</span>
              <span>↗</span>
            </a>
          </div>
        </motion.div>

        {/* footer */}
        <div
          className="mt-20 pt-6 flex items-center justify-between text-[11px]"
          style={{ borderTop: "1px solid #1a1a2e", color: "#333355" }}
        >
          <span>bettinageorge — 2026</span>
          <span>built with Next.js · deployed on Vercel</span>
        </div>
      </div>
    </section>
  );
}
