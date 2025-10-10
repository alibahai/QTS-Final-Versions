"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/* ================= ICONS ================= */
const IconBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3V19" stroke="white" strokeWidth="1.5" />
  </svg>
);
const IconPencil = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="M14.06 4.19 17.81 7.94" stroke="white" strokeWidth="1.5" />
  </svg>
);
const IconCompass = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="m15.5 8.5-2.12 4.88L8.5 15.5l2.12-4.88L15.5 8.5Z" fill="white" />
  </svg>
);
const IconGauge = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4.93 19.07A10 10 0 1 1 19.07 4.93"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="M14 10l5 5" stroke="white" strokeWidth="1.5" />
  </svg>
);
const IconBarcode = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 6v12M8 6v12M12 6v12M16 6v12M20 6v12"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);
const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 20h16M6 20V8h12v12M10 12h4" stroke="white" strokeWidth="1.5" />
  </svg>
);

const Resid = (p) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="24"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      d="M14 6H1a11.4 11.4 0 0 1 1-4h11a11.4 11.4 0 0 1 1 4M3 7h9v6h-1V8H8v5H3zm1 3h3V8H4z"
    />
  </svg>
);

const Comm = (p) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="24"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      d="M11.8 12.5V10c.7-.1 1.2-.7 1.2-1.5S12.3 7 11.5 7S10 7.7 10 8.5c0 .7.5 1.4 1.2 1.5v2.5H7V1H2v11.5H1v.5h13v-.5zM6 10H3V9h3zm0-2H3V7h3zm0-2H3V5h3zm0-2H3V3h3z"
    />
  </svg>
);

/* ================= DATA ================= */
const SERVICES = [
  {
    title: "Design & Space Planning",
    Icon: IconBook,
    href: "/servicess/design-drawings",
  },
  { title: "Joinery Works", Icon: IconPencil, href: "/servicess/joinery-work" },
  {
    title: "Drawings & Approvals",
    Icon: IconCompass,
    href: "/servicess/drawings-approvals",
  },
  { title: "MEP Works", Icon: IconGauge, href: "/servicess/mep" },
  {
    title: "Turnkey Fit-Outs",
    Icon: IconBarcode,
    href: "/servicess/turnkey-fit",
  },
  {
    title: "Demolition, Construction & Refurbishment",
    Icon: IconBuilding,
    href: "/servicess/demolishing",
  },
];

/** Categories shown under "Our Projects" */
const SUPPORT_CATEGORIES = [
  { key: "commercial", title: "Commercials", Icon: Resid, href: "#" },
  { key: "residential", title: "Residentials", Icon: Comm, href: "#" },
];

/** Projects for each category (4 each) */
const COMMERCIAL_PROJECTS = [
  { title: "Arabian Oud", href: "/our-project/arabian-oud" },
  { title: "Galaxy Hockey", href: "/our-project/galaxy-hockey" },
  { title: "Jarge", href: "/our-project/jorgee" },
  { title: "Ayur Care", href: "/our-project/ayur-care" },
  { title: "Hareer", href: "/our-project/hareer" },
  { title: "Professor", href: "/our-project/professor" },
  { title: "Fitn Glam", href: "/our-project/fitnglam" },
  { title: "Tous Les Jours", href: "/our-project/tous-les-jours" },
  { title: "Adore", href: "/our-project/adore" },
  { title: "Turkish Icecreeam", href: "/our-project/turkish-icecream" },
  { title: "Bianco", href: "/our-project/bianco" },
  { title: "Cold Station", href: "/our-project/coldstation" },
  { title: "Creep & Go", href: "/our-project/creep&go" },
  { title: "Exibition", href: "/our-project/exibition" },
  { title: "Mania", href: "/our-project/mania" },
  { title: "Maria Fashion", href: "/our-project/maria-fashion" },
  { title: "Senso Shop", href: "/our-project/senso-shop" },
  { title: "Toyo Station", href: "/our-project/toyo-station" },
 { title: "Peach Passion", href: "/our-project/peach-passion" },
  { title: "Wafi Mall", href: "/our-project/wafi-mall" },
  { title: "Gym", href: "/our-project/gym" },
  { title: "Barsha Mall", href: "/our-project/barsha-mall" },
  { title: "Bungalaw Mall", href: "/our-project/bungalaw-mall" },
  { title: "Courtyard Mall", href: "/our-project/courtyard-mall" },
  { title: "Deeny", href: "/our-project/deeny" },
  { title: "Jumeriah Road", href: "/our-project/jumeriah-road" },
  { title: "Maliha Road ", href: "/our-project/maliha-road " },
  { title: "Senso City", href: "/our-project/senso-city" },
  { title: "Senso Outlet", href: "/our-project/senso-outlet" },


];

