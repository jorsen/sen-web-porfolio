"use client";

import { useState } from "react";
import type { HeroContent } from "@/lib/content/schemas";
import { TextField, TextAreaField, StringListField, FieldRow } from "@/components/admin/fields";
import SaveBar from "@/components/admin/SaveBar";

export default function HeroForm({ contentKey, initial }: { contentKey: string; initial: HeroContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Availability tag" value={data.availabilityTag} onChange={(v) => setData({ ...data, availabilityTag: v })} />
      <FieldRow>
        <TextField label="First name" value={data.nameFirst} onChange={(v) => setData({ ...data, nameFirst: v })} />
        <TextField label="Last name (gradient)" value={data.nameLast} onChange={(v) => setData({ ...data, nameLast: v })} />
      </FieldRow>
      <StringListField
        label="Typewriter phrases"
        value={data.typewriterPhrases}
        onChange={(v) => setData({ ...data, typewriterPhrases: v })}
      />
      <TextAreaField label="Description" value={data.description} onChange={(v) => setData({ ...data, description: v })} />
      <FieldRow>
        <TextField label="Primary button text" value={data.ctaPrimaryText} onChange={(v) => setData({ ...data, ctaPrimaryText: v })} />
        <TextField label="Secondary button text" value={data.ctaSecondaryText} onChange={(v) => setData({ ...data, ctaSecondaryText: v })} />
      </FieldRow>
      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
