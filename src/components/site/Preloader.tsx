"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const WORDS = ["BRIEF", "RISET", "DESAIN", "REVISI", "SIAP"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const state = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onDone();
        },
      });

      tl.to(state, {
        val: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(state.val);
          if (counter.current) counter.current.textContent = String(v).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
          if (word.current) {
            word.current.textContent = WORDS[Math.min(Math.floor(v / 22), WORDS.length - 1)];
          }
        },
      })
        .to(".pre-line", {
          yPercent: -100,
          duration: 0.7,
          ease: "power4.inOut",
          stagger: 0.07,
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        }, "-=0.25")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-hot text-ink"
      aria-hidden="true"
    >
      <div className="pre-line flex items-center justify-between px-6 pt-6 font-mono text-xs uppercase tracking-widest md:px-10">
        <span>JAGO SLIDE™ — STUDIO PRESENTASI</span>
        <span className="hidden sm:block">MEMUAT KERAS...</span>
      </div>

      <div className="pre-line px-6 md:px-10">
        <span
          ref={word}
          className="block font-display text-[13vw] leading-none tracking-tight md:text-[7vw]"
        >
          BRIEF
        </span>
      </div>

      <div className="pre-line">
        <div className="flex items-end justify-between px-6 pb-6 md:px-10">
          <div className="h-[10vw] w-[42vw] max-h-40 overflow-hidden">
            <div
              ref={bar}
              className="h-full w-full origin-left scale-x-0 bg-ink"
            />
          </div>
          <span className="font-display text-[16vw] leading-[0.8] md:text-[9vw]">
            <span ref={counter}>000</span>
            <span className="align-top text-[0.4em]">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
