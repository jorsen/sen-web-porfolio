import type { RecommendationsContent } from "@/lib/content/schemas";

export default function Recommendations({ content }: { content: RecommendationsContent }) {
  return (
    <section id="recommendations" style={{ background: "var(--bg)", padding: "80px 0" }}>
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">Recommendations</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {content.items.map((item, i) => (
            <div className="tl-card reveal" style={{ borderRadius: 20, padding: 32, position: "relative" }} key={i}>
              <div
                style={{
                  fontSize: "3rem",
                  lineHeight: 1,
                  color: "var(--cyan)",
                  opacity: 0.3,
                  position: "absolute",
                  top: 20,
                  right: 28,
                }}
              >
                &quot;
              </div>
              <p
                style={{
                  fontSize: ".95rem",
                  lineHeight: 1.8,
                  color: "var(--txt2)",
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                &quot;{item.quote}&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--grad)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: ".9rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".95rem" }}>{item.name}</div>
                  <div style={{ fontSize: ".78rem", color: "var(--txt3)" }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
