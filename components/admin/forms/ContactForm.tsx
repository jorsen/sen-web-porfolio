"use client";

import { useState } from "react";
import type { ContactContent } from "@/lib/content/schemas";
import { TextField, TextAreaField, FieldRow } from "@/components/admin/fields";
import SaveBar from "@/components/admin/SaveBar";

export default function ContactAdminForm({ contentKey, initial }: { contentKey: string; initial: ContactContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <TextField label="Heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
      <TextAreaField label="Description" value={data.description} onChange={(v) => setData({ ...data, description: v })} />
      <FieldRow>
        <TextField label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
        <TextField label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
      </FieldRow>
      <FieldRow>
        <TextField label="LinkedIn URL" value={data.linkedinUrl} onChange={(v) => setData({ ...data, linkedinUrl: v })} />
        <TextField label="LinkedIn label" value={data.linkedinLabel} onChange={(v) => setData({ ...data, linkedinLabel: v })} />
      </FieldRow>
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
