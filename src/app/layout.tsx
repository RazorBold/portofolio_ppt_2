import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAGO SLIDE™ — Studio Jasa Desain Presentasi",
  description:
    "Kami bikin PPT yang nggak ngebosenin: pitch deck investor, company profile, slide seminar, sampai keynote. Kirim brief hari ini, besok audiens loe kagum.",
  keywords: [
    "jasa ppt",
    "jasa powerpoint",
    "jasa desain presentasi",
    "pitch deck",
    "company profile",
    "slide seminar",
  ],
  openGraph: {
    title: "JAGO SLIDE™ — Bikin PPT Itu Seni",
    description:
      "Studio jasa desain presentasi. Pitch deck, company profile, keynote — semua dibikin biar audiens diam, menatap, kagum.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${grotesk.variable} ${mono.variable} antialiased bg-ink text-paper font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
