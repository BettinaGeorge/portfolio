"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TechIconStream } from "./TechIconStream";

const PROJECTS = [
  {
    num: "01",
    name: "Quiet Table",
    context: "Pearl Hacks 2026 · 🏆 1st Place",
    description:
      "Privacy-first, real-time dining connection app with ephemeral, no-profile interactions. Geospatial proximity matching via MongoDB 2dsphere + Google Maps API, Gemini-powered icebreakers.",
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Gemini AI"],
    github: "https://github.com/betsygeo/quiet-table",
    link: null,
    linkLabel: null,
  },
  {
    num: "02",
    name: "AI Creator Content Intelligence Platform",
    context: "Full-Stack · AI",
    description:
      "Full-stack platform analyzing Instagram Reel performance to guide content strategy. Pluggable ingestion layer into PostgreSQL. Anthropic Claude powering hooks, briefs, trend scouting, and strategy insights via live analytics context.",
    stack: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Anthropic Claude"],
    github: "https://github.com/BettinaGeorge/creator-dashboard",
    link: null,
    linkLabel: null,
  },
  {
    num: "03",
    name: "Duolingo Watch Feature",
    context: "APM · Duolingo Thrive Recruitment 2025",
    description:
      "Designed and proposed a media-based language learning feature integrating bilingual subtitles, vocabulary pinning, and interactive annotations. High-fidelity Figma mockups with a mock A/B testing plan to validate retention and engagement gains.",
    stack: ["Figma", "Product Design", "A/B Testing"],
    github: "https://github.com/BettinaGeorge/Duolingo-Watch-Feature-Proposal",
    link: "https://vimeo.com/1041582266",
    linkLabel: "demo →",
  },
  {
    num: "04",
    name: "De-Impact Web App",
    context: "JP Morgan Code for Good Hackathon 2024",
    description:
      "Built with 6 engineers — connects civilians with NGOs via skill/interest-based matching. Designed UI in Figma, implemented frontend in React/TypeScript/Tailwind, and assisted in a 60% compatibility matching algorithm.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "MySQL", "Figma"],
    github: null,
    link: "https://www.youtube.com/watch?v=EJdtZWzPUoc",
    linkLabel: "demo →",
  },
  {
    num: "05",
    name: "Diaspora Duo App",
    context: "Pearl Hacks 2024 · Best DEI Hack · Best Use of AI",
    description:
      "Led product ideation and UI/UX for an AI-driven web app supporting immigrant transitions through personalized recommendations via LLM-powered Flask APIs. Awarded Best DEI Hack by Fidelity and Best Use of AI by Infosys among 70+ teams.",
    stack: ["Python", "Flask", "LLMs", "Figma"],
    github: "https://github.com/BettinaGeorge/Diaspora-Duo-----Pearl-Hacks-Project",
    link: "https://devpost.com/software/diaspora-duo",
    linkLabel: "devpost →",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        padding: "3px 10px",
        border: "1px solid rgba(255,45,85,0.2)",
        color: "#c4a882",
        borderRadius: 3,
        whiteSpace: "nowrap",
        background: "rgba(255,45,85,0.04)",
        fontFamily: "inherit",
      }}
    >
      {label}
    </span>
  );
}

function GlassCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);
  const shimmerX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const shimmerY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        cursor: "default",
      }}
    >
      {/* glass card shell */}
      <div
        style={{
          position: "relative",
          borderRadius: 14,
          padding: "28px 30px",
          overflow: "hidden",
          background: "rgba(20, 0, 10, 0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 45, 85, 0.14)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.45), " +
            "0 1px 0 rgba(255,45,85,0.18) inset, " +
            "0 -1px 0 rgba(0,0,0,0.4) inset",
        }}
      >
        {/* moving shimmer highlight that follows mouse */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            pointerEvents: "none",
            background: useTransform(
              [shimmerX, shimmerY],
              ([sx, sy]) =>
                `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,45,85,0.07) 0%, transparent 60%)`
            ),
          }}
        />

        {/* top edge glow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,45,85,0.5), transparent)",
            borderRadius: 1,
          }}
        />

        {/* ambient crimson orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(255,45,85,0.05)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* card content — lifted in Z */}
        <div style={{ position: "relative", transform: "translateZ(20px)" }}>
          {/* top row: number + name + icons */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontSize: 11, color: "#3d1a28", flexShrink: 0 }}>{project.num}</span>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#ff2d55", margin: 0, lineHeight: 1.3 }}>
                {project.name}
              </h2>
            </div>

            {/* external links */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener"
                  title="GitHub"
                  style={{ display: "flex", alignItems: "center", opacity: 0.4, transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/tech/github.svg"
                    alt="GitHub"
                    width={16}
                    height={16}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: 11, color: "#553344", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#553344")}
                >
                  {project.linkLabel}
                </a>
              )}
            </div>
          </div>

          {/* context */}
          <p style={{ fontSize: 11, color: "#553344", marginBottom: 12, letterSpacing: "0.06em" }}>
            {project.context}
          </p>

          {/* description */}
          <p style={{ fontSize: 13, color: "#c4a882", lineHeight: 1.75, marginBottom: 18 }}>
            {project.description}
          </p>

          {/* tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.stack.map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const router = useRouter();

  return (
    <div
      style={{
        background: "#0a0003",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
      }}
    >
      <TechIconStream />

      {/* centered terminal window */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 820,
          margin: "0 auto",
          minHeight: "100vh",
          background: "#0f0008",
          borderLeft: "1px solid rgba(255,45,85,0.1)",
          borderRight: "1px solid rgba(255,45,85,0.1)",
          boxShadow:
            "0 0 0 1px rgba(255,45,85,0.04), -40px 0 120px rgba(0,0,0,0.6), 40px 0 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* window chrome */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#1a0810", borderBottom: "1px solid #2d0a18" }}>
          <div style={{ display: "flex", alignItems: "center", height: 42, padding: "0 20px", gap: 8 }}>
            <button
              onClick={() => router.push("/")}
              title="back to home"
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "none", cursor: "pointer" }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />

            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#3d1a28", userSelect: "none" }}>
              bettina@portfolio — ~/projects
            </div>

            <button
              onClick={() => router.push("/tech")}
              style={{ fontSize: 11, color: "#3d1a28", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d1a28")}
            >
              ← cd ..
            </button>
          </div>
        </div>

        {/* page body */}
        <div style={{ padding: "56px 40px 100px" }}>

          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 48 }}
          >
            <p style={{ fontSize: 12, color: "#553344", letterSpacing: "0.2em", marginBottom: 8 }}>
              # WORK
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "#f0e6d3", lineHeight: 1, marginBottom: 14 }}>
              projects
            </h1>
            <p style={{ fontSize: 13, color: "#3d1a28", fontStyle: "italic" }}>
              // things I&apos;ve built, trained, shipped, or broken
            </p>
          </motion.div>

          {/* cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <GlassCard key={p.num} project={p} index={i} />
            ))}
          </div>

          {/* final prompt */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
            <span style={{ color: "#ff2d55", fontWeight: 700 }}>bettina@portfolio</span>
            <span style={{ color: "#553344" }}>:~/projects $</span>
            <span className="cursor-blink" style={{ color: "#ff2d55", marginLeft: 4 }}>█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
