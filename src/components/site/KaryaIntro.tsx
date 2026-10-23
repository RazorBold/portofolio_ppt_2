"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitToChars } from "@/lib/split-text";
import Marquee from "./Marquee";

const STATS = [
  "240+ DECK SELESAI",
  "98% KLIEN BALIK LAGI",
  "6 TAHUN BERDIRI",
  "24 JAM MODE DARURAT",
  "12.400 PENONTON TERBANTU",
  "0 SLIDE TEMPLATE KEJUAL",
];

export default function KaryaIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
      document
        .querySelectorAll<HTMLElement>(".karya-line")
        .forEach((line) => {
          const chars = splitToChars(line);
          tl.from(
            chars,
            { yPercent: 120, duration: 0.9, ease: "power4.out", stagger: 0.04 },
            "<0.08",
          );
        });
      tl.from(
        ".karya-meta",
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 },
        0.3,
      );

      gsap.fromTo(
        ".karya-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="karya" className="relative bg-ink pt-24 md:pt-32">
      <div className="px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="karya-meta font-mono text-[11px] uppercase tracking-widest text-hot">
              (2024 — 2026)
            </p>
            <h2 className="mt-4 font-display uppercase leading-[0.84] tracking-tight">
              <span className="block overflow-hidden">
                <span className="karya-line block text-[17vw] lg:text-[10vw]">
                  KARYA
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="karya-line block text-[17vw] text-stroke lg:text-[10vw]">
                  (14)
                </span>
              </span>
            </h2>
          </div>
          <p className="karya-meta max-w-xs pb-3 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-paper-dim">
            Empat belas proyek, empat belas cerita. Dari deck yang bikin dana
            cair sampai undangan yang bikin nangis — semua keluar dari studio
            yang sama.
          </p>
        </div>
        <div className="karya-rule mt-10 h-[3px] origin-left bg-hot" />
      </div>

      {/* stats strip — miring biar nerve */}
      <div className="mt-14 -rotate-2 border-y-2 border-ink bg-hot py-3 text-ink shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        <Marquee duration={26}>
          {STATS.map((s) => (
            <span
              key={s}
              className="mx-7 flex items-center gap-7 font-display text-xl uppercase tracking-wide md:text-2xl"
            >
              {s} <span className="text-ink/60">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
