import type { AwardsContent } from "@/lib/content/schemas";

export default function Awards({ content }: { content: AwardsContent }) {
  return (
    <section id="awards">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">
          Awards &amp; <span className="g">Honors</span>
        </div>
        {content.items.map((item, i) => (
          <div className="award-card reveal" key={i}>
            <div className="award-ico">{item.icon}</div>
            <div className="award-info">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
