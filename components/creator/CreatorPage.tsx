"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

/* ─── palette ─────────────────────────────────────────────────────────── */
const C = {
  bg:       "#0d0407",
  bgMid:    "#120508",
  bgCard:   "rgba(28, 6, 12, 0.72)",
  wine:     "#8b1a2e",
  crimson:  "#c0344f",
  gold:     "#c4923e",
  cream:    "#f0e6d3",
  blush:    "#c4a0a8",
  muted:    "#6b3040",
  dimmed:   "#3a1420",
  border:   "rgba(192,52,79,0.18)",
  borderDim:"rgba(192,52,79,0.09)",
};

const PLAYFAIR = "var(--font-playfair), 'Playfair Display', Georgia, serif";
const SCRIPT   = "var(--font-luxurious-script), cursive";
const SANS     = "var(--font-inter), system-ui, sans-serif";

/* ─── work grid placeholder cards ─────────────────────────────────────── */
const WORK_CARDS = [
  { id: "01", category: "Reels",     size: "tall",   label: "Short-form content" },
  { id: "02", category: "Editorial", size: "square",  label: "Visual storytelling" },
  { id: "03", category: "Branding",  size: "square",  label: "Brand identity" },
  { id: "04", category: "Reels",     size: "tall",   label: "Content strategy" },
  { id: "05", category: "Strategy",  size: "wide",   label: "Campaign direction" },
  { id: "06", category: "Editorial", size: "square",  label: "Art direction" },
  { id: "07", category: "Branding",  size: "tall",   label: "Visual identity" },
  { id: "08", category: "Reels",     size: "square",  label: "Creative direction" },
];

/* ─── creative projects ────────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: "01",
    name: "AI Creator Content Intelligence",
    tag: "AI · Full-Stack",
    description:
      "Full-stack platform analyzing Instagram Reel performance to guide content strategy. Anthropic Claude powering hooks, briefs, trend scouting, and strategy insights via live analytics context.",
    link: "https://github.com/BettinaGeorge/creator-dashboard",
    linkLabel: "github →",
  },
  {
    num: "02",
    name: "Duolingo Watch Feature",
    tag: "Product Design · APM",
    description:
      "Designed a media-based language learning feature with bilingual subtitles, vocabulary pinning, and interactive annotations. High-fidelity Figma mockups with a mock A/B testing plan.",
    link: "https://vimeo.com/1041582266",
    linkLabel: "demo →",
  },
  {
    num: "03",
    name: "Diaspora Duo",
    tag: "AI · Community · DEI",
    description:
      "AI-driven app supporting immigrant transitions with personalized recommendations via LLM-powered Flask APIs. Led product ideation and UI/UX. Awarded Best DEI Hack by Fidelity and Best Use of AI by Infosys among 70+ teams.",
    link: "https://devpost.com/software/diaspora-duo",
    linkLabel: "devpost →",
  },
];

/* ─── helpers ──────────────────────────────────────────────────────────── */
function Ornament() {
  return <span style={{ color: C.crimson, opacity: 0.6, userSelect: "none" }}>✦</span>;
}

function Rule() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
        margin: "0 auto",
      }}
    />
  );
}

