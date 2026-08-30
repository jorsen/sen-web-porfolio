import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type {
  HeroContent,
  AboutContent,
  SkillsContent,
  ExperienceContent,
  EducationContent,
  AwardsContent,
  ContactContent,
} from "@/lib/content/schemas";
import { roleDuration, groupTotalDuration } from "@/lib/content/experience-helpers";
import type { ExperienceRole } from "@/lib/content/schemas";

function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// "Mar 2022 -> Oct 2023 -> Present" — uses a plain ASCII arrow, not a
// unicode "→", since that glyph isn't in Helvetica's WinAnsi encoding and
// would render as a garbled character (same class of bug as the emoji fix).
function dateProgression(roles: ExperienceRole[]): string {
  const sorted = [...roles].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const parts = [formatMonthYear(sorted[0].startDate)];
  for (const r of sorted) {
    parts.push(r.endDate ? formatMonthYear(r.endDate) : "Present");
  }
  return parts.join("  ->  ");
}

const BADGE_COLORS: Record<ExperienceRole["badge"], { bg: string; fg: string }> = {
  "full-time": { bg: "rgba(0,212,150,0.12)", fg: "#00966b" },
  contract: { bg: "rgba(0,180,255,0.12)", fg: "#0089c7" },
  "part-time": { bg: "rgba(255,165,0,0.12)", fg: "#b5750a" },
  internship: { bg: "rgba(121,40,202,0.12)", fg: "#7928ca" },
};
const BADGE_LABEL: Record<ExperienceRole["badge"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
  "part-time": "Part-time",
  internship: "Internship",
};

// Standard PDF fonts (Helvetica) only support WinAnsi glyphs — strip any
// leading emoji some CMS fields bake into the text itself.
function stripLeadingEmoji(s: string): string {
  return s.replace(/^[^\x00-\x7F]+\s*/, "");
}

// Surfaces dev/automation tooling first on the resume, without touching the
// site's own category order.
function orderedToolCategories(skills: SkillsContent) {
  const priority = ["Dev Tools", "CMS & Architecture"];
  return [...skills.toolsCard.categories].sort(
    (a, b) => (priority.includes(a.label) ? priority.indexOf(a.label) : 99) -
      (priority.includes(b.label) ? priority.indexOf(b.label) : 99)
  );
}

