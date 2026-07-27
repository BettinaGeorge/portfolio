"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CommandLabel } from "./CommandLabel";

const projects = [
  {
    title: "de-impact/",
    subtitle: "JPM Code for Good Hackathon",
    desc: "Full-stack volunteer-NGO skill & interest matching platform. React + TypeScript + Tailwind, shipped in 24 hours.",
    stack: ["React", "TypeScript", "Tailwind", "Node.js"],
    links: [{ label: "demo", url: "https://www.youtube.com/watch?v=EJdtZWzPUoc" }],
    image: "/img/deimpact.png",
    span: "md:col-span-2",
  },
  {
    title: "duolingo-watch/",
    subtitle: "UX Research + Prototype",
    desc: "Apple Watch companion for Duolingo — end-to-end from user research to hi-fi prototype.",
    stack: ["Figma", "UX Research", "Prototyping"],
    links: [{ label: "open", url: "https://vimeo.com/1041582266" }],
    image: "/img/duolingo.png",
    span: "md:col-span-1",
  },
  {
    title: "fidpath/",
    subtitle: "Hackathon",
    desc: "Pathfinding game with fidelity mechanics. Built under hackathon constraints.",
    stack: ["Game Dev", "Hackathon"],
    links: [{ label: "devpost", url: "https://devpost.com/software/fidpath" }],
    image: "/img/fidpath.png",
    span: "md:col-span-1",
  },
  {
    title: "diaspora-duo/",
    subtitle: "Hackathon",
    desc: "Cultural heritage language-learning app connecting diaspora communities through shared linguistic roots.",
    stack: ["React", "API Integration"],
    links: [{ label: "demo", url: "https://devpost.com/software/diaspora-duo" }],
    image: "/img/diasporaduo.png",
    span: "md:col-span-2",
  },
];

export function TechProjects() {
  return (
    <section
      id="projects"
      className="py-28 px-8 md:px-16"
      style={{ background: "#080810", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <div className="max-w-6xl mx-auto">
        <CommandLabel command="$ ls -la projects/" />

        <div className="grid md:grid-cols-3 gap-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group flex flex-col overflow-hidden transition-all duration-300 ${p.span}`}
              style={{ border: "1px solid #1a1a2e", background: "#0a0a14" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,245,212,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#1a1a2e")
              }
            >
              {/* image */}
              <div className="relative overflow-hidden" style={{ height: 140 }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-all duration-500"
                  style={{ opacity: 0.5, filter: "grayscale(20%)" }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "rgba(8,8,16,0.5)" }}
                />
              </div>

              {/* content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="mb-auto">
                  <p
                    className="text-[10px] tracking-widest mb-1"
                    style={{ color: "#333355" }}
                  >
                    {p.subtitle}
                  </p>
                  <h3
                    className="text-sm font-bold mb-3 transition-colors duration-200"
                    style={{ color: "#e0e0f0" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#666688" }}>
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 mb-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 tracking-wider"
                      style={{
                        color: "rgba(0,245,212,0.65)",
                        border: "1px solid rgba(0,245,212,0.12)",
                        background: "rgba(0,245,212,0.04)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener"
                      className="text-xs px-3 py-1.5 transition-colors duration-200"
                      style={{
                        color: "#00f5d4",
                        border: "1px solid rgba(0,245,212,0.25)",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(0,245,212,0.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      [ {l.label} ↗ ]
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
