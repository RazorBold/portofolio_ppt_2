"use client";

import { type ReactNode } from "react";

export default function SectionHeading({
  index,
  title,
  accent,
  dark = true,
  children,
}: {
  index: string;
  title: string;
  accent?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  const line = dark ? "border-paper/15" : "border-ink/15";
  const sub = dark ? "text-paper-dim" : "text-ink/60";

  return (
    <div className={`border-t-2 ${line} pt-5`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4 md:gap-8">
          <span className={`font-mono text-xs tracking-widest ${sub}`}>
            ({index})
          </span>
          <h2 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tight sm:text-[9vw] lg:text-[6.5vw]">
            {title}{" "}
            {accent ? <span className="text-hot">{accent}</span> : null}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
