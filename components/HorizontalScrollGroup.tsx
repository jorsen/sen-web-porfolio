"use client";

import { useEffect, useRef, useState } from "react";

export default function HorizontalScrollGroup({ children }: { children: React.ReactNode[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panels = children.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ticking = false;

    const apply = () => {
      ticking = false;
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const rect = outer.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      track.style.transform = `translate3d(-${progress * (panels - 1) * 100}vw,0,0)`;
      setActive(Math.round(progress * (panels - 1)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [panels]);

  return (
    <div ref={outerRef} className="hscroll-outer" style={{ height: `${panels * 100}vh` }}>
      <div className="hscroll-sticky">
        <div ref={trackRef} className="hscroll-track" style={{ width: `${panels * 100}vw` }}>
          {children.map((child, i) => (
            <div className="hscroll-panel" key={i}>
              {child}
            </div>
          ))}
        </div>
        <div className="hscroll-dots">
          {children.map((_, i) => (
            <span key={i} className={`hscroll-dot${i === active ? " on" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
