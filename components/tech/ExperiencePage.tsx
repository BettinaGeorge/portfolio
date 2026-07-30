"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TechIconStream } from "./TechIconStream";
import { ThemeToggle } from "./ThemeToggle";
import { useTechTheme } from "./TechThemeProvider";
import { accent, shadow, type TechTheme } from "@/lib/tech-theme";

const EXPERIENCE = [
  {
    hash: "a1b2c3d",
    role: "Software Engineer Intern 2X",
    company: "Lowe's Tech Hub",
    logo: "/img/companies/lowes.png",
    logoBg: "#ffffff",
    period: "May 2026 – Present",
    isCurrent: true,
    bullets: [
      "Spearheaded adoption of AI-native, specification-driven engineering workflows, enabling AI agents to translate product requirements into technical specifications, implementation plans, and production-ready software.",
      "Built an agentic SDLC workflow by integrating MCP servers with engineering tools (e.g., Jira, Confluence) and Windsurf, enabling AI agents to leverage organizational context throughout feature development.",
      "Automated portions of the software development lifecycle by connecting issue tracking, documentation, technical specifications, architecture decisions, and implementation into a unified AI-assisted workflow.",
      "Developed scalable backend services and event-driven APIs using Java, Spring Boot, MongoDB, and Kafka for Lowe's enterprise quoting platform.",
      "Authored living technical specifications, architecture decision records (ADRs), and implementation plans that served as the source of truth for both engineers and AI coding agents.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "MongoDB", "MCP", "Windsurf", "Jira", "Confluence"],
  },
  {
    hash: "b7c8d9e",
    role: "AI Engineering Fellow",
    company: "CodePath",
    logo: "/img/companies/codepath.jpeg",
    logoBg: "#ffffff",
    period: "May 2026 – Present",
    isCurrent: true,
    bullets: [
      "Built RAG systems, multi-tool agents, content classifiers, and moderation APIs using Python, LangChain, ChromaDB, FastAPI, and LLM APIs.",
      "Developed AI workflows with vector search, evaluation pipelines, and prompt injection defenses for reliable LLM-powered systems.",
      "Contributed to production-grade open-source software through pull requests, code reviews, Git workflows, and collaborative development.",
    ],
    stack: ["Python", "LangChain", "ChromaDB", "FastAPI", "RAG", "LLM APIs"],
  },
  {
    hash: "b4e5f6a",
    role: "Applied AI Research Fellow",
    company: "Handshake",
    logo: "/img/companies/handshake.png",
    logoBg: undefined,
    period: "Dec 2025 – Present",
    isCurrent: true,
    bullets: [
      "Working on evaluation and refinement of large language models (LLMs) to improve accuracy, reasoning, and alignment in real-world AI systems.",
      "Support AI training initiatives through structured assessment, multimodal data analysis, and detailed feedback on model behavior.",
    ],
    stack: ["LLMs", "Multimodal AI", "Prompt Engineering", "AI Alignment"],
  },
  {
    hash: "c7d8e9f",
    role: "AI/ML Fellow",
    company: "KPMG + Break Through Tech",
    logo: "/img/companies/kpmg.png",
    logos: [
      { src: "/img/companies/btt.png",  bg: "#ffffff" },
      { src: "/img/companies/kpmg.png", bg: "#ffffff" },
    ],
    period: "May 2025 – Jun 2026",
    isCurrent: false,
    bullets: [
      "Selected from 3,000+ applicants for a national AI/ML fellowship, completing 100+ hours of applied machine learning and mentorship.",
      "Analyzed energy/productivity datasets (ML.ENERGY, Harvard/BCG) using Python to identify performance patterns and build baseline models.",
      "Collaborated with KPMG advisors to build scenario simulations that improved baseline performance ~15% and supported energy-efficiency strategy.",
      "Built and evaluated supervised machine learning models in Python (Pandas, scikit-learn) on real-world productivity and energy datasets.",
      "Developed an optimization system (NSGA-II) to quantify trade-offs between generative AI productivity gains and energy consumption.",
      "Analyzed model outputs and translated metrics into actionable insights for stakeholders to support responsible, scalable AI deployment.",
    ],
    stack: ["Python", "pandas", "NumPy", "Matplotlib", "Seaborn", "scikit-learn", "NSGA-II"],
  },
  {
    hash: "d1e2f3a",
    role: "Undergraduate Teaching Assistant",
    company: "UNC Dept. of Computer Science · COMP 110",
    logo: "/img/companies/unc.png",
    period: "Aug 2025 – May 2026",
    isCurrent: false,
    bullets: [
      "Selected from 180+ applicants to mentor students in Python, debugging, and software development in an introductory programming course.",
      "Conduct weekly labs and office hours, simplifying complex concepts and improving student success through hands-on guidance.",
      "Led weekly labs/office hours as a technical point of contact, diagnosing issues and communicating complex concepts under time constraints.",
    ],
    stack: ["Python", "Debugging", "Teaching"],
  },
  {
    hash: "f1e2d3c",
    role: "Instructional Tech and Design Support",
    company: "UNC School of Government",
    logo: "/img/companies/unc.png",
    period: "Aug 2024 – Mar 2026",
    isCurrent: false,
    bullets: [
      "Engineered scalable digital learning experiences using Canvas LMS, Articulate Rise, HTML/CSS, and Adobe Creative Suite, delivering 30+ interactive modules for 500+ government professionals and adult learners.",
      "Developed Python-based automation and AI-assisted evaluation workflows to synthesize learner feedback, identify high-impact improvements, and reduce content iteration time by 32% through data-driven decision making.",
    ],
    stack: ["Canvas LMS", "Articulate Rise", "HTML/CSS", "Adobe Creative Suite", "Python"],
  },
  {
    hash: "a0b1c2d",
    role: "Software Engineer Intern",
    company: "Lowe's Tech Hub",
    logo: "/img/companies/lowes.png",
    logoBg: "#ffffff",
    period: "May 2025 – Jul 2025",
    isCurrent: false,
    bullets: [
      "Refurbished a React + TypeScript + FastAPI web platform through continuous iterations, making it easier for 1.5K+ employees to navigate the Tech Hub office and acclimate quickly.",
      "Refined UI components and backend API integrations iteratively based on stakeholder feedback and evolving user stories.",
      "Used DBeaver to validate PostgreSQL queries and debug schema issues, ensuring data integrity across application workflows.",
      "Ensured 95%+ test coverage via Cypress for end-to-end and component tests, ensuring consistent feature reliability.",
      "Operated in Agile sprints with product managers and designers; translated user stories into scalable features.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Cypress", "DBeaver", "Agile"],
  },
  {
    hash: "f7a8b9c",
    role: "Consumer Trends Research Extern",
    company: "Beats by Dre",
    logo: "/img/companies/beats.png",
    logoBg: "#ffffff",
    period: "Jul – Aug 2024",
    isCurrent: false,
    bullets: [
      "Led end-to-end research on Gen Z audio industry trends, providing actionable insights for product and marketing strategy.",
      "Automated data collection workflows using Python and presented findings to remote audiences via Tableau and Excel.",
    ],
    stack: ["Python", "Tableau", "Excel", "Market Research"],
  },
  {
    hash: "e4f5a6b",
    role: "Interactive Course Developer",
    company: "UNC School of Medicine",
    logo: "/img/companies/unc.png",
    period: "Mar – Jul 2024",
    isCurrent: false,
    bullets: [
      "Designed and developed an Orientation Course for 200+ incoming medical students, achieving a 95% student satisfaction rate.",
      "Conducted 50+ user research surveys and interviews to inform course layout, resulting in a 30% increase in engagement and retention.",
      "Collaborated with 10+ faculty members to integrate multimedia, interactive quizzes, and real-time feedback mechanisms.",
      "Applied Agile methodologies and usability testing, reducing technical support requests by 25%.",
    ],
    stack: ["Agile", "UI/UX", "HTML/CSS", "User Research", "Canvas LMS"],
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

function RoadmapCard({
  exp,
  index,
  isLast,
  theme,
}: {
  exp: typeof EXPERIENCE[0];
  index: number;
  isLast: boolean;
  theme: TechTheme;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
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

  const [expanded, setExpanded] = useState(false);
  const VISIBLE_BULLETS = 2;
  const hasMore = exp.bullets.length > VISIBLE_BULLETS;
  const visibleBullets = expanded ? exp.bullets : exp.bullets.slice(0, VISIBLE_BULLETS);

  return (
    <div style={{ position: "relative", display: "flex", gap: 0, paddingBottom: isLast ? 0 : 12 }}>

      {/* ── timeline column ── */}
      <div style={{ position: "relative", width: 56, flexShrink: 0 }}>

        {/* vertical line segment */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 19,
              top: 28,
              bottom: -12,
              width: 1,
              background: `linear-gradient(to bottom, ${accent(theme, 0.4)}, ${accent(theme, 0.1)})`,
              transformOrigin: "top",
            }}
          />
        )}

        {/* node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 200 }}
          style={{
            position: "absolute",
            left: 12,
            top: 20,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: exp.isCurrent ? theme.accent : theme.pageBg,
            border: `1.5px solid ${exp.isCurrent ? theme.accent : accent(theme, 0.35)}`,
            boxShadow: exp.isCurrent
              ? `0 0 0 4px ${accent(theme, 0.12)}, 0 0 16px ${accent(theme, 0.45)}`
              : "none",
            zIndex: 2,
          }}
        />

        {/* hash */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 42,
            fontSize: 9,
            color: theme.hash,
            opacity: 0.65,
            letterSpacing: "0.02em",
            fontFamily: "inherit",
          }}
        >
          {exp.hash}
        </div>
      </div>

      {/* ── glass card ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.012 }}
        style={{
          flex: 1,
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
          cursor: "default",
          marginTop: 6,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 14,
            padding: "22px 26px",
            minHeight: 190,
            overflow: "hidden",
            background: theme.glassCardBg,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: `1px solid ${exp.isCurrent ? accent(theme, 0.22) : accent(theme, 0.1)}`,
            boxShadow:
              `0 8px 40px ${shadow(theme, 0.4)}, ` +
              `0 1px 0 ${accent(theme, 0.15)} inset, ` +
              `0 -1px 0 ${shadow(theme, 0.4)} inset`,
          }}
        >
          {/* shimmer */}
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

          {/* top edge glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${exp.isCurrent ? accent(theme, 0.6) : accent(theme, 0.3)}, transparent)`,
            }}
          />

          {/* ambient orb */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: accent(theme, 0.04),
              filter: "blur(24px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", transform: "translateZ(16px)" }}>
            {/* header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* company logo(s) */}
                <div style={{ display: "flex", gap: 4, flexShrink: 0, marginTop: 2 }}>
                  {(exp.logos ?? [{ src: exp.logo, bg: exp.logoBg }]).map((l, li) =>
                    l.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={li}
                        src={l.src}
                        alt={exp.company}
                        width={36}
                        height={36}
                        style={{
                          borderRadius: 8,
                          objectFit: "contain",
                          background: l.bg ?? "rgba(255,255,255,0.06)",
                          padding: 4,
                        }}
                      />
                    ) : (
                      <div
                        key={li}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: accent(theme, 0.1),
                          border: `1px solid ${accent(theme, 0.2)}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 13,
                          fontWeight: 700,
                          color: theme.accent,
                          flexShrink: 0,
                        }}
                      >
                        {exp.company.charAt(0)}
                      </div>
                    )
                  )}
                </div>
                <div>
                  {exp.isCurrent && (
                    <span
                      style={{
                        fontSize: 9,
                        color: theme.accent,
                        border: `1px solid ${accent(theme, 0.4)}`,
                        padding: "1px 6px",
                        borderRadius: 2,
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                        display: "inline-block",
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: theme.accent, margin: "4px 0 2px" }}>
                    {exp.role}
                  </h2>
                  <p style={{ fontSize: 12, color: theme.body, margin: 0 }}>{exp.company}</p>
                </div>
              </div>
              <span style={{ fontSize: 11, color: theme.faint, flexShrink: 0, paddingTop: 2 }}>
                {exp.period}
              </span>
            </div>

            {/* bullets */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none" }}>
                {visibleBullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 12,
                      color: theme.body,
                      lineHeight: 1.7,
                      paddingLeft: 14,
                      position: "relative",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: theme.dim }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* fade cue signaling truncated content */}
              {hasMore && !expanded && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 30,
                    background: `linear-gradient(to bottom, transparent, ${theme.panelBg})`,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* tags row + expand/collapse arrow, same line */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {exp.stack.map((t) => <Tag key={t} label={t} theme={theme} />)}
              </div>

              {hasMore && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-label={expanded ? "show less" : "show more"}
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    color: theme.accent,
                    fontSize: 20,
                    fontWeight: 700,
                    boxShadow: "none",
                    transition: "box-shadow 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent(theme, 0.1);
                    e.currentTarget.style.boxShadow = `0 0 0 6px ${accent(theme, 0.1)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {expanded ? (
                    "↑"
                  ) : (
                    <span style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ display: "inline-block", position: "relative", zIndex: 1 }}
                      >
                        ↓
                      </motion.span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.5, 1.15, 0.5] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          margin: "0 auto",
                          width: 22,
                          height: 7,
                          borderRadius: "50%",
                          background: theme.accent,
                          filter: "blur(4px)",
                          zIndex: 0,
                          pointerEvents: "none",
                        }}
                      />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExperiencePage() {
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
        {/* chrome */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: theme.chromeBg, borderBottom: `1px solid ${theme.chromeBorder}`, transition: "background 0.3s, border-color 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", height: 42, padding: "0 20px", gap: 8 }}>
            <button
              onClick={() => router.push("/")}
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "none", cursor: "default" }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: theme.faint, userSelect: "none" }}>
              bettina@portfolio — ~/experience
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => router.push("/tech")}
                style={{ fontSize: 11, color: theme.faint, background: "none", border: "none", cursor: "default", fontFamily: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.faint)}
              >
                ← cd ..
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* body */}
        <div style={{ padding: "56px 40px 100px" }}>

          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 52 }}
          >
            <p style={{ fontSize: 12, color: theme.dim, letterSpacing: "0.2em", marginBottom: 8 }}>
              # CAREER
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: theme.heading, lineHeight: 1, marginBottom: 14 }}>
              experience
            </h1>
            <p style={{ fontSize: 13, color: theme.faint, fontStyle: "italic" }}>
              $ git log --career --oneline
            </p>
          </motion.div>

          {/* roadmap */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {EXPERIENCE.map((exp, i) => (
              <RoadmapCard
                key={exp.hash}
                exp={exp}
                index={i}
                isLast={i === EXPERIENCE.length - 1}
                theme={theme}
              />
            ))}
          </div>

          {/* prompt */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 4, fontSize: 13, paddingLeft: 56 }}>
            <span style={{ color: theme.accent, fontWeight: 700 }}>bettina@portfolio</span>
            <span style={{ color: theme.dim }}>:~/experience $</span>
            <span className="cursor-blink" style={{ color: theme.accent, marginLeft: 4 }}>█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
