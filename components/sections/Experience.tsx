import type { ExperienceContent, ExperienceRole } from "@/lib/content/schemas";
import { roleDuration, groupTotalDuration } from "@/lib/content/experience-helpers";

const BADGE_CLASS: Record<ExperienceRole["badge"], string> = {
  "full-time": "badge-ft",
  contract: "badge-ct",
  "part-time": "badge-pt",
  internship: "badge-intern",
};
const BADGE_LABEL: Record<ExperienceRole["badge"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
  "part-time": "Part-time",
  internship: "Internship",
};

function RoleCard({ role, active }: { role: ExperienceRole; active: boolean }) {
  return (
    <div className={`tl-role-card${active ? " active-role" : ""}`}>
      <div className="tl-role-top">
        <div>
          <span className="tl-role-title">{role.title}</span>
          <span className={BADGE_CLASS[role.badge]}>{BADGE_LABEL[role.badge]}</span>
        </div>
        <div className="tl-role-meta">
          <span className="tl-date">{role.dateLabel}</span>
          <span className="tl-dur">{roleDuration(role)}</span>
        </div>
      </div>
      <ul className="tl-list">
        {role.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience({ content }: { content: ExperienceContent }) {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="s-label">{content.sectionLabel}</div>
        <div className="s-title">
          Work <span className="g">Experience</span>
        </div>
        <div className="timeline">
          {content.groups.map((group) => {
            if (group.roles.length > 1) {
              return (
                <div className="tl-group reveal" key={group.company}>
                  <div className="tl-group-header">
                    <div className="tl-group-logo">{group.logoInitials}</div>
                    <div className="tl-group-info">
                      <div className="tl-group-co">{group.company}</div>
                      <div className="tl-group-meta">{group.location}</div>
                    </div>
                    <span className="tl-group-total">{groupTotalDuration(group.roles)}</span>
                  </div>
                  <div className="tl-group-body">
                    {group.roles.map((role, i) => (
                      <RoleCard role={role} active={role.endDate === null} key={i} />
                    ))}
                  </div>
                </div>
              );
            }

            const role = group.roles[0];
            return (
              <div className={`tl-item reveal${role.endDate === null ? " now" : ""}`} key={group.company}>
                <div className="tl-card">
                  <div className="tl-top">
                    <div>
                      <div className="tl-co">{group.company}</div>
                      <div className="tl-role">
                        {role.title} <span className={BADGE_CLASS[role.badge]}>{BADGE_LABEL[role.badge]}</span>
                      </div>
                    </div>
                    <div className="tl-meta">
                      <span className="tl-date">{role.dateLabel}</span>
                      <span className="tl-loc">📍 {group.location}</span>
                      <span className="tl-dur">{roleDuration(role)}</span>
                    </div>
                  </div>
                  <ul className="tl-list">
                    {role.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
