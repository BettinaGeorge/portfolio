export type ThemeName = "dark" | "light";

export interface TechTheme {
  name: ThemeName;
  pageBg: string;
  panelBg: string;
  chromeBg: string;
  chromeBorder: string;
  accent: string;
  accentRgb: string;
  heading: string;
  body: string;
  dim: string;
  faint: string;
  hash: string;
  glassCardBg: string;
  shadowRgb: string;
}

export const darkTheme: TechTheme = {
  name: "dark",
  pageBg: "#0a0003",
  panelBg: "#0f0008",
  chromeBg: "#1a0810",
  chromeBorder: "#2d0a18",
  accent: "#ff2d55",
  accentRgb: "255,45,85",
  heading: "#f0e6d3",
  body: "#c4a882",
  dim: "#ab7d8c",
  faint: "#9a6a7a",
  hash: "#ff6b35",
  glassCardBg: "rgba(20,0,10,0.55)",
  shadowRgb: "0,0,0",
};

export const lightTheme: TechTheme = {
  name: "light",
  pageBg: "#e8dcc8",
  panelBg: "#fbf7f1",
  chromeBg: "#f0e4d2",
  chromeBorder: "#ddc9ac",
  accent: "#c4123a",
  accentRgb: "196,20,58",
  heading: "#2a1810",
  body: "#6b5645",
  dim: "#7d6250",
  faint: "#866b52",
  hash: "#b8501f",
  glassCardBg: "rgba(255,255,255,0.55)",
  shadowRgb: "120,90,60",
};

export function accent(theme: TechTheme, opacity: number): string {
  return `rgba(${theme.accentRgb}, ${opacity})`;
}

export function shadow(theme: TechTheme, opacity: number): string {
  const scaled = theme.name === "dark" ? opacity : opacity * 0.35;
  return `rgba(${theme.shadowRgb}, ${scaled})`;
}
