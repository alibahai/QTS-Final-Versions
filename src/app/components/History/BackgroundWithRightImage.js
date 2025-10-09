"use client";

import Image from "next/image";

export default function BackgroundWithRightImage({
  backgroundSrc = "/images/background1.jpg",
  foregroundSrc = "/images/new.jpg",
}) {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20">
      {/* Background image */}
      <Image
        src={backgroundSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/5 md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:to-transparent" />

      {/* Foreground content */}
      <div className="relative z-20">
        <div
          className="
            mx-auto max-w-6xl
            grid grid-cols-1 lg:grid-cols-12 items-center
            gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8
          "
        >
          {/* Left: text (always visible) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-4xl font-bold uppercase tracking-wider mb-4 text-[#F58321]">
              Started in 2018
            </h2>

            <p className="mt-4 mb-8  leading-tight tracking-tight text-white text-2xl sm:text-xl md:text-2xl">
              <span className="block">Where Creativity Meets</span>
              <span className="block">
                Function, And{" "}
                <span className="inline text-[#F58321]">Style Comes</span>
              </span>
              <span className="block text-[#F58321]">Alive</span>
            </p>

            <div className="mt-4 mb-8 grid grid-cols-1 gap-3 text-white/90 sm:grid-cols-2">
              {[
                "Bespoke Interior Designs",
                "Modern Fit-Out Solutions",
                "Stylish & Purposeful Spaces",
                "UAE’s Trusted Design Partner",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-1 h-5 w-5 flex-none text-[#F58321]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              From homes to offices to large-scale commercial projects, QTS is
              committed to turning every vision into an extraordinary reality.
              Designs that speak for themselves:
            </p>

            <a
              href=""
              className="mt-6 inline-block text-sm font-semibold text-[#F58321] hover:text-orange-300"
            >
              Discover QTS →
            </a>
          </div>

          {/* Right: foreground image — hidden on mobile/tablet */}
          <div className="lg:col-span-6 hidden lg:flex justify-center">
            <div
              className="
                relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10
                h-[400px] w-[400px] sm:h-[460px] sm:w-[460px]
              "
            >
              <Image
                src={foregroundSrc}
                alt="Project sample"
                width={1000}
                height={700}
                className="h-full w-full object-cover"
                sizes="(min-width:1024px) 40vw, 460px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
