"use client";

import { useState, useEffect, useRef, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { C, PLAYFAIR, SCRIPT, SANS, IG_ACCENT, TT_ACCENT } from "@/lib/creator-theme";

/* ─── real reels, pulled from creator's own spreadsheet ───────────────── */
const REELS = [
  { url: "https://www.instagram.com/reel/DMGH-c7OuZG/", niche: "Travel", cover: "/img/reels/DMGH-c7OuZG.jpg" },
  { url: "https://www.instagram.com/reel/DL2lSqsOB59/", niche: "Travel · Lifestyle", cover: "/img/reels/DL2lSqsOB59.jpg" },
  { url: "https://www.instagram.com/reel/DL-YhgcMXlE/", niche: "Travel · Lifestyle · Events", cover: "/img/reels/DL-YhgcMXlE.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DNyK94EWt2r/", niche: "Beauty GRWM", cover: "/img/reels/DNyK94EWt2r.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DOJr9_zkqbb/", niche: "Beauty GRWM", cover: "/img/reels/DOJr9_zkqbb.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DPUVubrDr15/", niche: "Lifestyle", cover: "/img/reels/DPUVubrDr15.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DPHG25jDXMb/", niche: "Fashion", cover: "/img/reels/DPHG25jDXMb.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DPPMKe1jtSu/", niche: "Fitness", cover: "/img/reels/DPPMKe1jtSu.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DSIreFqkrIc/", niche: "Fitness", cover: "/img/reels/DSIreFqkrIc.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DRsnhB0EgEg/", niche: "Fashion", cover: "/img/reels/DRsnhB0EgEg.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DRu78o4EpvU/", niche: "Makeup Transitions", cover: "/img/reels/DRu78o4EpvU.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DSgHntJgskw/", niche: "Beauty GRWM", cover: "/img/reels/DSgHntJgskw.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DS00bWGgnoc/", niche: "Fitness", cover: "/img/reels/DS00bWGgnoc.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DTB0220gpa2/", niche: "Beauty · Storytelling", cover: "/img/reels/DTB0220gpa2.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DTVwV6KDvF0/", niche: "Fitness", cover: "/img/reels/DTVwV6KDvF0.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DTYnud0ElPO/", niche: "Travel", cover: "/img/reels/DTYnud0ElPO.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DTQiWDDjquC/", niche: "Travel", cover: "/img/reels/DTQiWDDjquC.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DTyRiWpEjWU/", niche: "Beauty", cover: "/img/reels/DTyRiWpEjWU.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DU1Y-DgkpwS/", niche: "Beauty", cover: "/img/reels/DU1Y-DgkpwS.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DV6iCUAjjoS/", niche: "Beauty", cover: "/img/reels/DV6iCUAjjoS.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DV88CjKjbT9/", niche: "Travel", cover: "/img/reels/DV88CjKjbT9.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DWW-IS2jAXp/", niche: "Beauty · Hair", cover: "/img/reels/DWW-IS2jAXp.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DWzVf8XjJNG/", niche: "Beauty · Hair", cover: "/img/reels/DWzVf8XjJNG.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DW4o52_kiG7/", niche: "Beauty GRWM", cover: "/img/reels/DW4o52_kiG7.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DW-ImyoDdMy/", niche: "Storytelling", cover: "/img/reels/DW-ImyoDdMy.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DXQCaYRjSz3/", niche: "Beauty L'Oréal", cover: "/img/reels/DXQCaYRjSz3.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DXXw8pEjX8n/", niche: "Beauty Storytelling", cover: "/img/reels/DXXw8pEjX8n.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DXhldJYDLfJ/", niche: "Fitness", cover: "/img/reels/DXhldJYDLfJ.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DawKcNKtiez/", niche: "Fitness", cover: "/img/reels/DawKcNKtiez.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DbtHUZtsILs/", niche: "Fitness", cover: "/img/reels/DbtHUZtsILs.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DbyPePcsc7-/", niche: "Fitness", cover: "/img/reels/DbyPePcsc7-.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DcWQNQlsybp/", niche: "Fitness", cover: "/img/reels/DcWQNQlsybp.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/Db05rhOsntd/", niche: "Storytelling", cover: "/img/reels/Db05rhOsntd.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DcCeQ4kMwXW/", niche: "Lifestyle", cover: "/img/reels/DcCeQ4kMwXW.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DHRLnmcuWQo/", niche: "Travel", cover: "/img/reels/DHRLnmcuWQo.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DHrIbalyhBR/", niche: "Storytelling", cover: "/img/reels/DHrIbalyhBR.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/Dc95OAmSmyo/", niche: "Travel", cover: "/img/reels/Dc95OAmSmyo.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DdCF3YtSX3f/", niche: "Travel", cover: "/img/reels/DdCF3YtSX3f.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DdLy6FdSzpy/", niche: "Beauty", cover: "/img/reels/DdLy6FdSzpy.jpg" },
  { url: "https://www.instagram.com/_be.t.tina_/reel/DdDBU3My70j/", niche: "Fitness", cover: "/img/reels/DdDBU3My70j.jpg" },
];

const REELS_PAGE_SIZE = 10;

/* ─── work grid placeholder cards ─────────────────────────────────────── */
/* ─── media kit — pulled from Instagram & TikTok analytics dashboards ────── */
const INSTAGRAM_STATS = [
  { label: "Views", value: "3.3M" },
  { label: "Interactions", value: "392K" },
  { label: "Accounts Engaged", value: "301K" },
  { label: "Followers", value: "1,641" },
  { label: "Profile Visits", value: "7,101" },
];

const TIKTOK_STATS = [
  { label: "Video Views", value: "1M" },
  { label: "Likes", value: "178.5K" },
  { label: "Profile Views", value: "13.3K" },
  { label: "Comments", value: "3.3K" },
  { label: "Shares", value: "4.8K" },
];

const INSTAGRAM_RINGS = [
  { label: "Reach Beyond Followers", percent: 91.7 },
  { label: "Engagement Beyond Followers", percent: 86.7 },
];

const TIKTOK_RINGS = [
  { label: "For You Page Traffic", percent: 63.2 },
  { label: "Search Discovery", percent: 28.5 },
];

const IG_DEMOGRAPHIC_RINGS = [
  { label: "Women Followers", percent: 68.1 },
  { label: "Aged 18–24", percent: 62.4 },
  { label: "Based in US", percent: 61.7 },
];

const TIKTOK_DEMOGRAPHIC_RINGS = [
  { label: "Female Followers", percent: 61 },
  { label: "Aged 18–24", percent: 64.1 },
  { label: "Based in US", percent: 40.2 },
];

const COLLABORATIONS = [
  { name: "Armani", src: "/img/collabs/armani.svg" },
  { name: "Michael Kors", src: "/img/collabs/michael-kors.svg" },
  { name: "Neutrogena", src: "/img/collabs/neutrogena.svg" },
  { name: "Anua", src: "/img/collabs/anua.png" },
  { name: "Thayers", src: "/img/collabs/thayers.jpg" },
  { name: "Seoul 1988", src: "/img/collabs/seoul-1988.png" },
  { name: "Good Molecules", src: "/img/collabs/good-molecules.png" },
  { name: "L'Oréal", src: "/img/collabs/loreal.svg" },
  { name: "Walmart", src: "/img/collabs/walmart.svg" },
  { name: "Ulta Beauty", src: "/img/collabs/ulta.svg" },
];

/* ─── rates ────────────────────────────────────────────────────────────── */
const RATES = [
  { label: "Instagram Reel", price: "350" },
  { label: "TikTok Video", price: "250" },
  { label: "Story Set", detail: "3 frames", price: "150" },
  { label: "Static IG Post", price: "200" },
  { label: "UGC Only", detail: "organic use + 3mo paid ads", price: "300" },
];

const BUNDLE = {
  label: "Content Package",
  detail: "1 Reel · 1 TikTok · 3-frame Story Set",
  price: "650",
  compareAt: "750",
};

/* ─── testimonials — curated from brand & audience DMs/emails ─────────── */
const TESTIMONIALS = [
  {
    quote:
      "Thank you so much again for all the effort and creativity you put into your campaign content! Glad to see your video is doing so well and getting people talking about Michael Kors.",
    source: "Michael Kors Campaign Team",
  },
  {
    quote:
      "Thank you so much for your patience whilst I've been OOO, and for sending your content through — it looks beautiful! Your content for the Michael Kors Pour Femme “Make Your Entrance” Campaign is now officially approved, and you're all set to go live.",
    source: "Michael Kors Pour Femme Campaign",
  },
  {
    quote:
      "We're excited to invite you to be part of the Michael Kors Pour Femme “Make Your Entrance” Campaign. We've been loving your content and would be thrilled to have you showcase the Michael Kors fragrance collection in your own authentic style.",
    source: "Michael Kors Brand Team",
  },
  {
    quote:
      "Obviously, a partner agency for Vaseline®. We love your style and would be thrilled to invite you to an exclusive gifted campaign!",
    source: "Vaseline Partner Agency",
  },
  {
    quote:
      "I'm so happy you were accepted, I peeked around and let me just say I LOVE your content! I'm really excited to work with you and I hope you feel the same!",
    source: "Campaign Manager",
  },
  {
    quote: "we love your content bettina!!!!",
    source: "Instagram DM",
  },
  {
    quote: "Naw we need more Nigerian influencers making good content!",
    source: "@sprite_aholic, Instagram",
  },
  {
    quote: "you make peak contents!",
    source: "Instagram DM",
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

/* ─── contact icons ────────────────────────────────────────────────────── */
type IconProps = { size?: number };

function MailIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function InstagramIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.4a3.4 3.4 0 1 1-2.6-3.3" />
      <path d="M14 4c.5 2.7 2.4 4.4 4.7 4.6" />
    </svg>
  );
}

function YouTubeIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.3 9.2l4.4 2.8-4.4 2.8V9.2z" />
    </svg>
  );
}

function AudienceIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M14.8 19c.2-2.2 1.7-3.7 3.4-3.7 1.9 0 3.4 1.6 3.6 3.9" />
    </svg>
  );
}

function ReceiptIcon({ size = 22 }: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 21V3z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

const CONTACT_LINKS: { label: string; href: string; Icon: (props: IconProps) => ReactElement }[] = [
  { label: "Email", href: "mailto:bettinaturegeorge@gmail.com", Icon: MailIcon },
  { label: "Instagram", href: "https://www.instagram.com/_be.t.tina_/", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@.bettina__/", Icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@itsbettinageorge", Icon: YouTubeIcon },
];

function IconLink({ label, href, Icon }: { label: string; href: string; Icon: (props: IconProps) => ReactElement }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener"
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: `1px solid ${C.border}`,
        color: C.blush,
        transition: "color 0.2s, border-color 0.2s, background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = C.cream;
        e.currentTarget.style.borderColor = C.crimson;
        e.currentTarget.style.backgroundColor = "rgba(192,52,79,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = C.blush;
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <Icon size={20} />
    </a>
  );
}

/* ─── animated count-up stat value ────────────────────────────────────── */
type ParsedStat = { value: number; decimals: number; suffix: string; useCommas: boolean };

function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.trim().match(/^([\d,]+(?:\.\d+)?)\s*([A-Za-z%]*)$/);
  if (!match) return null;
  const numStr = match[1].replace(/,/g, "");
  const value = parseFloat(numStr);
  if (Number.isNaN(value)) return null;
  const decimalMatch = numStr.match(/\.(\d+)$/);
  const suffix = match[2] || "";
  return {
    value,
    decimals: decimalMatch ? decimalMatch[1].length : 0,
    suffix,
    useCommas: !suffix && value >= 1000,
  };
}

