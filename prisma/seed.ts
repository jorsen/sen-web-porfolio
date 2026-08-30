import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import bcrypt from "bcryptjs";
import {
  contentSchemas,
  type HeroContent,
  type AboutContent,
  type SkillsContent,
  type ExperienceContent,
  type EducationContent,
  type AwardsContent,
  type RecommendationsContent,
  type ContactContent,
} from "../lib/content/schemas";

neonConfig.webSocketConstructor = ws;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) });

const hero: HeroContent = {
  availabilityTag: "Available for Freelance & Full-time",
  nameFirst: "Jorsen",
  nameLast: "Mejia",
  typewriterPhrases: [
    "Website Developer",
    "WordPress Expert",
    "React.js Developer",
    "CMS Specialist",
    "UI/UX Enthusiast",
  ],
  description:
    "Website Developer with 7+ years of experience crafting custom web solutions. Specializing in WordPress, React.js, CMS development, and payment system integrations that drive real business results.",
  ctaPrimaryText: "View My Work",
  ctaSecondaryText: "Get In Touch",
};

const about: AboutContent = {
  sectionLabel: "01 — WHO I AM",
  photoBadge: "🏆 Most Improving Developer",
  stats: [
    { target: 7, suffix: "+", label: "Years Exp" },
    { target: 50, suffix: "+", label: "Projects" },
    { target: 4, suffix: "", label: "Companies" },
  ],
  titleLine1: "Building the",
  titleLine2Gradient: "Web of Tomorrow",
  paragraphs: [
    "A dedicated Website Developer at Linkage Web Development, I build dynamic web solutions that help businesses grow online. With expertise spanning WordPress, HTML, CSS, PHP, and JavaScript, I design custom layouts, build CMS sites, and integrate payment systems including PayPal and Stripe.",
    "I specialize in developing custom post types, flexible content architectures, and shortcode designs using tools like Elementor, Divi, and ACF. My goal is always to deliver innovative web systems tailored precisely to each client's needs.",
  ],
  infoRows: [
    { icon: "📍", text: "Calabarzon, Philippines" },
    { icon: "🎓", text: "BS Information Technology" },
    { icon: "💼", text: "Linkage Web Development" },
    { icon: "📱", text: "09975738025" },
  ],
};

const skills: SkillsContent = {
  sectionLabel: "02 — WHAT I USE",
  cards: [
    {
      icon: "⚡",
      title: "Frontend Development",
      items: [
        { name: "HTML5 / CSS3", pct: 95 },
        { name: "JavaScript", pct: 85 },
        { name: "React.js", pct: 80 },
        { name: "Figma", pct: 78 },
        { name: "UI/UX Responsive Design", pct: 90 },
      ],
    },
    {
      icon: "🔧",
      title: "WordPress & CMS",
      items: [
        { name: "WordPress", pct: 95 },
        { name: "Elementor / Divi", pct: 92 },
        { name: "ACF (Advanced Custom Fields)", pct: 88 },
        { name: "Custom Plugins & Themes", pct: 85 },
      ],
    },
    {
      icon: "🛠️",
      title: "Backend & Infrastructure",
      items: [
        { name: "PHP", pct: 82 },
        { name: "cPanel / Hosting", pct: 88 },
        { name: "WHMCS Server", pct: 80 },
        { name: "DNS & Domain Management", pct: 85 },
      ],
    },
  ],
  toolsCard: {
    icon: "💳",
    title: "Integrations & Tools",
    categories: [
      {
        label: "Frameworks",
        tags: [
          { icon: "⚡", text: "Laravel", color: "purple" },
          { icon: "🌊", text: "Webflow", color: "purple" },
        ],
      },
      {
        label: "Payments",
        tags: [
          { icon: "🅿", text: "PayPal", color: "green" },
          { icon: "💳", text: "Stripe", color: "green" },
          { icon: "🔗", text: "Payment Gateways", color: "green" },
        ],
      },
      {
        label: "Dev Tools",
        tags: [
          { icon: "🖼️", text: "PSD to HTML", color: "cyan" },
          { icon: "⚡", text: "Speed Optimization", color: "cyan" },
          { icon: "🔍", text: "QA Testing", color: "cyan" },
          { icon: "📈", text: "SEO", color: "cyan" },
          { icon: "🔀", text: "Git", color: "cyan" },
        ],
      },
      {
        label: "CMS & Architecture",
        tags: [
          { icon: "📝", text: "Custom Post Types", color: "orange" },
          { icon: "⚙️", text: "Shortcodes", color: "orange" },
          { icon: "🗂️", text: "Custom CMS", color: "orange" },
        ],
      },
      {
        label: "Infrastructure",
        tags: [
          { icon: "✉️", text: "Business Email", color: "pink" },
          { icon: "🖥️", text: "cPanel", color: "pink" },
        ],
      },
      {
        label: "Design & AI",
        tags: [
          { icon: "🎨", text: "Figma", color: "purple" },
          { icon: "🤖", text: "ChatGPT", color: "purple" },
          { icon: "✦", text: "Claude AI", color: "purple" },
          { icon: "⌥", text: "GitHub Copilot", color: "purple" },
          { icon: "🖼️", text: "AI Image Gen", color: "purple" },
        ],
      },
    ],
  },
};

