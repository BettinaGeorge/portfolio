import type { Metadata } from "next";
import { Luxurious_Script, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const luxuriousScript = Luxurious_Script({
  weight: "400",
  variable: "--font-luxurious-script",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bettina George",
  description: "AI Engineer · Builder · Creative Technologist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${luxuriousScript.variable} ${inter.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
