"use client";

import KaryaIntro from "./KaryaIntro";
import FeaturedZoom from "./FeaturedZoom";
import ShowcaseHorizontal from "./ShowcaseHorizontal";
import ShowcaseSlides from "./ShowcaseSlides";
import ShowcaseStack from "./ShowcaseStack";
import ShowcaseGrid from "./ShowcaseGrid";
import WorksMarquee from "./WorksMarquee";
import Marquee from "./Marquee";

function DividerText() {
  return (
    <div className="overflow-hidden border-y border-paper/15 bg-ink py-4">
      <Marquee duration={20}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-display text-[8vw] uppercase leading-none text-stroke-thin md:text-[5vw]"
          >
            Next project <span className="text-hot">↗</span> YOURS?
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default function WorksHub() {
  return (
    <>
      <KaryaIntro />
      <FeaturedZoom />
      <ShowcaseHorizontal />
      <ShowcaseSlides />
      <DividerText />
      <ShowcaseStack />
      <ShowcaseGrid />
      <WorksMarquee />
    </>
  );
}
