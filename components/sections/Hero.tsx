import type { HeroContent } from "@/lib/content/schemas";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="hero">
      <canvas id="canvas" />
      <div className="hero-c">
        <div className="hero-tag">{content.availabilityTag}</div>
        <h1 className="hero-name">
          <span>{content.nameFirst}</span> <span className="g">{content.nameLast}</span>
        </h1>
        <div className="hero-tw">
          <span id="tw" />
          <span className="blink">|</span>
        </div>
        <p className="hero-desc">{content.description}</p>
        <div className="hero-btns">
          <a href="#experience" className="btn-p">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {content.ctaPrimaryText}
          </a>
          <a href="#contact" className="btn-s">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {content.ctaSecondaryText}
          </a>
        </div>
      </div>
      <div className="scroll-ind">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
