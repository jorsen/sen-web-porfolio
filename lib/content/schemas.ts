import { z } from "zod";

export const tagColorEnum = z.enum(["cyan", "purple", "green", "orange", "pink"]);

export const heroSchema = z.object({
  availabilityTag: z.string(),
  nameFirst: z.string(),
  nameLast: z.string(),
  typewriterPhrases: z.array(z.string()).min(1),
  description: z.string(),
  ctaPrimaryText: z.string(),
  ctaSecondaryText: z.string(),
});
export type HeroContent = z.infer<typeof heroSchema>;

export const aboutSchema = z.object({
  sectionLabel: z.string(),
  photoBadge: z.string(),
  stats: z
    .array(
      z.object({
        target: z.number(),
        suffix: z.string(),
        label: z.string(),
      })
    )
    .min(1),
  titleLine1: z.string(),
  titleLine2Gradient: z.string(),
  paragraphs: z.array(z.string()).min(1),
  infoRows: z
    .array(
      z.object({
        icon: z.string(),
        text: z.string(),
      })
    )
    .min(1),
});
export type AboutContent = z.infer<typeof aboutSchema>;

const skillItemSchema = z.object({
  name: z.string(),
  pct: z.number().min(0).max(100),
});

const skillCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  items: z.array(skillItemSchema).min(1),
});

const toolTagSchema = z.object({
  icon: z.string(),
  text: z.string(),
  color: tagColorEnum,
});

const toolCategorySchema = z.object({
  label: z.string(),
  tags: z.array(toolTagSchema).min(1),
});

export const skillsSchema = z.object({
  sectionLabel: z.string(),
  cards: z.array(skillCardSchema).min(1),
  toolsCard: z.object({
    icon: z.string(),
    title: z.string(),
    categories: z.array(toolCategorySchema).min(1),
  }),
});
export type SkillsContent = z.infer<typeof skillsSchema>;

const badgeEnum = z.enum(["full-time", "contract", "part-time", "internship"]);

const roleSchema = z.object({
  title: z.string(),
  badge: badgeEnum,
  startDate: z.string(), // ISO yyyy-mm-dd
  endDate: z.string().nullable(), // null = ongoing ("Present")
  dateLabel: z.string(), // e.g. "Oct 2023 — Present"
  historicalDuration: z.string().nullable(), // free-text override for past roles, e.g. "1 yr 8 mos"
  bullets: z.array(z.string()).min(1),
});

const experienceGroupSchema = z.object({
  company: z.string(),
  logoInitials: z.string(),
  location: z.string(),
  roles: z.array(roleSchema).min(1),
});

export const experienceSchema = z.object({
  sectionLabel: z.string(),
  groups: z.array(experienceGroupSchema).min(1),
});
export type ExperienceContent = z.infer<typeof experienceSchema>;
export type ExperienceRole = z.infer<typeof roleSchema>;

export const educationSchema = z.object({
  sectionLabel: z.string(),
  icon: z.string(),
  school: z.string(),
  degree: z.string(),
  years: z.string(),
});
export type EducationContent = z.infer<typeof educationSchema>;

export const awardsSchema = z.object({
  sectionLabel: z.string(),
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
});
export type AwardsContent = z.infer<typeof awardsSchema>;

export const recommendationsSchema = z.object({
  sectionLabel: z.string(),
  items: z.array(
    z.object({
      quote: z.string(),
      initials: z.string(),
      name: z.string(),
      role: z.string(),
    })
  ),
});
export type RecommendationsContent = z.infer<typeof recommendationsSchema>;

export const projectsSchema = z.object({
  sectionLabel: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      techStack: z.array(z.string()).min(1),
      link: z.string(),
      imageUrl: z.string().nullable(),
    })
  ),
});
export type ProjectsContent = z.infer<typeof projectsSchema>;

export const contactSchema = z.object({
  sectionLabel: z.string(),
  heading: z.string(),
  description: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedinUrl: z.string(),
  linkedinLabel: z.string(),
});
export type ContactContent = z.infer<typeof contactSchema>;

export const contentSchemas = {
  hero: heroSchema,
  about: aboutSchema,
  skills: skillsSchema,
  experience: experienceSchema,
  education: educationSchema,
  awards: awardsSchema,
  recommendations: recommendationsSchema,
  projects: projectsSchema,
  contact: contactSchema,
} as const;

export type ContentKey = keyof typeof contentSchemas;

export const CONTENT_KEYS = Object.keys(contentSchemas) as ContentKey[];

export const CONTENT_LABELS: Record<ContentKey, string> = {
  hero: "Hero",
  about: "About",
  skills: "Skills",
  experience: "Work Experience",
  education: "Education",
  awards: "Awards & Honors",
  recommendations: "Recommendations",
  projects: "Projects",
  contact: "Contact",
};
