"use client";

import { useEffect } from "react";

export default function HomeEffects({ typewriterPhrases }: { typewriterPhrases: string[] }) {
  useEffect(() => {
    // LOADER
    const loaderTimer = setTimeout(() => {
      document.getElementById("loader")?.classList.add("gone");
    }, 1800);
    const onLoad = () => {
      clearTimeout(loaderTimer);
      setTimeout(() => document.getElementById("loader")?.classList.add("gone"), 1800);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    // PARTICLES
    const cv = document.getElementById("canvas") as HTMLCanvasElement | null;
    let animId = 0;
    let resizeHandler: (() => void) | null = null;
    if (cv) {
      const cx = cv.getContext("2d")!;
      const pts: P[] = [];
      class P {
        x = 0;
        y = 0;
        sz = 0;
        vx = 0;
        vy = 0;
        op = 0;
        col = "";
        constructor() {
          this.r();
        }
        r() {
          this.x = Math.random() * cv!.width;
          this.y = Math.random() * cv!.height;
          this.sz = Math.random() * 1.5 + 0.3;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.op = Math.random() * 0.5 + 0.1;
          this.col = Math.random() > 0.5 ? "#00d4ff" : "#7928ca";
        }
        u() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > cv!.width || this.y < 0 || this.y > cv!.height) this.r();
        }
        d() {
          cx.save();
          cx.globalAlpha = this.op;
          cx.fillStyle = this.col;
          cx.beginPath();
          cx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
          cx.fill();
          cx.restore();
        }
      }
      const rsz = () => {
        cv.width = innerWidth;
        cv.height = innerHeight;
      };
      rsz();
      resizeHandler = rsz;
      window.addEventListener("resize", rsz);
      for (let i = 0; i < 120; i++) pts.push(new P());
      function lines() {
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x,
              dy = pts[i].y - pts[j].y,
              d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              cx.save();
              cx.globalAlpha = (1 - d / 100) * 0.08;
              cx.strokeStyle = "#00d4ff";
              cx.lineWidth = 0.5;
              cx.beginPath();
              cx.moveTo(pts[i].x, pts[i].y);
              cx.lineTo(pts[j].x, pts[j].y);
              cx.stroke();
              cx.restore();
            }
          }
      }
      (function anim() {
        cx.clearRect(0, 0, cv!.width, cv!.height);
        pts.forEach((p) => {
          p.u();
          p.d();
        });
        lines();
        animId = requestAnimationFrame(anim);
      })();
    }

    // TYPEWRITER
    const phrases = typewriterPhrases.length ? typewriterPhrases : ["Website Developer"];
    let pi = 0,
      ci = 0,
      del = false;
    const tw = document.getElementById("tw");
    let twTimer = 0;
    function type() {
      if (!tw) return;
      const cur = phrases[pi];
      if (!del) {
        tw.textContent = cur.slice(0, ci + 1);
        ci++;
        if (ci === cur.length) {
          del = true;
          twTimer = window.setTimeout(type, 1800);
          return;
        }
      } else {
        tw.textContent = cur.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      twTimer = window.setTimeout(type, del ? 50 : 90);
    }
    const twStart = window.setTimeout(type, 2000);

    // HORIZONTAL SCROLL GROUPS — anchor links inside a pinned group all share the
    // same offsetTop (they're panned horizontally, not stacked), so both scrollspy
    // and click-to-scroll need to reason about scroll progress within the group.
    function hscrollTarget(id: string) {
      const el = document.getElementById(id);
      const outer = el?.closest<HTMLElement>(".hscroll-outer");
      if (!el || !outer) return null;
      const panelIds = Array.from(outer.querySelectorAll("section[id]")).map((s) => s.id);
      const idx = panelIds.indexOf(id);
      if (idx === -1) return null;
      const scrollable = outer.offsetHeight - window.innerHeight;
      const progress = panelIds.length > 1 ? idx / (panelIds.length - 1) : 0;
      return { outerTop: outer.offsetTop, scrollable, progress, panelIds, idx };
    }

    // NAV SCROLL (scrollspy) — active section is the one actually containing the scroll position
    const nav = document.getElementById("nav");
    const nls = document.querySelectorAll(".nav-links a");
    const secs = document.querySelectorAll("section[id]");
    const hOuters = document.querySelectorAll<HTMLElement>(".hscroll-outer");
    const onScroll = () => {
      nav?.classList.toggle("scrolled", scrollY > 60);
      const pos = scrollY + 200;
      let cur = "";
      secs.forEach((s) => {
        const el = s as HTMLElement;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) cur = el.id;
      });
      if (!cur) {
        secs.forEach((s) => {
          const el = s as HTMLElement;
          if (pos >= el.offsetTop) cur = el.id;
        });
      }
      hOuters.forEach((outer) => {
        const top = outer.offsetTop;
        const bottom = top + outer.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          const panelIds = Array.from(outer.querySelectorAll("section[id]")).map((s) => s.id);
          const scrollable = outer.offsetHeight - window.innerHeight;
          const progress = scrollable > 0 ? Math.min(1, Math.max(0, (scrollY - top) / scrollable)) : 0;
          const idx = Math.round(progress * (panelIds.length - 1));
          if (panelIds[idx]) cur = panelIds[idx];
        }
      });
      nls.forEach((l) => {
        l.classList.remove("active");
        if (l.getAttribute("href") === "#" + cur) l.classList.add("active");
      });
    };
    window.addEventListener("scroll", onScroll);

    // ANCHOR CLICKS — override native jump for links targeting a panel inside a
    // horizontal-scroll group, since the browser would otherwise land on whichever
    // panel happens to be at the top of the pinned range instead of the one clicked.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = a?.getAttribute("href");
      if (!href || href.length < 2) return;
      const id = href.slice(1);
      const target = hscrollTarget(id);
      if (!target) return;
      e.preventDefault();
      const y = target.outerTop + target.progress * target.scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", onAnchorClick);

    // MOBILE NAV
    const ham = document.getElementById("ham");
    const mob = document.getElementById("mobNav");
    const mc = document.getElementById("mobClose");
    const openMenu = () => {
      mob?.classList.add("open");
      ham?.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      mob?.classList.remove("open");
      ham?.classList.remove("open");
      document.body.style.overflow = "";
    };
    ham?.addEventListener("click", () => (ham.classList.contains("open") ? closeMenu() : openMenu()));
    mc?.addEventListener("click", closeMenu);
    mob?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onEsc);

    // SCROLL REVEAL + SKILL BARS
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("vis");
              e.target.querySelectorAll<HTMLElement>(".sk-fill").forEach((b) => {
                b.style.width = b.dataset.w + "%";
              });
            }, i * 80);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // COUNTER ANIMATION
    function animateCounter(el: HTMLElement) {
      const target = +(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const start = performance.now();
      (function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      })(start);
    }
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(".stat-n[data-target]").forEach(animateCounter);
            counterIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".stats").forEach((s) => counterIO.observe(s));

    // AI TOUCH: scan line overlay on hero
    const hero = document.getElementById("hero");
    let scanWrap: HTMLDivElement | null = null;
    let aiCorner: HTMLDivElement | null = null;
    if (hero) {
      scanWrap = document.createElement("div");
      scanWrap.className = "ai-scan-wrap";
      hero.appendChild(scanWrap);

      aiCorner = document.createElement("div");
      aiCorner.className = "ai-corner";
      aiCorner.innerHTML = '<div class="ai-corner-dot"></div>AI ENHANCED';
      hero.appendChild(aiCorner);
    }

    // AI TOUCH: text scramble on section labels
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    function scramble(el: Element) {
      const final = el.textContent || "";
      let f = 0;
      const total = 22;
      (function run() {
        el.textContent = final
          .split("")
          .map((c, i) => {
            if (c === " " || c === "—" || c === ".") return c;
            return f / total >= i / final.length ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        if (++f <= total) requestAnimationFrame(run);
        else el.textContent = final;
      })();
    }
    const scrambleObservers: IntersectionObserver[] = [];
    document.querySelectorAll(".s-label").forEach((el) => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            scramble(el);
            obs.unobserve(el);
          }
        },
        { threshold: 1 }
      );
      obs.observe(el);
      scrambleObservers.push(obs);
    });

    // AI TOUCH: neural cursor trail
    let trailDots: { el: HTMLDivElement; x: number; y: number }[] = [];
    let trailRaf = 0;
    let trailMouseHandler: ((e: MouseEvent) => void) | null = null;
    if (window.innerWidth > 768) {
      let mx = 0,
        my = 0;
      trailMouseHandler = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      document.addEventListener("mousemove", trailMouseHandler);
      const COUNT = 12;
      trailDots = Array.from({ length: COUNT }, (_, i) => {
        const d = document.createElement("div");
        const sz = Math.max(1.5, 5 - i * 0.3);
        d.className = "trail-dot";
        d.style.width = d.style.height = sz + "px";
        document.body.appendChild(d);
        return { el: d, x: 0, y: 0 };
      });
      (function loop() {
        trailDots[0].x = mx;
        trailDots[0].y = my;
        trailDots.forEach((dot, i) => {
          if (i > 0) {
            dot.x += (trailDots[i - 1].x - dot.x) * 0.38;
            dot.y += (trailDots[i - 1].y - dot.y) * 0.38;
          }
          dot.el.style.left = dot.x + "px";
          dot.el.style.top = dot.y + "px";
          dot.el.style.opacity = String((1 - i / COUNT) * 0.5);
          dot.el.style.background = i < 6 ? "#00d4ff" : "#7928ca";
        });
        trailRaf = requestAnimationFrame(loop);
      })();
    }

    // 4D EFFECT — hero parallax layers + card tilt
    const parallaxLayers = [
      { el: document.querySelector<HTMLElement>(".hero-tag"), depth: 18 },
      { el: document.querySelector<HTMLElement>(".hero-name"), depth: 28 },
      { el: document.querySelector<HTMLElement>(".hero-tw"), depth: 22 },
      { el: document.querySelector<HTMLElement>(".hero-desc"), depth: 12 },
      { el: document.querySelector<HTMLElement>(".hero-btns"), depth: 8 },
      { el: document.querySelector<HTMLElement>(".scroll-ind"), depth: 5 },
    ];
    let phx = 0,
      phy = 0,
      ptx = 0,
      pty = 0,
      heroActive = false;
    let heroRaf = 0;
    const onHeroMove = (e: MouseEvent) => {
      heroActive = true;
      ptx = e.clientX - window.innerWidth / 2;
      pty = e.clientY - window.innerHeight / 2;
    };
    const onHeroLeave = () => {
      heroActive = false;
    };
    hero?.addEventListener("mousemove", onHeroMove);
    hero?.addEventListener("mouseleave", onHeroLeave);
    (function heroLoop() {
      const ease = 0.07;
      phx += (ptx - phx) * ease;
      phy += (pty - phy) * ease;
      if (!heroActive) {
        ptx *= 0.92;
        pty *= 0.92;
      }
      parallaxLayers.forEach(({ el, depth }) => {
        if (el) el.style.transform = `translate(${phx / depth}px,${phy / depth}px)`;
      });
      heroRaf = requestAnimationFrame(heroLoop);
    })();

    const tiltCards = document.querySelectorAll<HTMLElement>(".sk-card,.tl-card,.tl-role-card,.edu-card,.award-card,.c-form");
    const tiltCleanups: (() => void)[] = [];
    tiltCards.forEach((card) => {
      const glint = document.createElement("div");
      glint.style.cssText =
        "position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(circle at 50% 50%,rgba(0,212,255,.12),transparent 65%);";
      if (getComputedStyle(card).position === "static") card.style.position = "relative";
      card.appendChild(glint);

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (y - 0.5) * -14;
        const ry = (x - 0.5) * 14;
        card.style.transition = "box-shadow .3s,border-color .3s";
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
        glint.style.opacity = "1";
        glint.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%,rgba(0,212,255,.13),transparent 65%)`;
      };
      const onLeave = () => {
        card.style.transition = "transform .6s cubic-bezier(.23,1,.32,1),box-shadow .3s,border-color .3s";
        card.style.transform = "";
        glint.style.opacity = "0";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      tiltCleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        glint.remove();
      });
    });

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(twStart);
      clearTimeout(twTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("keydown", onEsc);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animId);
      cancelAnimationFrame(trailRaf);
      cancelAnimationFrame(heroRaf);
      if (trailMouseHandler) document.removeEventListener("mousemove", trailMouseHandler);
      trailDots.forEach((d) => d.el.remove());
      scanWrap?.remove();
      aiCorner?.remove();
      scrambleObservers.forEach((o) => o.disconnect());
      io.disconnect();
      counterIO.disconnect();
      hero?.removeEventListener("mousemove", onHeroMove);
      hero?.removeEventListener("mouseleave", onHeroLeave);
      tiltCleanups.forEach((fn) => fn());
    };
  }, [typewriterPhrases]);

  return null;
}
