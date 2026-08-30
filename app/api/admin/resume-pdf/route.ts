import { auth } from "@/auth";
import { getContent } from "@/lib/content/get";
import { ResumeDocument } from "@/lib/pdf/ResumeDocument";
import { renderToBuffer } from "@react-pdf/renderer";

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [hero, about, skills, experience, education, awards, contact] = await Promise.all([
    getContent("hero"),
    getContent("about"),
    getContent("skills"),
    getContent("experience"),
    getContent("education"),
    getContent("awards"),
    getContent("contact"),
  ]);

  const buffer = await renderToBuffer(
    ResumeDocument({ hero, about, skills, experience, education, awards, contact })
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${hero.nameFirst}-${hero.nameLast}-Resume.pdf"`,
    },
  });
}
