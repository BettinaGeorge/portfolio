"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TechIconStream } from "./TechIconStream";

const EXPERIENCE = [
  {
    hash: "a1b2c3d",
    role: "Software Engineering Intern",
    company: "Lowe's Tech Hub",
    logo: "/img/companies/lowes.png",
    logoBg: "#ffffff",
    period: "May – Aug 2025 · Returning 2026",
    isCurrent: true,
    bullets: [
      "Refurbished a React/TypeScript/FastAPI internal platform through continuous iterations, making it easier for 1.5K+ employees to navigate the Tech Hub office.",
      "Refined UI components and backend API integrations iteratively based on stakeholder feedback and evolving user stories.",
      "Used DBeaver to validate PostgreSQL queries and debug schema issues, ensuring data integrity across application workflows.",
      "Ensured 95%+ test coverage via Cypress for end-to-end and component tests, ensuring consistent feature reliability.",
      "Operated in Agile sprints with product managers and designers; translated user stories into scalable features.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Cypress", "DBeaver", "Agile"],
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
    role: "AI/ML Research Fellow",
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
    ],
    stack: ["Python", "pandas", "NumPy", "Matplotlib", "Seaborn", "scikit-learn"],
  },
  {
    hash: "d1e2f3a",
    role: "Undergraduate Teaching Assistant",
    company: "UNC Dept. of Computer Science · COMP 110",
    logo: "/img/companies/unc.png",
    period: "Aug 2025 – Present",
    isCurrent: true,
    bullets: [
      "Selected from 180+ applicants to mentor students in Python, debugging, and software development in an introductory programming course.",
      "Conduct weekly labs and office hours, simplifying complex concepts and improving student success through hands-on guidance.",
    ],
    stack: ["Python", "Debugging", "Teaching"],
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

function RoadmapCard({
  exp,
  index,
  isLast,
}: {
  exp: typeof EXPERIENCE[0];
  index: number;
  isLast: boolean;
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
              background: "linear-gradient(to bottom, rgba(255,45,85,0.4), rgba(255,45,85,0.1))",
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
            background: exp.isCurrent ? "#ff2d55" : "#0a0003",
            border: `1.5px solid ${exp.isCurrent ? "#ff2d55" : "rgba(255,45,85,0.35)"}`,
            boxShadow: exp.isCurrent
              ? "0 0 0 4px rgba(255,45,85,0.12), 0 0 16px rgba(255,45,85,0.45)"
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
            color: "#ff6b35",
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
            overflow: "hidden",
            background: "rgba(20, 0, 10, 0.55)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: `1px solid ${exp.isCurrent ? "rgba(255,45,85,0.22)" : "rgba(255,45,85,0.1)"}`,
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.4), " +
              "0 1px 0 rgba(255,45,85,0.15) inset, " +
              "0 -1px 0 rgba(0,0,0,0.4) inset",
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
                  `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,45,85,0.07) 0%, transparent 60%)`
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
              background: `linear-gradient(90deg, transparent, ${exp.isCurrent ? "rgba(255,45,85,0.6)" : "rgba(255,45,85,0.3)"}, transparent)`,
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
              background: "rgba(255,45,85,0.04)",
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
                  {(exp.logos ?? [{ src: exp.logo, bg: exp.logoBg }]).map((l, li) => (
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
                  ))}
                </div>
                <div>
                  {exp.isCurrent && (
                    <span
                      style={{
                        fontSize: 9,
                        color: "#ff2d55",
                        border: "1px solid rgba(255,45,85,0.4)",
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
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: "#ff2d55", margin: "4px 0 2px" }}>
                    {exp.role}
                  </h2>
                  <p style={{ fontSize: 12, color: "#c4a882", margin: 0 }}>{exp.company}</p>
                </div>
              </div>
              <span style={{ fontSize: 11, color: "#3d1a28", flexShrink: 0, paddingTop: 2 }}>
                {exp.period}
              </span>
            </div>

            {/* bullets */}
            <ul style={{ margin: "12px 0 14px", padding: 0, listStyle: "none" }}>
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "#c4a882",
                    lineHeight: 1.7,
                    paddingLeft: 14,
                    position: "relative",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "#553344" }}>›</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {exp.stack.map((t) => <Tag key={t} label={t} />)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExperiencePage() {
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
        {/* chrome */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#1a0810", borderBottom: "1px solid #2d0a18" }}>
          <div style={{ display: "flex", alignItems: "center", height: 42, padding: "0 20px", gap: 8 }}>
            <button
              onClick={() => router.push("/")}
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "none", cursor: "pointer" }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#3d1a28", userSelect: "none" }}>
              bettina@portfolio — ~/experience
            </div>
            <button
              onClick={() => router.push("/tech")}
              style={{ fontSize: 11, color: "#3d1a28", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d1a28")}
            >
              ← cd ..
            </button>
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
            <p style={{ fontSize: 12, color: "#553344", letterSpacing: "0.2em", marginBottom: 8 }}>
              # CAREER
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "#f0e6d3", lineHeight: 1, marginBottom: 14 }}>
              experience
            </h1>
            <p style={{ fontSize: 13, color: "#3d1a28", fontStyle: "italic" }}>
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
              />
            ))}
          </div>

          {/* prompt */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 4, fontSize: 13, paddingLeft: 56 }}>
            <span style={{ color: "#ff2d55", fontWeight: 700 }}>bettina@portfolio</span>
            <span style={{ color: "#553344" }}>:~/experience $</span>
            <span className="cursor-blink" style={{ color: "#ff2d55", marginLeft: 4 }}>█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
