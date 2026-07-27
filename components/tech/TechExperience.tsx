"use client";

import { motion } from "framer-motion";
import { CommandLabel } from "./CommandLabel";

const commits = [
  {
    hash: "a3f91c2",
    role: "AI/ML Fellow",
    org: "Break Through Tech",
    period: "May 2025 – Present",
    tag: "AI",
    tagColor: "#00f5d4",
  },
  {
    hash: "b72e8d1",
    role: "Software Engineering Intern",
    org: "Lowe's Tech Hub",
    period: "May – Aug 2025",
    tag: "SWE",
    tagColor: "#ff6a00",
  },
  {
    hash: "c19a4f3",
    role: "Undergraduate Teaching Assistant — COMP 110",
    org: "UNC Department of Computer Science",
    period: "Aug 2025 – Present",
    tag: "TA",
    tagColor: "#00f5d4",
  },
  {
    hash: "d05b2e7",
    role: "Instructional Tech & Design Support Analyst",
    org: "UNC School of Government",
    period: "Aug 2024 – Present",
    tag: "Design",
    tagColor: "#ff2d78",
  },
  {
    hash: "e88c1a0",
    role: "Customer Trends Research Extern",
    org: "Beats by Dre",
    period: "Jul – Aug 2024",
    tag: "Research",
    tagColor: "#ff2d78",
  },
];

export function TechExperience() {
  return (
    <section
      id="experience"
      className="py-28 px-8 md:px-16"
      style={{ background: "#080810", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <div className="max-w-6xl mx-auto">
        <CommandLabel command="$ git log --oneline --career" />

        <div>
          {commits.map((c, i) => (
            <motion.div
              key={c.hash}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-start gap-3 py-5 transition-colors duration-200 group cursor-default"
                style={{ borderBottom: "1px solid #1a1a2e" }}
              >
                {/* hash */}
                <span
                  className="text-[11px] shrink-0 pt-0.5"
                  style={{ color: "#ff6a00", letterSpacing: "0.05em", minWidth: 64 }}
                >
                  {c.hash}
                </span>

                {/* role + org */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold leading-snug transition-colors duration-200 group-hover:text-[#00f5d4]"
                    style={{ color: "#e0e0f0" }}
                  >
                    {c.role}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#555577" }}>
                    {c.org}
                  </p>
                </div>

                {/* period + tag */}
                <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                  <p className="text-[11px] whitespace-nowrap" style={{ color: "#333355" }}>
                    {c.period}
                  </p>
                  <span
                    className="text-[10px] px-2 py-0.5 tracking-widest"
                    style={{
                      color: c.tagColor,
                      border: `1px solid ${c.tagColor}40`,
                      background: `${c.tagColor}0d`,
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
