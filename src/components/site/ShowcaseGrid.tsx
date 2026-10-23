"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { byId } from "@/lib/works";

const ITEMS = [
  { id: "W.12", aspect: "aspect-[3/4]", offset: "" },
  { id: "W.14", aspect: "aspect-[4/3]", offset: "md:mt-32" },
  { id: "W.13", aspect: "aspect-[3/4]", offset: "md:-mt-16" },
];

const DESC: Record<string, string> = {
  "W.12":
    "Lookbook fashion editorial: hitam-putih dramatis disengat aksen oranye. Model diam, kain yang bicara.",
  "W.14":
    "Sales kit properti dengan render gedung ala majalah arsitektur — prospek jadi bayar DP cuma buat lihat slide-nya lagi.",
  "W.13":
    "Sales deck SaaS dengan dashboard oranye di charcoal gelap; demo 12 menit, kontrak ditandatangani di menit ke-15.",
};

/** Showcase 05 — GALERI LESEH: grid editorial miring + skew ngikutin kecepatan scroll. */
export default function ShowcaseGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".grid-item");
      items.forEach((item) => {
        const frame = item.querySelector(".g-frame");
        const img = item.querySelector(".g-img");
        const meta = item.querySelectorAll(".g-meta");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
        tl.fromTo(
          frame as HTMLElement,
          { clipPath: "inset(14% 8% 14% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
          },
        )
          .fromTo(
            img as HTMLElement,
            { scale: 1.35 },
            { scale: 1, duration: 1.4, ease: "power3.out" },
            0.05,
          )
          .fromTo(
            meta,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            0.45,
          );
      });

      // skew on scroll velocity — khusus desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const proxy = { skew: 0 };
        const skewSetter = gsap.quickSetter(".grid-item", "skewY", "deg");
        const clamp = gsap.utils.clamp(-3.5, 3.5);
        ScrollTrigger.create({
          trigger: ".grid-wrap",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -500);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.9,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        });
        return () => {
          proxy.skew = 0;
          skewSetter(0);
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="galeri" className="relative bg-ink py-24 md:py-36">
      <div className="px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-hot">
              Showcase 05 — galeri leseh
            </span>
            <h2 className="mt-2 font-display text-[11vw] uppercase leading-[0.85] tracking-tight sm:text-[8vw] lg:text-[5.5vw]">
              GALENG <span className="text-hot">SISANYA</span>
            </h2>
          </div>
          <p className="max-w-xs pb-2 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-paper-dim">
            Scroll cepat = grid ikut miring. Santai aja, ini bagian nyantai.
          </p>
        </div>

        <div className="grid-wrap mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-0">
          {ITEMS.map(({ id, aspect, offset }) => {
            const w = byId(id);
            return (
              <figure
                key={id}
                data-cursor="LIHAT"
                className={`grid-item group ${offset}`}
              >
                <div
                  className={`g-frame relative ${aspect} overflow-hidden rounded-sm`}
                >
                  <Image
                    src={w.img}
                    alt={w.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="g-img object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-paper">
                    {w.cat}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_#121110]">
                    {w.result}
                  </span>
                </div>
                <figcaption className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-tight tracking-tight md:text-4xl">
                      {w.title}
                    </h3>
                    <p className="g-meta mt-3 max-w-md text-sm leading-relaxed text-paper-dim">
                      {DESC[id]}
                    </p>
                  </div>
                  <span className="g-meta shrink-0 font-mono text-xs text-paper-dim">
                    {w.id} ©{w.year}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
