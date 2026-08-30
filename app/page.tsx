import { getContent } from "@/lib/content/get";
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import HomeEffects from "@/components/HomeEffects";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Awards from "@/components/sections/Awards";
import Recommendations from "@/components/sections/Recommendations";
import Contact from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, about, skills, experience, education, awards, recommendations, contact] = await Promise.all([
    getContent("hero"),
    getContent("about"),
    getContent("skills"),
    getContent("experience"),
    getContent("education"),
    getContent("awards"),
    getContent("recommendations"),
    getContent("contact"),
  ]);

  return (
    <>
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
      <Skills content={skills} />
      <Experience content={experience} />
      <Education content={education} />
      <Awards content={awards} />
      <Recommendations content={recommendations} />
      <Contact content={contact} />

      <Footer linkedinUrl={contact.linkedinUrl} email={contact.email} />

      <HomeEffects typewriterPhrases={hero.typewriterPhrases} />
    </>
  );
}