function formatStatValue(current: number, parsed: ParsedStat): string {
  if (parsed.useCommas) return Math.round(current).toLocaleString("en-US");
  return `${current.toFixed(parsed.decimals)}${parsed.suffix}`;
}

function AnimatedStatValue({ value, delay = 0, color }: { value: string; delay?: number; color: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() => {
    const p = parseStatValue(value);
    return p ? formatStatValue(0, p) : value;
  });

  useEffect(() => {
    if (!inView) return;
    const parsed = parseStatValue(value);
    if (!parsed) return;
    const controls = animate(0, parsed.value, {
      duration: 1.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatStatValue(latest, parsed)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: PLAYFAIR,
        fontWeight: 700,
        fontSize: 28,
        color: C.cream,
        marginBottom: 6,
        letterSpacing: "-0.01em",
        textShadow: `0 0 22px ${color}55`,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {display}
    </p>
  );
}

function StatCard({ label, value, delay = 0, accent = C.crimson }: { label: string; value: string; delay?: number; accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.045 }}
      style={{
        position: "relative",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "24px 14px 20px",
        textAlign: "center",
        background: C.bgCard,
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 8px 28px -6px ${accent}4d`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* accent top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent, opacity: 0.7 }} />

      <AnimatedStatValue value={value} delay={delay + 0.1} color={accent} />

      <p
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.muted,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function RingStat({
  label,
  percent,
  accent,
  delay = 0,
}: {
  label: string;
  percent: number;
  accent: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const size = 104;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, percent, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, percent, delay]);

  const offset = circumference * (1 - display / 100);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display: "block" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={C.borderDim} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: PLAYFAIR,
            fontWeight: 700,
            fontSize: 21,
            color: C.cream,
          }}
        >
          {Math.round(display)}%
        </div>
      </div>
      <p
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: C.blush,
          textAlign: "center",
          maxWidth: 130,
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function PlatformPanel({
  label,
  period,
  Icon,
  rings,
  stats = [],
  accent,
}: {
  label: string;
  period?: string;
  Icon: (props: IconProps) => ReactElement;
  rings: { label: string; percent: number }[];
  stats?: { label: string; value: string }[];
  accent: string;
}) {
  return (
    <div
      style={{
        border: `1px solid ${accent}33`,
        borderRadius: 14,
        padding: "28px 24px 26px",
        background: `linear-gradient(180deg, ${accent}12 0%, transparent 45%), ${C.bgCard}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: period ? 4 : 26 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `1px solid ${accent}66`,
            background: `${accent}1a`,
            color: accent,
          }}
        >
          <Icon size={16} />
        </span>
        <p
          style={{
            fontFamily: SANS,
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.cream,
          }}
        >
          {label}
        </p>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
          }}
        />
      </div>

      {period && (
        <p
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.08em",
            color: C.muted,
            marginBottom: 26,
            paddingLeft: 42,
          }}
        >
          {period}
        </p>
      )}

      {/* percentage rings */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 28,
          flexWrap: "wrap",
          marginBottom: stats.length > 0 ? 26 : 0,
        }}
      >
        {rings.map((r, i) => (
          <RingStat key={r.label} label={r.label} percent={r.percent} accent={accent} delay={i * 0.15} />
        ))}
      </div>

      {stats.length > 0 && (
        <>
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`,
              marginBottom: 26,
            }}
          />

          {/* raw totals */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: 12,
            }}
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} label={s.label} value={s.value} delay={i * 0.08} accent={accent} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LogoCircle({ name, src, index }: { name: string; src: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
    >
      <div
        style={{
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: C.cream,
          border: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 18,
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = C.crimson;
          e.currentTarget.style.boxShadow = `0 8px 24px -6px rgba(192,52,79,0.4)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image src={src} alt={name} fill sizes="72px" style={{ objectFit: "contain" }} />
        </div>
      </div>
      <span
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.06em",
          color: C.muted,
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function CollaborationsWall() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(108px, 1fr))",
        gap: 24,
        justifyItems: "center",
      }}
    >
      {COLLABORATIONS.map((brand, i) => (
        <LogoCircle key={brand.name} name={brand.name} src={brand.src} index={i} />
      ))}
    </div>
  );
}

