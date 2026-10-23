"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitToChars } from "@/lib/split-text";
import { byId } from "@/lib/works";

const IDS = ["W.06", "W.07", "W.08"];

/** Showcase 03 — LAYAR PENUH: panel 100vh bergantian, ghost number parallax. */
export default function ShowcaseSlides() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      root.current
        ?.querySelectorAll<HTMLElement>(".fs-slide")
        .forEach((slide) => {
          const img = slide.querySelector(".fs-img");
          const frame = slide.querySelector(".fs-frame");
          const title = slide.querySelector(".fs-title");
          const ghost = slide.querySelector(".fs-ghost");
          const meta = slide.querySelectorAll(".fs-meta");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: slide, start: "top 65%" },
            defaults: { ease: "power4.out" },
          });
          tl.fromTo(
            frame as HTMLElement,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut" },
          )
            .fromTo(
              img as HTMLElement,
              { scale: 1.35 },
              { scale: 1, duration: 1.5, ease: "power3.out" },
              0.05,
            )
            .fromTo(
              meta,
              { y: 26, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
              0.4,
            );

          if (title) {
            const chars = splitToChars(title as HTMLElement);
            tl.from(
              chars,
              { yPercent: 120, duration: 0.8, stagger: 0.035 },
              0.35,
            );
          }

          if (ghost) {
            gsap.fromTo(
              ghost,
              { yPercent: 36 },
              {
                yPercent: -36,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-ink-soft py-10 md:py-16">
      {IDS.map((id, i) => {
        const w = byId(id);
        const flip = i % 2 === 1;
        return (
          <article
            key={id}
            className="fs-slide relative grid min-h-svh items-center gap-10 overflow-hidden px-6 py-16 md:grid-cols-2 md:gap-16 md:px-10"
          >
            <span
              aria-hidden="true"
              className="fs-ghost pointer-events-none absolute -right-4 top-1/2 z-0 select-none font-display text-[38vw] leading-none text-stroke-thin opacity-15 md:text-[24vw]"
            >
              {w.id}
            </span>

            <div
              className={`relative z-10 ${flip ? "md:order-2" : ""}`}
              data-cursor="LIHAT"
            >
              <div className="fs-frame relative aspect-[16/10] overflow-hidden rounded-sm">
                <Image
                  src={w.img}
                  alt={w.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 46vw"
                  className="fs-img object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-paper">
                  {w.cat}
                </span>
              </div>
            </div>

            <div className={`relative z-10 ${flip ? "md:order-1" : ""}`}>
              <p className="fs-meta font-mono text-[11px] uppercase tracking-widest text-hot">
                {w.id} — ©{w.year}
                {i === 0 ? " • Showcase 03: layar penuh" : ""}
              </p>
              <h3 className="fs-title mt-3 overflow-hidden font-display text-[9.5vw] uppercase leading-[0.9] tracking-tight md:text-[4.6vw]">
                {w.title}
              </h3>
              <p className="fs-meta mt-5 max-w-md text-base leading-relaxed text-paper-dim md:text-lg">
                {["Katalog liburan yang bikin orang checkout sebelum sempat mikir — semua destinasi kelihatan kayak poster film.",
                  "Deck kampanye lingkungan yang dibuka di depan walikota. Data polusi diubah jadi cerita yang nggak bisa dielak.",
                  "Company profile klinik yang bikin pasien merasa dijamin sebelum masuk pintu — hangat, jujur, profesional."][i]}
              </p>
              <span className="fs-meta mt-7 inline-block rounded-full bg-lime px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                {w.result}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
