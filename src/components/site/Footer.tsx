"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const COLS = [
  {
    h: "LAYANAN",
    items: ["Pitch Deck", "Company Profile", "Slide Seminar", "Keynote", "Infografis"],
  },
  {
    h: "STUDIO",
    items: ["Karya", "Sorotan", "Galeri", "Order"],
  },
  {
    h: "SOSIAL",
    items: ["Instagram", "Behance", "LinkedIn", "TikTok"],
  },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-brand", {
        yPercent: 35,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative border-t border-paper/15 bg-ink pb-8 pt-16">
      <div className="px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              JAGO SLIDE™ — studio kecil dengan standar besar. Bikin PPT itu seni,
              dan kami seniman bayarannya lunas.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
              JAKARTA — BEKERJA UNTUK DUNIA
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.h}>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-hot">
                  {c.h}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it}>
                      <a
                        href="#top"
                        className="group inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper"
                      >
                        <span className="h-px w-0 bg-hot transition-all duration-300 group-hover:w-4" />
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <h2 className="footer-brand select-none whitespace-nowrap text-center font-display text-[13.5vw] uppercase leading-[0.8] tracking-tight text-stroke-thin">
            JAGO SLIDE™
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-paper/15 pt-6 font-mono text-[10px] uppercase tracking-widest text-paper-dim md:flex-row">
          <span>© 2026 JAGO SLIDE™. Semua slide dilindungi.</span>
          <span>
            Dibuat dengan <span className="text-hot">GSAP</span> + kopi hitam
          </span>
          <span>Kembali ke atas ↑</span>
        </div>
      </div>
    </footer>
  );
}
