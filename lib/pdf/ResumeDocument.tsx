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

const NAVY = "#0d1117";
const NAVY_DEEP = "#050816";
const CYAN = "#00b8d9";
const MUTED = "#8892b0";
const INK = "#1a1a2e";
const INK_SOFT = "#4a5568";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5 },
  row: { flexDirection: "row" },
  // Decorative backdrop only — repeats per-page via `fixed` so it always covers
  // exactly one page's height, independent of how much sidebar text actually flows.
  sidebarBackdrop: { position: "absolute", top: 0, bottom: 0, left: 0, width: "34%", backgroundColor: NAVY },

  // SIDEBAR
  sidebar: { width: "34%", color: "#fff", padding: 22, paddingTop: 26 },
  name: { fontSize: 19, fontWeight: 700, lineHeight: 1.15 },
  nameAccent: { color: CYAN },
  tagline: { fontSize: 9.3, color: CYAN, marginTop: 5, marginBottom: 12, letterSpacing: 0.3 },
  sideSectionTitle: {
    fontSize: 8.3,
    fontWeight: 700,
    color: CYAN,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 6,
    marginTop: 12,
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
  sideEduSchool: { fontSize: 9.3, fontWeight: 700, color: "#fff", marginBottom: 2 },
  sideEduDegree: { fontSize: 8.1, color: MUTED, marginBottom: 2, lineHeight: 1.3 },
  sideEduYears: { fontSize: 7.8, color: CYAN },
  sideAwardTitle: { fontSize: 8.8, fontWeight: 700, color: "#fff", marginBottom: 2 },
  sideAwardDesc: { fontSize: 7.6, color: MUTED, lineHeight: 1.35, marginBottom: 6 },

  // MAIN
  main: { width: "66%", padding: 26, paddingTop: 26, color: INK },
  mainSectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: NAVY_DEEP,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: CYAN,
    paddingBottom: 3,
  },
  mainSectionTitleFirst: { marginTop: 0 },
  paragraph: { marginBottom: 4, lineHeight: 1.45, color: INK_SOFT, fontSize: 9 },

  roleBlock: { marginBottom: 8 },
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
        <View style={styles.sidebarBackdrop} fixed />
        <View style={styles.row}>
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
          <View style={styles.pillWrap}>
            {skills.cards
              .flatMap((c) => c.items.map((i) => i.name))
              .map((s, i) => (
                <Text style={styles.pill} key={i}>
                  {s}
                </Text>
              ))}
          </View>

          <Text style={styles.sideSectionTitle}>Tools</Text>
          <View style={styles.sideDivider} />
          <View style={styles.pillWrap}>
            {skills.toolsCard.categories
              .flatMap((c) => c.tags.map((t) => t.text))
              .map((s, i) => (
                <Text style={styles.pill} key={i}>
                  {s}
                </Text>
              ))}
          </View>

          <Text style={styles.sideSectionTitle}>Education</Text>
          <View style={styles.sideDivider} />
          <Text style={styles.sideEduSchool}>{education.school}</Text>
          <Text style={styles.sideEduDegree}>{education.degree}</Text>
          <Text style={styles.sideEduYears}>{education.years}</Text>

          {awards.items.length > 0 && (
            <>
              <Text style={styles.sideSectionTitle}>Awards</Text>
              <View style={styles.sideDivider} />
              {awards.items.map((a, i) => (
                <View key={i}>
                  <Text style={styles.sideAwardTitle}>{a.title}</Text>
                  <Text style={styles.sideAwardDesc}>{a.description}</Text>
                </View>
              ))}
            </>
          )}
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
        </View>
        </View>
      </Page>
    </Document>
  );
}
