"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { byId } from "@/lib/works";

/** Showcase 01 — SOROTAN: frame kecil melayang → zoom full-bleed saat scroll (pinned scrub). */
export default function FeaturedZoom() {
  const root = useRef<HTMLElement>(null);
  const work = byId("W.01");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        ".feat-frame",
        { scale: 0.42, rotate: -7, borderRadius: "28px" },
        { scale: 1, rotate: 0, borderRadius: "0px", ease: "none", duration: 0.72 },
        0,
      )
        .fromTo(
          ".feat-img",
          { scale: 1.4, yPercent: 6 },
          { scale: 1, yPercent: 0, ease: "none", duration: 0.72 },
          0,
        )
        .fromTo(
          ".feat-ghost",
          { yPercent: -30, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "none", duration: 0.5 },
          0.05,
        )
        .fromTo(
          ".feat-meta",
          { yPercent: 120 },
          { yPercent: 0, ease: "power3.out", duration: 0.2 },
          0.72,
        )
        .fromTo(
          ".feat-hint",
          { opacity: 1 },
          { opacity: 0, ease: "none", duration: 0.12 },
          0,
        );

      // keep title pinned visible until section leaves
      gsap.to(".feat-meta", {
        yPercent: -10,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "85% bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="highlight" className="relative h-[280vh] bg-ink">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <p className="feat-hint absolute top-24 z-10 font-mono text-[11px] uppercase tracking-widest text-paper-dim md:top-28">
          Showcase 01 — Sorotan utama. Scroll terus, jangan berhenti.
        </p>

        <span
          aria-hidden="true"
          className="feat-ghost pointer-events-none absolute select-none font-display text-[34vw] leading-none text-stroke-thin opacity-10"
        >
          W.01
        </span>

        <div
          data-cursor="LIHAT"
          className="feat-frame relative h-[64vh] w-[86vw] overflow-hidden will-change-transform md:h-[74vh] md:w-[74vw]"
        >
          <Image
            src={work.img}
            alt={work.title}
            fill
            priority
            sizes="90vw"
            className="feat-img object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-paper">
            {work.cat}
          </span>
          <span className="absolute right-5 top-5 hidden rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink md:block">
            {work.result}
          </span>

          <div className="feat-meta absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20 md:p-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                {work.id} — ©{work.year}
              </span>
              <h3 className="mt-1 font-display text-[7.5vw] uppercase leading-[0.9] tracking-tight text-paper md:text-[4.2vw]">
                {work.title}
              </h3>
              <span className="mt-3 inline-block rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink md:hidden">
                {work.result}
              </span>
            </div>
            <span className="hidden font-display text-2xl text-hot md:block">
              ↗
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
