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

export default function ServicesRail({
  services = DEFAULT_SERVICES,
  speed = 70,
  visibleCards = 4,     // desktop/tablet default
  widthScale = 0.95,    // desktop width scale
  mobileWidthScale = 1, // slight boost on mobile to occupy space
}) {
  const trackRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null); // desktop hover/focus
  const [isMobile, setIsMobile] = useState(false);        // ≤1023px
  const [mobileActiveIndex, setMobileActiveIndex] = useState(null); // tapped/open card on mobile
  const [paused, setPaused] = useState(false);            // only used on mobile

  // 👉 MOBILE: show only first 3 cards and REMOVE "Design & Space"
 // 👉 MOBILE: show only first 3 cards and REMOVE "Drawings & Approvals"
const mobileServices = services
  .filter((s) => s.title !== "Drawings & Approvals")
  .slice(0, 2);


  const displayed = isMobile ? mobileServices : services;
  const doubled = [...displayed, ...displayed];

  const GAP_PX = 24; // matches gap-6

  // 🔒 Cached distance of one full sequence
  const totalRef = useRef(0);
  // 🔒 Keep the current x in a ref so we can normalize on pause/resume without jumps
  const xRef = useRef(0);

  // Detect mobile/tablet (≤ 1023px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ✅ Mobile: pause movement when a card is opened; resume when closed
  useEffect(() => {
    if (isMobile) {
      setPaused(mobileActiveIndex !== null);
    } else {
      setPaused(false);
    }
  }, [isMobile, mobileActiveIndex]);

  // Measure total width once (and on resize) — NOT on hover/tap
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      totalRef.current = track.scrollWidth / 2; // width of one sequence
      // normalize current x into [-total, 0] to avoid any snap on resume
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
  }, [displayed]); // re-measure if the displayed set changes (mobile vs desktop)

  // Also normalize immediately whenever paused state toggles (prevents jerk on stop/start)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = totalRef.current || 1;
    let v = xRef.current;
    while (v <= -total) v += total;
    while (v > 0) v -= total;
    xRef.current = v;
    track.style.transform = `translate3d(${v}px,0,0)`;
  }, [paused]);

  // Continuous auto-scroll (desktop AND mobile), honors prefers-reduced-motion
  useEffect(() => {
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

      // Move left unless paused
      if (!paused) {
        const pxPerMs = speed / 1000;
        xRef.current -= pxPerMs * elapsed;
      }

      const total = totalRef.current || (track.scrollWidth / 2) || 1;
      // Seamless wrap without direction change
      while (xRef.current <= -total) xRef.current += total;

      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused, speed]);

  // Decide cards-per-row and widthScale per breakpoint
