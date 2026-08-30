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

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a2e" },
  name: { fontSize: 24, fontWeight: 700 },
  tagline: { fontSize: 12, color: "#555", marginTop: 2, marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, fontSize: 9, color: "#444", marginBottom: 16 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#00838f",
    borderBottom: "1pt solid #ccc",
    paddingBottom: 3,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: { marginBottom: 6, lineHeight: 1.5 },
  roleBlock: { marginBottom: 10 },
  roleTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  company: { fontSize: 11, fontWeight: 700 },
  roleTitle: { fontSize: 10, fontWeight: 700 },
  meta: { fontSize: 9, color: "#555" },
  bullet: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.4 },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillTag: { fontSize: 9, backgroundColor: "#f0f0f5", borderRadius: 3, paddingVertical: 3, paddingHorizontal: 7 },
  eduRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  awardRow: { marginBottom: 4 },
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
  const allTags = skills.toolsCard.categories.flatMap((c) => c.tags.map((t) => t.text));
  const allSkillNames = skills.cards.flatMap((c) => c.items.map((i) => i.name));

  return (
    <Document title={`${hero.nameFirst} ${hero.nameLast} — Resume`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>
          {hero.nameFirst} {hero.nameLast}
        </Text>
        <Text style={styles.tagline}>{skills.cards[0]?.title ? hero.typewriterPhrases[0] : ""}</Text>
        <View style={styles.contactRow}>
          <Text>{contact.email}</Text>
          <Text>{contact.phone}</Text>
          <Text>{contact.linkedinLabel}</Text>
          {about.infoRows.find((r) => r.icon === "📍") && <Text>{about.infoRows.find((r) => r.icon === "📍")?.text}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>{hero.description}</Text>
        {about.paragraphs.map((p, i) => (
          <Text style={styles.paragraph} key={i}>
            {p}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.groups.map((group) =>
          group.roles.map((role, ri) => (
            <View style={styles.roleBlock} key={`${group.company}-${ri}`} wrap={false}>
              <View style={styles.roleTop}>
                <Text style={styles.company}>
                  {group.company} — <Text style={styles.roleTitle}>{role.title}</Text>
                </Text>
                <Text style={styles.meta}>
                  {role.dateLabel} · {roleDuration(role)}
                </Text>
              </View>
              <Text style={styles.meta}>{group.location}</Text>
              {role.bullets.map((b, bi) => (
                <View style={styles.bullet} key={bi}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsGrid}>
          {[...allSkillNames, ...allTags].map((s, i) => (
            <Text style={styles.skillTag} key={i}>
              {s}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.eduRow}>
          <Text>
            {education.school} — {education.degree}
          </Text>
          <Text style={styles.meta}>{education.years}</Text>
        </View>

        {awards.items.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Awards</Text>
            {awards.items.map((a, i) => (
              <View style={styles.awardRow} key={i}>
                <Text style={{ fontWeight: 700 }}>{a.title}</Text>
                <Text style={styles.meta}>{a.description}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