function RateCard({
  label,
  detail,
  price,
  index,
}: {
  label: string;
  detail?: string;
  price: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "22px 20px",
        background: C.bgCard,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.crimson;
        e.currentTarget.style.boxShadow = `0 8px 24px -10px rgba(192,52,79,0.35)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div>
        <p style={{ fontFamily: PLAYFAIR, fontSize: 16, color: C.cream, marginBottom: detail ? 4 : 0 }}>{label}</p>
        {detail && (
          <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, fontStyle: "italic" }}>{detail}</p>
        )}
      </div>
      <p style={{ fontFamily: PLAYFAIR, fontSize: 20, color: C.crimson, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 12, color: C.muted, marginRight: 2 }}>from</span> ${price}
      </p>
    </motion.div>
  );
}

function BundleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        border: `1px solid ${C.crimson}`,
        borderRadius: 10,
        padding: "28px 24px",
        background: `linear-gradient(180deg, rgba(192,52,79,0.14) 0%, transparent 55%), ${C.bgCard}`,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          fontSize: 9,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.crimson,
          border: `1px solid ${C.crimson}66`,
          borderRadius: 3,
          padding: "3px 8px",
        }}
      >
        Bundle
      </span>
      <p style={{ fontFamily: PLAYFAIR, fontSize: 22, color: C.cream, marginBottom: 8 }}>{BUNDLE.label}</p>
      <p style={{ fontFamily: SANS, fontSize: 12, color: C.blush, marginBottom: 20 }}>{BUNDLE.detail}</p>
      <p style={{ fontFamily: PLAYFAIR, fontSize: 30, color: C.crimson }}>
        <span style={{ fontSize: 13, color: C.muted, marginRight: 2 }}>from</span> ${BUNDLE.price}
        <span
          style={{
            fontSize: 15,
            color: C.dimmed,
            textDecoration: "line-through",
            marginLeft: 10,
          }}
        >
          ${BUNDLE.compareAt}
        </span>
      </p>
    </motion.div>
  );
}

function TestimonialCard({ quote, source, index }: { quote: string; source: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "26px 24px 22px",
        background: C.bgCard,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
      }}
    >
      <span style={{ fontFamily: PLAYFAIR, fontSize: 34, color: C.crimson, opacity: 0.5, lineHeight: 0.5 }}>
        “
      </span>
      <p
        style={{
          fontFamily: PLAYFAIR,
          fontStyle: "italic",
          fontSize: 14,
          color: C.blush,
          lineHeight: 1.75,
          flex: 1,
        }}
      >
        {quote}
      </p>
      <p
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.muted,
        }}
      >
        — {source}
      </p>
    </motion.div>
  );
}

function ArrowIcon({ direction = "right", size = 16 }: { direction?: "left" | "right"; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function InstagramEmbed({ url }: { url: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 8,
        margin: 0,
        width: "100%",
        minWidth: 0,
      }}
    />
  );
}

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

type Reel = { url: string; niche: string; cover: string };

function ReelTile({ reel, index, onOpen }: { reel: Reel; index: number; onOpen: (r: Reel) => void }) {
  return (
    <motion.button
      onClick={() => onOpen(reel)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % REELS_PAGE_SIZE) * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      style={{
        position: "relative",
        aspectRatio: "2/3",
        borderRadius: 6,
        overflow: "hidden",
        border: `1px solid ${C.borderDim}`,
        padding: 0,
        cursor: "pointer",
        display: "block",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.crimson)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.borderDim)}
    >
      <Image
        src={reel.cover}
        alt={reel.niche}
        fill
        sizes="140px"
        style={{ objectFit: "cover" }}
      />

      {/* bottom gradient for label legibility */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <span
        style={{
          position: "absolute",
          bottom: 6,
          left: 6,
          right: 6,
          fontSize: 8,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: C.cream,
          lineHeight: 1.3,
        }}
      >
        {reel.niche}
      </span>

      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "rgba(13,4,7,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <PlayIcon size={16} />
      </span>
    </motion.button>
  );
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

function ReelLightbox({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  useEffect(() => {
    const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
    w.instgrm?.Embeds.process();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(6,2,4,0.92)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 40px",
        cursor: "zoom-out",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1001,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${C.border}`,
          background: "rgba(13,4,7,0.85)",
          color: C.cream,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxWidth: 420, width: "100%" }}
      >
        <a
          href={reel.url}
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 999,
            border: `1px solid ${IG_ACCENT}66`,
            background: `${IG_ACCENT}1a`,
            color: C.cream,
            fontFamily: SANS,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Watch on Instagram <ExternalLinkIcon />
        </a>
        <div
          style={{
            width: "100%",
            maxHeight: "70vh",
            overflowY: "auto",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: "#fff",
          }}
        >
          <InstagramEmbed url={reel.url} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReelsGrid() {
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<Reel | null>(null);
  const totalPages = Math.ceil(REELS.length / REELS_PAGE_SIZE);
  const start = page * REELS_PAGE_SIZE;
  const current = REELS.slice(start, start + REELS_PAGE_SIZE);

  return (
    <div>
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 10,
        }}
      >
        {current.map((reel, i) => (
          <ReelTile key={reel.url} reel={reel} index={i} onOpen={setExpanded} />
        ))}
      </div>

      {/* pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32 }}>
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: "none",
            color: page === 0 ? C.dimmed : C.cream,
            cursor: page === 0 ? "default" : "pointer",
            opacity: page === 0 ? 0.4 : 1,
            transition: "opacity 0.2s, border-color 0.2s",
          }}
        >
          <ArrowIcon direction="left" />
        </button>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em", color: C.muted }}>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          aria-label="Next"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: "none",
            color: page === totalPages - 1 ? C.dimmed : C.cream,
            cursor: page === totalPages - 1 ? "default" : "pointer",
            opacity: page === totalPages - 1 ? 0.4 : 1,
            transition: "opacity 0.2s, border-color 0.2s",
          }}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <AnimatePresence>
        {expanded && <ReelLightbox reel={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </div>
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
                src="/img/creator-headshot.jpg"
                alt="Bettina George"
                fill
                sizes="220px"
                style={{ objectFit: "cover", objectPosition: "50% 40%", filter: "saturate(0.85) contrast(1.05)" }}
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
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: PLAYFAIR,
            fontStyle: "italic",
            fontSize: 13,
            color: C.blush,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Short-form storytelling — hooks, edits, and pacing built to stop the scroll.
        </motion.p>

        <ReelsGrid />
      </section>

      <Rule />

      {/* ── testimonials ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
            <Ornament /> &nbsp; in their words &nbsp; <Ornament />
          </p>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: C.cream,
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            Testimonials
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            textAlign: "left",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} source={t.source} index={i} />
          ))}
        </div>
      </section>

      <Rule />

      {/* ── media kit ──────────────────────────────────────────────────── */}
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
            <Ornament /> &nbsp; media kit &nbsp; <Ornament />
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
            Performance Highlights
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
            self-reported, pulled from platform analytics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
            marginBottom: 64,
          }}
        >
          <PlatformPanel label="Instagram" period="Last 90 days" Icon={InstagramIcon} rings={INSTAGRAM_RINGS} stats={INSTAGRAM_STATS} accent={IG_ACCENT} />
          <PlatformPanel label="TikTok" period="Last 365 days" Icon={TikTokIcon} rings={TIKTOK_RINGS} stats={TIKTOK_STATS} accent={TT_ACCENT} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
            marginBottom: 64,
          }}
        >
          <PlatformPanel label="Instagram Audience" Icon={AudienceIcon} rings={IG_DEMOGRAPHIC_RINGS} accent={IG_ACCENT} />
          <PlatformPanel label="TikTok Audience" Icon={AudienceIcon} rings={TIKTOK_DEMOGRAPHIC_RINGS} accent={TT_ACCENT} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ textAlign: "center" }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 28,
              fontFamily: SANS,
            }}
          >
            previous collaborations
          </p>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <CollaborationsWall />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: 56 }}
        >
          <button
            onClick={() => router.push("/creator/receipts")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 30px",
              borderRadius: 999,
              border: `1px solid ${C.border}`,
              background: `linear-gradient(90deg, ${IG_ACCENT}1f, ${TT_ACCENT}1f)`,
              color: C.cream,
              fontFamily: SANS,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 12px 32px -10px ${IG_ACCENT}66`;
              e.currentTarget.style.borderColor = IG_ACCENT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = C.border;
            }}
          >
            <ReceiptIcon size={16} />
            See the Receipts
          </button>
          <p
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontSize: 11,
              color: C.dimmed,
              marginTop: 14,
            }}
          >
            real screenshots, straight from the dashboards — nothing here is made up
          </p>
        </motion.div>
      </section>

      <Rule />

      {/* ── rates ──────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "100px 40px" }}>
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
            <Ornament /> &nbsp; work with me &nbsp; <Ornament />
          </p>
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: C.cream,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Rates
          </h2>
          <p
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontSize: 13,
              color: C.blush,
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            A small following with reach that punches well above it — 91.7% of my views come
            from outside my own followers.
          </p>
        </motion.div>

        <div style={{ marginBottom: 20 }}>
          <BundleCard />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {RATES.map((r, i) => (
            <RateCard key={r.label} label={r.label} detail={"detail" in r ? r.detail : undefined} price={r.price} index={i} />
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: "18px 20px",
            border: `1px dashed ${C.border}`,
            borderRadius: 8,
            background: C.bgCard,
          }}
        >
          <p
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.crimson,
              marginBottom: 10,
            }}
          >
            Usage rights
          </p>
          <p style={{ fontFamily: SANS, fontSize: 12, color: C.blush, lineHeight: 1.8 }}>
            Listed rates include organic brand usage plus 3 months of paid ad usage, one concept,
            one edited video, and one revision. Extended terms: +3 months → total $450 · +12
            months → total $600 · perpetual or category-exclusive usage quoted separately.
          </p>
        </div>

        <p
          style={{
            fontFamily: SANS,
            fontSize: 11,
            color: C.dimmed,
            textAlign: "center",
            marginTop: 24,
            lineHeight: 1.7,
          }}
        >
          Final pricing depends on deliverables, usage rights, and campaign scope.
          <br />
          Custom bundles available — reach out for a quote.
        </p>
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
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            {CONTACT_LINKS.map((link) => (
              <IconLink key={link.label} {...link} />
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
