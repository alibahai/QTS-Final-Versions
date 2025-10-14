"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function Footer({ year }) {
  const BG_URL = "/images/footer.jpg";

  // 🔧 Environment variables
  const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 || "+971568068070";
  const PHONE_DISPLAY =
    process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+971 56 806 8070";
  const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "info@qts-fitout.com";

  // 📨 Form state
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // 🧠 Submit handler
  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/get-in-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("📩 Footer API response:", data);

      if (res.ok && data.ok) {
        setStatusMsg("✅ Thanks! We’ll be in touch soon.");
        setEmail("");
      } else {
        setStatusMsg("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Footer submit error:", err);
      setStatusMsg("⚠️ Network error. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${BG_URL})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <footer className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-6 text-white">
          {/* ✅ MOBILE LAYOUT */}
          <div className="block md:hidden text-center">
            <div className="w-28 mx-auto">
              <Image
                src="/images/2.png"
                alt="QTS - Quality Team Solution"
                width={160}
                height={80}
                className="h-auto w-full"
                priority
              />
            </div>

            <p className="mt-6 text-sm leading-6 text-white/80">
              Quality Team Solution (QTS) is Dubai’s leading interior design and
              fit-out partner, known for turning ideas into exceptional spaces.
              We deliver innovative, functional, and timeless designs — serving
              clients across the UAE and beyond.
            </p>

            <p className="mt-6 text-sm text-white/80">
              Office 706, Business Bay Tower, Business Bay, Dubai, UAE
            </p>

            <p className="mt-6 text-sm text-white/80">{PHONE_DISPLAY}</p>
            <p className="mt-6 text-sm text-white/80">{EMAIL}</p>

            {/* Newsletter (hidden on mobile) */}
            <form
              onSubmit={onSubmit}
              className="space-y-3 mt-6 hidden md:block"
            >
              <div className="flex items-center justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full max-w-xs rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:border-white"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full max-w-xs mx-auto rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-70"
              >
                {submitting ? "Sending..." : "GET IN TOUCH"}
              </button>
              {statusMsg && (
                <p className="text-sm mt-2 text-white/80">{statusMsg}</p>
              )}
            </form>

            {/* Social icons */}
              <div className="flex items-center gap-10 pt-5 mt-10 mb-3  ml-28">
                <a
                  href="https://www.instagram.com/qualityteamsolution/"
                  target="_blank"
                >
                  <Icon icon="skill-icons:instagram" width="30" height="30" />
                </a>
                <a
                  href="https://www.linkedin.com/company/quality-team-solutions/about/"
                  target="_blank"
                  className="inline-flex items-center justify-center w-8 h-8  bg-white rounded-full"
                >
                  <Icon icon="logos:linkedin-icon" width="40" height="40" />
                </a>

                <a
                  href="https://www.snapchat.com/@qualityteamsol0"
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-white hover:opacity-90 transition"
                >
                  <Icon icon="uil:snapchat-ghost" width="38" height="24" />
                </a>

                <a
                  href="https://www.tiktok.com/@qualityteamsolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="QTS on TikTok"
                  className="inline-flex items-center text-white/80 hover:text-white transition"
                >
                  <Icon icon="simple-icons:tiktok" width="30" height="30" />
                </a>
              </div>
            {/* Bottom Bar for Mobile */}
            {/* Top strip: logo + site URL */}
            <div className="border-t border-white/10">
              <div className="mx-auto w-full max-w-7xl px-4 py-3">
                <div className="flex justify-center items-center gap-2 text-center">
                  <Image
                    src="/images/0908.png"
                    alt="Intercraft Solutions Logo"
                    width={16}
                    height={16}
                    className="object-contain mix-blend-multiply opacity-90"
                    priority
                  />
                  <Link
                    href="https://www.intercraftsol.com"
                    target="_blank"
                    className="hover:text-white text-white/80 transition text-sm"
                  >
                    www.intercraftsol.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 🖥️ DESKTOP LAYOUT */}
          <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="w-28">
                <Image
                  src="/images/2.png"
                  alt="QTS - Quality Team Solution"
                  width={160}
                  height={80}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <p className="text-sm leading-6 text-white/80 text-justify">
                Quality-Team-Solution (QTS) is Dubai’s leading interior design
                and fit-out partner, known for turning ideas into exceptional
                spaces. We deliver innovative, functional, and timeless designs
                — serving clients across the UAE and beyond.
              </p>
              <p className="text-sm text-white/80 mt-4">
                Office 706, Business Bay Tower, Business Bay, Dubai, UAE
              </p>
            </div>

            {/* Column 2: Services */}
            <div className="ml-4">
              <h3 className="mb-6 text-xl font-bold ml-12">Services</h3>
              <ul className="space-y-4 text-sm ml-12 text-white/80">
                <li>
                  <Link
                    href="/servicess/drawings-approvals"
                    className="hover:text-white"
                  >
                    Design Drawings &amp; Approvals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicess/demolishing"
                    className="hover:text-white"
                  >
                    Demolition, Build &amp; Refurbish
                  </Link>
                </li>
                <li>
                  <Link href="/servicess/mep" className="hover:text-white">
                    MEP Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicess/joinery-work"
                    className="hover:text-white"
                  >
                    Joinery Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicess/turnkey-fit"
                    className="hover:text-white"
                  >
                    Turnkey Fit-Outs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicess/design-drawings"
                    className="hover:text-white"
                  >
                    Design and Space Planning
                  </Link>
                </li>
              </ul>
              <a
                href={`tel:${PHONE_E164}`}
                className="mt-12 block text-sm text-white/80 ml-12 hover:text-white"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="mb-9 text-lg font-bold ml-12">Company</h3>
              <ul className="space-y-4 text-sm ml-12 text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About QTS
                  </Link>
                </li>
                <li>
                  <Link href="/servicess" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-project/arabian-oud"
                    className="hover:text-white"
                  >
                    Our Projects
                  </Link>
                </li>
              </ul>

              <a
                href={`mailto:${EMAIL}`}
                className="mt-28 block text-sm text-white/80 ml-12 hover:text-white"
              >
                {EMAIL}
              </a>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4 mr-10">
              <h2 className="text-xl font-bold mb-12">
                Stay informed with the Latest News and Insights from QTS
              </h2>
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:border-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-red-600 px-4 py-2 mt-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-70"
                >
                  {submitting ? "Sending..." : "GET IN TOUCH"}
                </button>
                {statusMsg && (
                  <p className="text-sm mt-2 text-white/80">{statusMsg}</p>
                )}
              </form>

              {/* Social Icons */}
              <div className="flex items-center gap-10 pt-5 mt-10">
                <a
                  href="https://www.instagram.com/qualityteamsolution/"
                  target="_blank"
                >
                  <Icon icon="skill-icons:instagram" width="30" height="30" />
                </a>
                <a
                  href="https://www.linkedin.com/company/quality-team-solutions/about/"
                  target="_blank"
                  className="inline-flex items-center justify-center w-10  bg-white rounded-full"
                >
                  <Icon icon="logos:linkedin-icon" width="30" height="30" />
                </a>

                <a
                  href="https://www.snapchat.com/@qualityteamsol0"
                  target="_blank"
                  className="flex items-center justify-center w-180 h-10 rounded-full bg-yellow-400 text-white hover:opacity-90 transition"
                >
                  <Icon icon="uil:snapchat-ghost" width="38" height="24" />
                </a>

                <a
                  href="https://www.tiktok.com/@qualityteamsolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="QTS on TikTok"
                  className="inline-flex items-center text-white/80 hover:text-white transition"
                >
                  <Icon icon="simple-icons:tiktok" width="30" height="30" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar for Desktop */}
        <div className="hidden md:block border-t border-white/10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-center items-center gap-2 w-full text-center mt-4 mb-4 relative bottom-2">
              <Image
                src="/images/0908.png"
                alt="Intercraft Solutions Logo"
                width={18}
                height={18}
                // If the logo has a WHITE background (JPG): use multiply to blend it in
                className="object-contain mix-blend-multiply opacity-90"
                // If your logo is a transparent PNG, 'screen' often looks nicer:
                // className="object-contain mix-blend-screen opacity-90"
                priority
              />

              <Link
                href="https://www.intercraftsol.com"
                target="_blank"
                className="hover:text-white text-white/80 transition"
              >
                www.intercraftsol.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
