"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { TechIconStream } from "./TechIconStream";
import { ThemeToggle } from "./ThemeToggle";
import { useTechTheme } from "./TechThemeProvider";
import { accent, shadow, type TechTheme } from "@/lib/tech-theme";

function Prompt({ command, theme }: { command: string; theme: TechTheme }) {
  return (
    <p style={{ fontSize: 13, lineHeight: 1.5, fontFamily: "inherit" }}>
      <span style={{ color: theme.accent, fontWeight: 700 }}>bettina@portfolio</span>
      <span style={{ color: theme.dim }}>:~ </span>
      <span style={{ color: theme.heading }}>$ {command}</span>
    </p>
  );
}

function Block({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.3 }}
      style={{ marginBottom: 40 }}
    >
      {children}
    </motion.div>
  );
}

const printenvData = [
  { key: "LOCATION",   value: "Chapel Hill, NC" },
  { key: "STATUS",     value: "Returning SWE Intern @ Lowe's" },
  { key: "FOCUS",      value: "Full-Stack · ML · AI Systems · Design" },
  { key: "EDUCATION",  value: "UNC Chapel Hill · CS + Info Science" },
  { key: "GPA",        value: "3.79 · Dean's List" },
  { key: "PREV_ROLES", value: "Lowe's · Break Through Tech · KPMG · Beats by Dre" },
];

const projects = [
  { name: "context-os/",     url: "/tech/projects", note: "AI Developer Platform" },
  { name: "quiet-table/",    url: "/tech/projects", note: "🏆 1st Place · Pearl Hacks 2026" },
  { name: "creator-intel/",  url: "/tech/projects", note: "AI · Full-Stack" },
  { name: "duolingo-watch/", url: "/tech/projects", note: "APM · Product" },
  { name: "de-impact/",      url: "/tech/projects", note: "Hackathon · JP Morgan" },
  { name: "diaspora-duo/",   url: "/tech/projects", note: "Best DEI · Best Use of AI" },
];

const commits = [
  { hash: "a1b2c3d", msg: "Software Engineer Intern 2X — Lowe's Tech Hub", period: "May 2026 – Present" },
  { hash: "b7c8d9e", msg: "AI Engineering Fellow — CodePath",                 period: "May 2026 – Present" },
  { hash: "b4e5f6a", msg: "Applied AI Research Fellow — Handshake",           period: "Dec 2025 – Present"  },
  { hash: "c7d8e9f", msg: "AI/ML Research Fellow — KPMG + Break Through Tech",period: "May 2025 – Jun 2026" },
  { hash: "d1e2f3a", msg: "Undergraduate Teaching Assistant — UNC CS COMP 110",period: "Aug 2025 – May 2026"  },
  { hash: "f1e2d3c", msg: "Instructional Tech and Design Support — UNC School of Government", period: "Aug 2024 – Mar 2026" },
  { hash: "a0b1c2d", msg: "Software Engineer Intern — Lowe's Tech Hub",    period: "May 2025 – Jul 2025" },
  { hash: "e4f5a6b", msg: "Interactive Course Developer — UNC School of Medicine", period: "Mar – Jul 2024"  },
];

const contactData = [
  { key: "email",    value: "gobetti@unc.edu",                href: "mailto:gobetti@unc.edu" },
  { key: "github",   value: "github.com/BettinaGeorge",       href: "https://github.com/BettinaGeorge" },
  { key: "linkedin", value: "linkedin.com/in/bettina-george", href: "https://www.linkedin.com/in/bettina-george/" },
  { key: "resume",   value: "download resume ↓",              href: "/resume.pdf" },
  { key: "located",  value: "Chapel Hill, NC",                href: null },
];

