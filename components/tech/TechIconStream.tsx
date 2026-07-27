"use client";

// Icon stream: pure CSS animation. Avoids canvas SVG sizing issues.

const ICON_SIZE = 20;
const ICON_GAP  = 32;

const BASE_ICONS = [
  "/img/tech/python.svg",
  "/img/tech/typescript.svg",
  "/img/tech/javascript.svg",
  "/img/tech/react.svg",
  "/img/tech/nextdotjs.svg",
  "/img/tech/nodedotjs.svg",
  "/img/tech/flask.svg",
  "/img/tech/tailwindcss.svg",
  "/img/tech/postgresql.svg",
  "/img/tech/docker.svg",
  "/img/tech/git.svg",
  "/img/tech/figma.svg",
  "/img/tech/c.svg",
  "/img/tech/github.svg",
  "/img/tech/css.svg",
  "/img/tech/html5.svg",
];

// 20 icons per set — enough to cover ~1000 px viewport height
// (20 × 20 + 19 × 32 + 32 padding = 1040 px per set)
const SET = [...BASE_ICONS, ...BASE_ICONS.slice(0, 4)];
// Duplicate for seamless loop; paddingBottom = ICON_GAP makes -50% exact
const STREAM = [...SET, ...SET];

// Precomputed per-column config — all deterministic so SSR and client match
const NUM_COLS = 16;
const COLS = Array.from({ length: NUM_COLS }, (_, i) => ({
  leftPct:  (i / NUM_COLS) * 100,
  duration: 22 + (i * 7) % 18,          // 22 – 39 s
  delay:    -((i * 3.1) % 22),           // 0 to –21 s (pre-fills the stream)
  opacity:  0.08 + (i % 4) * 0.03,      // 0.08 – 0.17
  size:     ICON_SIZE + (i % 3) * 2,    // 20, 22, or 24 px
}));

export function TechIconStream() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {COLS.map((col, ci) => (
        <div
          key={ci}
          style={{
            position: "absolute",
            left: `${col.leftPct}%`,
            top: 0,
            opacity: col.opacity,
          }}
        >
          {/* paddingBottom = ICON_GAP makes translateY(-50%) land on an exact period */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ICON_GAP,
              paddingBottom: ICON_GAP,
              animation: `techStream ${col.duration}s linear ${col.delay}s infinite`,
            }}
          >
            {STREAM.map((src, j) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={j}
                src={src}
                alt=""
                width={col.size}
                height={col.size}
                style={{
                  display: "block",
                  // SVGs default to black fill — invert to white so they show on dark bg
                  filter: "brightness(0) invert(1)",
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
