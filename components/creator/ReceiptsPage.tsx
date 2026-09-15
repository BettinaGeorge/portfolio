"use client";

import { useState, useEffect, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { C, PLAYFAIR, SCRIPT, SANS, IG_ACCENT, TT_ACCENT } from "@/lib/creator-theme";

type Receipt = { src: string; alt: string; tag: string; aspect?: string };

const IG_RECEIPTS: Receipt[] = [
  {
    src: "/img/receipts/ig-account-insights-views.png",
    alt: "Instagram account insights — 3,295,686 views, 91.7% non-follower reach",
    tag: "Account insights",
  },
  {
    src: "/img/receipts/ig-interactions.png",
    alt: "Instagram interactions — 392,194 interactions, 301,216 accounts engaged",
    tag: "Account insights",
  },
  {
    src: "/img/receipts/ig-profile-followers.png",
    alt: "Instagram profile and followers — 7,134 profile activity, 1,641 followers",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/ig-followers-overview.png",
    alt: "Instagram followers overview and growth",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/ig-gender-active-times.png",
    alt: "Instagram audience gender split and follower active times",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/ig-age-range.png",
    alt: "Instagram audience age range breakdown",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/ig-follower-details.png",
    alt: "Instagram follower growth chart and top content by follows",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/ig-top-locations.png",
    alt: "Instagram top locations by city",
    tag: "Followers tab",
  },
];

const TIKTOK_RECEIPTS: Receipt[] = [
  {
    src: "/img/receipts/tiktok-overview.png",
    alt: "TikTok overview — 1M video views, 178.5K likes, traffic source breakdown",
    tag: "Overview tab",
  },
  {
    src: "/img/receipts/tiktok-followers-gender-age.png",
    alt: "TikTok followers — total followers, gender split 61% female",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/tiktok-followers-age-locations.png",
    alt: "TikTok followers — age range and top locations",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/tiktok-followers-locations.png",
    alt: "TikTok followers — locations, 40.2% United States",
    tag: "Followers tab",
  },
  {
    src: "/img/receipts/tiktok-viewers-overview.png",
    alt: "TikTok viewers — 624.9K total viewers, 485.7K new viewers",
    tag: "Viewers tab",
  },
  {
    src: "/img/receipts/tiktok-viewers-demographics.png",
    alt: "TikTok viewers — gender split 84% female, age range",
    tag: "Viewers tab",
  },
  {
    src: "/img/receipts/tiktok-viewers-locations.png",
    alt: "TikTok viewers — locations, 49.1% United States",
    tag: "Viewers tab",
  },
];

const TESTIMONIAL_RECEIPTS: Receipt[] = [
  {
    src: "/img/testimonials/t1-mk-effort-creativity.png",
    alt: "Michael Kors campaign team — thank you for the effort and creativity",
    tag: "Email",
    aspect: "568/346",
  },
  {
    src: "/img/testimonials/t2-mk-approved-livegoal.png",
    alt: "Michael Kors Pour Femme campaign — content approved, all set to go live",
    tag: "Email",
    aspect: "1654/340",
  },
  {
    src: "/img/testimonials/t3-mk-invite.png",
    alt: "Michael Kors brand team — campaign invite",
    tag: "Email",
    aspect: "1082/244",
  },
  {
    src: "/img/testimonials/t4-vaseline-invite.png",
    alt: "Vaseline partner agency — campaign invite",
    tag: "Email",
    aspect: "1220/112",
  },
  {
    src: "/img/testimonials/t5-so-happy-accepted.png",
    alt: "Campaign manager — so happy you were accepted",
    tag: "Email",
    aspect: "1820/70",
  },
  {
    src: "/img/testimonials/t6-ig-love-content.png",
    alt: "Instagram DM — we love your content bettina",
    tag: "Instagram DM",
    aspect: "444/60",
  },
  {
    src: "/img/testimonials/t7-sprite-aholic.png",
    alt: "Instagram comment — Naw we need more Nigerian influencers making good content",
    tag: "Instagram Comment",
    aspect: "686/80",
  },
  {
    src: "/img/testimonials/t8-peak-contents.png",
    alt: "Instagram DM — you make peak contents",
    tag: "Instagram DM",
    aspect: "350/108",
  },
  {
    src: "/img/testimonials/t9-thanks-campaign.png",
    alt: "Campaign team — thanks again for being part of this campaign",
    tag: "Email",
    aspect: "532/220",
  },
  {
    src: "/img/testimonials/t10-keep-in-mind.png",
    alt: "Brand partner — it's been lovely working with you",
    tag: "Email",
    aspect: "524/190",
  },
];

function Ornament() {
  return <span style={{ color: C.crimson, opacity: 0.6, userSelect: "none" }}>✦</span>;
}

function ExpandIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
    </svg>
  );
}

