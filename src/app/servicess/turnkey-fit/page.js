"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import ScrollingShowcase from "src/app/components/Imagess/ScrollingShowcase";
import ServicesRail from "src/app/components/Our-Services3/page";

export default function Turnkey() {
  // Tabs for Designing & Space Planning
  const tabs = useMemo(
    () => [
      {
        key: "concept",
        title: "End-to-End Project Management",
        desc: "End-to-End Project Management — Overseeing every stage from concept to completion with precision and accountability.",
        image: "/images/end.jpg",
      },
      {
        key: "planning",
        title: "Design Development & Execution",
        desc: "Design Development & Execution — Turning creative concepts into practical, high-quality built environments.",
        image: "/images/ex.jpg",
      },
      {
        key: "ergonomics",
        title: "Civil, MEP & Finishing Works",
        desc: "Civil, MEP & Finishing Works — Delivering complete structural, service, and aesthetic excellence in every project.",
        image: "/images/building.jpg",
      },
      {
        key: "renders",
        title: "Furniture, Fixtures & Equipment",
        desc: "Furniture, Fixtures & Equipment — Providing stylish, functional elements that complete and enhance every space.",
        image: "/images/1122.jpg",
      },
      {
        key: "sustainability",
        title: "Final Styling & Decor",
        desc: "Final Styling & Decor — Adding the perfect finishing touches to create cohesive and inspiring spaces.",
        image: "/images/about1.jpg",
      },
      {
        key: "furnishing",
        title: "On-Time, On-Budget Delivery",
        desc: "On-Time, On-Budget Delivery — Ensuring every project meets deadlines and financial goals with precision.",
        image: "/images/buildings.jpg",
      },
    ],
    []
  );

  const [activeKey, setActiveKey] = useState(tabs[1].key);
  const active = tabs.find((t) => t.key === activeKey) || tabs[0];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-[300px] w-full -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/cardsImages.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
            Turnkey Fit-Outs
          </h1>
        </div>
      </section>

      {/* Designing & Space Planning (tabs + image swap) */}
      <section className="w-full my-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Heading + Intro */}
          <header className="mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Turnkey<span className="text-[#F58321]"> Fit-Outs</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-5xl">
              From design to handover, we deliver ready-to-use spaces without the hassle of multiple contractors. Our turnkey model ensures consistency, efficiency, and peace of mind.
            </p>
          </header>

          {/* Content */}
          <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Image: Changes with active tab */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="relative h-64 sm:h-80 lg:h-[28rem] overflow-hidden rounded-lg ring-1 ring-black/10">
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

            {/* Tabs: Mobile row (pills), Desktop vertical list */}
            <div className="order-3 lg:order-2 lg:col-span-5">
              <ul
                className="flex gap-3 overflow-x-auto no-scrollbar pb-4
                  lg:block lg:overflow-visible lg:pb-0
                  lg:border-b lg:border-gray-200 border-0"
              >
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
                        onClick={() => setActiveKey(item.key)} // mobile
                        onMouseEnter={() => {
                          if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                            setActiveKey(item.key);
                          }
                        }} // desktop hover
                        className={[
                          "px-3 py-2 rounded-none text-sm font-semibold",
                          isActive ? "bg-[#F58321] text-white" : "bg-white text-gray-900",
                          "shadow-sm ring-1 ring-black/5",
                          "lg:px-0 lg:py-0 lg:bg-transparent lg:text-left lg:shadow-none lg:ring-0 w-full text-left",
                        ].join(" ")}
                      >
                        {/* Mobile label */}
                        <span className="lg:hidden">{item.title}</span>

                        {/* Desktop label + optional description for the active one */}
                        <div className="hidden lg:block">
                          <div
                            className={`text-base font-semibold ${isActive ? "text-[#F58321]" : "text-gray-900"}`}
                          >
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
