"use client";

import Image from "next/image";
import Page1 from "src/app/components/Our-Projects/page1";
import { useEffect, useRef, useState } from "react";

export default function Tous() {
  // 🔧 Add/adjust images here
  const images = [
    "/images/jr1.jpg",
    "/images/jr2.jpg",
    "/images/jr3.jpg",
    "/images/jr4.jpg",
    "/images/jr5.jpg",
    "/images/jr6.jpg",
    "/images/jr7.jpg",
    "/images/jr8.jpg",
    "/images/jr9.jpg",
    "/images/jr10.jpg",
    "/images/jr11.jpg",
  

  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-[300px] w-full -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/villa.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
            Tous Les Jours
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16 mt-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Gallery of  Tous Les Jours
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Tous Les Jours is a commercial brand that blends contemporary design with a sense of everyday luxury. Its interiors emphasize warmth, openness, and texture — creating a welcoming environment that celebrates both comfort and sophistication. Each element, from lighting to material selection, reflects the brand’s dedication to quality and craftsmanship, offering an experience that feels both modern and timeless.
        </p>
      </div>

      {/* Plain image rail + lightbox */}
      <section className="pb-16">
        <PlainImageRailLightbox
          images={images}     // plain images only
          speed={80}          // px/sec
          cardWidthPx={340}
          cardHeightClass="h-80 sm:h-96 lg:h-[28rem]"
          gapPx={24}
        />
      </section>

      {/* Use the rail with only the first heading, hide secondary */}
      <section className="pb-16">
        <Page1 title="Our Projects" showSecondary={false} />
      </section>
    </main>
  );
}

function PlainImageRailLightbox({
  images = [],
  speed = 70,
  cardWidthPx = 320,
  cardHeightClass = "h-72 sm:h-80 lg:h-96",
  gapPx = 24,
  rounded = "rounded-2xl",
}) {
  const trackRef = useRef(null);
  const x = useRef(0);
  const raf = useRef(0);
  const t0 = useRef(0);
  const [paused, setPaused] = useState(false);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const scrollY = useRef(0);

  const doubled = [...images, ...images];

  const lock = () => {
    scrollY.current = window.scrollY || 0;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY.current}px`,
      left: "0",
      right: "0",
      width: "100%",
    });
  };
  const unlock = () => {
    Object.assign(document.body.style, {
      position: "",
      top: "",
      left: "",
      right: "",
      width: "",
    });
    window.scrollTo(0, scrollY.current || 0);
  };

  const openBox = (i) => { setIdx(i % images.length); setOpen(true); setPaused(true); lock(); };
  const closeBox = () => { setOpen(false); setPaused(false); unlock(); };
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduce) { track.style.transform = "translateX(0px)"; return; }

    const step = (ts) => {
      if (!t0.current) t0.current = ts;
      const dt = ts - t0.current;
      t0.current = ts;

      if (!paused) {
        x.current -= (speed / 1000) * dt;
        const loopW = images.length * (cardWidthPx + gapPx);
        if (Math.abs(x.current) >= loopW) x.current += loopW;
        track.style.transform = `translateX(${x.current}px)`;
      }
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf.current); t0.current = 0; };
  }, [paused, speed, images.length, cardWidthPx, gapPx]);

  return (
    <>
      {/* Rail */}
      <div className="w-full overflow-hidden">
        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
          <div className="relative overflow-hidden">
            <ul
              ref={trackRef}
              className="flex will-change-transform"
              style={{ gap: `${gapPx}px`, whiteSpace: "nowrap" }}
              aria-live="off"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              {doubled.map((src, i) => (
                <li
                  key={`${src}-${i}`}
                  className="relative inline-block shrink-0"
                  style={{ width: `${cardWidthPx}px` }}
                >
                  <button
                    type="button"
                    className={`group relative w-full ${cardHeightClass} ${rounded} overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80`}
                    onClick={() => openBox(i % images.length)}
                    aria-label="Open image"
                  >
                    {/* ✅ priority removed → Next/Image default lazy */}
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 90vw"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90" role="dialog" aria-modal="true">
          {/* Buttons on top */}
          <button type="button" onClick={closeBox} aria-label="Close" className="absolute right-3 top-3 md:right-6 md:top-6 z-20 rounded-full p-2 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="absolute left-3 top-3 md:left-6 md:top-6 z-20 text-white/80 text-sm md:text-base">{idx + 1} / {images.length}</div>
          <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button type="button" onClick={next} aria-label="Next image" className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Image behind, non-blocking */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full h-full max-w-6xl">
              {/* ✅ priority removed; mounts only when modal open */}
              <Image src={images[idx]} alt="" fill className="object-contain" sizes="100vw" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
