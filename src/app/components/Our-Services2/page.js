"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** break text after every `n` words (desktop effect) */
function lineBreakEveryNWords(text = "", n = 3) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  for (let i = 0; i < words.length; i += n) {
    lines.push(words.slice(i, i + n).join(" "));
  }
  return lines.join("\n");
}

export default function Service2({
  services = DEFAULT_SERVICES,
  speed = 70,
  visibleCards = 4,     // desktop/tablet default (mobile scroller only)
  widthScale = 0.95,    // desktop width scale (mobile scroller only)
  mobileWidthScale = 1, // mobile scroller width scale
}) {
  const trackRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // desktop hover/focus
  const [isMobile, setIsMobile] = useState(false);        // ≤1023px

  // MOBILE: show only first 3 cards and REMOVE "Design & Space"
  const mobileServices = services.filter((s) => s.title !== "Design & Space").slice(0, 3);
  const displayed = isMobile ? mobileServices : services;
  const doubled = [...displayed, ...displayed];

  const GAP_PX = 24; // matches gap-6

  // Cached distance of one full sequence
  const totalRef = useRef(0);
  // Keep the current x in a ref so we can normalize without jumps
  const xRef = useRef(0);

  // Detect mobile/tablet (≤ 1023px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Measure total width once (and on resize)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      totalRef.current = track.scrollWidth / 2; // width of one sequence
      // normalize current x into [-total, 0]
      const total = totalRef.current || 1;
      let v = xRef.current;
      while (v <= -total) v += total;
      while (v > 0) v -= total;
      xRef.current = v;
      track.style.transform = `translate3d(${v}px,0,0)`;
    };

    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [displayed]);

  // Continuous auto-scroll (MOBILE ONLY), honors prefers-reduced-motion
  useEffect(() => {
    if (!isMobile) return; // desktop scroller off
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      xRef.current = 0;
      track.style.transform = "translate3d(0px,0,0)";
      return;
    }

    let rafId;
    let start;

    const step = (ts) => {
      if (start === undefined) start = ts;
      const elapsed = ts - start;
      start = ts;

      if (!paused) {
        const pxPerMs = speed / 1000;
        xRef.current -= pxPerMs * elapsed; // move left
      }

      const total = totalRef.current || (track.scrollWidth / 2) || 1;
      while (xRef.current <= -total) xRef.current += total;

      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused, speed, isMobile]);

  // Decide cards-per-row and widthScale for MOBILE SCROLLER only
  const cardsPer = isMobile ? 3 : visibleCards;
  const scale = isMobile ? mobileWidthScale : widthScale;

  // Helpers for title adjustments
  const LONG_TITLES = new Set([
    "Design & Space Planning",
    "Design Drawings & Approvals",
  ]);

  return (
    <section className="w-full overflow-hidden mt-20 md:mt-20 mb-20">
      {/* Header (constrained) */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14 text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-widest text-[#F58321] mb-4 sm:mb-7">
            OUR SERVICES
          </h2>
          <p className="mt-2 text-xl sm:text-xl md:text-3xl leading-tight text-gray-900">
            Transforming Spaces With{" "}
            <span className="text-[#F58321]">Creativity</span> And{" "}
            <span className="text-[#F58321]">Care</span>
          </p>

          {/* Mobile & Tablet version */}
          <p className="block lg:hidden mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto md:mx-0">
            As one of Dubai’s most sought-after creative and modern interior design and fit-out companies, our multidisciplinary team ensures exceptional results across
            <span className="font-bold"> all phases</span> of the project. From conceptualization to completion, we work hand-in-hand with clients, managing every detail to create, enhance, and deliver spaces that inspire.
          </p>

          {/* Desktop / LED version */}
          <p className="hidden lg:block mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto md:mx-0 whitespace-nowrap">
            As one of Dubai’s most sought-after creative and modern interior design and fit-out companies, our multidisciplinary team <br /> ensures exceptional
            results across <span className="font-bold">all phases</span> of the project. From conceptualization to completion, we work hand-in-hand <br /> with clients, managing every detail to
            create, enhance, and deliver spaces that inspire.
          </p>
        </div>
      </div>

      {/* ======================= */}
      {/* 📱 MOBILE: Auto-scroller — NO description, cards are links */}
      {/* ======================= */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] md:hidden">
        <div
          className="relative overflow-hidden select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul
            ref={trackRef}
            className="flex gap-4 sm:gap-6 will-change-transform px-0"
            style={{ whiteSpace: "nowrap", transform: "translate3d(0px,0,0)" }}
            aria-live="off"
          >
            {doubled.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="group relative inline-block shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-black/5 first:ml-0 last:mr-0"
                style={{
                  width: `calc(((100vw - ${GAP_PX * (cardsPer - 1)}px) / ${cardsPer}) * ${scale})`,
                  height: "18rem",
                }}
              >
                {/* Entire card is a link on mobile */}
                <Link href={item.href || "#"} aria-label={item.title} className="block h-full w-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={i < 6}
                      className="object-cover rounded-md"
                      sizes="100vw"
                    />

                    {/* Title chip only (no description) */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3">
                      <div className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md text-center">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ======================= */}
      {/* 🖥️ DESKTOP: 3-column grid (no scroll) — clickable links */}
      {/* ======================= */}
      <div className="hidden md:block mt-15">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((item, i) => {
              const isLongTitle = LONG_TITLES.has(item.title);
              const displayDesc = lineBreakEveryNWords(item.description, 3);
              const active = hoveredIndex === i;

              return (
                <li
                  key={`${item.title}-grid-${i}`}
                  className="group relative overflow-hidden rounded-md bg-white ring-1 ring-black/5 mb-6"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(i)}
                  onBlur={() => setHoveredIndex(null)}
                  style={{ height: "509px" }}
                >
                  {/* Whole desktop card clickable */}
                  <Link href={item.href || "#"} aria-label={item.title} className="block h-full w-full">
                    <div className="relative h-full w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={i < 6}
                        className="object-cover rounded-md mb-6"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                      />

                      {/* Red tint on hover */}
                      <div
                        className={[
                          "absolute inset-0 z-20 transition-opacity duration-200",
                          active ? "opacity-100" : "opacity-0",
                          "bg-gradient-to-t from-red-700/80 via-red-600/60 to-red-500/40",
                        ].join(" ")}
                      />

                      {/* Overlay description (slide up on hover) */}
                      <div
                        className={[
                          "absolute inset-x-0 bottom-0 z-30 p-4",
                          "transition-transform duration-200 ease-out",
                          active ? "translate-y-0" : "translate-y-full",
                        ].join(" ")}
                      >
                        <div className="text-white drop-shadow-md">
                          <h3
                            className={[
                              "font-semibold",
                              isLongTitle ? "text-base md:text-lg" : "text-base md:text-lg",
                            ].join(" ")}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="mt-2 text-sm md:text-base leading-relaxed"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 6,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {displayDesc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom title (default) */}
                      <div
                        className={[
                          "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 transition-opacity duration-200",
                          active ? "opacity-0" : "opacity-100",
                        ].join(" ")}
                      >
                        <div className="px-3 py-2 text-sm md:text-base font-medium text-white rounded-md">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Example data */
const DEFAULT_SERVICES = [
  {
    title: "Drawings & Approvals",
    description:
      "From concept to approvals, we handle drawings and authority coordination end to end.",
    image: "/images/Design1.jpg",
    href: "/servicess/drawings-approvals",
  },
  {
    title: "MEP Works",
    description:
      "From plumbing and drainage to HVAC systems we deliver comprehensive Mechanical Electrical and Plumbing solutions.",
    image: "/images/MEP.jpeg",
    href: "/servicess/mep",
  },
  {
    title: "Turnkey Fit-Outs",
    description:
      "Complete fit out delivery from procurement to handover managed to schedule with tight coordination quality control.",
    image: "/images/turnkey.png",
    href: "/servicess/turnkey-fit",
  },
  {
    title: "Design & Space",
    description:
      "Optimized layouts materials and lighting plans to elevate experience while balancing function. ",
    image: "/images/space.png",
    href: "/servicess/design-drawings",
  },
  {
    title: "Demolition, Build & Refurbish",
    description:
      "Our expert team handles every stage of the build process with precision and care.",
    image: "/images/buildings.jpg",
    href: "/servicess/demolishing",
  },
  {
    title: "Joinery Works",
    description:
      "Our skilled craftsmen deliver precision joinery tailored to your design and space.",
    image: "/images/stands.png",
    href: "/servicess/joinery-work",
  },
];
