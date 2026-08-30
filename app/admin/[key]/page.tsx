import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CONTENT_KEYS, CONTENT_LABELS, ContentKey } from "@/lib/content/schemas";
import AdminHeader from "@/components/admin/AdminHeader";
import JsonEditor from "@/components/admin/JsonEditor";

export default async function EditSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!CONTENT_KEYS.includes(key as ContentKey)) notFound();

  const row = await prisma.contentBlock.findUnique({ where: { key } });
  const json = JSON.stringify(row?.data ?? {}, null, 2);

  return (
    <div className="admin-shell">
      <AdminHeader title={CONTENT_LABELS[key as ContentKey]} />
      <div className="admin-wrap">
        <h1 style={{ fontSize: "1.4rem", marginBottom: 8 }}>{CONTENT_LABELS[key as ContentKey]}</h1>
        <p style={{ color: "var(--txt3)", fontSize: ".85rem", marginBottom: 24 }}>
          Edit the JSON below and save — it&apos;s validated against this section&apos;s schema before it&apos;s
          written, and the live site updates immediately.
        </p>
        <JsonEditor contentKey={key} initialJson={json} />
      </div>
    </div>
  );
}