function ReceiptCard({
  receipt,
  accent,
  index,
  onSelect,
  aspect = "9/16",
  fit = "cover",
}: {
  receipt: Receipt;
  accent: string;
  index: number;
  onSelect: (r: Receipt) => void;
  aspect?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <motion.button
      onClick={() => onSelect(receipt)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${accent}33`,
        background: C.bgCard,
        padding: 0,
        cursor: "zoom-in",
        textAlign: "left",
        display: "block",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent,
          background: "rgba(13,4,7,0.8)",
          border: `1px solid ${accent}55`,
          borderRadius: 3,
          padding: "3px 8px",
        }}
      >
        {receipt.tag}
      </span>
      <span
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          color: C.cream,
          background: "rgba(13,4,7,0.8)",
          border: `1px solid ${accent}55`,
        }}
      >
        <ExpandIcon size={13} />
      </span>
      <div style={{ position: "relative", width: "100%", aspectRatio: receipt.aspect ?? aspect }}>
        <Image
          src={receipt.src}
          alt={receipt.alt}
          fill
          sizes="(max-width: 640px) 90vw, 300px"
          style={{ objectFit: fit, objectPosition: fit === "contain" ? "center" : "top" }}
        />
      </div>
    </motion.button>
  );
}

function ReceiptSection({
  label,
  Icon,
  accent,
  receipts,
  onSelect,
  aspect,
  fit,
  minCardWidth = 240,
}: {
  label: string;
  Icon: (props: { size?: number }) => ReactElement;
  accent: string;
  receipts: Receipt[];
  onSelect: (r: Receipt) => void;
  aspect?: string;
  fit?: "cover" | "contain";
  minCardWidth?: number;
}) {
  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
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
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))`,
          gap: 20,
        }}
      >
        {receipts.map((r, i) => (
          <ReceiptCard key={r.src} receipt={r} accent={accent} index={i} onSelect={onSelect} aspect={aspect} fit={fit} />
        ))}
      </div>
    </div>
  );
}

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.4a3.4 3.4 0 1 1-2.6-3.3" />
      <path d="M14 4c.5 2.7 2.4 4.4 4.7 4.6" />
    </svg>
  );
}

function QuoteIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c.3 2-1 3.5-3 4M17 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c.3 2-1 3.5-3 4" />
    </svg>
  );
}

function CloseIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Lightbox({ receipt, onClose }: { receipt: Receipt; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
        <CloseIcon size={18} />
      </button>

      <motion.img
        key={receipt.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        src={receipt.src}
        alt={receipt.alt}
        style={{
          maxWidth: "min(92vw, 900px)",
          maxHeight: "78vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          cursor: "default",
        }}
      />
      <p
        style={{
          fontFamily: SANS,
          fontSize: 12,
          color: C.blush,
          marginTop: 18,
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        {receipt.alt}
      </p>
    </motion.div>
  );
}

export function ReceiptsPage() {
  const router = useRouter();
  const [lightbox, setLightbox] = useState<Receipt | null>(null);

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: SANS,
        color: C.cream,
      }}
    >
      {/* ── nav ────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
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
          onClick={() => router.push("/creator")}
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
          ← back to portfolio
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

        <span style={{ width: 100 }} />
      </nav>

      {/* ── header ─────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px 60px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
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
            <Ornament /> &nbsp; proof, not projections &nbsp; <Ornament />
          </p>
          <h1
            style={{
              fontFamily: PLAYFAIR,
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900,
              color: C.cream,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            The Receipts
          </h1>
          <p
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontSize: 15,
              color: C.blush,
              lineHeight: 1.8,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Every number on the media kit page is pulled straight from my own analytics
            dashboards — nothing modeled, nothing estimated. Screenshots below, timestamped
            and unedited, so you can check the math yourself.
          </p>
        </motion.div>
      </section>

      {/* ── gallery ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 100px" }}>
        <ReceiptSection label="Instagram" Icon={InstagramIcon} accent={IG_ACCENT} receipts={IG_RECEIPTS} onSelect={setLightbox} />
        <ReceiptSection label="TikTok" Icon={TikTokIcon} accent={TT_ACCENT} receipts={TIKTOK_RECEIPTS} onSelect={setLightbox} />
        <ReceiptSection
          label="Testimonials"
          Icon={QuoteIcon}
          accent={C.crimson}
          receipts={TESTIMONIAL_RECEIPTS}
          onSelect={setLightbox}
          fit="contain"
          minCardWidth={280}
        />
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox receipt={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
