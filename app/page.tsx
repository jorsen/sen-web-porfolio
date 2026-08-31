import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { SITE_URL } from "@/lib/site";
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import HomeEffects from "@/components/HomeEffects";
import HorizontalScrollGroup from "@/components/HorizontalScrollGroup";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Awards from "@/components/sections/Awards";
import Recommendations from "@/components/sections/Recommendations";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [hero, about] = await Promise.all([getContent("hero"), getContent("about")]);
  const title = `${hero.nameFirst} ${hero.nameLast} — ${hero.typewriterPhrases[0]}`;
  const description = hero.description;

  return {
    title,
    description,
    alternates: { canonical: SITE_URL },
    keywords: [
      `${hero.nameFirst} ${hero.nameLast}`,
      "Website Developer",
      "WordPress Developer",
      "React.js Developer",
      ...about.infoRows.map((r) => r.text),
    ],
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: `${hero.nameFirst} ${hero.nameLast}`,
      type: "profile",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const [hero, about, skills, experience, education, awards, recommendations, projects, contact] = await Promise.all([
    getContent("hero"),
    getContent("about"),
    getContent("skills"),
    getContent("experience"),
    getContent("education"),
    getContent("awards"),
    getContent("recommendations"),
    getContent("projects"),
    getContent("contact"),
  ]);

  const currentRole = experience.groups
    .flatMap((g) => g.roles.map((r) => ({ ...r, company: g.company })))
    .find((r) => r.endDate === null);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${hero.nameFirst} ${hero.nameLast}`,
    url: SITE_URL,
    jobTitle: currentRole?.title ?? hero.typewriterPhrases[0],
    description: hero.description,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    sameAs: [contact.linkedinUrl],
    ...(currentRole && {
      worksFor: { "@type": "Organization", name: currentRole.company },
    }),
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: skills.cards.flatMap((c) => c.items.map((i) => i.name)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div id="loader">
        <div className="ld-txt">JM.DEV</div>
        <div className="ld-bar">
          <div className="ld-fill" />
        </div>
      </div>

      <Nav />
      <MobileNav linkedinUrl={contact.linkedinUrl} email={contact.email} />

      <Hero content={hero} />
      <About content={about} />
      <HorizontalScrollGroup>
        <Skills content={skills} />
        <Experience content={experience} />
        <Education content={education} />
      </HorizontalScrollGroup>
      <Awards content={awards} />
      <Recommendations content={recommendations} />
      <Projects content={projects} />
      <Contact content={contact} />

      <Footer linkedinUrl={contact.linkedinUrl} email={contact.email} />

      <HomeEffects typewriterPhrases={hero.typewriterPhrases} />
    </>
  );
}
