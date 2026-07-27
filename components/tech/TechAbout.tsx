"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CommandLabel } from "./CommandLabel";

const stack = [
  { name: "Python", icon: "/img/tech/python.svg" },
  { name: "TypeScript", icon: "/img/tech/typescript.svg" },
  { name: "JavaScript", icon: "/img/tech/javascript.svg" },
  { name: "React", icon: "/img/tech/react.svg" },
  { name: "Next.js", icon: "/img/tech/nextdotjs.svg" },
  { name: "Node.js", icon: "/img/tech/nodedotjs.svg" },
  { name: "Flask", icon: "/img/tech/flask.svg" },
  { name: "Tailwind", icon: "/img/tech/tailwindcss.svg" },
  { name: "PostgreSQL", icon: "/img/tech/postgresql.svg" },
  { name: "Docker", icon: "/img/tech/docker.svg" },
  { name: "Git", icon: "/img/tech/git.svg" },
  { name: "Figma", icon: "/img/tech/figma.svg" },
];

const json = [
  { key: "name",       value: '"Bettina George"',     indent: 1 },
  { key: "role",       value: '"AI Engineer"',          indent: 1 },
  { key: "based",      value: '"Chapel Hill, NC"',      indent: 1 },
  { key: "education",  value: '"UNC CS + Info Science"',indent: 1 },
  { key: "currently",  value: "[",                       indent: 1, open: true },
  { key: null,         value: '"AI/ML Fellow @ Break Through Tech",', indent: 2 },
  { key: null,         value: '"SWE Intern @ Lowe\'s Tech Hub",',     indent: 2 },
  { key: null,         value: '"TA @ UNC CS (COMP 110)"',             indent: 2 },
  { key: null,         value: "],",                                    indent: 1, close: true },
  { key: "also",       value: "[",                       indent: 1, open: true },
  { key: null,         value: '"content creator",',      indent: 2 },
  { key: null,         value: '"community builder",',    indent: 2 },
  { key: null,         value: '"storyteller"',           indent: 2 },
  { key: null,         value: "]",                       indent: 1, close: true },
];

export function TechAbout() {
  return (
    <section
      id="about"
      className="py-28 px-8 md:px-16"
      style={{ background: "#080810", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <div className="max-w-6xl mx-auto">
        <CommandLabel command="$ cat bio.json" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-[160px_1fr] gap-10 items-start"
        >
          {/* photo */}
          <div className="relative shrink-0 self-start">
            <div
              className="absolute"
              style={{
                inset: 0,
                border: "1px solid rgba(0,245,212,0.3)",
                transform: "translate(6px,6px)",
              }}
            />
            <Image
              src="/img/profile.jpg"
              alt="Bettina George"
              width={160}
              height={210}
              className="relative object-cover"
              style={{ filter: "grayscale(30%)" }}
            />
          </div>

          {/* JSON bio */}
          <div
            className="text-[13px] leading-6 p-6 overflow-x-auto"
            style={{ background: "#0a0a14", border: "1px solid #1a1a2e" }}
          >
            <p style={{ color: "#555577" }}>{"{"}</p>
            {json.map((line, i) => (
              <p key={i} style={{ paddingLeft: (line.indent ?? 1) * 16 }}>
                {line.key !== null ? (
                  <>
                    <span style={{ color: "#00f5d4" }}>&quot;{line.key}&quot;</span>
                    <span style={{ color: "#555577" }}>: </span>
                    <span style={{ color: line.open || line.close ? "#555577" : "#ff2d78" }}>
                      {line.value}
                    </span>
                  </>
                ) : (
                  <span style={{ color: line.close ? "#555577" : "#e0e0f0" }}>
                    {line.value}
                  </span>
                )}
              </p>
            ))}
            <p style={{ color: "#555577" }}>{"}"}</p>
          </div>
        </motion.div>

        {/* tech stack */}
        <div className="mt-16">
          <CommandLabel command="$ ls tech-stack/" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {stack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-2 cursor-default transition-all duration-200"
                style={{ border: "1px solid #1a1a2e", color: "#555577" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,245,212,0.35)";
                  e.currentTarget.style.color = "#00f5d4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a2e";
                  e.currentTarget.style.color = "#555577";
                }}
              >
                <Image src={tech.icon} alt={tech.name} width={14} height={14} style={{ opacity: 0.6 }} />
                <span className="text-xs tracking-wide">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
