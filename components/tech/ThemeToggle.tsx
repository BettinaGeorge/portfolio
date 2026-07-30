"use client";

import { useTechTheme } from "./TechThemeProvider";

export function ThemeToggle() {
  const { theme, name, toggle } = useTechTheme();

  return (
    <button
      onClick={toggle}
      title={name === "dark" ? "switch to light mode" : "switch to dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        height: 20,
        padding: "0 5px",
        fontSize: 10,
        fontWeight: 600,
        color: theme.accent,
        background: `rgba(${theme.accentRgb}, 0.12)`,
        border: `1px solid rgba(${theme.accentRgb}, 0.4)`,
        borderRadius: 10,
        cursor: "default",
        fontFamily: "inherit",
        transition: "background 0.2s, border-color 0.2s, transform 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${theme.accentRgb}, 0.22)`;
        e.currentTarget.style.borderColor = theme.accent;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `rgba(${theme.accentRgb}, 0.12)`;
        e.currentTarget.style.borderColor = `rgba(${theme.accentRgb}, 0.4)`;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span style={{ fontSize: 11, lineHeight: 1 }}>{name === "dark" ? "☀" : "☾"}</span>
      <span>{name === "dark" ? "light" : "dark"}</span>
    </button>
  );
}
