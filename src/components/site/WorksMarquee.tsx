"use client";

import Image from "next/image";
import Marquee from "./Marquee";
import { WORKS } from "@/lib/works";

const ROW_A = WORKS.slice(0, 7);
const ROW_B = WORKS.slice(7);

function Thumb({ id, title, img }: { id: string; title: string; img: string }) {
  return (
    <figure
      data-cursor="KILAT"
      className="group mx-3 flex w-40 shrink-0 flex-col gap-2 md:w-52"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-paper/15">
        <Image
          src={img}
          alt={title}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <figcaption className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-paper-dim">
        <span>{title.split(" — ")[1] ?? title}</span>
        <span className="text-hot">{id}</span>
      </figcaption>
    </figure>
  );
}

/** Bonus — galeri kilat: dua baris thumbnail jalan berlawanan arah, hover = berhenti. */
export default function WorksMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-paper/15 bg-ink py-16 md:py-20">
      <div className="mb-8 flex items-center justify-between px-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-hot">
          (Bonus) Galeri kilat — 14 karya
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-paper-dim">
          Arah bebas, hover buat berhenti
        </span>
      </div>

      <div className="marquee-hover-pause space-y-6">
        <Marquee duration={44}>
          {ROW_A.map((w) => (
            <Thumb key={w.id} id={w.id} title={w.title} img={w.img} />
          ))}
        </Marquee>
        <Marquee duration={50} reverse>
          {ROW_B.map((w) => (
            <Thumb key={w.id} id={w.id} title={w.title} img={w.img} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
