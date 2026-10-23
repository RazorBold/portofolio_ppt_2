"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
