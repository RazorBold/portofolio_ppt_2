"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { byId } from "@/lib/works";
import { scrollToEl } from "@/lib/lenis-store";

const IDS = ["W.02", "W.03", "W.04", "W.05"];

/** Showcase 02 — SLIDE LANGSUNG: scroll vertikal digeser horizontal (pinned). */
export default function ShowcaseHorizontal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>(".h-track");
      const section = root.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-pin",
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const n = Math.min(
              IDS.length,
              Math.floor(self.progress * (IDS.length + 0.5)) + 1,
            );
            const el = section.querySelector<HTMLElement>(".h-counter-num");
            if (el) el.textContent = String(n).padStart(2, "0");
          },
        },
      });

      // parallax dalam tiap gambar
      track.querySelectorAll<HTMLElement>(".h-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".h-card"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".h-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".h-pin",
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
          },
        },
      );

      gsap.from(".h-head", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".h-pin", start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="showcase" className="relative bg-paper text-ink">
      <div className="h-pin relative flex min-h-svh flex-col justify-center overflow-hidden py-16">
        <div className="h-head flex flex-wrap items-end justify-between gap-4 px-6 md:px-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
              Showcase 02 — geser ke samping
            </span>
            <h2 className="mt-2 font-display text-[11vw] uppercase leading-[0.85] tracking-tight sm:text-[8vw] lg:text-[5.5vw]">
              SLIDE <span className="text-hot">LANGSUNG</span>
            </h2>
          </div>
          <p className="font-display text-6xl leading-none md:text-8xl">
            <span className="h-counter-num text-hot">01</span>
            <span className="text-ink/30"> / 04</span>
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="h-track flex w-max items-stretch gap-8 px-6 will-change-transform md:gap-12 md:px-10">
            {IDS.map((id) => {
              const w = byId(id);
              return (
                <article
                  key={id}
                  data-cursor="LIHAT"
                  className="h-card group relative flex w-[80vw] shrink-0 flex-col sm:w-[62vw] md:w-[48vw]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-ink/5">
                    <Image
                      src={w.img}
                      alt={w.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 48vw"
                      className="scale-[1.16] object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-paper">
                      {w.cat}
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_#121110]">
                      {w.result}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl uppercase leading-tight tracking-tight md:text-3xl">
                      {w.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-ink/60">
                      {w.id} ©{w.year}
                    </span>
                  </div>
                </article>
              );
            })}

            <div className="flex w-[60vw] shrink-0 items-center justify-center sm:w-[38vw] md:w-[28vw]">
              <button
                onClick={() => scrollToEl("#kontak")}
                data-cursor="ORDER"
                className="group flex aspect-square w-52 flex-col items-center justify-center gap-3 rounded-full bg-hot text-center text-ink transition-transform duration-500 hover:scale-105 md:w-64"
              >
                <span className="font-display text-2xl uppercase leading-tight md:text-3xl">
                  Proyek loe
                  <br />
                  di sini?
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                  Ayo gas →
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-6 mt-12 h-[3px] bg-ink/10 md:mx-10">
          <div className="h-progress h-full origin-left scale-x-0 bg-hot" />
        </div>
      </div>
    </section>
  );
}
