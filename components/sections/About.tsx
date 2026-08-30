import type { AboutContent } from "@/lib/content/schemas";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section id="about">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="about-grid reveal">
          <div>
            <div style={{ position: "relative", paddingBottom: 44 }}>
              <div className="av-frame">
                <img src="/photo.jpg" alt="Jorsen Mejia" />
              </div>
              <div className="av-badge">{content.photoBadge}</div>
            </div>
            <div className="stats">
              {content.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-n" data-target={s.target} data-suffix={s.suffix}>
                    0
                  </div>
                  <div className="stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-txt">
            <div className="s-title">
              {content.titleLine1} <span className="g">{content.titleLine2Gradient}</span>
            </div>
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="info-grid">
              {content.infoRows.map((row, i) => (
                <div className="info-row" key={i}>
                  <div className="info-ico">{row.icon}</div>
                  <span>{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
