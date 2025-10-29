"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function RightContactRail({
  phone = "+971 56 806 8070",
  whatsappHref = "https://wa.me/971568068070",
  footerSelector = "footer",
}) {
  const railRef = useRef(null);
  const [pushUp, setPushUp] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const btn = railRef.current;
    const footer = document.querySelector(footerSelector);
    if (!btn || !footer) return;

    const calc = () => {
      const footerTop = footer.getBoundingClientRect().top;
      const btnRect = btn.getBoundingClientRect();
      const overlap = btnRect.bottom - footerTop;
      setPushUp(overlap > 0 ? overlap + 12 : 0);
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [footerSelector]);

  return (
    <>
      {/* Desktop vertical rail — red box, footer-style WhatsApp logo */}
      <div
        ref={railRef}
        className="hidden md:block fixed right-0 z-40"
        style={{ top: "48%" }}
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${phone}`}
          className="flex flex-col items-center justify-center h-48 w-12 bg-red-500 text-white shadow-md rounded-l-md"
        >
          <span className="text-sm font-semibold tracking-wider [writing-mode:vertical-rl] rotate-180">
            {phone}
          </span>

          {/* EXACT same icon as footer */}
          <Icon icon="logos:whatsapp-icon" width="20" height="20"   className="mt-2 rotate-0 md:rotate-270" />
        </a>
      </div>

      {/* Mobile floating button — red circle, footer-style WhatsApp logo */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${phone}`}
        className="
          md:hidden
          fixed right-4 z-50
          inline-flex h-12 w-12 items-center justify-center
          rounded-full bg-green-500 shadow-lg
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600
        "
        style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <Icon icon="logos:whatsapp-icon" width="28" height="28" />
        <span className="sr-only">Open WhatsApp</span>
      </a>
    </>
  );
}
