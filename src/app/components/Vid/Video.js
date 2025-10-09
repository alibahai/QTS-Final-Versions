"use client";

import { useEffect, useRef, useState } from "react";

export default function Video({
  src = "https://res.cloudinary.com/dyckgorsz/video/upload/v1759922310/4_v03fmy.mp4",
  poster = "/images/2ndImage.jpg",
  autoPlay = true,
  loop = true,
  muted = true,          // keep true so autoplay works on mobile
  playsInline = true,
  controls = false,      // background video usually has no controls
}) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  // Wait for full page load, then set source and play
  useEffect(() => {
    const onLoad = () => setReady(true);

    if (document.readyState === "complete") {
      // page already fully loaded
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  // Try to play once ready
  useEffect(() => {
    if (!ready || !videoRef.current) return;
    // Some browsers require an explicit .play() after source attach
    const v = videoRef.current;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        /* ignore — user gesture may be required on some setups */
      }
    };
    tryPlay();
  }, [ready]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        poster={poster}
        preload="none"            // don't fetch video until we attach source
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        aria-hidden={true}
      >
        {/* Attach the source only after full page load */}
        {ready && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 " />

      {/* Bottom gradient feather (optional) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
