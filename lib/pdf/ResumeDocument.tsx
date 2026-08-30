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
import { roleDuration } from "@/lib/content/experience-helpers";

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
  sidebar: { width: "34%", backgroundColor: NAVY, color: "#fff", padding: 20, paddingTop: 20 },
  name: { fontSize: 19, fontWeight: 700, lineHeight: 1.15 },
  nameAccent: { color: CYAN },
  tagline: { fontSize: 9.3, color: CYAN, marginTop: 4, marginBottom: 9, letterSpacing: 0.3 },
  sideSectionTitle: {
    fontSize: 8.3,
    fontWeight: 700,
    color: CYAN,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 5,
    marginTop: 9,
  },
  sideDivider: { height: 1, backgroundColor: "rgba(0,184,217,0.35)", marginTop: 3, marginBottom: 3 },
  contactItem: { marginBottom: 6 },
  contactLabel: { fontSize: 7.3, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 },
  contactValue: { fontSize: 8.7, color: "#e8ecf5" },
  pillWrap: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  pill: {
    fontSize: 7.6,
    color: "#e8ecf5",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 0.75,
    borderColor: "rgba(0,184,217,0.4)",
    borderRadius: 3,
    paddingVertical: 2.5,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  skillRow: { marginBottom: 5.5 },
  skillTopRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  skillName: { fontSize: 8.3, color: "#e8ecf5" },
  skillPct: { fontSize: 7.6, color: CYAN, fontWeight: 700 },
  skillBarTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 2 },
  skillBarFill: { height: 3, backgroundColor: CYAN, borderRadius: 2 },

  // MAIN
  main: { width: "66%", padding: 22, paddingTop: 20, color: INK },
  mainSectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: NAVY_DEEP,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
    marginTop: 9,
    borderBottomWidth: 1.5,
    borderBottomColor: CYAN,
    paddingBottom: 3,
  },
  mainSectionTitleFirst: { marginTop: 0 },
  paragraph: { marginBottom: 3, lineHeight: 1.4, color: INK_SOFT, fontSize: 8.8 },

  roleBlock: { marginBottom: 6.5 },
  roleTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 },
  roleTitleWrap: { flex: 1, paddingRight: 8 },
  company: { fontSize: 10, fontWeight: 700, color: NAVY_DEEP },
  roleTitle: { fontSize: 9, fontWeight: 700, color: INK, marginTop: 1 },
  location: { fontSize: 7.8, color: MUTED, marginTop: 1 },
  dateBadge: {
    fontSize: 7.6,
    color: "#00838f",
    backgroundColor: "rgba(0,184,217,0.1)",
    borderRadius: 20,
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    textAlign: "right",
  },
  duration: { fontSize: 7.3, color: MUTED, marginTop: 2, textAlign: "right" },
  bullet: { flexDirection: "row", marginBottom: 1.5, marginTop: 2 },
  bulletDot: { width: 10, fontSize: 8.3, color: CYAN },
  bulletText: { flex: 1, fontSize: 8.3, lineHeight: 1.35, color: INK_SOFT },

  eduRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  eduSchool: { fontSize: 9.8, fontWeight: 700, color: NAVY_DEEP, marginBottom: 1 },
  eduDegree: { fontSize: 8.6, color: INK_SOFT },
  eduYears: { fontSize: 7.8, color: MUTED },

  awardRow: { marginBottom: 7 },
  awardTitle: { fontSize: 9.3, fontWeight: 700, color: NAVY_DEEP, marginBottom: 1 },
  awardDesc: { fontSize: 8.3, color: INK_SOFT, lineHeight: 1.4 },
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
          <View style={styles.pillWrap}>
            {orderedToolCategories(skills)
              .flatMap((c) => c.tags.map((t) => t.text))
              .map((s, i) => (
                <Text style={styles.pill} key={i}>
                  {s}
                </Text>
              ))}
          </View>
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
          {experience.groups.map((group) =>
            group.roles.map((role, ri) => (
              <View style={styles.roleBlock} key={`${group.company}-${ri}`} wrap={false}>
                <View style={styles.roleTop}>
                  <View style={styles.roleTitleWrap}>
                    <Text style={styles.company}>{group.company}</Text>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.location}>{stripLeadingEmoji(group.location)}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateBadge}>{role.dateLabel}</Text>
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
            ))
          )}

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
