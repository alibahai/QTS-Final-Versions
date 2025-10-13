"use client";

import { useEffect, useRef, useState } from "react";
import LeftServicesRail from "../rails/LeftServicesRail";
import RightContactRail from "../rails/RightContactRail";

export default function HeroVideo() {
  const VIDEO_SRC =
    "https://res.cloudinary.com/dyckgorsz/video/upload/v1759921866/QTS_a9pvzw.mp4";
  const POSTER_SRC = "/images/2ndImage.jpg";

  const videoRef = useRef(null);
  const [ready, setReady] = useState(false); // page fully loaded?

  useEffect(() => {
    const onLoaded = () => setReady(true);

    if (document.readyState === "complete") {
      setReady(true);
    } else {
      window.addEventListener("load", onLoaded, { once: true });
      return () => window.removeEventListener("load", onLoaded);
    }
  }, []);

  useEffect(() => {
    if (ready && videoRef.current) {
      const v = videoRef.current;
      const id = requestAnimationFrame(() => {
        v.play().catch(() => {});
      });
      return () => cancelAnimationFrame(id);
    }
  }, [ready]);

  return (
    // 👇 id same rehne do
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden -mt-20"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        poster={POSTER_SRC}
        preload="none"
        autoPlay
        muted
        playsInline
        loop
        aria-hidden="true"
      >
        {ready && <source src={VIDEO_SRC} type="video/mp4" />}
      </video>

      {/* dark tint over the video */}
      <div className="absolute inset-0 " />

      {/* Navbar sits on top */}
      <div className="relative z-20">{/* Navbar slot */}</div>

      {/* Rails (flush edges) */}
      <LeftServicesRail />
      <RightContactRail phone="+971 56 806 8070" />

      {/* gradient fade above ribbon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

      {/* ✅ UPDATED: Seamless transparent ribbon with continuous slow scroll */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-black/70 overflow-hidden z-30 flex items-center">
        {/* ✅ ADDED: Triple text blocks for perfectly seamless infinite scroll */}
      <div className="flex animate-marquee-super whitespace-nowrap">
  {/* block 1 */}
  <span className="text-white text-lg font-semibold tracking-widest inline-flex items-center">
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
  </span>

  {/* block 2 */}
  <span className="text-white text-lg font-semibold tracking-widest inline-flex items-center ml-16">
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
  </span>

  {/* block 3 */}
  <span className="text-white text-lg font-semibold tracking-widest inline-flex items-center ml-16">
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
    <span className="mr-16 flex-shrink-0">Dream it. Grow it. Build it.</span>
  </span>
</div>

      </div>

      {/* ✅ ADDED: Inline styles for seamless slow marquee animation */}
      <style jsx>{`
        @keyframes marquee-super {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-marquee-super {
          animation: marquee-super 45s linear infinite; /* super slow, continuous */
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
