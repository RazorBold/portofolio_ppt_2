"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/site/SmoothScroll";
import Preloader from "@/components/site/Preloader";
import Cursor from "@/components/site/Cursor";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import WorksHub from "@/components/site/WorksHub";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // lock scroll while preloader runs
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div className="noise relative min-h-screen bg-ink text-paper">
      <SmoothScroll />
      <Cursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <Navbar />
      <main>
        <Hero loaded={loaded} />
        <WorksHub />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
