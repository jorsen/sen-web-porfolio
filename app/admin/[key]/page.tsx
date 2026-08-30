import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CONTENT_KEYS, CONTENT_LABELS, contentSchemas, ContentKey } from "@/lib/content/schemas";
import AdminHeader from "@/components/admin/AdminHeader";
import HeroForm from "@/components/admin/forms/HeroForm";
import AboutForm from "@/components/admin/forms/AboutForm";
import SkillsForm from "@/components/admin/forms/SkillsForm";
import ExperienceForm from "@/components/admin/forms/ExperienceForm";
import EducationForm from "@/components/admin/forms/EducationForm";
import AwardsForm from "@/components/admin/forms/AwardsForm";
import RecommendationsForm from "@/components/admin/forms/RecommendationsForm";
import ContactAdminForm from "@/components/admin/forms/ContactForm";

export default async function EditSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!CONTENT_KEYS.includes(key as ContentKey)) notFound();

  const row = await prisma.contentBlock.findUnique({ where: { key } });
  const data = contentSchemas[key as ContentKey].parse(row?.data ?? {});

  return (
    <div className="admin-shell">
      <AdminHeader title={CONTENT_LABELS[key as ContentKey]} />
      <div className="admin-wrap">
        <h1 style={{ fontSize: "1.4rem", marginBottom: 24 }}>{CONTENT_LABELS[key as ContentKey]}</h1>

        {key === "hero" && <HeroForm contentKey={key} initial={data as never} />}
        {key === "about" && <AboutForm contentKey={key} initial={data as never} />}
        {key === "skills" && <SkillsForm contentKey={key} initial={data as never} />}
        {key === "experience" && <ExperienceForm contentKey={key} initial={data as never} />}
        {key === "education" && <EducationForm contentKey={key} initial={data as never} />}
        {key === "awards" && <AwardsForm contentKey={key} initial={data as never} />}
        {key === "recommendations" && <RecommendationsForm contentKey={key} initial={data as never} />}
        {key === "contact" && <ContactAdminForm contentKey={key} initial={data as never} />}
      </div>
    </div>
  );
}
