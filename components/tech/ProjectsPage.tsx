"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TechIconStream } from "./TechIconStream";
import { ThemeToggle } from "./ThemeToggle";
import { useTechTheme } from "./TechThemeProvider";
import { accent, shadow, type TechTheme } from "@/lib/tech-theme";

const PROJECTS = [
  {
    num: "01",
    name: "ContextOS",
    context: "AI Developer Platform",
    description:
      "AI-native platform connecting GitHub and Notion to help developers understand codebases through evidence-backed, source-cited retrieval. RAG pipeline built with PostgreSQL/pgvector and Voyage embeddings, with prompt-injection defense and abstention. Modular connector framework in FastAPI, Next.js, and Supabase supporting Jira, Figma, and Slack integrations.",
    stack: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "pgvector", "Supabase"],
    github: null,
    link: null,
    linkLabel: null,
  },
  {
    num: "02",
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
    num: "03",
    name: "CreatorOS",
    context: "AI Creator Content Intelligence Platform · Full-Stack · AI",
    description:
      "Full-stack platform analyzing Instagram Reel performance to guide content strategy. Pluggable ingestion layer parsing Instagram Reel JSON exports into PostgreSQL, enabling a swap to the Instagram Graph API. Anthropic Claude powering hooks, briefs, trend scouting, and strategy insights via live analytics context.",
    stack: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Anthropic Claude"],
    github: "https://github.com/BettinaGeorge/creator-dashboard",
    link: null,
    linkLabel: null,
  },
  {
    num: "04",
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
    num: "05",
    name: "De-Impact Web App",
    context: "JP Morgan Code for Good Hackathon 2024",
    description:
      "Built with 6 engineers — connects civilians with NGOs via skill/interest-based matching. Designed UI in Figma, implemented frontend in React/TypeScript/Tailwind, and assisted in a 60% compatibility matching algorithm, boosting demo engagement by 25%.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "MySQL", "Figma"],
    github: null,
    link: "https://www.youtube.com/watch?v=EJdtZWzPUoc",
    linkLabel: "demo →",
  },
  {
    num: "06",
    name: "Diaspora Duo App",
    context: "Pearl Hacks 2024 · Best DEI Hack · Best Use of AI",
    description:
      "Led product ideation and UI/UX for an AI-driven web app supporting immigrant transitions through personalized recommendations via LLM-powered Flask APIs using OpenAI's API. Awarded Best DEI Hack by Fidelity and Best Use of AI by Infosys among 70+ teams.",
    stack: ["Python", "Flask", "LLMs", "OpenAI API", "Figma"],
    github: "https://github.com/BettinaGeorge/Diaspora-Duo-----Pearl-Hacks-Project",
    link: "https://devpost.com/software/diaspora-duo",
    linkLabel: "devpost →",
  },
];

function Tag({ label, theme }: { label: string; theme: TechTheme }) {
  return (
    <span
      style={{
        fontSize: 11,
        padding: "3px 10px",
        border: `1px solid ${accent(theme, 0.2)}`,
        color: theme.body,
        borderRadius: 3,
        whiteSpace: "nowrap",
        background: accent(theme, 0.04),
        fontFamily: "inherit",
      }}
    >
      {label}
    </span>
  );
}

function GlassCard({ project, index, theme }: { project: typeof PROJECTS[0]; index: number; theme: TechTheme }) {
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

  const githubIconFilter = theme.name === "dark" ? "brightness(0) invert(1)" : "brightness(0)";

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
          background: theme.glassCardBg,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: `1px solid ${accent(theme, 0.14)}`,
          boxShadow:
            `0 8px 40px ${shadow(theme, 0.45)}, ` +
            `0 1px 0 ${accent(theme, 0.18)} inset, ` +
            `0 -1px 0 ${shadow(theme, 0.4)} inset`,
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
                `radial-gradient(circle at ${sx}% ${sy}%, ${accent(theme, 0.07)} 0%, transparent 60%)`
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
            background: `linear-gradient(90deg, transparent, ${accent(theme, 0.5)}, transparent)`,
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
            background: accent(theme, 0.05),
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* card content — lifted in Z */}
        <div style={{ position: "relative", transform: "translateZ(20px)" }}>
          {/* top row: number + name + icons */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontSize: 11, color: theme.faint, flexShrink: 0 }}>{project.num}</span>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: theme.accent, margin: 0, lineHeight: 1.3 }}>
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
                    style={{ filter: githubIconFilter }}
                  />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: 11, color: theme.dim, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = theme.dim)}
                >
                  {project.linkLabel}
                </a>
              )}
            </div>
          </div>

          {/* context */}
          <p style={{ fontSize: 11, color: theme.dim, marginBottom: 12, letterSpacing: "0.06em" }}>
            {project.context}
          </p>

          {/* description */}
          <p style={{ fontSize: 13, color: theme.body, lineHeight: 1.75, marginBottom: 18 }}>
            {project.description}
          </p>

          {/* tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.stack.map((t) => <Tag key={t} label={t} theme={theme} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const router = useRouter();
  const { theme } = useTechTheme();

  return (
    <div
      style={{
        background: theme.pageBg,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
        transition: "background 0.3s",
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
          background: theme.panelBg,
          borderLeft: `1px solid ${accent(theme, 0.1)}`,
          borderRight: `1px solid ${accent(theme, 0.1)}`,
          boxShadow: `0 0 0 1px ${accent(theme, 0.04)}, -40px 0 120px ${shadow(theme, 0.6)}, 40px 0 120px ${shadow(theme, 0.6)}`,
          transition: "background 0.3s",
        }}
      >
        {/* window chrome */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: theme.chromeBg, borderBottom: `1px solid ${theme.chromeBorder}`, transition: "background 0.3s, border-color 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", height: 42, padding: "0 20px", gap: 8 }}>
            <button
              onClick={() => router.push("/")}
              title="back to home"
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "none", cursor: "default" }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />

            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: theme.faint, userSelect: "none" }}>
              bettina@portfolio — ~/projects
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => router.push("/tech")}
                style={{ fontSize: 11, color: theme.faint, background: "none", border: "none", cursor: "default", fontFamily: "inherit", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.faint)}
              >
                ← cd ..
              </button>
              <ThemeToggle />
            </div>
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
            <p style={{ fontSize: 12, color: theme.dim, letterSpacing: "0.2em", marginBottom: 8 }}>
              # WORK
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: theme.heading, lineHeight: 1, marginBottom: 14 }}>
              projects
            </h1>
            <p style={{ fontSize: 13, color: theme.faint, fontStyle: "italic" }}>
              // things I&apos;ve built, trained, shipped, or broken
            </p>
          </motion.div>

          {/* cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <GlassCard key={p.num} project={p} index={i} theme={theme} />
            ))}
          </div>

          {/* final prompt */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
            <span style={{ color: theme.accent, fontWeight: 700 }}>bettina@portfolio</span>
            <span style={{ color: theme.dim }}>:~/projects $</span>
            <span className="cursor-blink" style={{ color: theme.accent, marginLeft: 4 }}>█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
