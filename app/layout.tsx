import "./global.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import Providers from "../components/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const title = "Shivam Singh — Full Stack Developer";
const description =
  "Full stack developer building production-ready web applications with React, Next.js, Node.js, NestJS and MongoDB.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
