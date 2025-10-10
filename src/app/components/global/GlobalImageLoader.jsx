"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalImageLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Add spinner CSS once
    let styleTag = document.getElementById("__img-spinner-style__");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "__img-spinner-style__";
      styleTag.textContent = `
        @keyframes __spin {
          to { transform: rotate(360deg); }
        }
        .__img-loader-overlay__ {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.10);
          backdrop-filter: blur(2px);
          pointer-events: none;
        }
        .__img-loader-spinner__ {
          height: 20px;
          width: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 9999px;
          animation: __spin 1s linear infinite;
        }
      `;
      document.head.appendChild(styleTag);
    }

    const processed = new WeakSet();

    const addOverlay = (img) => {
      if (processed.has(img)) return;
      processed.add(img);

      const host =
        img.parentElement?.style?.position === "relative"
          ? img.parentElement
          : img.parentElement;

      if (!host) return;

      if (host.querySelector(":scope > .__img-loader-overlay__")) return;

      const overlay = document.createElement("div");
      overlay.className = "__img-loader-overlay__";

      const br = getComputedStyle(img).borderRadius;
      if (br && br !== "0px") overlay.style.borderRadius = br;

      const spinner = document.createElement("div");
      spinner.className = "__img-loader-spinner__";
      overlay.appendChild(spinner);

      const hostStyle = getComputedStyle(host);
      if (hostStyle.position === "static") {
        host.style.position = "relative";
      }

      host.appendChild(overlay);

      const remove = () => {
        overlay.remove();
        img.removeEventListener("load", remove);
        img.removeEventListener("error", remove);
      };

      if (img.complete) {
        remove();
      } else {
        img.addEventListener("load", remove, { once: true });
        img.addEventListener("error", remove, { once: true });
      }
    };

    const scanAllImages = () => {
      document.querySelectorAll("img").forEach((img) => {
        if (!img.complete || img.currentSrc === "") addOverlay(img);
      });
    };

    // Initial scan
    scanAllImages();

    // Watch for dynamically added images
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.tagName === "IMG") addOverlay(node);
          node.querySelectorAll?.("img").forEach((img) => addOverlay(img));
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Re-scan when route changes
    scanAllImages();

    return () => {
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