const NAVY = "#0d1117";
const NAVY_DEEP = "#050816";
const CYAN = "#00b8d9";
const MUTED = "#8892b0";
const INK = "#1a1a2e";
const INK_SOFT = "#4a5568";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, flexDirection: "row" },

  // SIDEBAR — plain in-flow colored block (avoids position:absolute/fixed,
  // which some PDF viewers render inconsistently). Content is verified to
  // fit a single page, so the overflow case this used to guard against
  // doesn't come up.
  sidebar: { width: "34%", backgroundColor: NAVY, color: "#fff", padding: 20, paddingTop: 15, paddingBottom: 15 },
  name: { fontSize: 19, fontWeight: 700, lineHeight: 1.15 },
  nameAccent: { color: CYAN },
  tagline: { fontSize: 9.3, color: CYAN, marginTop: 4, marginBottom: 9, letterSpacing: 0.3 },
  sideSectionTitle: {
    fontSize: 8.3,
    fontWeight: 700,
    color: CYAN,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
    marginTop: 7,
  },
  sideDivider: { height: 1, backgroundColor: "rgba(0,184,217,0.35)", marginTop: 2.5, marginBottom: 2.5 },
  contactItem: { marginBottom: 5 },
  contactLabel: { fontSize: 7.3, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 },
  contactValue: { fontSize: 8.7, color: "#e8ecf5" },
  toolCategory: { marginBottom: 4 },
  toolCategoryLabel: { fontSize: 7.2, color: CYAN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 },
  toolItem: { flexDirection: "row", marginBottom: 1 },
  toolDot: { width: 7, fontSize: 6.8, color: CYAN },
  toolText: { flex: 1, fontSize: 7.2, lineHeight: 1.2, color: "#e8ecf5" },
  skillRow: { marginBottom: 4 },
  skillTopRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1.5 },
  skillName: { fontSize: 7.9, color: "#e8ecf5" },
  skillPct: { fontSize: 7.6, color: CYAN, fontWeight: 700 },
  skillBarTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 2 },
  skillBarFill: { height: 3, backgroundColor: CYAN, borderRadius: 2 },

  // MAIN
  main: { width: "66%", padding: 22, paddingTop: 15, paddingBottom: 15, color: INK },
  mainSectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: NAVY_DEEP,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: CYAN,
    paddingBottom: 3,
  },
  mainSectionTitleFirst: { marginTop: 0 },
  paragraph: { marginBottom: 3, lineHeight: 1.3, color: INK_SOFT, fontSize: 8.2 },

  timelineGroup: {
    borderLeftWidth: 1.5,
    borderLeftColor: "rgba(0,184,217,0.35)",
    paddingLeft: 14,
    marginLeft: 4,
    marginBottom: 0,
  },
  companyHeader: { position: "relative", marginBottom: 1 },
  companyDot: {
    position: "absolute",
    top: 2,
    left: -18.5,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: CYAN,
  },
  companyTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  company: { fontSize: 9.8, fontWeight: 700, color: NAVY_DEEP },
  companyLocation: { fontSize: 7.8, color: MUTED, marginTop: 1 },
  companyProgression: { fontSize: 7.6, color: "#00838f", fontWeight: 700, textAlign: "right" },
  companyTotal: { fontSize: 7.3, color: MUTED, marginTop: 2, textAlign: "right" },

  roleBlock: { marginBottom: 4, marginTop: 2.5 },
  roleTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 },
  roleTitleWrap: { flex: 1, paddingRight: 8 },
  roleTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  roleTitle: { fontSize: 8.5, fontWeight: 700, color: INK },
  roleBadge: { fontSize: 6.8, fontWeight: 700, borderRadius: 20, paddingVertical: 1.5, paddingHorizontal: 6, textTransform: "uppercase", letterSpacing: 0.3 },
  dateBadge: {
    fontSize: 7.6,
    color: "#00838f",
    backgroundColor: "rgba(0,184,217,0.1)",
    borderRadius: 20,
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    textAlign: "right",
  },
  dateBadgeCurrent: { color: "#00966b", backgroundColor: "rgba(0,212,150,0.14)", fontWeight: 700 },
  duration: { fontSize: 7.3, color: MUTED, marginTop: 2, textAlign: "right" },
  bullet: { flexDirection: "row", marginBottom: 1, marginTop: 1.5 },
  bulletDot: { width: 10, fontSize: 7.8, color: CYAN },
  bulletText: { flex: 1, fontSize: 7.8, lineHeight: 1.3, color: INK_SOFT },

  eduRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  eduSchool: { fontSize: 9.3, fontWeight: 700, color: NAVY_DEEP, marginBottom: 1 },
  eduDegree: { fontSize: 8.1, color: INK_SOFT },
  eduYears: { fontSize: 7.5, color: MUTED },

  awardRow: { marginBottom: 5 },
  awardTitle: { fontSize: 8.8, fontWeight: 700, color: NAVY_DEEP, marginBottom: 1 },
  awardDesc: { fontSize: 7.8, color: INK_SOFT, lineHeight: 1.3 },
});