export function TerminalPage() {
  const router = useRouter();
  const { theme } = useTechTheme();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    /* ── outer page: dark atmosphere behind the window ── */
    <div
      style={{
        background: theme.pageBg,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
        transition: "background 0.3s",
      }}
    >
      {/* animated tech-stack icon rain in background */}
      <TechIconStream />

      {/* ── centered terminal window ─────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 820,
          margin: "0 auto",
          minHeight: "100vh",
          background: theme.panelBg,
          borderLeft:  `1px solid ${accent(theme, 0.1)}`,
          borderRight: `1px solid ${accent(theme, 0.1)}`,
          boxShadow:
            `0 0 0 1px ${accent(theme, 0.04)}, ` +
            `-40px 0 120px ${shadow(theme, 0.6)}, ` +
            `40px 0 120px ${shadow(theme, 0.6)}`,
          transition: "background 0.3s",
        }}
      >
        {/* ── window chrome ──────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: theme.chromeBg,
            borderBottom: `1px solid ${theme.chromeBorder}`,
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 42,
              padding: "0 20px",
              gap: 8,
            }}
          >
            {/* traffic lights */}
            <button
              onClick={() => router.push("/")}
              title="back to home"
              style={{
                width: 12, height: 12, borderRadius: "50%",
                background: "#ff5f57", border: "none", cursor: "default",
              }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />

            {/* title */}
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: theme.faint, userSelect: "none" }}>
              bettina@portfolio — ~ — 120×40
            </div>

            {/* home + clock + theme toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => router.push("/")}
                style={{
                  fontSize: 11, color: theme.faint,
                  background: "none", border: "none", cursor: "default",
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.faint)}
              >
                ← home
              </button>
              <span style={{ fontSize: 12, color: theme.dim }}>{time}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* ── terminal body ──────────────────────────────────── */}
        <div style={{ padding: "30px 38px 60px" }}>

          {/* whoami -------------------------------------------- */}
          <Block delay={0.1}>
            <Prompt command="whoami" theme={theme} />
            <div style={{ margin: "20px 0 12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 32,
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    fontWeight: 700,
                    color: theme.accent,
                    lineHeight: 0.88,
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(3.5rem, 10vw, 7rem)",
                    margin: 0,
                  }}
                >
                  Bettina<br />George
                </h1>

                <div style={{ flexShrink: 0 }}>
                  <Image
                    src="/img/headshot.png"
                    alt="Bettina George"
                    width={180}
                    height={180}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      border: `2px solid ${theme.accent}`,
                      boxShadow: `0 0 0 6px ${accent(theme, 0.1)}, 0 0 40px ${accent(theme, 0.2)}`,
                      filter: "grayscale(20%)",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <p style={{ color: theme.body, fontSize: 14, marginTop: 16, marginBottom: 10 }}>
                Software Engineer · AI Engineer
              </p>
              <p style={{ color: theme.dim, fontSize: 13, fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;Some people build with code. Others build with creativity.<br />&nbsp;I like to think I do both.&quot;
              </p>
            </div>
          </Block>

          {/* printenv ------------------------------------------ */}
          <Block>
            <Prompt command="printenv" theme={theme} />
            <div style={{ marginTop: 12 }}>
              {printenvData.map(({ key, value }) => (
                <div
                  key={key}
                  style={{ display: "flex", gap: 0, fontSize: 13, lineHeight: 1.8 }}
                >
                  <span style={{ color: theme.dim, minWidth: 120 }}>{key}</span>
                  <span style={{ color: theme.faint }}>&nbsp;=&nbsp;</span>
                  <span style={{ color: theme.accent }}>{value}</span>
                </div>
              ))}
            </div>
          </Block>

          {/* ls projects/ -------------------------------------- */}
          <Block>
            <Prompt command="ls projects/" theme={theme} />
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px 16px",
                fontSize: 13,
              }}
            >
              {projects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  style={{ color: theme.accent, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  📁 {p.name}
                </a>
              ))}
            </div>
            <a
              href="/tech/projects"
              style={{ color: theme.dim, fontSize: 12, fontStyle: "italic", marginTop: 12, display: "inline-block", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.dim)}
            >
              // click link to view details →
            </a>
          </Block>

          {/* git log --career ---------------------------------- */}
          <Block>
            <Prompt command="git log --career --oneline" theme={theme} />
            <div style={{ marginTop: 12 }}>
              {commits.map((c) => (
                <a
                  key={c.hash}
                  href="/tech/experience"
                  style={{ display: "flex", gap: 16, fontSize: 13, lineHeight: 1.8, flexWrap: "wrap", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <span style={{ color: theme.hash, flexShrink: 0 }}>{c.hash}</span>
                  <span style={{ color: theme.heading, flex: 1 }}>{c.msg}</span>
                  <span style={{ color: theme.faint, flexShrink: 0 }}>{c.period}</span>
                </a>
              ))}
            </div>
            <a
              href="/tech/experience"
              style={{ color: theme.dim, fontSize: 12, fontStyle: "italic", marginTop: 12, display: "inline-block", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.dim)}
            >
              // click to view full experience →
            </a>
          </Block>

          {/* cat contact.txt ----------------------------------- */}
          <Block>
            <Prompt command="cat contact.txt" theme={theme} />
            <div style={{ marginTop: 12 }}>
              {contactData.map(({ key, value, href }) => (
                <div
                  key={key}
                  style={{ display: "flex", fontSize: 13, lineHeight: 1.8 }}
                >
                  <span style={{ color: theme.dim, minWidth: 90 }}>{key}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      style={{ color: theme.heading, textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = theme.heading)}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: theme.heading }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </Block>

          {/* blinking cursor ----------------------------------- */}
          <Block>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
              <span style={{ color: theme.accent, fontWeight: 700 }}>bettina@portfolio</span>
              <span style={{ color: theme.dim }}>:~ $</span>
              <span className="cursor-blink" style={{ color: theme.accent, marginLeft: 4 }}>█</span>
            </div>
          </Block>

        </div>
      </div>
    </div>
  );
}