const cardsPer = isMobile ? Math.min(3, displayed.length) : visibleCards;
  const scale = isMobile ? mobileWidthScale : widthScale;

  const LONG_TITLES = new Set([
    "Design & Space Planning",
    "Design Drawings & Approvals",
  ]);

  return (
    <section className="w-full overflow-hidden">
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

      {/* Full-bleed rail (edge-to-edge), overflow hidden = no scrollbar */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <div
  className="relative overflow-hidden select-none"
  onMouseEnter={() => {
    if (!isMobile) {
      setPaused(true);           // ⬅ stop scrolling on desktop hover
    }
  }}
  onMouseLeave={() => {
    setHoveredIndex(null);
    if (!isMobile) {
      setPaused(false);          // ⬅ resume scrolling when hover ends
    }
  }}
>

          <ul
            ref={trackRef}
            className="flex gap-4 sm:gap-6 will-change-transform px-0"
            style={{ whiteSpace: "nowrap", transform: "translate3d(0px,0,0)" }}
            aria-live="off"
          >
            {doubled.map((item, i) => {
              const desktopActive = hoveredIndex === i;
              const mobileActive = mobileActiveIndex === i;
              const isActive = isMobile ? mobileActive : desktopActive;

              const displayDesc = isMobile
                ? item.description
                : lineBreakEveryNWords(item.description, 3);

              const isLongTitle = LONG_TITLES.has(item.title);

              // MOBILE: toggle detail + pause handled by effect
              const handleClick = () => {
                if (!isMobile) return;
                setMobileActiveIndex((prev) => (prev === i ? null : i));
              };

              return (
                <li
                  key={`${item.title}-${i}`}
                  className="group relative inline-block shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-black/5 first:ml-0 last:mr-0"
                  style={{
                    width: `calc(((100vw - ${GAP_PX * (cardsPer - 1)}px) / ${cardsPer}) * ${scale})`,
                    height: isMobile ? "18rem" : "24rem",
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) setHoveredIndex(i);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setHoveredIndex(null);
                  }}
                  onFocus={() => {
                    if (!isMobile) setHoveredIndex(i);
                  }}
                  onBlur={() => {
                    if (!isMobile) setHoveredIndex(null);
                  }}
                  onClick={handleClick}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.title}: ${item.description}`}
                >
                  {/* Image */}
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
                                   
                                  </div>
                                </Link>

                  {/* Red tint (non-interactive to avoid pointer bounce) */}
                  <div
                    className={[
                      "pointer-events-none",
                      "absolute inset-0 z-20 transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                      "bg-gradient-to-t from-red-700/80 via-red-600/60 to-red-500/40",
                    ].join(" ")}
                  />

                  {/* Overlay: description panel (also non-interactive) */}
                  <div
                    className={[
                      "pointer-events-none",
                      "absolute inset-x-0 bottom-0 z-30 p-3 sm:p-4",
                      "transition-transform duration-200 ease-out",
                      isActive ? "translate-y-0" : "translate-y-full",
                    ].join(" ")}
                  >
                    <div className="text-white drop-shadow-md text-center md:text-left">
                      <h3
                        className={[
                          "font-semibold",
                          isMobile
                            ? (isLongTitle
                                ? "text-[13px] sm:text-sm leading-snug line-clamp-2"
                                : "text-sm sm:text-base leading-snug line-clamp-2")
                            : "text-sm sm:text-base md:text-lg",
                        ].join(" ")}
                      >
                        {item.title}
                      </h3>

                     <p
  className={[
    "mt-1 sm:mt-2",
    isMobile
      ? "text-[11px] sm:text-sm leading-snug"
      : "text-xs sm:text-sm md:text-base leading-relaxed",
  ].join(" ")}
  style={{
    whiteSpace: "normal", // allow wrapping
  }}
>
  {displayDesc}
</p>

                    </div>
                  </div>

                  {/* Bottom title (default view) */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 transition-opacity duration-200",
                      isActive ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                  >
                    <div className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-white rounded-md text-center md:text-left">
                      {item.title}
                    </div>
                  </div>
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
      "From concept to approvals, we handle drawings and authority coordination end to end. This block clamps to six lines so longer text remains tidy inside the white box.",
    image: "/images/Design1.jpg",
    href: "/servicess/drawings-approvals",

  },
  {
    title: "MEP Works",
    description:
      "From plumbing and drainage to HVAC systems we deliver comprehensive Mechanical Electrical and Plumbing solutions. Our services ensure seamless integration efficiency and reliability for every project.",
    image: "/images/MEP.jpeg",
     href: "/servicess/mep",
  },
  {
    title: "Turnkey Fit-Outs",
    description:
      "Complete fit out delivery from procurement to handover managed to schedule with tight coordination quality control and budget discipline across suppliers and trades.",
    image: "/images/turnkey.png",
    href: "/servicess/turnkey-fit",

  },
  {
    title: "Design & Space",
    description:
      "Optimized layouts materials and lighting plans to elevate experience while balancing function comfort circulation and brand expression across your environment.",
    image: "/images/space.png",
        href: "/servicess/design-drawings",

  },
];
