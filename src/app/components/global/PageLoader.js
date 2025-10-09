"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // If everything (including images) is already loaded
    if (document.readyState === "complete") {
      setDone(true);
      return;
    }
    const onLoad = () => setDone(true);
    window.addEventListener("load", onLoad); // fires when images/css/fonts finish
    return () => window.removeEventListener("load", onLoad);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      {/* spinner */}
      <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    </div>
  );
}