function WorkCard({ card, index }: { card: typeof WORK_CARDS[0]; index: number }) {
  const aspectMap = { tall: "3/4", square: "1/1", wide: "4/3" };
  const aspect = aspectMap[card.size as keyof typeof aspectMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover="hover"
      style={{
        aspectRatio: aspect,
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        background: `linear-gradient(135deg, #1a0509 0%, #0d0308 60%, #1f0a12 100%)`,
        border: `1px solid ${C.borderDim}`,
        gridRow: card.size === "tall" ? "span 2" : "span 1",
        gridColumn: card.size === "wide" ? "span 2" : "span 1",
      }}
    >
      {/* subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* category tag */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.crimson,
          padding: "3px 8px",
          border: `1px solid ${C.border}`,
          background: "rgba(13,4,7,0.7)",
          borderRadius: 2,
        }}
      >
        {card.category}
      </div>

      {/* number */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          fontSize: 10,
          color: C.dimmed,
          fontFamily: SANS,
        }}
      >
        {card.id}
      </div>

      {/* hover overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(139,26,46,0.25)",
          backdropFilter: "blur(2px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: C.cream,
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            letterSpacing: "0.06em",
          }}
        >
          {card.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.5 }}
      whileHover={{ y: -4 }}
      style={{
        background: C.bgCard,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "28px 28px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.crimson}88, transparent)`,
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: C.dimmed, fontFamily: SANS }}>{project.num}</span>
        <span
          style={{
            fontSize: 9,
            color: C.crimson,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: `1px solid ${C.border}`,
            padding: "2px 8px",
            borderRadius: 2,
          }}
        >
          {project.tag}
        </span>
      </div>

      <h3
        style={{
          fontFamily: PLAYFAIR,
          fontSize: 18,
          fontWeight: 700,
          color: C.cream,
          lineHeight: 1.3,
          marginBottom: 12,
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          fontFamily: SANS,
          fontSize: 13,
          color: C.blush,
          lineHeight: 1.75,
          marginBottom: 20,
        }}
      >
        {project.description}
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener"
        style={{
          fontSize: 12,
          color: C.muted,
          fontFamily: SANS,
          textDecoration: "none",
          letterSpacing: "0.08em",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = C.crimson)}
        onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
      >
        {project.linkLabel}
      </a>
    </motion.div>
  );
}

/* ─── main page ────────────────────────────────────────────────────────── */
export function CreatorPage() {
  const router = useRouter();

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: SANS,
        color: C.cream,
        overflowX: "hidden",
      }}
    >
      {/* ── sticky nav ─────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 52,
          background: "rgba(13,4,7,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.borderDim}`,
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            fontSize: 11,
            color: C.muted,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: SANS,
            letterSpacing: "0.1em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          ← home
        </button>

        <span
          style={{
            fontFamily: SCRIPT,
            fontSize: 20,
            color: C.cream,
            opacity: 0.7,
            userSelect: "none",
          }}
        >
          Bettina George
        </span>

        <button
          onClick={() => router.push("/tech")}
          style={{
            fontSize: 11,
            color: C.muted,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2d55")}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          ⚡ tech mode
        </button>
      </nav>

      {/* ── hero ───────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 40px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,26,46,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,146,62,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
        >
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 24,
              fontFamily: SANS,
            }}
          >
            <Ornament /> &nbsp; creator mode &nbsp; <Ornament />
          </motion.p>

          {/* name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: SCRIPT,
              fontSize: "clamp(4rem, 13vw, 10rem)",
              color: C.cream,
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            Bettina George
          </motion.h1>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: C.blush,
              letterSpacing: "0.04em",
              marginBottom: 16,
            }}
          >
            content creator &nbsp;·&nbsp; visual storyteller &nbsp;·&nbsp; creative strategist
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              fontFamily: SANS,
              fontSize: 12,
              color: C.muted,
              letterSpacing: "0.1em",
            }}
          >
            who builds her own tools to work smarter
          </motion.p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.2em", color: C.dimmed }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ color: C.dimmed, fontSize: 14 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      <Rule />

      {/* ── about ──────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}
        >
          {/* photo */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                position: "relative",
                width: 220,
                height: 260,
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                boxShadow: `0 0 60px rgba(139,26,46,0.2)`,
              }}
            >
              <Image
                src="/img/headshot.png"
                alt="Bettina George"
                fill
                style={{ objectFit: "cover", objectPosition: "center top", filter: "saturate(0.85) contrast(1.05)" }}
              />
              {/* wine tint overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(139,26,46,0.1)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            {/* small ornament below */}
            <p style={{ textAlign: "center", marginTop: 12, color: C.dimmed, fontSize: 16 }}>✦</p>
          </div>

          {/* copy */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: C.crimson,
                marginBottom: 20,
                fontFamily: SANS,
              }}
            >
              about
            </p>
            <h2
              style={{
                fontFamily: PLAYFAIR,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: C.cream,
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              I don&apos;t just
              <br />
              <span style={{ fontStyle: "italic", color: C.blush }}>tell stories —</span>
              <br />I build them.
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 14,
                color: C.blush,
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              I&apos;m Bettina — a software engineer and creative who lives at the intersection
              of content, strategy, and technology. I create with intention: every caption,
              reel, and visual is crafted to connect, not just to post.
            </p>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 14,
                color: C.blush,
                lineHeight: 1.85,
                marginBottom: 24,
              }}
            >
              What makes my approach different? I build my own tools — AI-powered platforms
              that analyze what&apos;s working, surface patterns, and turn data into creative
              strategy. Aesthetic meets analytical.
            </p>
            <p
              style={{
                fontFamily: PLAYFAIR,
                fontStyle: "italic",
                fontSize: 15,
                color: C.muted,
                lineHeight: 1.6,
                borderLeft: `2px solid ${C.wine}`,
                paddingLeft: 16,
              }}
            >
              &ldquo;Some people build with code. Others build with creativity.
              <br />I like to think I do both.&rdquo;
            </p>
          </div>
        </motion.div>
      </section>

      <Rule />

      {/* ── work grid ──────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "100px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 16,
              fontFamily: SANS,
            }}
          >
            <Ornament /> &nbsp; creative work &nbsp; <Ornament />
          </p>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: C.cream,
              lineHeight: 1.1,
            }}
          >
            The Work
          </h2>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 13,
              color: C.muted,
              marginTop: 12,
              fontStyle: "italic",
            }}
          >
            content dropping soon — check back
          </p>
        </motion.div>

        {/* bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "140px",
            gap: 8,
          }}
        >
          {WORK_CARDS.map((card, i) => (
            <WorkCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      <Rule />

      {/* ── creative projects ───────────────────────────────────────────── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 16,
              fontFamily: SANS,
            }}
          >
            <Ornament /> &nbsp; selected projects
          </p>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: C.cream,
              lineHeight: 1.1,
            }}
          >
            Built with{" "}
            <span style={{ fontStyle: "italic", color: C.blush }}>purpose</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </section>

      <Rule />

      {/* ── connect ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px 120px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 24,
              fontFamily: SANS,
            }}
          >
            <Ornament /> &nbsp; contact
          </p>
          <h2
            style={{
              fontFamily: SCRIPT,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: C.cream,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Let&apos;s make something.
          </h2>
          <p
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontSize: 16,
              color: C.muted,
              marginBottom: 48,
            }}
          >
            Open to creative collaborations, brand partnerships, and conversations.
          </p>

          {/* links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            {[
              { label: "email",    href: "mailto:gobetti@unc.edu" },
              { label: "linkedin", href: "https://www.linkedin.com/in/bettina-george/" },
              { label: "github",   href: "https://github.com/BettinaGeorge" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.muted,
                  textDecoration: "none",
                  fontFamily: SANS,
                  transition: "color 0.25s",
                  paddingBottom: 4,
                  borderBottom: `1px solid ${C.borderDim}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* footer note */}
          <p style={{ fontSize: 10, color: C.dimmed, letterSpacing: "0.15em", fontFamily: SANS }}>
            <Ornament /> &nbsp; Bettina George · Chapel Hill, NC · 2026 &nbsp; <Ornament />
          </p>
        </motion.div>
      </section>
    </div>
  );
}
