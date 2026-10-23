"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Custom cursor: dot + label, blend-difference, reacts to [data-cursor] elements. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      document.body.classList.add("custom-cursor-on");

      const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

      const move = (e: MouseEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };

      const over = (e: MouseEvent) => {
        const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        if (!t) return;
        const txt = t.dataset.cursor || "";
        if (label.current) label.current.textContent = txt;
        gsap.to(ring.current, {
          scale: txt ? 2.6 : 1.8,
          backgroundColor: txt ? "#ff4d00" : "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot.current, { scale: 0, duration: 0.25 });
        if (label.current && txt) gsap.fromTo(label.current, { scale: 0.4 }, { scale: 1, duration: 0.3 });
      };

      const out = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest("[data-cursor]")) return;
        gsap.to(ring.current, {
          scale: 1,
          backgroundColor: "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot.current, { scale: 1, duration: 0.25 });
      };

      window.addEventListener("mousemove", move);
      document.addEventListener("mouseover", over);
      document.addEventListener("mouseout", out);

      return () => {
        window.removeEventListener("mousemove", move);
        document.removeEventListener("mouseover", over);
        document.removeEventListener("mouseout", out);
        document.body.classList.remove("custom-cursor-on");
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true">
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hot mix-blend-difference md:block"
        style={{ transform: "translate(-50%,-50%)" }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/70 mix-blend-difference md:flex"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <span
          ref={label}
          className="font-mono text-[9px] font-bold uppercase tracking-widest text-paper"
        />
      </div>
    </div>
  );
}
