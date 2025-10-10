"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

export default function Demolishing() {
  // Tabs for Demolishing & Construction
  const values = useMemo(
    () => [
      {
        key: "productivity",
        title: "Productivity",
        desc: "We streamline processes and remove friction so teams can deliver consistently and at speed.",
        image: "/images/building.jpg",
      },
      {
        key: "quality",
        title: "Quality",
        desc: "We choose to be safe by protecting ourselves and our team — and we never compromise on standards.",
        image: "/images/counter.jpg",
      },
      {
        key: "excellence",
        title: "Excellence",
        desc: "Pursuing detail and craft to achieve outcomes that stand out and stand the test of time.",
        image: "/images/11.jpg",
      },
      {
        key: "integrity",
        title: "Integrity",
        desc: "We are honest, transparent, and accountable — doing the right thing even when no one is watching.",
        image: "/images/buildings.jpg",
      },
      {
        key: "learning",
        title: "Learning",
        desc: "We improve through feedback, experimentation, and sharing knowledge across teams.",
        image: "/images/space3.jpg",
      },
      {
        key: "performance",
        title: "Performance",
        desc: "Measured by results. We align on goals and execute with clarity, focus, and discipline.",
        image: "/images/fire.jpeg",
      },
      {
        key: "customer",
        title: "Customer-Driven",
        desc: "We start from user needs and work backward, creating experiences people love to use.",
        image: "/images/services.jpg",
      },
      {
        key: "honesty",
        title: "Honesty",
        desc: "We communicate directly and respectfully, building trust with clients and colleagues.",
        image: "/images/ex.jpg",
      },
    ],
    []
  );

  const [activeValueKey, setActiveValueKey] = useState("quality");
  const activeValue = values.find((v) => v.key === activeValueKey) || values[1];

  // Function to determine if the screen is large enough for hover
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-[300px] w-full -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/new4.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
            About Us
          </h1>
        </div>
      </section>

      {/* Started in 2018 / Intro */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Desktop headings */}
          <div className="hidden lg:block">
            <h2 className="text-4xl font-bold tracking-widest mb-6 text-[#F58321]">
              Started in 2018
            </h2>
            <p className="mt-2 text-xl sm:text-3xl font-bold leading-tight text-gray-900">
              Shaping <span className="text-[#F58321]">Interiors</span> That
              Reflect{" "}
              <span className="text-[#F58321]">Vision And Elegance</span>
            </p>
            <p className="mt-3 text-base sm:text-lg text-gray-600 whitespace-nowrap">
              At QTS, we craft interiors that seamlessly blend creativity,
              functionality, and elegance to reflect your unique vision.
            </p>
          </div>

          {/* ✅ Mobile version (centered) */}
          <div className="lg:hidden text-center">
            {/* 1) Started in 2018 */}
            <h2 className="text-3xl font-bold tracking-widest text-[#F58321] uppercase">
              Started in 2018
            </h2>

            {/* 2) Headline */}
            <p className="mt-2 text-lg font-bold leading-snug text-gray-900">
              Shaping <span className="text-[#F58321]">Interiors</span> That
              Reflect{" "}
              <span className="text-[#F58321]">Vision And Elegance</span>
            </p>

            {/* 3) Subtext */}
            <p className="mt-3 text-base text-gray-600">
              At QTS, we craft interiors that seamlessly blend creativity,
              functionality, and elegance to reflect your unique vision.
            </p>

            {/* 5) Images stacked */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="relative h-56 overflow-hidden rounded-lg ring-1 ring-black/10">
                <Image
                  src="/images/about1.jpg"
                  alt="QTS office display"
                  fill
                  sizes="90vw"
                  className="object-cover"
                  /* priority removed → defaults to lazy */
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-lg ring-1 ring-black/10">
                <Image
                  src="/images/about2.jpg"
                  alt="Retail interior"
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* 4) Experience */}
            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              7+ Years Of Experience
            </h3>
            <p className="mt-2 text-base leading-relaxed text-gray-600">
              QTS is one of Dubai’s most trusted interior design and fit-out
              companies, recognized for shaping spaces that embody vision and
              elegance. From concept to completion, we partner with clients to
              transform ideas into inspiring realities. Our expertise lies in
              delivering distinctive, detail-driven fit-outs that elevate brands
              and create lasting impressions. By ensuring projects are completed
              on time, within budget, and with uncompromising quality, we make
              every space a true reflection of purpose and style.
            </p>
          </div>

          {/* Desktop grid */}
          <div className="mt-10 hidden lg:grid lg:grid-cols-12 gap-6">
            {/* Left: images */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              {/* First image, a bit narrower */}
              <div className="relative col-span-5 h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg ring-1 ring-black/10">
                <Image
                  src="/images/about1.jpg"
                  alt="QTS office display"
                  fill
                  sizes="(min-width:1024px) 20vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Second image, slightly wider */}
              <div className="relative col-span-7 h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg ring-1 ring-black/10">
                <Image
                  src="/images/about2.jpg"
                  alt="Retail interior"
                  fill
                  sizes="(min-width:1024px) 30vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: copy */}
            <div className="lg:col-span-6 flex items-center">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
                  7+ Years Of Experience
                </h3>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600 text-justify">
                  QTS is one of Dubai’s most trusted interior design and fit-out
                  companies, recognized for shaping spaces that embody vision
                  and elegance. From concept to completion, we partner with
                  clients to transform ideas into inspiring realities. Our
                  expertise lies in delivering distinctive, detail-driven
                  fit-outs that elevate brands and create lasting impressions.
                  By ensuring projects are completed on time, within budget, and
                  with uncompromising quality, we make every space a true
                  reflection of purpose and style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission with background */}
      <section
        className="w-full relative bg-cover bg-center bg-no-repeat h-auto md:h-[380px]"
        style={{ backgroundImage: "url('/images/about3.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 md:h-full">
          {/* Middle line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <div className="w-px bg-white/80" style={{ height: "560px" }} />
          </div>

          {/* Content: column on mobile, row on md+; absolute only on md+ */}
          <div className="relative z-10 flex flex-col gap-6 text-white py-8 md:absolute md:inset-x-0 md:bottom-8 md:flex-row md:items-end md:gap-10">
            {/* Vision */}
            <div className="w-full md:w-1/2 md:pr-8">
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-base leading-relaxed text-justify">
                We are committed to providing our clients with value-driven and
                efficient fit-out solutions. At QTS, we believe design has the
                power to enhance the spaces we live in and, in turn, improve
                quality of life. Our focus remains on delivering interiors that
                inspire, endure, and add meaningful value to every project.
              </p>
            </div>

            {/* Mission */}
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-base leading-relaxed text-justify">
                We are dedicated to providing sustainable solutions that create
                a positive impact on society. At QTS, we deliver and implement
                interior design solutions on a global scale, offering clients a
                complete design experience while leveraging our expertise,
                knowledge, and strong network of partners and collaborators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center lg:text-left">
              Our Values
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-6xl mb-20 text-center lg:text-left">
              At QTS, our values define who we are and how we work. They guide
              our commitment to creating interiors that are not only beautiful
              but functional, ethical, and sustainable. Each value reflects our
              promise to clients, employees, and partners — ensuring excellence
              at every step.
            </p>
          </header>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Image first on mobile, second on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="relative h-72 sm:h-96 lg:h-[33rem] overflow-hidden rounded-lg">
                <Image
                  key={activeValue.image}
                  src={activeValue.image}
                  alt={activeValue.title}
                  fill
                  sizes="(min-width:1024px) 40vw, 90vw"
                  className="object-cover"
                  /* priority removed → defaults to lazy */
                />
              </div>
            </div>

            {/* Links/list: row on mobile, vertical list on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <ul className="flex gap-3 overflow-x-auto no-scrollbar pb-4 lg:block lg:gap-0 lg:overflow-visible lg:pb-0 lg:border-b lg:border-gray-200 border-0">
                {values.map((v, idx) => {
                  const isActive = v.key === activeValueKey;
                  return (
                    <li
                      key={v.key}
                      className={[
                        "shrink-0 lg:shrink",
                        idx !== values.length - 1
                          ? "lg:border-b lg:border-gray-200"
                          : "",
                        "py-0 lg:py-4",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveValueKey(v.key)}
                        onMouseEnter={() => setActiveValueKey(v.key)} // hover changes image
                        onFocus={() => setActiveValueKey(v.key)} // keyboard focus also changes
                        className={[
                          "px-3 py-2 rounded-none text-sm font-semibold",
                          isActive
                            ? "bg-[#F58321] text-white"
                            : "bg-white text-gray-900",
                          "shadow-sm ring-1 ring-black/5",
                          "lg:px-0 lg:py-0 lg:bg-transparent lg:text-left lg:shadow-none lg:ring-0",
                          "group w-full text-left",
                        ].join(" ")}
                      >
                        {/* Desktop title */}
                        <div
                          className={[
                            "hidden lg:block text-base sm:text-lg font-semibold",
                            isActive ? "lg:text-[#F58321]" : "lg:text-gray-900",
                          ].join(" ")}
                        >
                          <span className="hidden lg:inline">{v.title}</span>
                        </div>

                        {/* Mobile title inside pill */}
                        <span className="lg:hidden">{v.title}</span>

                        {/* Description only on desktop */}
                        {isActive && (
                          <p className="hidden lg:block mt-1 text-sm text-gray-600 max-w-2xl">
                            {v.desc}
                          </p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
