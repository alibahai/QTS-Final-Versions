"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Two-row, seamless, auto-scrolling showcase
 * Full-bleed (edge-to-edge) across the viewport
 */
export default function ScrollingShowcase({
  speed = 40, // px per second
  gap = 24,   // px gap between cards
  images = DEMO_IMAGES,
}) {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const doubled = [...images, ...images];

  useEffect(() => {
    const run = (track, dir = -1) => {
      if (!track) return () => {};

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

      if (reduceMotion) {
        track.style.transform = "translateX(0px)";
        return () => {};
      }

      let rafId;
      let start;
      let x = 0;

      const step = (ts) => {
        if (start === undefined) start = ts;
        const elapsed = ts - start;
        start = ts;

        const pxPerMs = speed / 1000;
        x += dir * pxPerMs * elapsed;

        const total = track.scrollWidth / 2;
        if (x <= -total) x += total;
        if (x >= 0) x -= total;

        track.style.transform = `translateX(${x}px)`;
        rafId = requestAnimationFrame(step);
      };

      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    };

    const stopRow1 = run(row1Ref.current, -1);
    const stopRow2 = run(row2Ref.current, +1);
    return () => {
      stopRow1?.();
      stopRow2?.();
    };
  }, [speed]);

  return (
    <section className="w-full overflow-hidden bg-gray-50 py-10">
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        {/* Row 1 (left) */}
        <div className="relative overflow-hidden mt-10">
          <ul
            ref={row1Ref}
            className="flex will-change-transform items-end"
            style={{
              gap: `${gap}px`,
              whiteSpace: "nowrap",
              transform: "translateX(0px)",
            }}
            aria-live="off"
          >
            {doubled.map((item, i) => (
              <li key={`row1-${i}`} className="shrink-0 flex items-end">
                <Card size={item.size}>
                  <Image
                    src={item.src}
                    alt={item.alt || "Showcase image"}
                    fill
                    sizes="(min-width:1536px) 420px, (min-width:1280px) 360px, (min-width:1024px) 300px, 90vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </Card>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 2 (right) */}
        <div className="relative overflow-hidden mt-6 mb-10">
          <ul
            ref={row2Ref}
            className="flex will-change-transform"
            style={{
              gap: `${gap}px`,
              whiteSpace: "nowrap",
              transform: "translateX(0px)",
            }}
            aria-live="off"
          >
            {doubled.map((item, i) => (
              <li key={`row2-${i}`} className="shrink-0">
                <Card size={item.size}>
                  <Image
                    src={item.src}
                    alt={item.alt || "Showcase image"}
                    fill
                    sizes="(min-width:1536px) 420px, (min-width:1280px) 360px, (min-width:1024px) 300px, 90vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ size = "md", children }) {
  const base = "relative overflow-hidden rounded-2xl";
  const sizes = {
    sm: "h-[140px] w-[240px] sm:h-[160px] sm:w-[280px]",
    md: "h-[170px] w-[300px] sm:h-[190px] sm:w-[340px]",
    lg: "h-[200px] w-[360px] sm:h-[220px] sm:w-[420px]",
  };
  return <div className={`${base} ${sizes[size]}`}>{children}</div>;
}

const DEMO_IMAGES = [
  { src: "/images/ao1.jpg", size: "md", alt: "Project A" },
  { src: "/images/random2.png", size: "sm", alt: "Project B" },
  { src: "/images/new2.jpg", size: "lg", alt: "Project C" },
  { src: "/images/outdoor.png", size: "md", alt: "Project D" },
  { src: "/images/new3.jpg", size: "sm", alt: "Project E" },
  { src: "/images/random4.png", size: "lg", alt: "Project F" },

  { src: "/images/drawing4.jpeg", size: "md", alt: "Project A" },
  { src: "/images/P2.jpg", size: "sm", alt: "Project B" },
  { src: "/images/pr3.jpg", size: "lg", alt: "Project C" },
  { src: "/images/senso1.jpg", size: "md", alt: "Project D" },
  { src: "/images/ss2.jpg", size: "sm", alt: "Project E" },
  { src: "/images/tr4.jpg", size: "lg", alt: "Project F" },
];
