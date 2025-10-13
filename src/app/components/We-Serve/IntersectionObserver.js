"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/** Small hook for count-up animation */
function useCountUp(startWhenVisibleRef, targets, duration = 1400) {
  const [values, setValues] = useState(targets.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = startWhenVisibleRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((e) => e.isIntersecting);
        if (isVisible && !startedRef.current) {
          startedRef.current = true;

          const start = performance.now();
          const animate = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setValues(targets.map((target) => Math.round(target * t)));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [startWhenVisibleRef, targets, duration]);

  return values;
}

export default function SectorWeServe() {
  const services = useMemo(
    () => [
      {
        key: "ceiling",
        title: "Ceiling & Partitions",
        blurb: "Suspended ceilings, acoustic panels, and partitions.",
        image: "/images/jr55.jpg",
      },
      {
        key: "fitout",
        title: "Fitout Interior & MEP Services",
        blurb: "Turnkey interiors fully integrated with MEP.",
        image: "/images/turnkey.png",
      },
      {
        key: "gym",
        title: "Gym Fitout",
        blurb: "Shock-absorbing floors, mirrors, and ventilation.",
        image: "/images/gym.jpeg",
      },
      {
        key: "office",
        title: "Office Fitout",
        blurb: "Ergonomic workstations, meeting rooms, and control.",
        image: "/images/about1.jpg",
      },
      {
        key: "restaurant",
        title: "Restaurant Fitout",
        blurb: "Kitchen-fronts, hygienic finishes, and guest flow.",
        image: "/images/P5.jpg",
      },
      {
        key: "residential",
        title: "Residential Fitout",
        blurb: "Bespoke cabinetry, premium finishes, and smart storage.",
        image: "/images/C1.JPG",
      },
      {
        key: "retail",
        title: "Retail Fitout",
        blurb: "Modular displays, cashwraps, and visual merchandising.",
        image: "/images/space3.jpg",
      },
    ],
    []
  );

  const [activeKey, setActiveKey] = useState(services[0].key);
  const active = services.find((s) => s.key === activeKey) || services[0];

  const statsRef = useRef(null);
  const statTargets = [18, 500, 490, 50];
  const statValues = useCountUp(statsRef, statTargets, 1400);

  return (
    <section className="w-full pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 lg:px-8 py-12">
        {/* Mobile heading */}
        <div className="block lg:hidden text-center">
          <h2 className="text-4xl font-bold tracking-widest mb-4 text-[#F58321]">
            SECTOR WE SERVE
          </h2>
          <h2 className="mt-2 text-xl sm:text-3xl leading-tight text-gray-900">
            Experience The{" "}
            <span className="text-[#F58321]"> Craft Of Bespoke Design </span> Of This Platform
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            QTS delivers a complete design experience, offering clients access to a wide
            selection of products and customization options. Through premium materials and
            expert artisan know-how, we transform spaces into personalized living environments.
          </p>
        </div>

        {/* Desktop heading */}
        <div className="hidden lg:block">
          <h2 className="text-4xl font-bold tracking-widest mb-6 text-[#F58321]">
            SECTOR WE SERVE
          </h2>
          <p className="mt-2 text-xl sm:text-3xl leading-tight text-gray-900">
            Experience The <span className="text-[#F58321]">Craft Of Bespoke Design</span>
          </p>
          <p className="mt-3 text-base sm:text-lg text-gray-600 whitespace-nowrap">
            QTS delivers a complete design experience, offering clients access to a wide
            selection of products and customization options.
            <br />
            Through premium materials and expert artisan know-how, we transform spaces into
            personalized living environments.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left image */}
          <div className="lg:col-span-7 mt-6">
            <div className="relative h-72 sm:h-96 lg:h-[36.5rem] overflow-hidden rounded-lg ring-1 ring-black/10">
              <Image
                key={active.image}
                src={active.image}
                alt={active.title}
                fill
                sizes="(min-width:1024px) 56vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right list (desktop with blurb) */}
          <div className="lg:col-span-5 hidden lg:block">
            <ul className="mt-5">
              {services.map((s) => {
                const isActive = s.key === activeKey;
                return (
                  <li key={s.key} className="pb-5 border-b border-gray-200 mb-9">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveKey(s.key)}
                      onClick={() => setActiveKey(s.key)}
                      className="w-full text-left group"
                    >
                      <div
                        className={`text-lg font-semibold ${
                          isActive
                            ? "text-[#F58321]"
                            : "text-gray-900 group-hover:text-[#F58321] transition-colors"
                        }`}
                      >
                        {s.title}
                      </div>
                      {isActive && (
                        <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-gray-600">
                          {s.blurb}
                        </p>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ✅ Mobile tabs row (scrollable pills) */}
          <div className="lg:hidden">
            <ul
              className="flex gap-3 overflow-x-auto no-scrollbar pb-4 mt-5"
              role="tablist"
            >
              {services.map((s) => {
                const isActive = s.key === activeKey;
                return (
                  <li key={s.key} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveKey(s.key)}
                      className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap
                        shadow-sm ring-1 ring-black/5
                        ${isActive ? "bg-[#F58321] text-white" : "bg-white text-gray-900"}
                        active:scale-95 transition`}
                    >
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef}>
          {/* Desktop full stats */}
          <div className="mt-10 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="pb-4 border-b border-gray-200">
              {/* ✅ CHANGED: Increased text size from text-3xl sm:text-4xl to text-5xl sm:text-6xl */}
              <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                {statValues[0]}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-700">Years Of Experience</div>
              <p className="mt-1 text-sm text-gray-500">
                100+ spaces transformed with design and precision.
              </p>
            </div>
            <div className="pb-4 border-b border-gray-200">
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                {statValues[1]}+
              </div>
              <div className="mt-1 text-sm font-medium text-gray-700">Projects Completed</div>
              <p className="mt-1 text-sm text-gray-500">
                Successfully executed with quality, precision and care.
              </p>
            </div>
            <div className="pb-4 border-b border-gray-200">
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                {statValues[2]}+
              </div>
              <div className="mt-1 text-sm font-medium text-gray-700">Client Satisfaction</div>
              <p className="mt-1 text-sm text-gray-500">
                Backed by hundreds of satisfied clients worldwide.
              </p>
            </div>
            <div className="pb-4 border-b border-gray-200">
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                {statValues[3]}+
              </div>
              <div className="mt-1 text-sm font-medium text-gray-700">Expert Professionals</div>
              <p className="mt-1 text-sm text-gray-500">
                A skilled team dedicated to delivering top-quality results.
              </p>
            </div>
          </div>

          {/* Mobile compact stats */}
          <div className="mt-10 grid grid-cols-4 gap-2 text-center md:hidden">
            <div>
              {/* ✅ CHANGED: Increased text size from text-2xl to text-4xl */}
              <div className="text-4xl font-bold text-gray-900">{statValues[0]}</div>
              <div className="mt-0.5 text-xs font-medium text-gray-700">Years</div>
            </div>
            <div>
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-4xl font-bold text-gray-900">{statValues[1]}+</div>
              <div className="mt-0.5 text-xs font-medium text-gray-700">Projects</div>
            </div>
            <div>
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-4xl font-bold text-gray-900">{statValues[2]}+</div>
              <div className="mt-0.5 text-xs font-medium text-gray-700">Clients</div>
            </div>
            <div>
              {/* ✅ CHANGED: Increased text size */}
              <div className="text-4xl font-bold text-gray-900">{statValues[3]}+</div>
              <div className="mt-0.5 text-xs font-medium text-gray-700">Experts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
