"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ServicesRailExact({
  title = "OUR PROJECTS",
  showSecondary = true,
  services = DEFAULT_SERVICES,
  speed = 70,
  visibleCards = 4,
  widthScale = 0.95,
}) {
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const displayed = isMobile ? services.slice(0, 2) : services;
  const doubled = [...displayed, ...displayed];

  const GAP_PX = 24;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      track.style.transform = "translateX(0px)";
      return;
    }

    let rafId;
    let start;
    let x = 0;

    const step = (ts) => {
      if (start === undefined) start = ts;
      const elapsed = ts - start;
      start = ts;

      const pxPerMs = speed / 1000;
      x -= pxPerMs * elapsed;

      const total = track.scrollWidth / 2;
      if (Math.abs(x) >= total) x += total;

      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed, displayed.length]);

  const cardsPerViewport = isMobile ? displayed.length : visibleCards;
  const scale = isMobile ? 1 : widthScale;

  return (
    <section className="w-full overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Mobile/tablet */}
        <div className="mb-14 block lg:hidden text-center px-4">
          <p className="text-4xl font-bold tracking-widest mb-4 text-[#F58321]">
            {title}
          </p>

          {showSecondary && (
            <>
              <h2 className="mt-2 text-xl sm:text-3xl leading-tight text-gray-900">
                Designs <span className="text-[#F58321]">That Define QTS</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-600">
                Our Portfolio highlights a diverse range of projects, spanning from elegantly
                designed residential spaces to functional and stylish commercial interiors.
              </p>
            </>
          )}
        </div>

        {/* Desktop */}
        <div className="mb-14 hidden lg:block">
          <h2 className="text-4xl ml-6 font-bold tracking-widest mb-6 text-[#F58321]">
            {title}
          </h2>

          {showSecondary && (
            <>
              <h2 className="mt-2 ml-6 text-xl sm:text-3xl leading-tight text-gray-900">
                Designs <span className="text-[#F58321]">That Define QTS</span>
              </h2>
              <p className="mt-3 ml-6 text-base sm:text-lg text-gray-600">
                Our Portfolio highlights a diverse range of projects, spanning from elegantly designed residential spaces
                to functional and stylish commercial interiors.
              </p>
            </>
          )}
        </div>
      </div>

      {/* --- rail --- */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div className="relative overflow-hidden">
          <ul
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ whiteSpace: "nowrap" }}
            aria-live="off"
          >
            {doubled.map((item, i) => {
              const CardMedia = (
                <div className="relative w-full h-72 sm:h-80 lg:h-96 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    sizes="(min-width:1280px) 24vw, (min-width:1024px) 30vw, 90vw"
                    /* 👇 performance: sirf pehli image eager/priority, baaqi sab lazy */
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
                </div>
              );

              const titleClass = isMobile
                ? "text-sm font-semibold text-gray-900"
                : "text-base sm:text-lg font-semibold text-gray-900";
              const metaClass = isMobile ? "text-xs text-gray-500" : "text-sm text-gray-500";
              const textWrap = isMobile ? "text-center" : "text-center lg:text-left";

              const TitleBlock = (
                <div className={`mt-2 px-1 ${textWrap}`}>
                  <h3 className={titleClass}>{item.title}</h3>
                  {item.location && <p className={metaClass}>{item.location}</p>}
                  {item.year && <p className={metaClass}>{item.year}</p>}
                </div>
              );

              const CardInner = item.href ? (
                <Link
                  href={item.href}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58321] focus-visible:ring-offset-2 rounded-2xl"
                  aria-label={item.title}
                >
                  {CardMedia}
                  <div className={`mt-2 px-1 ${textWrap}`}>
                    <span className={`${titleClass} underline-offset-4 group-hover:underline`}>
                      {item.title}
                    </span>
                    {item.location && <p className={metaClass}>{item.location}</p>}
                    {item.year && <p className={metaClass}>{item.year}</p>}
                  </div>
                </Link>
              ) : (
                <>
                  {CardMedia}
                  {TitleBlock}
                </>
              );

              return (
                <li
                  key={`${item.title}-${i}`}
                  className="relative inline-block shrink-0"
                  style={{
                    width: `calc(((100vw - ${GAP_PX * (cardsPerViewport - 1)}px) / ${cardsPerViewport}) * ${scale})`,
                  }}
                >
                  {CardInner}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

const DEFAULT_SERVICES = [
  { title: "Arabian Oud", location: "Jeddah, Saudi Arabia", year: "2024", image: "/images/oud.png", href: "/our-project/arabian-oud" },
  { title: "Galaxy Hockey", location: "Taif, Saudi Arabia", year: "2025", image:     "/images/gh2.jpg", href: "/our-project/galaxy-hockey" },
  { title: "Hashim Villa", location: "Jeddah, Saudi Arabia", year: "2025", image: "/images/villa.png", href: "/our-project/hashim-villa" },
  { title: "Jorgee", location: "Riyadh, Saudi Arabia", year: "2025", image: "/images/jorge.png", href: "/our-project/jorgee" },
];