const experience: ExperienceContent = {
  sectionLabel: "03 — WHERE I'VE WORKED",
  groups: [
    {
      company: "Linkage Web Development",
      logoInitials: "LW",
      location: "📍 Baguio, Philippines · Remote",
      roles: [
        {
          title: "Website Developer",
          badge: "contract",
          startDate: "2022-03-01",
          endDate: "2023-10-01",
          dateLabel: "Mar 2022 — Oct 2023",
          historicalDuration: "1 yr 8 mos",
          bullets: [
            "Built and maintained dynamic web solutions using WordPress, HTML, CSS, PHP, and JavaScript",
            "Collaborated with design and project teams to deliver high-quality web products on schedule",
          ],
        },
        {
          title: "Website Developer",
          badge: "full-time",
          startDate: "2023-10-01",
          endDate: null,
          dateLabel: "Oct 2023 — Present",
          historicalDuration: null,
          bullets: [
            "Design custom layouts and build CMS-based websites tailored to client specifications",
            "Integrate payment systems including PayPal and Stripe into e-commerce platforms",
            "Develop custom post types, flexible content modules, and shortcode designs",
            "Utilize Elementor, Divi, and ACF to deliver feature-rich WordPress solutions",
          ],
        },
      ],
    },
    {
      company: "Archicoders",
      logoInitials: "AC",
      location: "Philippines",
      roles: [
        {
          title: "Website Developer",
          badge: "full-time",
          startDate: "2021-01-01",
          endDate: "2022-03-01",
          dateLabel: "Jan 2021 — Mar 2022",
          historicalDuration: "1 yr 3 mos",
          bullets: [
            "Developed and maintained client websites with a focus on performance and user experience",
            "Worked across WordPress and custom web stacks for diverse client projects",
          ],
        },
      ],
    },
    {
      company: "Endsofttech Web Solutions",
      logoInitials: "ET",
      location: "NCR, Philippines",
      roles: [
        {
          title: "WordPress Developer",
          badge: "full-time",
          startDate: "2018-09-01",
          endDate: "2020-11-01",
          dateLabel: "Sep 2018 — Nov 2020",
          historicalDuration: "2 yrs 3 mos",
          bullets: [
            "Built customized WordPress plugins and themes from scratch for diverse client needs",
            "Converted PSD design files into fully functioning, pixel-perfect websites",
            "Managed QA bug/error detection and resolution via cPanel",
            "Administered WHMCS server, business email setup, and DNS domain registration",
            "Optimized website speed and performance across all environments",
            "Ensured full UI/UX responsiveness across all device breakpoints",
          ],
        },
      ],
    },
    {
      company: "Ark One Solutions Inc.",
      logoInitials: "AO",
      location: "NCR, Philippines",
      roles: [
        {
          title: "Web Developer",
          badge: "internship",
          startDate: "2017-11-01",
          endDate: "2018-03-01",
          dateLabel: "Nov 2017 — Mar 2018",
          historicalDuration: "5 mos",
          bullets: [
            "Gained hands-on industry experience in professional web development practices",
            "Supported senior developers in building and maintaining web applications",
          ],
        },
      ],
    },
  ],
};

const education: EducationContent = {
  sectionLabel: "04 — ACADEMIC BACKGROUND",
  icon: "🎓",
  school: "STI College",
  degree: "Bachelor's Degree — Information Technology",
  years: "2014 – 2018",
};

const awards: AwardsContent = {
  sectionLabel: "05 — RECOGNITION",
  items: [
    {
      icon: "🏆",
      title: "Most Improving Developer",
      description: "Archicoders · Dec 2023 — Recognized for exceptional growth and dedication to continuous skill development",
    },
  ],
};

const recommendations: RecommendationsContent = {
  sectionLabel: "06 — WHAT OTHERS SAY",
  items: [
    {
      quote: "Great mentor. The work he did marked with cross on the same task.",
      initials: "KB",
      name: "Kean Billy Fernandez",
      role: "Website Developer · Aug 2025",
    },
    {
      quote: "He introduced WordPress development to me. He's very approachable and has good management skills.",
      initials: "RC",
      name: "Ramon Christopher Arceo",
      role: "Systems Engineer · Dec 2023",
    },
  ],
};

const contact: ContactContent = {
  sectionLabel: "07 — LET'S WORK TOGETHER",
  heading: "Have a project in mind?",
  description:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's build something amazing together.",
  email: "jorsenmejia@gmail.com",
  phone: "09975738025",
  linkedinUrl: "https://www.linkedin.com/in/jorsenmejia",
  linkedinLabel: "linkedin.com/in/jorsenmejia",
};

const blocks: Record<keyof typeof contentSchemas, unknown> = {
  hero,
  about,
  skills,
  experience,
  education,
  awards,
  recommendations,
  contact,
};

async function main() {
  for (const [key, data] of Object.entries(blocks)) {
    contentSchemas[key as keyof typeof contentSchemas].parse(data);
    await prisma.contentBlock.upsert({
      where: { key },
      create: { key, data: data as object },
      update: { data: data as object },
    });
    console.log(`seeded content block: ${key}`);
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.upsert({
      where: { email },
      create: { email, passwordHash },
      update: { passwordHash },
    });
    console.log(`seeded admin user: ${email}`);
  } else {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped admin user seed.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
