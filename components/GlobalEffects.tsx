"use client";

import { useEffect } from "react";

export default function GlobalEffects() {
  useEffect(() => {
    const pt = document.getElementById("pt");
    const loader = document.getElementById("loader");
    if (!pt) return;

    if (loader) {
      // Home page: branded loader handles the first-visit cover.
      if (sessionStorage.getItem("ptVisited")) {
        loader.classList.add("gone");
        pt.style.opacity = "1";
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            pt.style.opacity = "0";
            setTimeout(() => (pt.style.pointerEvents = "none"), 450);
          })
        );
      } else {
        sessionStorage.setItem("ptVisited", "1");
        pt.style.opacity = "0";
      }
    } else {
      // No loader on this page (e.g. thank-you): always play the fade-in reveal.
      pt.style.opacity = "1";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          pt.style.opacity = "0";
          setTimeout(() => (pt.style.pointerEvents = "none"), 450);
        })
      );
    }

    document.querySelectorAll("a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (h && !h.startsWith("#") && !h.startsWith("http") && !h.startsWith("mailto") && !h.startsWith("tel")) {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          pt.style.pointerEvents = "all";
          pt.style.opacity = "1";
          setTimeout(() => (window.location.href = h), 420);
        });
      }
    });

    const cur = document.getElementById("cur");
    const curf = document.getElementById("curf");
    if (cur && curf) {
      let mx = 0,
        my = 0,
        fx = 0,
        fy = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + "px";
        cur.style.top = my + "px";
      };
      document.addEventListener("mousemove", onMove);
      let raf = 0;
      (function af() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        curf.style.left = fx + "px";
        curf.style.top = fy + "px";
        raf = requestAnimationFrame(af);
      })();

      document.querySelectorAll("a,button,.sk-card,.tl-card").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cur.style.transform = "translate(-50%,-50%) scale(2)";
          curf.style.transform = "translate(-50%,-50%) scale(1.5)";
          curf.style.borderColor = "rgba(0,212,255,.8)";
        });
        el.addEventListener("mouseleave", () => {
          cur.style.transform = "translate(-50%,-50%) scale(1)";
          curf.style.transform = "translate(-50%,-50%) scale(1)";
          curf.style.borderColor = "rgba(0,212,255,.5)";
        });
      });

      return () => {
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
      };
    }
  }, []);

  return null;
}