export function ResumeDocument({
  hero,
  about,
  skills,
  experience,
  education,
  awards,
  contact,
}: {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  education: EducationContent;
  awards: AwardsContent;
  contact: ContactContent;
}) {
  const location = about.infoRows.find((r) => r.icon === "📍")?.text;

  return (
    <Document title={`${hero.nameFirst} ${hero.nameLast} — Resume`}>
      <Page size="A4" style={styles.page}>
        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>
            {hero.nameFirst} <Text style={styles.nameAccent}>{hero.nameLast}</Text>
          </Text>
          <Text style={styles.tagline}>{hero.typewriterPhrases[0]}</Text>

          <Text style={styles.sideSectionTitle}>Contact</Text>
          <View style={styles.sideDivider} />
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>{contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>LinkedIn</Text>
            <Text style={styles.contactValue}>{contact.linkedinLabel}</Text>
          </View>
          {location && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>{location}</Text>
            </View>
          )}

          <Text style={styles.sideSectionTitle}>Skills</Text>
          <View style={styles.sideDivider} />
          {skills.cards
            .flatMap((c) => c.items)
            .map((item, i) => (
              <View style={styles.skillRow} key={i}>
                <View style={styles.skillTopRow}>
                  <Text style={styles.skillName}>{item.name}</Text>
                  <Text style={styles.skillPct}>{item.pct}%</Text>
                </View>
                <View style={styles.skillBarTrack}>
                  <View style={[styles.skillBarFill, { width: `${item.pct}%` }]} />
                </View>
              </View>
            ))}

          <Text style={styles.sideSectionTitle}>Tools</Text>
          <View style={styles.sideDivider} />
          {orderedToolCategories(skills).map((cat, i) => (
            <View style={styles.toolCategory} key={i}>
              <Text style={styles.toolCategoryLabel}>{cat.label}</Text>
              {cat.tags.map((tag, ti) => (
                <View style={styles.toolItem} key={ti}>
                  <Text style={styles.toolDot}>•</Text>
                  <Text style={styles.toolText}>{tag.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* MAIN */}
        <View style={styles.main}>
          <Text style={[styles.mainSectionTitle, styles.mainSectionTitleFirst]}>Professional Summary</Text>
          <Text style={styles.paragraph}>{hero.description}</Text>
          {about.paragraphs.map((p, i) => (
            <Text style={styles.paragraph} key={i}>
              {p}
            </Text>
          ))}

          <Text style={styles.mainSectionTitle}>Experience</Text>
          {experience.groups.map((group, gi) => (
            <View style={styles.timelineGroup} key={gi}>
              <View style={styles.companyHeader}>
                <View style={styles.companyDot} />
                <View style={styles.companyTop}>
                  <View style={styles.roleTitleWrap}>
                    <Text style={styles.company}>{group.company}</Text>
                    <Text style={styles.companyLocation}>{stripLeadingEmoji(group.location)}</Text>
                  </View>
                  <View>
                    <Text style={styles.companyProgression}>{dateProgression(group.roles)}</Text>
                    {group.roles.length > 1 && (
                      <Text style={styles.companyTotal}>{groupTotalDuration(group.roles)} total</Text>
                    )}
                  </View>
                </View>
              </View>

              {[...group.roles]
                .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .map((role, ri) => {
                const isCurrent = role.endDate === null;
                const badgeColors = BADGE_COLORS[role.badge];
                return (
                  <View style={styles.roleBlock} key={ri} wrap={false}>
                    <View style={styles.roleTop}>
                      <View style={styles.roleTitleWrap}>
                        <View style={styles.roleTitleRow}>
                          <Text style={styles.roleTitle}>{role.title}</Text>
                          <Text style={[styles.roleBadge, { backgroundColor: badgeColors.bg, color: badgeColors.fg }]}>
                            {BADGE_LABEL[role.badge]}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={[styles.dateBadge, isCurrent ? styles.dateBadgeCurrent : undefined]}>
                          {role.dateLabel}
                        </Text>
                        <Text style={styles.duration}>{roleDuration(role)}</Text>
                      </View>
                    </View>
                    {role.bullets.map((b, bi) => (
                      <View style={styles.bullet} key={bi}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          ))}

          <Text style={styles.mainSectionTitle}>Education</Text>
          <View style={styles.eduRow} wrap={false}>
            <View>
              <Text style={styles.eduSchool}>{education.school}</Text>
              <Text style={styles.eduDegree}>{education.degree}</Text>
            </View>
            <Text style={styles.eduYears}>{education.years}</Text>
          </View>

          {awards.items.length > 0 && (
            <>
              <Text style={styles.mainSectionTitle}>Awards</Text>
              {awards.items.map((a, i) => (
                <View style={styles.awardRow} key={i} wrap={false}>
                  <Text style={styles.awardTitle}>{a.title}</Text>
                  <Text style={styles.awardDesc}>{a.description}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}
