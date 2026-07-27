"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { TechIconStream } from "./TechIconStream";

function Prompt({ command }: { command: string }) {
  return (
    <p style={{ fontSize: 13, lineHeight: 1.5, fontFamily: "inherit" }}>
      <span style={{ color: "#ff2d55", fontWeight: 700 }}>bettina@portfolio</span>
      <span style={{ color: "#553344" }}>:~ </span>
      <span style={{ color: "#f0e6d3" }}>$ {command}</span>
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
  { name: "quiet-table/",    url: "/tech/projects", note: "🏆 1st Place · Pearl Hacks 2026" },
  { name: "creator-intel/",  url: "/tech/projects", note: "AI · Full-Stack" },
  { name: "duolingo-watch/", url: "/tech/projects", note: "APM · Product" },
  { name: "de-impact/",      url: "/tech/projects", note: "Hackathon · JP Morgan" },
  { name: "diaspora-duo/",   url: "/tech/projects", note: "Best DEI · Best Use of AI" },
];

const commits = [
  { hash: "a1b2c3d", msg: "Software Engineering Intern — Lowe's Tech Hub",   period: "May – Aug 2025 · Returning 2026" },
  { hash: "b4e5f6a", msg: "Applied AI Research Fellow — Handshake",           period: "Dec 2025 – Present"  },
  { hash: "c7d8e9f", msg: "AI/ML Research Fellow — KPMG + Break Through Tech",period: "May 2025 – Jun 2026" },
  { hash: "d1e2f3a", msg: "Undergraduate Teaching Assistant — UNC CS COMP 110",period: "Aug 2025 – Present"  },
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
        background: "#0a0003",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
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
          background: "#0f0008",
          borderLeft:  "1px solid rgba(255,45,85,0.1)",
          borderRight: "1px solid rgba(255,45,85,0.1)",
          boxShadow:
            "0 0 0 1px rgba(255,45,85,0.04), " +
            "-40px 0 120px rgba(0,0,0,0.6), " +
            "40px 0 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── window chrome ──────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#1a0810",
            borderBottom: "1px solid #2d0a18",
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
                background: "#ff5f57", border: "none", cursor: "pointer",
              }}
            />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />

            {/* title */}
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#3d1a28", userSelect: "none" }}>
              bettina@portfolio — ~ — 120×40
            </div>

            {/* home + clock */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => router.push("/")}
                style={{
                  fontSize: 11, color: "#3d1a28",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3d1a28")}
              >
                ← home
              </button>
              <span style={{ fontSize: 12, color: "#553344" }}>{time}</span>
            </div>
          </div>
        </div>

        {/* ── terminal body ──────────────────────────────────── */}
        <div style={{ padding: "40px 48px 80px" }}>

          {/* whoami -------------------------------------------- */}
          <Block delay={0.1}>
            <Prompt command="whoami" />
            <div
              style={{
                margin: "20px 0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 32,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    color: "#ff2d55",
                    lineHeight: 0.88,
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(3.5rem, 10vw, 7rem)",
                    marginBottom: 16,
                  }}
                >
                  Bettina<br />George
                </h1>
                <p style={{ color: "#c4a882", fontSize: 14, marginBottom: 10 }}>
                  Software Engineer · AI Engineer
                </p>
                <p style={{ color: "#553344", fontSize: 13, fontStyle: "italic", lineHeight: 1.6 }}>
                  &quot;Some people build with code. Others build with creativity.<br />&nbsp;I like to think I do both.&quot;
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <Image
                  src="/img/headshot.png"
                  alt="Bettina George"
                  width={150}
                  height={150}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    border: "2px solid #ff2d55",
                    boxShadow: "0 0 0 6px rgba(255,45,85,0.1), 0 0 40px rgba(255,45,85,0.2)",
                    filter: "grayscale(20%)",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </Block>

          {/* printenv ------------------------------------------ */}
          <Block>
            <Prompt command="printenv" />
            <div style={{ marginTop: 12 }}>
              {printenvData.map(({ key, value }) => (
                <div
                  key={key}
                  style={{ display: "flex", gap: 0, fontSize: 13, lineHeight: 1.8 }}
                >
                  <span style={{ color: "#553344", minWidth: 120 }}>{key}</span>
                  <span style={{ color: "#555577" }}>&nbsp;=&nbsp;</span>
                  <span style={{ color: "#ff2d55" }}>{value}</span>
                </div>
              ))}
            </div>
          </Block>

          {/* ls projects/ -------------------------------------- */}
          <Block>
            <Prompt command="ls projects/" />
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
                  style={{ color: "#ff2d55", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  📁 {p.name}
                </a>
              ))}
            </div>
            <a
              href="/tech/projects"
              style={{ color: "#553344", fontSize: 12, fontStyle: "italic", marginTop: 12, display: "inline-block", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#553344")}
            >
              // click link to view details →
            </a>
          </Block>

          {/* git log --career ---------------------------------- */}
          <Block>
            <Prompt command="git log --career --oneline" />
            <div style={{ marginTop: 12 }}>
              {commits.map((c) => (
                <a
                  key={c.hash}
                  href="/tech/experience"
                  style={{ display: "flex", gap: 16, fontSize: 13, lineHeight: 1.8, flexWrap: "wrap", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <span style={{ color: "#ff6b35", flexShrink: 0 }}>{c.hash}</span>
                  <span style={{ color: "#f0e6d3", flex: 1 }}>{c.msg}</span>
                  <span style={{ color: "#3d1a28", flexShrink: 0 }}>{c.period}</span>
                </a>
              ))}
            </div>
            <a
              href="/tech/experience"
              style={{ color: "#553344", fontSize: 12, fontStyle: "italic", marginTop: 12, display: "inline-block", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#553344")}
            >
              // click to view full experience →
            </a>
          </Block>

          {/* cat contact.txt ----------------------------------- */}
          <Block>
            <Prompt command="cat contact.txt" />
            <div style={{ marginTop: 12 }}>
              {contactData.map(({ key, value, href }) => (
                <div
                  key={key}
                  style={{ display: "flex", fontSize: 13, lineHeight: 1.8 }}
                >
                  <span style={{ color: "#553344", minWidth: 90 }}>{key}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      style={{ color: "#f0e6d3", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#f0e6d3")}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: "#f0e6d3" }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </Block>

          {/* blinking cursor ----------------------------------- */}
          <Block>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
              <span style={{ color: "#ff2d55", fontWeight: 700 }}>bettina@portfolio</span>
              <span style={{ color: "#553344" }}>:~ $</span>
              <span className="cursor-blink" style={{ color: "#ff2d55", marginLeft: 4 }}>█</span>
            </div>
          </Block>

        </div>
      </div>
    </div>
  );
}
