import type { EducationContent } from "@/lib/content/schemas";

export default function Education({ content }: { content: EducationContent }) {
  return (
    <section id="education">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">Education</div>
        <div className="edu-card reveal">
          <div className="edu-ico">{content.icon}</div>
          <div className="edu-info">
            <h3>{content.school}</h3>
            <p>{content.degree}</p>
            <div className="edu-yr">{content.years}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
