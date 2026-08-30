import type { ProjectsContent } from "@/lib/content/schemas";

export default function Projects({ content }: { content: ProjectsContent }) {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">
          Selected <span className="g">Work</span>
        </div>
        <div className="projects-grid">
          {content.items.map((item, i) => (
            <div className="proj-card reveal" key={i}>
              <div className="proj-image">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external, per-project URLs; not a static local asset
                  <img src={item.imageUrl} alt={item.title} />
                ) : (
                  <span className="proj-fallback">🗂️</span>
                )}
              </div>
              <div className="proj-body">
                <div className="proj-title">{item.title}</div>
                <p className="proj-desc">{item.description}</p>
                <div className="proj-tags">
                  {item.techStack.map((tech, ti) => (
                    <span className="tag tag-cyan" key={ti}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={item.link} target="_blank" className="proj-link">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
