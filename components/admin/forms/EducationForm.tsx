"use client";

import { useState } from "react";
import type { EducationContent } from "@/lib/content/schemas";
import { TextField, FieldRow } from "@/components/admin/fields";
import SaveBar from "@/components/admin/SaveBar";

export default function EducationForm({ contentKey, initial }: { contentKey: string; initial: EducationContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <FieldRow>
        <TextField label="Icon (emoji)" value={data.icon} onChange={(v) => setData({ ...data, icon: v })} />
        <TextField label="Years" value={data.years} onChange={(v) => setData({ ...data, years: v })} />
      </FieldRow>
      <TextField label="School" value={data.school} onChange={(v) => setData({ ...data, school: v })} />
      <TextField label="Degree" value={data.degree} onChange={(v) => setData({ ...data, degree: v })} />
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
