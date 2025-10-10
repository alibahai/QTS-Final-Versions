"use client";

import Link from "next/link";

/* ================= ICONS ================= */
const IconBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3V19"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconPencil = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14.06 4.19 17.81 7.94"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconCompass = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="m15.5 8.5-2.12 4.88L8.5 15.5l2.12-4.88L15.5 8.5Z"
      fill="currentColor"
    />
  </svg>
);

const IconGauge = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4.93 19.07A10 10 0 1 1 19.07 4.93"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M14 10l5 5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconBarcode = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 6v12M8 6v12M12 6v12M16 6v12M20 6v12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24"  fill="none" {...p}>
    <path
      d="M4 20h16M6 20V8h12v12M10 12h4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/* ================= DATA ================= */
const ITEMS = [
  { title: "Designing and Space Planning", Icon: IconBook, href: "/servicess/design-drawings" },
  { title: "Joinery Work", Icon: IconPencil, href: "/servicess/joinery-work" },
  { title: "Drawing and Approvals", Icon: IconCompass, href: "/servicess/drawings-approvals" },
  { title: "MEP Works", Icon: IconGauge, href: "/servicess/mep" },
  { title: "Turnkey Fit Outs", Icon: IconBarcode, href: "/servicess/turnkey-fit" },
  { title: "Demolishing, Construction and Refurbishment", Icon: IconBuilding, href: "/servicess/demolishing" },
];

/* =============== COMPONENT =============== */
export default function LeftServicesRail({ menuOpen }) {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 mt-13">
      {/* Desktop panel */}
      <div className="bg-neutral-900/25 backdrop-blur-m rounded-r-sm rounded-l-none py-3 md:block">
        <div className="flex flex-col">
          {ITEMS.map(({ title, Icon, href }) => (
            <Link
              key={title}
              href={href}
              aria-label={title}
              className="
                group flex h-10 w-[360px] md:w-[590px] items-center overflow-hidden
                bg-transparent hover:bg-red-600 transition-colors duration-200
                rounded-r-md rounded-l-none
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
            >
              {/* Icon */}
          <span className="pl-2 pr-2 flex h-full items-center">
  <Icon className="h-5 w-5 md:h-7 md:w-7 text-gray-200 group-hover:text-white" />
</span>


              {/* Label: sm on mobile, lg on desktop */}
              <span
                className={`
                  inline-flex h-full items-center 
                  text-sm md:text-2xl font-bold leading-none
                  whitespace-nowrap text-gray-200 group-hover:text-white
                  transition-all duration-200
                  ${menuOpen ? "hidden" : "inline-flex"}
                `}
              >
                {title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
