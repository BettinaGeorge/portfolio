"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { darkTheme, lightTheme, type TechTheme, type ThemeName } from "@/lib/tech-theme";

const STORAGE_KEY = "tech-theme";
const CHANGE_EVENT = "techthemechange";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getServerSnapshot(): ThemeName {
  return "dark";
}

interface TechThemeContextValue {
  theme: TechTheme;
  name: ThemeName;
  toggle: () => void;
}

const TechThemeContext = createContext<TechThemeContextValue>({
  theme: darkTheme,
  name: "dark",
  toggle: () => {},
});

export function TechThemeProvider({ children }: { children: React.ReactNode }) {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: ThemeName = name === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const theme = name === "dark" ? darkTheme : lightTheme;

  return (
    <TechThemeContext.Provider value={{ theme, name, toggle }}>
      {children}
    </TechThemeContext.Provider>
  );
}

export function useTechTheme() {
  return useContext(TechThemeContext);
}
