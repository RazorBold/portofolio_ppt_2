"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToEl } from "@/lib/lenis-store";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "KARYA", href: "#karya" },
  { label: "SOROTAN", href: "#highlight" },
  { label: "GALERI", href: "#galeri" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const showAnim = gsap
        .from(barRef.current, {
          yPercent: -120,
          paused: true,
          duration: 0.4,
          ease: "power3.out",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top-=-80",
        onUpdate: (self) => {
          if (open) return;
          if (self.direction === -1) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        },
      });
    },
    { scope: root, dependencies: [open] },
  );

  useGSAP(
    () => {
      if (open) {
        gsap.set(".menu-overlay", { display: "flex" });
        gsap
          .timeline()
          .fromTo(
            ".menu-overlay",
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
          )
          .fromTo(
            ".menu-link",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 },
            "-=0.25",
          )
          .fromTo(
            ".menu-meta",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            "-=0.3",
          );
      } else {
        gsap
          .timeline()
          .to(".menu-overlay", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.55,
            ease: "power4.inOut",
          })
          .set(".menu-overlay", { display: "none" });
      }
    },
    { scope: root, dependencies: [open] },
  );

  useGSAP(
    () => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    },
    { scope: root },
  );

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToEl(href), 350);
  };

  return (
    <header ref={root} className="relative z-[80]">
      {/* top bar */}
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[85] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-6 py-5 text-paper md:px-10">
          <button
            onClick={() => go("#top")}
            data-cursor="HOME"
            className="font-display text-xl leading-none tracking-wide"
            aria-label="Kembali ke atas"
          >
            JAGO<span className="text-hot">SLIDE</span>™
          </button>

          <div className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-widest lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                data-cursor="GO"
                className="group relative"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-hot transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <MagneticButton data-cursor="MENU">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest"
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              <span className="hidden sm:inline">{open ? "TUTUP" : "MENU"}</span>
              <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]">
                <span
                  className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span className={`h-[2px] w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </MagneticButton>
        </nav>
      </div>

      {/* fullscreen menu */}
      <div
        className="menu-overlay fixed inset-0 z-[70] hidden flex-col justify-between bg-hot text-ink"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex flex-1 flex-col justify-center px-6 pt-20 md:px-10">
          {[
            { label: "KARYA", href: "#karya" },
            { label: "SOROTAN", href: "#highlight" },
            { label: "GALERI", href: "#galeri" },
            { label: "ORDER", href: "#kontak" },
          ].map((l, i) => (
            <div key={l.href} className="overflow-hidden border-b border-ink/15">
              <button
                onClick={() => go(l.href)}
                className="menu-link group flex w-full items-baseline gap-4 py-2 text-left md:gap-8"
              >
                <span className="self-start pt-4 font-mono text-xs md:pt-6">
                  0{i + 1}
                </span>
                <span className="font-display text-[13vw] leading-[0.95] transition-transform duration-500 group-hover:translate-x-4 md:text-[6.5vw]">
                  {l.label}
                </span>
                <span className="ml-auto font-display text-[8vw] leading-none opacity-0 transition-all duration-500 group-hover:opacity-100 md:text-[3vw]">
                  ↗
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="menu-meta flex flex-wrap items-center justify-between gap-4 px-6 pb-8 font-mono text-[11px] uppercase tracking-widest md:px-10">
          <span>HALO@JAGOSLIDE.ID</span>
          <span className="hidden md:inline">14 KARYA — 240+ DECK SELESAI</span>
          <span>WA +62 812-3456-7890</span>
        </div>
      </div>
    </header>
  );
}