const RESIDENTIAL_PROJECTS = [
  { title: "Hashim Villa", href: "/our-project/hashim-villa" },
  { title: "Sufoh Villa", href: "/our-project/sufoh-villa" },
 
];

export default function Navbar({
  firstSectionId = "hero",
  includeSpacer = true,
  videoSrc = "",
}) {
  const [open, setOpen] = useState(false); // mobile drawer
  const [openMenu, setOpenMenu] = useState("none"); // "none" | "services" | "support"
  const [mServices, setMServices] = useState(false); // mobile services accordion
  const [mSupport, setMSupport] = useState(false); // mobile support accordion
  const [showBg, setShowBg] = useState(false);

  // which category is hovered inside the Support dropdown
  const [hoveredSupportKey, setHoveredSupportKey] = useState(null); // "commercial" | "residential" | null

  const navRef = useRef(null);
  const thresholdRef = useRef(80);
  const closeTimerRef = useRef(null);
  const pathname = usePathname();

  /* ===== Scroll background ===== */
  useEffect(() => {
    const navEl = navRef.current;
    const hero = document.getElementById(firstSectionId);
    let threshold = 80;

    if (navEl && hero) {
      const heroTop = hero.offsetTop;
      const heroHeight = hero.offsetHeight;
      const heroCenter = heroTop + heroHeight * 0.5;
      const navH = navEl.offsetHeight || 80;
      threshold = heroCenter - navH * 0.5;
    }
    thresholdRef.current = Math.max(0, threshold);

    const apply = () => {
      const navHNow = (navRef.current && navRef.current.offsetHeight) || 80;
      const current = window.scrollY + navHNow * 0.5;
      setShowBg(current >= thresholdRef.current);
    };
    apply();

    const onScroll = () => apply();
    const onResize = () => apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [firstSectionId, pathname]);

  /* ===== Close on ESC ===== */
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setOpenMenu("none");
      setMServices(false);
      setMSupport(false);
      setHoveredSupportKey(null);
    }
  }, []);
  useEffect(() => {
    if (!open && openMenu === "none") return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openMenu, onKeyDown]);

  /* ===== Body scroll lock while drawer is open ===== */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ===== Desktop hover delay for popovers ===== */
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu("none");
      setHoveredSupportKey(null);
    }, 160);
  };

  const LOGO_SRC = "/images/2.png";

  /** Reusable dropdown panel (Services) */
  const Dropdown = ({ id, open, items }) => (
    <div
      id={id}
      role="menu"
      aria-label={id}
      className={`${
        open
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      } absolute left-1/2 top-full -translate-x-1/2 mt-4 z-[60] w-[720px]
         rounded-2xl bg-gray-800 text-white shadow-2xl transition duration-150 origin-top`}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
    >
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-x-10 gap-y-3">
          {items.map(({ title, Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              role="menuitem"
              className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-red-600"
              onClick={() => setOpenMenu("none")}
            >
              {Icon && <Icon className="h-6 w-6" />}
              <span className="text-sm font-medium leading-snug">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  /** Specialized dropdown for Our Projects
   *  - First row: 2 columns => Commercials, Residentials
   *  - Directly UNDER that row: show 4 projects (2 columns) for the hovered category
   */
  const SupportDropdown = ({ id, open }) => {
    const active =
      hoveredSupportKey === "commercial"
        ? COMMERCIAL_PROJECTS
        : hoveredSupportKey === "residential"
        ? RESIDENTIAL_PROJECTS
        : null;

    return (
      <div
        id={id}
        role="menu"
        aria-label={id}
        className={`${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } absolute left-1/2 top-full -translate-x-1/2 mt-4 z-[60] w-[720px]
           rounded-2xl bg-gray-800 text-white shadow-2xl transition duration-150 origin-top`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="p-4 sm:p-5">
          {/* Row of two category tabs */}
          <div className="grid grid-cols-2 gap-3">
            {SUPPORT_CATEGORIES.map(({ key, title, Icon }, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoveredSupportKey(key)}
                className={`group flex items-center gap-3 rounded-xl p-3 text-left transition-colors duration-200 
                  ${
                    hoveredSupportKey === key
                      ? "bg-red-600" // 🔴 stays red when active
                      : "hover:bg-red-600/70" // 🔴 light red on hover
                  }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-semibold leading-snug">
                  {title}
                </span>
              </button>
            ))}
          </div>

          {/* Projects panel appears directly UNDER the categories */}
          {/* Projects panel appears directly UNDER the categories */}
          {active ? (
            <div className="mt-4 border-t border-white/10 pt-4">
              {/* ✅ Scrollable container for desktop */}
              <div className="hidden lg:block max-h-[220px] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {active.map(({ title, Icon, href }, idx) => (
                    <Link
                      key={idx}
                      href={href}
                      role="menuitem"
                      className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-red-600"
                      onClick={() => {
                        setOpenMenu("none");
                        setHoveredSupportKey(null);
                      }}
                    >
                      {Icon && <Icon className="h-6 w-6" />}
                      <span className="text-sm font-medium leading-snug">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile: normal list, no scroll limit */}
              <div className="lg:hidden grid grid-cols-2 gap-x-8 gap-y-3">
                {active.map(({ title, Icon, href }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    role="menuitem"
                    className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-red-600"
                    onClick={() => {
                      setOpenMenu("none");
                      setHoveredSupportKey(null);
                    }}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                    <span className="text-sm font-medium leading-snug">
                      {title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Fixed header */}
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          showBg
            ? "bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-gray-900/50 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src={LOGO_SRC}
                alt="Site logo"
                fill
                sizes="80px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-10 text-white">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm xl:text-base font-medium tracking-wide transition hover:text-white/80"
              >
                Home
              </Link>
            </li>

            {/* Desktop: Services */}
            <li
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenMenu("services");
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openMenu === "services"}
                aria-controls="services-menu"
                onClick={() =>
                  setOpenMenu(openMenu === "services" ? "none" : "services")
                }
                className="inline-flex items-center gap-1 text-sm xl:text-base font-medium tracking-wide transition hover:text-white/80"
              >
                Services
                <svg
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 opacity-90 transition-transform ${
                    openMenu === "services" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>
              <Dropdown
                id="services-menu"
                open={openMenu === "services"}
                items={SERVICES}
              />
            </li>

            {/* Desktop: Our Projects (two categories + projects directly underneath) */}
            <li
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenMenu("support");
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openMenu === "support"}
                aria-controls="support-menu"
                onClick={() =>
                  setOpenMenu(openMenu === "support" ? "none" : "support")
                }
                className="inline-flex items-center gap-1 text-sm xl:text-base font-medium tracking-wide transition hover:text-white/80"
              >
                Our Projects
                <svg
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 opacity-90 transition-transform ${
                    openMenu === "support" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>

              <SupportDropdown
                id="support-menu"
                open={openMenu === "support"}
              />
            </li>

            <li>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm xl:text-base font-medium tracking-wide transition hover:text-white/80"
              >
                About Us
              </Link>
            </li>

            {/* Contact Us simple button */}
            <li>
              <Link
                href="/contact"
                className="px-4 py-2 bg-red-600 rounded-md text-white font-medium"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 hover:text-white"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Spacer under fixed header */}
      {includeSpacer && <div style={{ height: "80px" }} aria-hidden="true" />}

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Drawer — slides from the RIGHT */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className={`lg:hidden fixed inset-y-0 right-0 z-[60] w-[86%] max-w-sm bg-neutral-900 text-white shadow-2xl
                    will-change-transform transform-gpu transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="relative h-8 w-8">
              <Image
                src={LOGO_SRC}
                alt="Site logo"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="sr-only">Home</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer content */}
        <nav className="px-4 py-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <ul className="space-y-4">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between text-base font-medium hover:text-white/80"
              >
                <span>Home</span>
              </Link>
            </li>

            {/* Services (MOBILE) */}
            <li>
              <button
                type="button"
                onClick={() => setMServices((v) => !v)}
                className="w-full flex items-center justify-between text-base font-medium hover:text-white/80"
                aria-expanded={mServices}
                aria-controls="m-services"
              >
                <span>Services</span>
                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    mServices ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>

              <div
                id="m-services"
                className={`overflow-hidden transition-all duration-200 ${
                  mServices ? "max-h-[1000px] mt-3" : "max-h-0"
                }`}
              >
                <div className="grid grid-cols-1 gap-2">
                  {SERVICES.map(({ title, Icon, href }, i) => (
                    <Link
                      key={i}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-red-600"
                    >
                      {Icon && <Icon className="h-6 w-6" />}
                      <span className="text-sm font-medium">{title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Our Projects (MOBILE) */}
            <li>
              <button
                type="button"
                onClick={() => setMSupport((v) => !v)}
                className="w-full flex items-center justify-between text-base font-medium hover:text-white/80"
                aria-expanded={mSupport}
                aria-controls="m-support"
              >
                <span>Our Projects</span>
                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    mSupport ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>

              <div
                id="m-support"
                className={`overflow-hidden transition-all duration-200 ${
                  mSupport ? "max-h-[1000px] mt-3" : "max-h-0"
                }`}
              >
                {/* Commercials */}
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setHoveredSupportKey(
                        hoveredSupportKey === "commercial" ? null : "commercial"
                      )
                    }
                    className="w-full flex items-center justify-between text-sm font-medium p-2 rounded-lg hover:bg-red-600"
                  >
                    <span>Commercials</span>
                    <svg
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform ${
                        hoveredSupportKey === "commercial" ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      hoveredSupportKey === "commercial"
                        ? "max-h-[1000px] mt-2"
                        : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {COMMERCIAL_PROJECTS.map(({ title, Icon, href }, i) => (
                        <Link
                          key={i}
                          href={href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-red-600"
                        >
                          {Icon && <Icon className="h-6 w-6" />}
                          <span className="text-sm font-medium">{title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Residentials */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setHoveredSupportKey(
                        hoveredSupportKey === "residential"
                          ? null
                          : "residential"
                      )
                    }
                    className="w-full flex items-center justify-between text-sm font-medium p-2 rounded-lg hover:bg-red-600"
                  >
                    <span>Residentials</span>
                    <svg
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform ${
                        hoveredSupportKey === "residential" ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      hoveredSupportKey === "residential"
                        ? "max-h-[1000px] mt-2"
                        : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {RESIDENTIAL_PROJECTS.map(({ title, Icon, href }, i) => (
                        <Link
                          key={i}
                          href={href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-red-600"
                        >
                          {Icon && <Icon className="h-6 w-6" />}
                          <span className="text-sm font-medium">{title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between text-base font-medium hover:text-white/80"
              >
                <span>About Us</span>
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between text-base font-medium hover:text-white/80"
              >
                {/* <span>Contact Us</span> */}
              </Link>
            </li>
          </ul>

          {/* OPTIONAL: small video */}
          {videoSrc ? (
            <div className="mt-6">
              <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-lg ring-1 ring-white/10">
                <video
                  src={videoSrc}
                  controls
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-md bg-red-600 py-3 text-white font-semibold shadow hover:opacity-95 active:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
