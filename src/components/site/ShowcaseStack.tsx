"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { byId } from "@/lib/works";

const IDS = ["W.09", "W.10", "W.11"];

/** Showcase 04 — TUMPUKAN: kartu menumpuk, yang di bawah menyusut pelan (pin scrub). */
export default function ShowcaseStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.025,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top " + (110 + i * 16),
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.from(".stack-card", {
        opacity: 0,
        y: 90,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".stack-wrap", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section className="relative bg-paper py-24 text-ink md:py-32">
      <div className="px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
              Showcase 04 — tumpukan
            </span>
            <h2 className="mt-2 font-display text-[11vw] uppercase leading-[0.85] tracking-tight sm:text-[8vw] lg:text-[5.5vw]">
              NUMPUK <span className="text-hot">KAYAK TUGAS</span>
            </h2>
          </div>
          <p className="max-w-xs pb-2 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-ink/60">
            Scroll — tiap kartu numpuk di atas yang lama. Persis inbox brief
            kamu, tapi versi cantik.
          </p>
        </div>
      </div>

      <div className="stack-wrap relative mt-14">
        {IDS.map((id) => {
          const w = byId(id);
          return (
            <div
              key={id}
              data-cursor="LIHAT"
              className="stack-card sticky mx-4 mb-8 overflow-hidden rounded-sm border-2 border-ink bg-ink text-paper shadow-[10px_10px_0_#ff4d00] will-change-transform md:mx-10"
            >
              <div className="grid md:grid-cols-[1.15fr_1fr]">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
                  <Image
                    src={w.img}
                    alt={w.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 55vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-between gap-8 p-7 md:p-12">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                    <span>{w.id}</span>
                    <span>©{w.year}</span>
                  </div>
                  <div>
                    <span className="rounded-full border border-paper/25 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                      {w.cat}
                    </span>
                    <h3 className="mt-5 font-display text-3xl uppercase leading-[0.92] tracking-tight md:text-5xl">
                      {w.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-paper-dim md:text-base">
                      {["Spreadsheet 47 sheet diubah jadi 18 slide yang bikin direktur bilang 'akhirnya yang bisa dibaca'.",
                        "Materi e-learning yang dulu bikin ngantuk, sekarang ditonton sampai habis — bukti 12.400 siswa.",
                        "Undangan interaktif dengan animasi transisi per-slide; keluarga mempelai nangis, tamu screenshot."][["W.09", "W.10", "W.11"].indexOf(id)]}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                    ✦ {w.result}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
