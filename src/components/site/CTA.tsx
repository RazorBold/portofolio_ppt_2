"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitToChars } from "@/lib/split-text";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      document
        .querySelectorAll<HTMLElement>(".cta-line")
        .forEach((line, i) => {
          const chars = splitToChars(line);
          tl.from(
            chars,
            { yPercent: 115, duration: 0.8, ease: "power4.out", stagger: 0.03 },
            i * 0.12,
          );
        });

      // floating 3D asset loop
      gsap.to(".cta-3d", {
        y: -26,
        rotate: 6,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.from(".cta-btn, .cta-note", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="kontak"
      className="relative overflow-hidden bg-hot text-ink"
    >
      {/* giant faint text backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[26vw] leading-none text-ink/10"
      >
        GAS•GAS•GAS•
      </span>

      <div className="relative grid gap-10 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest">
            (06) — kontak & order
          </p>
          <h2 className="mt-6 font-display uppercase leading-[0.88] tracking-tight">
            <span className="block overflow-hidden">
              <span className="cta-line block text-[15vw] lg:text-[8.5vw]">
                PUNYA
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="cta-line block text-[15vw] lg:text-[8.5vw]">
                DEADLINE?
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="cta-line block text-[15vw] text-paper lg:text-[8.5vw]">
                JANGAN DIBIARIN.
              </span>
            </span>
          </h2>

          <div className="cta-btn mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton strength={0.45} data-cursor="CHAT!">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Jago%20Slide!%20Aku%20mau%20order%20PPT."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-10 py-5 font-mono text-sm font-bold uppercase tracking-widest text-paper shadow-[6px_6px_0_rgba(18,17,16,0.35)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="flex h-3 w-3 rounded-full bg-lime" />
                Chat WhatsApp
              </a>
            </MagneticButton>
            <a
              href="mailto:halo@jagoslide.id"
              className="font-mono text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4"
            >
              halo@jagoslide.id
            </a>
          </div>

          <p className="cta-note mt-8 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-widest">
            Respon &lt; 15 menit di jam kerja. Konsultasi pertama gratis, tanpa
            kewajiban apa pun — serius.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="cta-3d relative aspect-square overflow-hidden rounded-sm">
            <Image
              src="/images/cta-3d.png"
              alt="Panah oranye 3D menembus tumpukan slide presentasi"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <span className="absolute -right-3 -top-3 rotate-12 rounded-full border-2 border-ink bg-paper px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
            Slot minggu ini: 3
          </span>
        </div>
      </div>
    </section>
  );
}
