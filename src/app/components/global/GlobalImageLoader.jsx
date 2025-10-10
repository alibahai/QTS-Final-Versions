"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalImageLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Inject spinner CSS once
    let styleTag = document.getElementById("__media-spinner-style__");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "__media-spinner-style__";
      styleTag.textContent = `
        @keyframes __spin {
          to { transform: rotate(360deg); }
        }
        .__media-loader-overlay__ {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.10);
          backdrop-filter: blur(2px);
          pointer-events: none;
        }
        .__media-loader-spinner__ {
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

    const addOverlay = (el) => {
      if (processed.has(el)) return;
      processed.add(el);

      const host =
        el.parentElement?.style?.position === "relative"
          ? el.parentElement
          : el.parentElement;

      if (!host) return;
      if (host.querySelector(":scope > .__media-loader-overlay__")) return;

      const overlay = document.createElement("div");
      overlay.className = "__media-loader-overlay__";

      const br = getComputedStyle(el).borderRadius;
      if (br && br !== "0px") overlay.style.borderRadius = br;

      const spinner = document.createElement("div");
      spinner.className = "__media-loader-spinner__";
      overlay.appendChild(spinner);

      const hostStyle = getComputedStyle(host);
      if (hostStyle.position === "static") host.style.position = "relative";

      host.appendChild(overlay);

      const remove = () => {
        overlay.remove();
        el.removeEventListener("load", remove);
        el.removeEventListener("error", remove);
        el.removeEventListener("loadeddata", remove);
        el.removeEventListener("canplaythrough", remove);
      };

      // Detect whether it's <img> or <video>
      if (el.tagName === "IMG") {
        if (el.complete) {
          remove();
        } else {
          el.addEventListener("load", remove, { once: true });
          el.addEventListener("error", remove, { once: true });
        }
      } else if (el.tagName === "VIDEO") {
        if (el.readyState >= 3) {
          // already can play
          remove();
        } else {
          el.addEventListener("loadeddata", remove, { once: true });
          el.addEventListener("canplaythrough", remove, { once: true });
          el.addEventListener("error", remove, { once: true });
        }
      }
    };

    const scanAllMedia = () => {
      // Images
      document.querySelectorAll("img").forEach((img) => {
        if (!img.complete || img.currentSrc === "") addOverlay(img);
      });

      // Videos
      document.querySelectorAll("video").forEach((video) => {
        if (video.readyState < 3) addOverlay(video);
      });
    };

    // Initial scan
    scanAllMedia();

    // Watch dynamically added images or videos
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.tagName === "IMG" || node.tagName === "VIDEO") {
            addOverlay(node);
          }
          node
            .querySelectorAll?.("img, video")
            .forEach((el) => addOverlay(el));
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Re-scan when route changes
    scanAllMedia();

    return () => {
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
