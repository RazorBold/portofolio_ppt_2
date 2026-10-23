"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitToChars } from "@/lib/split-text";
import { scrollToEl } from "@/lib/lenis-store";
import MagneticButton from "./MagneticButton";
import Marquee from "./Marquee";

export default function Hero({ loaded }: { loaded: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!loaded) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // headline chars
      document.querySelectorAll<HTMLElement>(".hero-line").forEach((line) => {
        const chars = splitToChars(line);
        tl.from(
          chars,
          { yPercent: 120, duration: 1, stagger: 0.035 },
          "<0.05",
        );
      });

      tl.from(
        ".hero-eyebrow",
        { opacity: 0, y: 18, duration: 0.7, stagger: 0.1 },
        0.2,
      )
        .from(
          ".hero-img-frame",
          { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "power4.inOut" },
          0.1,
        )
        .from(".hero-img", { scale: 1.4, duration: 1.6, ease: "power3.out" }, 0.2)
        .from(
          ".hero-sub, .hero-cta",
          { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 },
          0.8,
        )
        .from(
          ".hero-sticker",
          { scale: 0, rotate: -40, duration: 0.7, ease: "back.out(2)" },
          1.1,
        )
        .from(".hero-marquee", { yPercent: 100, duration: 0.7 }, 1.0);
    },
    { scope: root, dependencies: [loaded] },
  );

  useGSAP(
    () => {
      // parallax hero image
      gsap.to(".hero-img", {
        yPercent: -12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      // headline drifts slower
      gsap.to(".hero-headline", {
        yPercent: 30,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2ede4 1px, transparent 1px), linear-gradient(to bottom, #f2ede4 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* eyebrow row */}
      <div className="relative z-10 flex items-start justify-between px-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim md:px-10">
        <span className="hero-eyebrow max-w-[240px] leading-relaxed">
          Studio jasa desain presentasi — pitch deck, company profile, keynote.
        </span>
        <span className="hero-eyebrow hidden text-right leading-relaxed sm:block">
          EST. 2020
          <br />
          JKT — BEKERJA GLOBAL
        </span>
      </div>

      {/* main */}
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="hero-headline">
          <h1 className="font-display uppercase leading-[0.86] tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-line block text-[19vw] text-stroke lg:text-[11.5vw]">
                PPT
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-[19vw] lg:text-[11.5vw]">
                JUGA<span className="text-hot"> SENI.</span>
              </span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:gap-10">
            <p className="hero-sub max-w-md text-base leading-relaxed text-paper-dim md:text-lg">
              Kamu bawa idenya, kami ubah jadi slide yang bikin audiens{" "}
              <span className="text-paper">diam, menatap, dan kagum</span> — bukan
              main HP sambil nunggu meeting selesai.
            </p>
            <div className="hero-cta flex items-center gap-4">
              <MagneticButton data-cursor="GO">
                <button
                  onClick={() => scrollToEl("#kontak")}
                  className="group relative overflow-hidden rounded-full bg-hot px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-paper">
                    Order Sekarang
                  </span>
                  <span className="absolute inset-0 translate-y-full bg-ink transition-transform duration-300 ease-out group-hover:translate-y-0" />
                </button>
              </MagneticButton>
              <MagneticButton data-cursor="LIHAT">
                <button
                  onClick={() => scrollToEl("#karya")}
                  className="rounded-full border border-paper/30 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-paper transition-colors duration-300 hover:border-hot hover:text-hot"
                >
                  Lihat Karya
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 3D hero visual */}
        <div className="relative hidden justify-end lg:flex">
          <div className="hero-img-frame relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm">
            <Image
              src="/images/hero-3d.png"
              alt="Render 3D kartu presentasi melayang dengan bola oranye dan torus chrome"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 480px"
              className="hero-img scale-110 object-cover"
            />
          </div>
          <div className="hero-sticker absolute -left-6 bottom-16 rotate-[-8deg] rounded-full border-2 border-ink bg-lime px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-[4px_4px_0_#121110]">
            100% ANTI BORING
          </div>
        </div>
      </div>

      {/* bottom marquee */}
      <div className="hero-marquee relative z-10 border-y border-paper/15 bg-ink-soft/60 py-3 backdrop-blur-sm">
        <Marquee duration={22}>
          {[
            "PITCH DECK INVESTOR",
            "COMPANY PROFILE",
            "SLIDE SEMINAR",
            "KEYNOTE",
            "LAPORAN BULANAN",
            "INFOGRAFIS DATA",
            "DECK DARURAT 24 JAM",
          ].map((t) => (
            <span
              key={t}
              className="mx-6 flex items-center gap-6 font-display text-xl uppercase tracking-wide text-paper/80 md:text-2xl"
            >
              {t} <span className="text-hot">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
