"use client";

import { useState } from "react";
import type { AboutContent } from "@/lib/content/schemas";
import { TextField, StringListField, NumberField, FieldRow } from "@/components/admin/fields";
import ArrayField from "@/components/admin/ArrayField";
import SaveBar from "@/components/admin/SaveBar";

export default function AboutForm({ contentKey, initial }: { contentKey: string; initial: AboutContent }) {
  const [data, setData] = useState(initial);
  return (
    <div>
      <TextField label="Section label" value={data.sectionLabel} onChange={(v) => setData({ ...data, sectionLabel: v })} />
      <TextField label="Photo badge" value={data.photoBadge} onChange={(v) => setData({ ...data, photoBadge: v })} />
      <FieldRow>
        <TextField label="Title line 1" value={data.titleLine1} onChange={(v) => setData({ ...data, titleLine1: v })} />
        <TextField label="Title line 2 (gradient)" value={data.titleLine2Gradient} onChange={(v) => setData({ ...data, titleLine2Gradient: v })} />
      </FieldRow>

      <ArrayField
        label="Stats"
        items={data.stats}
        onChange={(stats) => setData({ ...data, stats })}
        newItem={() => ({ target: 0, suffix: "", label: "" })}
        itemTitle={(s) => s.label || "new stat"}
        renderItem={(item, update) => (
          <FieldRow>
            <NumberField label="Target number" value={item.target} onChange={(v) => update({ target: v })} />
            <TextField label="Suffix (e.g. +)" value={item.suffix} onChange={(v) => update({ suffix: v })} />
            <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
          </FieldRow>
        )}
      />

      <StringListField label="Paragraphs" value={data.paragraphs} onChange={(v) => setData({ ...data, paragraphs: v })} />

      <ArrayField
        label="Info rows"
        items={data.infoRows}
        onChange={(infoRows) => setData({ ...data, infoRows })}
        newItem={() => ({ icon: "", text: "" })}
        itemTitle={(r) => r.text || "new row"}
        renderItem={(item, update) => (
          <FieldRow>
            <TextField label="Icon (emoji)" value={item.icon} onChange={(v) => update({ icon: v })} />
            <TextField label="Text" value={item.text} onChange={(v) => update({ text: v })} />
          </FieldRow>
        )}
      />

      <SaveBar contentKey={contentKey} getData={() => data} />
    </div>
  );
}
