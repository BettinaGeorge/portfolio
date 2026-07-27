import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bettina George — AI Engineer",
  description: "AI/ML Fellow. Software Engineer. Builder.",
};

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jetBrainsMono.variable}>{children}</div>;
}
