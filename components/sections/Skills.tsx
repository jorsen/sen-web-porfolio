import type { SkillsContent } from "@/lib/content/schemas";

export default function Skills({ content }: { content: SkillsContent }) {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">
          Tech <span className="g">Stack &amp; Skills</span>
        </div>
        <div className="skills-grid">
          {content.cards.map((card) => (
            <div className="sk-card reveal" key={card.title}>
              <div className="sk-head">
                <div className="sk-ico">{card.icon}</div>
                <div className="sk-ttl">{card.title}</div>
              </div>
              {card.items.map((item) => (
                <div className="sk-item" key={item.name}>
                  <div className="sk-row">
                    <span className="sk-name">{item.name}</span>
                    <span className="sk-pct">{item.pct}%</span>
                  </div>
                  <div className="sk-bar">
                    <div className="sk-fill" data-w={item.pct} />
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="sk-card full reveal">
            <div className="sk-head">
              <div className="sk-ico">{content.toolsCard.icon}</div>
              <div className="sk-ttl">{content.toolsCard.title}</div>
            </div>
            <div className="tool-cats">
              {content.toolsCard.categories.map((cat) => (
                <div className="tool-cat" key={cat.label}>
                  <span className="tool-cat-lbl">{cat.label}</span>
                  <div className="tags">
                    {cat.tags.map((tag, i) => (
                      <span className={`tag tag-${tag.color}`} key={i}>
                        <span className="tag-icon">{tag.icon}</span>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
