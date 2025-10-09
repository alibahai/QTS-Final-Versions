"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import ScrollingShowcase from "src/app/components/Imagess/ScrollingShowcase";
import ServicesRail from "src/app/components/Our-Services3/page";

export default function Demolishing() {
  // Tabs for Demolishing & Construction
  const tabs = useMemo(
    () => [
      { key: "concept",       title: "Safe & Controlled Demolitions",  desc: "Reinventing spaces with modern design solution", image: "/images/buildings.jpg" },
      { key: "planning",      title: "Structural & Interior Construction", desc: "Building strength and beauty through seamless structural and interior craftsmanship.", image: "/images/turnkey.png" },
      { key: "ergonomics",    title: "Refurbishment & Remodeling",     desc: "Transforming existing spaces into renewed, functional, and modern environments.", image: "/images/fit.jpg" },
      { key: "renders",       title: "Sustainable Waste Management",   desc: "Promoting eco-friendly practices to reduce, reuse, and responsibly manage waste.", image: "/images/drain.jpeg" },
      { key: "sustainability",title: "Material Reuse & Recycling",     desc: "Giving materials a second life through smart reuse and efficient recycling.", image: "/images/MEP.jpeg" },
      { key: "furnishing",    title: "Future-Ready Construction",      desc: "Building innovative, resilient structures designed to last for generations.", image: "/images/outdoor.png" },
    ],
    []
  );

  const [activeKey, setActiveKey] = useState(tabs[1].key);
  const active = tabs.find((t) => t.key === activeKey) || tabs[0];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-[300px] w-full -mt-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/cardsImages.jpg')" }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-center font-bold text-white drop-shadow text-2xl sm:text-2xl md:text-5xl leading-snug md:leading-tight">
            Demolishing, Construction &amp; Refurbishment
          </h1>
        </div>
      </section>

      {/* Demolishing & Construction Tabs + Image Swap */}
      <section className="w-full my-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Heading + Intro */}
          <header className="mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Demolishing,<span className="text-[#F58321]"> Construction & Refurbishment</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-5xl">
              Every transformation begins with a strong foundation. Whether demolishing, building, or refurbishing, we ensure safety, innovation, and lasting quality.
            </p>
          </header>

          {/* Content */}
          <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Image: Changes with active tab */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="relative h-64 sm:h-80 lg:h-[29rem] overflow-hidden rounded-lg ring-1 ring-black/10">
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width:1024px) 55vw, 90vw"
                  className="object-cover"
                  /* priority removed → default lazy */
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="order-3 lg:order-2 lg:col-span-5">
              <ul className="flex gap-3 overflow-x-auto no-scrollbar pb-4 lg:block lg:overflow-visible lg:pb-0 lg:border-b lg:border-gray-200 border-0">
                {tabs.map((item, idx, arr) => {
                  const isActive = item.key === activeKey;
                  return (
                    <li
                      key={item.key}
                      className={[
                        "shrink-0 lg:shrink",
                        idx > 0 ? "lg:mt-4" : "",
                        idx !== arr.length - 1 ? "lg:border-b lg:border-gray-200" : "",
                        "py-0 lg:py-4",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveKey(item.key)}
                        onMouseEnter={() => { if (typeof window !== "undefined" && window.innerWidth >= 1024) setActiveKey(item.key); }}
                        className={[
                          "px-3 py-2 rounded-none text-sm font-semibold",
                          isActive ? "bg-[#F58321] text-white" : "bg-white text-gray-900",
                          "shadow-sm ring-1 ring-black/5",
                          "lg:px-0 lg:py-0 lg:bg-transparent lg:text-left lg:shadow-none lg:ring-0 w-full text-left",
                        ].join(" ")}
                      >
                        <span className="lg:hidden">{item.title}</span>
                        <div className="hidden lg:block">
                          <div className={`text-base font-semibold ${isActive ? "text-[#F58321]" : "text-gray-900"}`}>
                            {item.title}
                          </div>
                          {isActive && item.desc && (
                            <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <ScrollingShowcase />
        </div>
      </section>

      <section>
        <div>
          <ServicesRail />
        </div>
      </section>
    </main>
  );
}
